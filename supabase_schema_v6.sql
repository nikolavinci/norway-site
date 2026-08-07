-- Add stripe_session_id back to orders to allow tracking pending vs completed carts
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS stripe_session_id TEXT UNIQUE;
