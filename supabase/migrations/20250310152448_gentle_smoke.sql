/*
  # Create products table for store

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `type` (text)
      - `price` (numeric)
      - `image_url` (text)
      - `pages` (integer, optional)
      - `duration` (text, optional)
      - `category` (text, optional)
      - `modules` (integer, optional)
      - `features` (text array)
      - `long_description` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policies for public read access
    - Add policies for authenticated admin users to manage products
*/

-- Create products table
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
  features text[] NOT NULL DEFAULT '{}',
  long_description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
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
  USING (true)
  WITH CHECK (true);

-- Insert dummy data
INSERT INTO products (title, description, type, price, image_url, pages, category, features, long_description)
VALUES
  (
    'Section 8 Success Blueprint',
    'Complete guide to building a profitable Section 8 rental portfolio',
    'ebook',
    47,
    'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=800',
    185,
    'Real Estate Investment',
    ARRAY[
      'Step-by-step guide to Section 8 property investment',
      'HUD compliance checklist and documentation templates',
      'Tenant screening process and best practices',
      'Property management strategies',
      'Risk mitigation techniques',
      'Financial analysis tools and spreadsheets'
    ],
    'The Section 8 Success Blueprint is your comprehensive guide to building a successful Section 8 rental property portfolio. This detailed guide covers everything from understanding the Section 8 program to finding properties, screening tenants, and managing your investments effectively.

Learn how to work with housing authorities, ensure compliance with HUD regulations, and maximize your rental income while providing quality housing to Section 8 tenants. Includes real-world case studies and practical examples.'
  ),
  (
    'Wholesale Deal Finding Mastery',
    'Expert strategies for finding and closing wholesale real estate deals',
    'ebook',
    37,
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    142,
    'Wholesaling',
    ARRAY[
      'Deal finding strategies and techniques',
      'Marketing templates and scripts',
      'Negotiation frameworks',
      'Deal analysis tools',
      'Contract templates and legal guidelines',
      'Buyer list building strategies'
    ],
    'Master the art of finding and closing profitable wholesale real estate deals with this comprehensive guide. Learn proven strategies for identifying motivated sellers, analyzing deals quickly, and building a reliable buyer network.

This guide includes real-world examples, templates, and step-by-step instructions for successfully wholesaling properties in any market condition.'
  );

INSERT INTO products (title, description, type, price, image_url, duration, modules, features, long_description)
VALUES
  (
    'Section 8 Property Setup',
    'Quick guide to preparing your property for Section 8 tenants',
    'mini-course',
    97,
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    '2.5 hours',
    5,
    ARRAY[
      'Property preparation checklist',
      'HUD inspection requirements',
      'Documentation and paperwork guide',
      'Tenant placement strategies',
      'Property management best practices',
      'Maintenance planning and budgeting'
    ],
    'This comprehensive mini-course walks you through the entire process of preparing your property for Section 8 tenants. Learn exactly what improvements and modifications are needed to pass HUD inspections and attract quality tenants.

Each module includes practical demonstrations, checklists, and actionable steps to ensure your property meets all requirements and maximizes your rental income.'
  ),
  (
    'Rapid Deal Analysis',
    'Learn to analyze wholesale deals in under 10 minutes',
    'mini-course',
    77,
    'https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?auto=format&fit=crop&q=80&w=800',
    '1.5 hours',
    4,
    ARRAY[
      'Quick property evaluation techniques',
      'ARV calculation methods',
      'Repair cost estimation',
      'Deal analysis spreadsheet',
      'Negotiation strategies',
      'Risk assessment framework'
    ],
    'Master the art of analyzing wholesale deals quickly and accurately. This course teaches you a systematic approach to evaluating properties, calculating repair costs, and determining maximum allowable offers.

Includes practical exercises, real-world case studies, and downloadable analysis tools to help you make confident investment decisions in minutes.'
  );