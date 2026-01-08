-- Admin-configurable email notification settings
CREATE TABLE IF NOT EXISTS public.contact_notification_settings (
  id TEXT PRIMARY KEY,
  enabled BOOLEAN NOT NULL DEFAULT true,
  recipient_email TEXT NOT NULL,
  cc_emails TEXT[] NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_notification_settings ENABLE ROW LEVEL SECURITY;

-- Admin-only access
CREATE POLICY "Admins can read contact notification settings"
ON public.contact_notification_settings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert contact notification settings"
ON public.contact_notification_settings
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact notification settings"
ON public.contact_notification_settings
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete contact notification settings"
ON public.contact_notification_settings
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Seed default row (won't overwrite if you already changed it)
INSERT INTO public.contact_notification_settings (id, enabled, recipient_email, cc_emails)
VALUES ('default', true, 'u1976739@gmail.com', ARRAY[]::text[])
ON CONFLICT (id) DO NOTHING;

-- Lock down direct client inserts into contact_submissions (submissions should go through the backend function)
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;