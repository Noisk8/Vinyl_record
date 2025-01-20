/*
  # Vinyl Records Collection Schema

  1. New Tables
    - `vinyl_records`
      - `id` (uuid, primary key)
      - `artist` (text, required)
      - `album` (text, required)
      - `label` (text, required)
      - `year` (integer, required)
      - `user_id` (uuid, foreign key to auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `vinyl_records` table
    - Add policies for:
      - Users can read their own records
      - Users can insert their own records
      - Users can update their own records
      - Users can delete their own records
*/

-- Create the vinyl_records table
CREATE TABLE vinyl_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artist text NOT NULL,
  album text NOT NULL,
  label text NOT NULL,
  year integer NOT NULL,
  image_url text NOT NULL,
  user_id uuid REFERENCES auth.users(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Add constraints
  CONSTRAINT year_check CHECK (year >= 1900 AND year <= date_part('year', CURRENT_DATE)::integer)
);

-- Enable Row Level Security
ALTER TABLE vinyl_records ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own records"
  ON vinyl_records
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own records"
  ON vinyl_records
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own records"
  ON vinyl_records
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own records"
  ON vinyl_records
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_vinyl_records_updated_at
  BEFORE UPDATE ON vinyl_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();