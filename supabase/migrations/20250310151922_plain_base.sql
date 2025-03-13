/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `type` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `pages` (integer)
      - `duration` (text)
      - `category` (text)
      - `modules` (integer)
      - `features` (text[])
      - `long_description` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `products` table
    - Add policies for authenticated users to read products
    - Add policies for admin users to manage products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  pages integer,
  duration text,
  category text,
  modules integer,
  features text[] DEFAULT '{}',
  long_description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read products
CREATE POLICY "Anyone can read products"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Only authenticated users with admin role can manage products
CREATE POLICY "Admins can manage products"
  ON products
  USING (auth.jwt() ->> 'role' = 'admin');