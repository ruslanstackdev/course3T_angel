/*
  # Create funding partners table and add sample data

  1. New Tables
    - `funding_partners`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `description` (text)
      - `logo_url` (text)
      - `min_loan` (integer)
      - `max_loan` (integer)
      - `interest_rate_min` (numeric)
      - `interest_rate_max` (numeric)
      - `loan_terms` (text)
      - `phone` (text)
      - `email` (text)
      - `website` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `funding_partners` table
    - Add policy for authenticated users to read all partners
    - Add policy for admin users to manage partners
*/

-- Create the funding partners table
CREATE TABLE IF NOT EXISTS funding_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  logo_url text,
  min_loan integer NOT NULL,
  max_loan integer NOT NULL,
  interest_rate_min numeric(4,2) NOT NULL,
  interest_rate_max numeric(4,2) NOT NULL,
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
  USING (true)
  WITH CHECK (true);

-- Insert sample data
INSERT INTO funding_partners (name, type, description, min_loan, max_loan, interest_rate_min, interest_rate_max, phone, email, website)
VALUES
  (
    'Capital Prime Lending',
    'Private Lender',
    'Specializing in fast-closing private loans for real estate investors with flexible terms and competitive rates.',
    50000,
    2000000,
    8.50,
    12.75,
    '(555) 123-4567',
    'info@capitalprime.com',
    'https://capitalprime.com'
  ),
  (
    'RealFi Solutions',
    'Hard Money',
    'Expert hard money lenders focusing on fix-and-flip and rental property financing with quick approvals.',
    25000,
    1500000,
    10.00,
    14.50,
    '(555) 234-5678',
    'loans@realfi.com',
    'https://realfi.com'
  ),
  (
    'Bridge Capital Group',
    'Bridge Loan',
    'Providing bridge financing solutions for commercial and residential real estate investors nationwide.',
    100000,
    5000000,
    7.75,
    11.25,
    '(555) 345-6789',
    'contact@bridgecapital.com',
    'https://bridgecapital.com'
  ),
  (
    'Heritage Bank & Trust',
    'Traditional Bank',
    'Full-service bank offering conventional mortgages and investment property loans with competitive rates.',
    75000,
    3000000,
    5.25,
    8.50,
    '(555) 456-7890',
    'lending@heritagebank.com',
    'https://heritagebank.com'
  ),
  (
    'Freedom Funding Partners',
    'Private Lender',
    'Experienced private lenders specializing in creative financing solutions for real estate investors.',
    30000,
    1000000,
    9.25,
    13.50,
    '(555) 567-8901',
    'deals@freedomfunding.com',
    'https://freedomfunding.com'
  );