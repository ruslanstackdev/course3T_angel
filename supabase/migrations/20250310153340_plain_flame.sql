/*
  # Create products table for e-commerce

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
    - Add policies for:
      - Public read access
      - Authenticated admin users can create/update/delete
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('ebook', 'mini-course')),
  price numeric NOT NULL,
  image_url text NOT NULL,
  pages integer,
  duration text,
  category text,
  modules integer,
  features text[] DEFAULT '{}',
  long_description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow admin users to manage products
CREATE POLICY "Admin users can manage products"
  ON products
  FOR ALL
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ))
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));