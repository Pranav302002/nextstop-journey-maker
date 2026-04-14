
-- Add secret_token column
ALTER TABLE public.bookings ADD COLUMN secret_token text;

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can read own booking by phone" ON public.bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can read bookings" ON public.bookings;
DROP POLICY IF EXISTS "Authenticated users can update bookings" ON public.bookings;

-- Public can INSERT only (for booking form)
CREATE POLICY "Anyone can create booking"
ON public.bookings FOR INSERT
TO anon
WITH CHECK (true);

-- Customer can read ONLY their own booking by secret token
CREATE POLICY "Customer reads own booking by token"
ON public.bookings FOR SELECT
TO anon
USING (
  secret_token IS NOT NULL 
  AND secret_token = current_setting('request.headers', true)::json->>'x-booking-token'
);

-- Admin (authenticated) can read all bookings
CREATE POLICY "Admin reads all bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (true);

-- Admin can update booking status
CREATE POLICY "Admin updates bookings"
ON public.bookings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);
