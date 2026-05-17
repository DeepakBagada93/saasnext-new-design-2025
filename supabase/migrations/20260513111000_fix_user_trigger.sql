
-- Migration to fix handle_new_user trigger error

-- 1. Ensure the email column actually exists on client_profiles
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'client_profiles' AND column_name = 'email') THEN
        ALTER TABLE public.client_profiles ADD COLUMN email text;
    END IF;
END $$;

-- 2. Drop the existing trigger to be safe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. Recreate the function cleanly, ensuring it only uses existing columns
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.client_profiles (id, full_name, role, email, avatar_url)
  VALUES (
      new.id, 
      new.raw_user_meta_data->>'full_name', 
      'client', 
      new.email,
      new.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the user signup
    RAISE LOG 'Error in handle_new_user trigger: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Re-attach the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
