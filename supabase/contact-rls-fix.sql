
-- Contact form RLS fix
-- Allow public visitors to submit contact messages only.

DROP POLICY IF EXISTS
  "Public can submit a contact message"
  ON public.contacts;

CREATE POLICY "Public can submit a contact message"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(trim(name)) >= 2
  AND char_length(trim(email)) > 3
  AND position('@' IN email) > 1
  AND char_length(trim(message)) >= 10
);

GRANT INSERT ON TABLE public.contacts
TO anon, authenticated;
