-- Add discount_type and discount_amount to coupons table

ALTER TABLE public.coupons 
ADD COLUMN IF NOT EXISTS discount_type TEXT DEFAULT 'percentage' CHECK (discount_type IN ('percentage', 'flat')),
ADD COLUMN IF NOT EXISTS discount_amount INTEGER DEFAULT 0;

-- Optionally, if we want to migrate existing percentage coupons to ensure their amount is 0 and type is 'percentage':
UPDATE public.coupons 
SET discount_type = 'percentage', discount_amount = 0 
WHERE discount_type IS NULL;

-- Make sure discount_percentage defaults to 0 if null
ALTER TABLE public.coupons ALTER COLUMN discount_percentage SET DEFAULT 0;
UPDATE public.coupons SET discount_percentage = 0 WHERE discount_percentage IS NULL;
