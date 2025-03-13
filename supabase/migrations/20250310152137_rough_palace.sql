/*
  # Create products table for shop

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `long_description` (text)
      - `type` (text) - either 'ebook' or 'mini-course'
      - `price` (numeric)
      - `image_url` (text)
      - `pages` (integer) - for ebooks
      - `duration` (text) - for courses
      - `category` (text) - for ebooks
      - `modules` (integer) - for courses
      - `features` (text[]) - array of feature strings
      - `created_at` (timestamptz)
      - `students` (integer) - for courses
      - `readers` (integer) - for ebooks

  2. Security
    - Enable RLS on `products` table
    - Add policies for public read access
    - Add policies for admin write access
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  type text NOT NULL CHECK (type IN ('ebook', 'mini-course')),
  price numeric NOT NULL CHECK (price >= 0),
  image_url text NOT NULL,
  pages integer,
  duration text,
  category text,
  modules integer,
  features text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  students integer DEFAULT 0,
  readers integer DEFAULT 0
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Products are viewable by everyone" 
  ON products 
  FOR SELECT 
  TO public 
  USING (true);

-- Allow admin write access
CREATE POLICY "Only admins can modify products" 
  ON products 
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');