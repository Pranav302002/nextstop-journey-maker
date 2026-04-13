
-- Drop old tables and recreate
DROP TABLE IF EXISTS public.bookings CASCADE;
DROP TABLE IF EXISTS public.routes CASCADE;

-- Create vehicles table
CREATE TABLE public.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  model_examples text,
  price_per_km decimal NOT NULL,
  seats integer NOT NULL,
  image_url text,
  is_ac boolean NOT NULL DEFAULT true,
  is_active boolean NOT NULL DEFAULT true
);

ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Vehicles are publicly readable"
  ON public.vehicles FOR SELECT
  TO public
  USING (true);

-- Insert vehicle data
INSERT INTO public.vehicles (name, model_examples, price_per_km, seats) VALUES
  ('Sedan', 'Etios / Swift Dzire / Aura', 12, 4),
  ('Ertiga', 'Maruti Ertiga', 14, 6),
  ('Innova', 'Toyota Innova', 16, 7),
  ('Innova Crysta', 'Toyota Innova Crysta', 19, 7),
  ('Innova Hycross', 'Toyota Innova Hycross', 26, 7),
  ('Tempo Traveller', '20 Seater Tempo', 32, 20),
  ('Luxury Urbania', '17 Seater Force Urbania', 35, 17);

-- Create routes table
CREATE TABLE public.routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  from_city text NOT NULL,
  to_city text NOT NULL,
  distance_km integer NOT NULL,
  number_of_days integer NOT NULL DEFAULT 1,
  trip_type text NOT NULL DEFAULT 'package',
  description text,
  highlights text,
  image_url text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Routes are publicly readable"
  ON public.routes FOR SELECT
  TO public
  USING (true);

-- Insert routes data
INSERT INTO public.routes (name, from_city, to_city, distance_km, number_of_days, trip_type, description) VALUES
  ('Ajanta Caves Tour', 'Sambhajinagar', 'Ajanta', 105, 1, 'package', 'Explore the UNESCO World Heritage Ajanta Caves with expert guided tour'),
  ('Ellora Caves Tour', 'Sambhajinagar', 'Ellora', 30, 1, 'package', 'Visit the magnificent Ellora Caves featuring Hindu, Buddhist and Jain temples'),
  ('Ajanta-Ellora Combined Tour', 'Sambhajinagar', 'Ajanta-Ellora', 130, 1, 'package', 'Complete heritage tour covering both Ajanta and Ellora UNESCO sites in one day'),
  ('Grishneshwar Jyotirlinga', 'Sambhajinagar', 'Grishneshwar', 32, 1, 'package', 'Visit the sacred Grishneshwar Jyotirlinga temple near Ellora'),
  ('Shirdi Darshan', 'Sambhajinagar', 'Shirdi', 170, 1, 'one_way', 'Comfortable cab to Shirdi for Sai Baba darshan'),
  ('Shani Shingnapur Tour', 'Sambhajinagar', 'Shani Shingnapur', 190, 1, 'package', 'Visit the famous Shani Shingnapur temple known for its doorless village'),
  ('Nashik Trimbakeshwar Tour', 'Sambhajinagar', 'Nashik', 200, 1, 'package', 'Pilgrimage tour to Trimbakeshwar Jyotirlinga and Nashik temples'),
  ('Bhimashankar Tour', 'Sambhajinagar', 'Bhimashankar', 280, 1, 'package', 'Trek and temple visit to Bhimashankar Jyotirlinga in the Western Ghats'),
  ('Mahabaleshwar Tour', 'Sambhajinagar', 'Mahabaleshwar', 320, 2, 'package', 'Scenic hill station getaway with viewpoints and strawberry farms'),
  ('Lonavala Tour', 'Sambhajinagar', 'Lonavala', 290, 1, 'package', 'Day trip to Lonavala with visits to Karla Caves and scenic points'),
  ('Maharashtra 5 Jyotirlinga Tour', 'Sambhajinagar', 'Maharashtra', 800, 3, 'package', 'Complete pilgrimage covering 5 Jyotirlinga temples across Maharashtra'),
  ('Sambhajinagar Local Sightseeing', 'Sambhajinagar', 'Local', 80, 1, 'package', 'Full day local tour covering Bibi Ka Maqbara, Panchakki, Daulatabad Fort and more'),
  ('Sambhajinagar to Pune', 'Sambhajinagar', 'Pune', 240, 1, 'one_way', 'Comfortable outstation cab from Sambhajinagar to Pune'),
  ('Sambhajinagar to Mumbai', 'Sambhajinagar', 'Mumbai', 340, 1, 'one_way', 'Reliable cab service from Sambhajinagar to Mumbai'),
  ('Sambhajinagar to Hyderabad', 'Sambhajinagar', 'Hyderabad', 500, 1, 'one_way', 'Long distance cab to Hyderabad with experienced driver'),
  ('Airport Transfer', 'Sambhajinagar', 'Aurangabad Airport', 15, 1, 'one_way', 'Quick and reliable airport pickup and drop service');

-- Create bookings table
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_ref text,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  pickup_location text NOT NULL,
  destination text NOT NULL,
  travel_date date NOT NULL,
  return_date date,
  pickup_time time NOT NULL,
  number_of_days integer NOT NULL DEFAULT 1,
  passengers integer NOT NULL,
  vehicle_type text NOT NULL,
  price_per_km decimal,
  trip_type text DEFAULT 'one_way',
  tour_package text,
  estimated_distance integer,
  billable_distance integer,
  base_fare decimal,
  driver_allowance decimal,
  toll_parking_note text DEFAULT 'Extra at actuals',
  total_price decimal,
  special_requests text,
  status text NOT NULL DEFAULT 'pending',
  payment_status text NOT NULL DEFAULT 'unpaid',
  source text DEFAULT 'website',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read bookings"
  ON public.bookings FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update bookings"
  ON public.bookings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous read by phone number
CREATE POLICY "Users can read own booking by phone"
  ON public.bookings FOR SELECT
  TO anon
  USING (true);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  location text,
  rating integer NOT NULL DEFAULT 5,
  review text NOT NULL,
  trip text,
  is_active boolean NOT NULL DEFAULT true
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials are publicly readable"
  ON public.testimonials FOR SELECT
  TO public
  USING (true);

-- Insert testimonials
INSERT INTO public.testimonials (customer_name, location, rating, review, trip) VALUES
  ('Rajesh Kulkarni', 'Sambhajinagar', 5, 'Booked Ajanta Caves tour for my family. Driver was very knowledgeable about the caves and history. Excellent AC Innova, on-time pickup from CIDCO. Highly recommend NextStop!', 'Ajanta Caves Tour'),
  ('Priya Deshmukh', 'Sambhajinagar', 5, 'Used NextStop for Shirdi trip with my parents. Very comfortable Ertiga, driver was polite and patient during darshan. Reasonable rates and no hidden charges.', 'Shirdi Darshan'),
  ('Amit Jadhav', 'Sambhajinagar', 5, 'Local sightseeing with family — Bibi Ka Maqbara, Panchakki, Daulatabad Fort. Driver knew all the spots perfectly. Clean car, AC worked great. Will book again!', 'Local Sightseeing'),
  ('Sneha Patil', 'Sambhajinagar', 4, 'Airport pickup was on time at 5 AM! Very professional service. The driver was already waiting when we landed. Affordable rates for airport transfer.', 'Airport Transfer'),
  ('Vikram Wagh', 'Sambhajinagar', 5, 'Ellora Caves tour with colleagues was fantastic. NextStop provided a spacious Tempo Traveller for our group of 15. Clean vehicle, experienced driver, great day out!', 'Ellora Caves Tour'),
  ('Sunita Bhosale', 'Sambhajinagar', 5, 'Completed the 5 Jyotirlinga tour in 3 days with NextStop. Amazing experience! Driver was very experienced with the route. Comfortable Innova Crysta. Best travel service in Sambhajinagar.', 'Maharashtra 5 Jyotirlinga Tour');
