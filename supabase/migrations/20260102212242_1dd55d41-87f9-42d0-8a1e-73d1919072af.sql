-- Allow admins to insert roles (for creating new admins)
CREATE POLICY "Admins can insert roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin') OR NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin'));

-- Function to check if any admin exists
CREATE OR REPLACE FUNCTION public.admin_exists()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin')
$$;