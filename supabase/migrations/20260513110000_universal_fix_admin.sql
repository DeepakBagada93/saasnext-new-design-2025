
-- Universal Fix: Migration to set up admin and fix schema inconsistencies

-- 1. Ensure client_profiles has the email column (needed for cleanup and logic)
ALTER TABLE public.client_profiles ADD COLUMN IF NOT EXISTS email text;

-- 2. Remove existing incorrect admin data to avoid conflicts
DO $$
BEGIN
    -- Delete from auxiliary tables first to avoid FK violations
    DELETE FROM public.roles_admin WHERE email IN ('ceo@saasnext.in', 'ceo@saasenext.in', 'deeepakbagada25@gmail.com');
    DELETE FROM public.client_profiles WHERE email IN ('ceo@saasnext.in', 'ceo@saasenext.in', 'deeepakbagada25@gmail.com');
    
    -- Delete the users from auth.users
    DELETE FROM auth.users WHERE email IN ('ceo@saasnext.in', 'ceo@saasenext.in', 'deeepakbagada25@gmail.com');
END $$;

-- 3. Ensure roles_admin table has correct structure (with ON DELETE CASCADE)
DROP TABLE IF EXISTS public.roles_admin;
CREATE TABLE public.roles_admin (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL UNIQUE,
    email text NOT NULL,
    role text DEFAULT 'admin',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS and add policies for roles_admin
ALTER TABLE public.roles_admin ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all roles." ON roles_admin
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM client_profiles
            WHERE client_profiles.id = auth.uid() AND client_profiles.role = 'admin'
        )
    );

CREATE POLICY "Allow all for admin setup." ON roles_admin FOR ALL USING (true) WITH CHECK (true);

-- 4. Create the perfect Admin User
-- Password: Saasnext@3093@1993
INSERT INTO auth.users (
    id, 
    email, 
    encrypted_password, 
    email_confirmed_at, 
    raw_app_meta_data, 
    raw_user_meta_data, 
    created_at, 
    updated_at, 
    role,
    aud,
    confirmation_token
)
VALUES (
    'ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0',
    'ceo@saasnext.in',
    crypt('Saasnext@3093@1993', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"CEO SaaSNext"}',
    now(),
    now(),
    'authenticated',
    'authenticated',
    ''
);

-- 5. Set up Admin Profile
INSERT INTO public.client_profiles (id, email, role, full_name, has_completed_onboarding)
VALUES (
    'ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0', 
    'ceo@saasnext.in', 
    'admin', 
    'CEO SaaSNext',
    true
)
ON CONFLICT (id) DO UPDATE 
SET role = 'admin', email = 'ceo@saasnext.in', full_name = 'CEO SaaSNext';

-- 6. Sync with roles_admin
INSERT INTO public.roles_admin (admin_id, email, role)
VALUES ('ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0', 'ceo@saasnext.in', 'admin');

-- 7. Ensure the trigger is robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.client_profiles (id, full_name, role, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'client', new.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
