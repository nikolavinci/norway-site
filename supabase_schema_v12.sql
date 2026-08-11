-- Add stripe_coupon_id to coupons table
ALTER TABLE coupons ADD COLUMN stripe_coupon_id TEXT;

-- Add invoice_url to orders table
ALTER TABLE orders ADD COLUMN invoice_url TEXT;
