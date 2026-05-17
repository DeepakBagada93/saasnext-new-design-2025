
-- Migration to remove manually inserted users to fix auth.identities conflict

DO $$
BEGIN
    -- Delete from auxiliary tables first to avoid FK violations
    DELETE FROM public.roles_admin WHERE email = 'ceo@saasnext.in';
    DELETE FROM public.client_profiles WHERE email = 'ceo@saasnext.in';
    
    -- Delete the user from auth.users (this was causing the 500 error because of missing auth.identities)
    DELETE FROM auth.users WHERE email = 'ceo@saasnext.in';
END $$;
