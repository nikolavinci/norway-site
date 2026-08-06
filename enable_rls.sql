-- 1. Enable RLS on all public tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 2. Products Table Policies
DROP POLICY IF EXISTS "Public can view products" ON products;
CREATE POLICY "Public can view products" ON products
FOR SELECT USING (true);

-- 3. Blogs Table Policies
DROP POLICY IF EXISTS "Public can view blogs" ON blogs;
CREATE POLICY "Public can view blogs" ON blogs
FOR SELECT USING (true);

-- 4. Site Settings Table Policies
DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
CREATE POLICY "Public can view site settings" ON site_settings
FOR SELECT USING (true);

-- 5. Coupons Table Policies
DROP POLICY IF EXISTS "Public can view coupons" ON coupons;
CREATE POLICY "Public can view coupons" ON coupons
FOR SELECT USING (true);

-- 6. Favorites Table Policies
-- Users can only view, insert, or delete their own favorites
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
CREATE POLICY "Users can view their own favorites" ON favorites
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own favorites" ON favorites;
CREATE POLICY "Users can insert their own favorites" ON favorites
FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;
CREATE POLICY "Users can delete their own favorites" ON favorites
FOR DELETE USING (auth.uid() = user_id);

-- 7. Orders Table Policies
-- Users can view and insert their own orders
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" ON orders
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
CREATE POLICY "Users can insert their own orders" ON orders
FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
CREATE POLICY "Users can update their own orders" ON orders
FOR UPDATE USING (auth.uid() = user_id);

-- (Admins using the service_role key bypass RLS automatically for creating/updating products, blogs, coupons, etc)
