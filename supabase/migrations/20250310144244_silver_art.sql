/*
  # Create funding partners table

  1. New Tables
    - `funding_partners`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `description` (text)
      - `logo_url` (text)
      - `min_loan` (numeric)
      - `max_loan` (numeric)
      - `interest_rate_min` (numeric)
      - `interest_rate_max` (numeric)
      - `loan_terms` (text)
      - `phone` (text)
      - `email` (text)
      - `website` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `funding_partners` table
    - Add policies for authenticated users to read data
    - Add policies for admin users to manage data
*/

-- Create the funding_partners table
CREATE TABLE IF NOT EXISTS funding_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  logo_url text,
  min_loan numeric NOT NULL DEFAULT 0,
  max_loan numeric NOT NULL DEFAULT 0,
  interest_rate_min numeric NOT NULL DEFAULT 0,
  interest_rate_max numeric NOT NULL DEFAULT 0,
  loan_terms text,
  phone text,
  email text,
  website text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE funding_partners ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow public read access"
  ON funding_partners
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin full access"
  ON funding_partners
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ))
  WITH CHECK (auth.uid() IN (
    SELECT auth.uid() FROM auth.users 
    WHERE auth.email() IN ('admin@example.com')
  ));

-- Insert sample data
INSERT INTO funding_partners (
  name,
  type,
  description,
  min_loan,
  max_loan,
  interest_rate_min,
  interest_rate_max,
  phone,
  email,
  website
) VALUES 
(
  'Capital Prime Lending',
  'Private Lender',
  'Specializing in quick-close loans for real estate investors with flexible terms and competitive rates.',
  50000,
  2000000,
  8.5,
  12.5,
  '(555) 123-4567',
  'info@capitalprime.com',
  'https://capitalprime.com'
),
(
  'RealFi Solutions',
  'Hard Money',
  'Fast funding for fix-and-flip projects with loan decisions in 24 hours or less.',
  100000,
  1500000,
  10.0,
  14.0,
  '(555) 234-5678',
  'loans@realfi.com',
  'https://realfi.com'
),
(
  'Bridge Capital Group',
  'Bridge Loan',
  'Bridge financing solutions for commercial and residential real estate investors.',
  250000,
  5000000,
  7.5,
  11.0,
  '(555) 345-6789',
  'contact@bridgecapital.com',
  'https://bridgecapital.com'
),
(
  'Heritage Bank & Trust',
  'Traditional Bank',
  'Full-service banking with competitive rates for real estate investors and developers.',
  100000,
  10000000,
  5.5,
  8.5,
  '(555) 456-7890',
  'lending@heritagebank.com',
  'https://heritagebank.com'
),
(
  'Quick Fund Capital',
  'Hard Money',
  'Specializing in renovation and construction loans with flexible underwriting.',
  75000,
  1000000,
  11.0,
  15.0,
  '(555) 567-8901',
  'info@quickfund.com',
  'https://quickfund.com'
);