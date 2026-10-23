-- Migration to add specification column to products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS specification TEXT;

-- Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
