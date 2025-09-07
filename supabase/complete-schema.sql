-- Complete Eduista Database Schema
-- This file contains all the necessary tables for the Eduista application

-- Create profiles table (for user profiles)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'parent', 'tutor')),
  avatar_url TEXT,
  bio TEXT,
  subjects TEXT[] DEFAULT '{}',
  budget_range VARCHAR(50),
  languages TEXT[] DEFAULT '{}',
  location VARCHAR(255),
  experience_years INTEGER DEFAULT 0,
  hourly_rate INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

-- Create tutor_content table
CREATE TABLE IF NOT EXISTS tutor_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tutor_id UUID NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('notes', 'pdf', 'video', 'live_class')),
  price INTEGER NOT NULL DEFAULT 0,
  file_url TEXT,
  thumbnail_url TEXT,
  duration INTEGER, -- in minutes
  subject VARCHAR(100) NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT FALSE,
  sales_count INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL, -- clerk user id
  type VARCHAR(20) NOT NULL CHECK (type IN ('coin_purchase', 'subscription', 'content_purchase', 'commission')),
  amount INTEGER NOT NULL, -- in paise/cents
  currency VARCHAR(3) DEFAULT 'INR',
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method VARCHAR(50),
  payment_id VARCHAR(255),
  description TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_coins table
CREATE TABLE IF NOT EXISTS user_coins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id VARCHAR(255) UNIQUE NOT NULL, -- clerk user id
  balance INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community_posts table
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL, -- clerk user id
  type VARCHAR(10) NOT NULL CHECK (type IN ('post', 'reel', 'live')),
  content TEXT NOT NULL,
  media_urls TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL, -- clerk user id
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Create post_comments table
CREATE TABLE IF NOT EXISTS post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id VARCHAR(255) NOT NULL, -- clerk user id
  content TEXT NOT NULL,
  parent_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
  likes_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutor_contacts table
CREATE TABLE IF NOT EXISTS tutor_contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id VARCHAR(255) NOT NULL, -- clerk user id
  tutor_id UUID NOT NULL REFERENCES tutors(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, tutor_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_clerk_id ON profiles(clerk_id);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

CREATE INDEX IF NOT EXISTS idx_tutors_email ON tutors(email);
CREATE INDEX IF NOT EXISTS idx_tutors_subject ON tutors(subject);
CREATE INDEX IF NOT EXISTS idx_tutors_location ON tutors(location);
CREATE INDEX IF NOT EXISTS idx_tutors_is_active ON tutors(is_active);
CREATE INDEX IF NOT EXISTS idx_tutors_is_approved ON tutors(is_approved);
CREATE INDEX IF NOT EXISTS idx_tutors_is_verified ON tutors(is_verified);

CREATE INDEX IF NOT EXISTS idx_tutor_content_tutor_id ON tutor_content(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_content_type ON tutor_content(type);
CREATE INDEX IF NOT EXISTS idx_tutor_content_subject ON tutor_content(subject);
CREATE INDEX IF NOT EXISTS idx_tutor_content_is_published ON tutor_content(is_published);

CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);

CREATE INDEX IF NOT EXISTS idx_user_coins_user_id ON user_coins(user_id);

CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_type ON community_posts(type);
CREATE INDEX IF NOT EXISTS idx_community_posts_is_published ON community_posts(is_published);

CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);

CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_user_id ON post_comments(user_id);

CREATE INDEX IF NOT EXISTS idx_tutor_contacts_student_id ON tutor_contacts(student_id);
CREATE INDEX IF NOT EXISTS idx_tutor_contacts_tutor_id ON tutor_contacts(tutor_id);
CREATE INDEX IF NOT EXISTS idx_tutor_contacts_status ON tutor_contacts(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutors_updated_at 
    BEFORE UPDATE ON tutors 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutor_content_updated_at 
    BEFORE UPDATE ON tutor_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_coins_updated_at 
    BEFORE UPDATE ON user_coins 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at 
    BEFORE UPDATE ON community_posts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_post_comments_updated_at 
    BEFORE UPDATE ON post_comments 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tutor_contacts_updated_at 
    BEFORE UPDATE ON tutor_contacts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample tutors data
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
)
ON CONFLICT (email) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_coins ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid()::text = clerk_id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid()::text = clerk_id);

-- Create RLS policies for tutors
CREATE POLICY "Allow all operations for authenticated users" ON tutors
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow public read access for approved tutors" ON tutors
  FOR SELECT USING (is_approved = true AND is_active = true);

-- Create RLS policies for tutor_content
CREATE POLICY "Allow tutors to manage their content" ON tutor_content
  FOR ALL USING (auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = tutor_id));

CREATE POLICY "Allow public read access for published content" ON tutor_content
  FOR SELECT USING (is_published = true);

-- Create RLS policies for transactions
CREATE POLICY "Users can view their own transactions" ON transactions
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own transactions" ON transactions
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create RLS policies for user_coins
CREATE POLICY "Users can view their own coins" ON user_coins
  FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own coins" ON user_coins
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own coins" ON user_coins
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create RLS policies for community_posts
CREATE POLICY "Users can view published posts" ON community_posts
  FOR SELECT USING (is_published = true);

CREATE POLICY "Users can create their own posts" ON community_posts
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own posts" ON community_posts
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own posts" ON community_posts
  FOR DELETE USING (auth.uid()::text = user_id);

-- Create RLS policies for post_likes
CREATE POLICY "Users can view all likes" ON post_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own likes" ON post_likes
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own likes" ON post_likes
  FOR DELETE USING (auth.uid()::text = user_id);

-- Create RLS policies for post_comments
CREATE POLICY "Users can view all comments" ON post_comments
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own comments" ON post_comments
  FOR INSERT WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own comments" ON post_comments
  FOR UPDATE USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own comments" ON post_comments
  FOR DELETE USING (auth.uid()::text = user_id);

-- Create RLS policies for tutor_contacts
CREATE POLICY "Users can view their own contacts" ON tutor_contacts
  FOR SELECT USING (auth.uid()::text = student_id OR auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = tutor_id));

CREATE POLICY "Users can create their own contacts" ON tutor_contacts
  FOR INSERT WITH CHECK (auth.uid()::text = student_id);

CREATE POLICY "Tutors can update contacts to them" ON tutor_contacts
  FOR UPDATE USING (auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = tutor_id));
