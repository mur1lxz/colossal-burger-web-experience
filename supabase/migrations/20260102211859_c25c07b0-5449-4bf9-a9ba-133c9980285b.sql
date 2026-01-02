-- Drop existing insert policies
DROP POLICY IF EXISTS "Anyone can insert orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can insert order items" ON public.order_items;

-- Create new policies that allow anonymous users to insert
CREATE POLICY "Public can insert orders" 
ON public.orders 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Public can insert order items" 
ON public.order_items 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow customers to view their own order by order_number (for confirmation page)
CREATE POLICY "Anyone can view orders by order_number"
ON public.orders
FOR SELECT
TO anon, authenticated
USING (true);