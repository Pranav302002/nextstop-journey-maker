
-- Routes table
CREATE TABLE public.routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  distance_km INTEGER NOT NULL,
  base_price_sedan DECIMAL NOT NULL,
  base_price_suv DECIMAL NOT NULL,
  base_price_tempo DECIMAL NOT NULL,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Routes are publicly readable"
ON public.routes FOR SELECT
USING (true);

-- Bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  from_city TEXT NOT NULL,
  to_city TEXT NOT NULL,
  travel_date DATE NOT NULL,
  travel_time TIME,
  passengers INTEGER NOT NULL DEFAULT 1,
  vehicle_type TEXT NOT NULL,
  pickup_address TEXT,
  special_requests TEXT,
  total_price DECIMAL,
  status TEXT NOT NULL DEFAULT 'pending',
  payment_status TEXT NOT NULL DEFAULT 'unpaid',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a booking (public form)
CREATE POLICY "Anyone can create bookings"
ON public.bookings FOR INSERT
WITH CHECK (true);

-- Only authenticated users (admin) can read bookings
CREATE POLICY "Authenticated users can read bookings"
ON public.bookings FOR SELECT
TO authenticated
USING (true);

-- Only authenticated users can update bookings
CREATE POLICY "Authenticated users can update bookings"
ON public.bookings FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Insert sample routes
INSERT INTO public.routes (name, from_city, to_city, distance_km, base_price_sedan, base_price_suv, base_price_tempo) VALUES
('Pune to Goa', 'Pune', 'Goa', 450, 5400, 7200, 9900),
('Pune to Shirdi', 'Pune', 'Shirdi', 240, 2880, 3840, 5280),
('Pune to Mahabaleshwar', 'Pune', 'Mahabaleshwar', 120, 1440, 1920, 2640),
('Pune to Lonavala', 'Pune', 'Lonavala', 65, 780, 1040, 1430),
('Pune to Mumbai', 'Pune', 'Mumbai', 150, 1800, 2400, 3300),
('Pune to Nashik', 'Pune', 'Nashik', 210, 2520, 3360, 4620),
('Pune to Aurangabad', 'Pune', 'Aurangabad', 240, 2880, 3840, 5280),
('Pune to Hyderabad', 'Pune', 'Hyderabad', 560, 6720, 8960, 12320);
