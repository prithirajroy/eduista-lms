-- Create tutors table
CREATE TABLE IF NOT EXISTS tutors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  subject VARCHAR(100) NOT NULL,
  subjects TEXT[] NOT NULL DEFAULT '{}',
  hourly_rate INTEGER NOT NULL DEFAULT 0,
  experience INTEGER NOT NULL DEFAULT 0,
  location VARCHAR(255) NOT NULL,
  languages TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT NOT NULL,
  avatar TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  is_approved BOOLEAN DEFAULT FALSE,
  total_students INTEGER DEFAULT 0,
  total_lessons INTEGER DEFAULT 0,
  total_earnings INTEGER DEFAULT 0,
  response_time VARCHAR(50) DEFAULT '2 hours',
  join_date DATE DEFAULT CURRENT_DATE,
  last_active DATE DEFAULT CURRENT_DATE,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tutors_email ON tutors(email);
CREATE INDEX IF NOT EXISTS idx_tutors_subject ON tutors(subject);
CREATE INDEX IF NOT EXISTS idx_tutors_location ON tutors(location);
CREATE INDEX IF NOT EXISTS idx_tutors_is_active ON tutors(is_active);
CREATE INDEX IF NOT EXISTS idx_tutors_is_approved ON tutors(is_approved);
CREATE INDEX IF NOT EXISTS idx_tutors_is_verified ON tutors(is_verified);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_tutors_updated_at 
    BEFORE UPDATE ON tutors 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO tutors (
  name, email, subject, subjects, hourly_rate, experience, location, languages, bio, 
  is_verified, is_active, is_approved, total_students, total_lessons, total_earnings, 
  response_time, join_date, last_active, rating, total_reviews
) VALUES 
(
  'Dr. Sarah Johnson',
  'sarah.johnson@example.com',
  'Mathematics',
  ARRAY['Mathematics', 'Statistics', 'Calculus'],
  1500,
  8,
  'Mumbai, Maharashtra',
  ARRAY['English', 'Hindi'],
  'PhD in Mathematics with 8+ years of teaching experience. Specializes in calculus, algebra, and statistics.',
  true,
  true,
  true,
  450,
  340,
  125000,
  '2 hours',
  '2023-01-15',
  '2024-01-20',
  4.9,
  127
),
(
  'Prof. Michael Chen',
  'michael.chen@example.com',
  'Physics',
  ARRAY['Physics', 'Mechanics', 'Quantum Physics'],
  2000,
  12,
  'Bangalore, Karnataka',
  ARRAY['English', 'Tamil'],
  'Professor of Physics with extensive research background. Expert in quantum mechanics and thermodynamics.',
  true,
  true,
  true,
  320,
  280,
  98000,
  '1 hour',
  '2023-02-10',
  '2024-01-19',
  4.8,
  98
),
(
  'Ms. Emily Davis',
  'emily.davis@example.com',
  'English Literature',
  ARRAY['English', 'Literature', 'Creative Writing'],
  1200,
  6,
  'Delhi, NCR',
  ARRAY['English', 'Hindi'],
  'MA in English Literature with passion for teaching. Helps students excel in literature and writing.',
  true,
  true,
  true,
  280,
  220,
  75000,
  '3 hours',
  '2023-03-05',
  '2024-01-18',
  4.9,
  156
),
(
  'Dr. Rajesh Kumar',
  'rajesh.kumar@example.com',
  'Chemistry',
  ARRAY['Chemistry', 'Organic Chemistry', 'Biochemistry'],
  1800,
  10,
  'Chennai, Tamil Nadu',
  ARRAY['English', 'Tamil', 'Hindi'],
  'PhD in Chemistry with industry experience. Makes complex chemistry concepts easy to understand.',
  true,
  false,
  true,
  200,
  180,
  65000,
  '4 hours',
  '2023-01-20',
  '2024-01-10',
  4.7,
  89
),
(
  'Ms. Priya Sharma',
  'priya.sharma@example.com',
  'Biology',
  ARRAY['Biology', 'Botany', 'Zoology'],
  1400,
  7,
  'Pune, Maharashtra',
  ARRAY['English', 'Marathi', 'Hindi'],
  'MSc in Biology with teaching certification. Specializes in making biology fun and engaging.',
  true,
  true,
  true,
  180,
  150,
  55000,
  '2 hours',
  '2023-04-12',
  '2024-01-21',
  4.8,
  112
),
(
  'Mr. Amit Singh',
  'amit.singh@example.com',
  'Computer Science',
  ARRAY['Computer Science', 'Programming', 'Data Structures'],
  1600,
  5,
  'Hyderabad, Telangana',
  ARRAY['English', 'Telugu', 'Hindi'],
  'Software Engineer turned educator. Expert in programming languages and computer science fundamentals.',
  false,
  true,
  false,
  120,
  45,
  12000,
  '1 hour',
  '2024-01-05',
  '2024-01-21',
  4.6,
  76
);

-- Enable Row Level Security
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY "Allow all operations for authenticated users" ON tutors
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow public read access for approved and active tutors
CREATE POLICY "Allow public read access for approved tutors" ON tutors
  FOR SELECT USING (is_approved = true AND is_active = true);
