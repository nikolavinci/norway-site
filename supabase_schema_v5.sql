-- 1. Create RPC to look up user ID by email securely
CREATE OR REPLACE FUNCTION public.get_user_id_by_email(email_address TEXT)
RETURNS UUID AS $$
  SELECT id FROM auth.users WHERE email = email_address LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- 2. Create product_views native analytics table
CREATE TABLE IF NOT EXISTS public.product_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  session_id TEXT,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable RLS on product_views
ALTER TABLE public.product_views ENABLE ROW LEVEL SECURITY;

-- 4. Product Views Policies
-- Anyone can insert a view (anonymous tracking)
DROP POLICY IF EXISTS "Anyone can insert product views" ON public.product_views;
CREATE POLICY "Anyone can insert product views"
ON public.product_views FOR INSERT
WITH CHECK (true);

-- Only admins can read product views
DROP POLICY IF EXISTS "Only admins can view product views" ON public.product_views;
CREATE POLICY "Only admins can view product views"
ON public.product_views FOR SELECT
USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin')
);
