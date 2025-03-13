/*
  # Create funding partners table

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
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `funding_partners` table
    - Add policies for authenticated users to read data
    - Add policies for admin users to manage data
*/

CREATE TABLE funding_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  description text,
  logo_url text,
  min_loan integer,
  max_loan integer,
  interest_rate_min numeric(4,2),
  interest_rate_max numeric(4,2),
  loan_terms text,
  phone text,
  email text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE funding_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view funding partners"
  ON funding_partners
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage funding partners"
  ON funding_partners
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM users WHERE role = 'admin'));