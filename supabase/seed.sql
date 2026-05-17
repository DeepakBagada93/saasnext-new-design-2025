-- Create admin user
-- CEO Account
insert into auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, confirmation_token, email_change, email_change_token_new, recovery_token)
values (
    'ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0', -- Using the ID from your logs
    'ceo@saasnext.in',
    crypt('password-saasnext@3093', gen_salt('bf')),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"full_name":"CEO SaaSNext"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
);

-- Set role to admin in profiles
update public.profiles 
set role = 'admin' 
where id = 'ae0bb9b6-2a1f-43c6-af8d-ea685f5948e0';
