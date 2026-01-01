-- Fix security issues for contact_submissions table
-- Add explicit RESTRICTIVE policy to prevent UPDATE operations on contact_submissions
CREATE POLICY "No one can update contact submissions"
ON public.contact_submissions
FOR UPDATE
USING (false);

-- Add explicit RESTRICTIVE policy to prevent DELETE operations on contact_submissions (except admins)
CREATE POLICY "Only admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Fix user_roles table security - drop the ALL policy and create granular ones
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;

-- Admins can SELECT all roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can INSERT roles
CREATE POLICY "Admins can insert roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can UPDATE roles
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Admins can DELETE roles
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));