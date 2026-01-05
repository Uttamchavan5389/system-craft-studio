-- Create a trigger to automatically make the first user an admin
-- This only grants admin to the very first user who signs up

CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_count INTEGER;
BEGIN
  -- Count existing users (excluding the current one being inserted)
  SELECT COUNT(*) INTO user_count FROM auth.users WHERE id != NEW.id;
  
  -- If this is the first user, make them admin
  IF user_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin');
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users table
CREATE TRIGGER on_auth_user_created_first_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_first_user_admin();