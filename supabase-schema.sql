-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table
CREATE TABLE profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('student', 'parent', 'tutor')) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    subjects TEXT[],
    budget_range TEXT,
    languages TEXT[],
    location TEXT,
    experience_years INTEGER,
    hourly_rate DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutor_content table
CREATE TABLE tutor_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT CHECK (type IN ('notes', 'pdf', 'video', 'live_class')) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    file_url TEXT,
    thumbnail_url TEXT,
    duration INTEGER, -- in minutes
    subject TEXT NOT NULL,
    tags TEXT[],
    is_published BOOLEAN DEFAULT FALSE,
    sales_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    total_reviews INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE transactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('coin_purchase', 'subscription', 'content_purchase', 'commission')) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    status TEXT CHECK (status IN ('pending', 'completed', 'failed', 'refunded')) DEFAULT 'pending',
    payment_method TEXT,
    payment_id TEXT,
    description TEXT NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_coins table
CREATE TABLE user_coins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    balance INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create community_posts table
CREATE TABLE community_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('post', 'reel', 'live')) NOT NULL,
    content TEXT NOT NULL,
    media_urls TEXT[],
    tags TEXT[],
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create post_likes table
CREATE TABLE post_likes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

-- Create post_comments table
CREATE TABLE post_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tutor_contacts table
CREATE TABLE tutor_contacts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    tutor_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('pending', 'accepted', 'declined')) DEFAULT 'pending',
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(student_id, tutor_id)
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_subjects ON profiles USING GIN(subjects);
CREATE INDEX idx_tutor_content_tutor_id ON tutor_content(tutor_id);
CREATE INDEX idx_tutor_content_subject ON tutor_content(subject);
CREATE INDEX idx_tutor_content_type ON tutor_content(type);
CREATE INDEX idx_tutor_content_is_published ON tutor_content(is_published);
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX idx_community_posts_type ON community_posts(type);
CREATE INDEX idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX idx_tutor_contacts_student_id ON tutor_contacts(student_id);
CREATE INDEX idx_tutor_contacts_tutor_id ON tutor_contacts(tutor_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutor_content_updated_at BEFORE UPDATE ON tutor_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_coins_updated_at BEFORE UPDATE ON user_coins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON post_comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tutor_contacts_updated_at BEFORE UPDATE ON tutor_contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_coins ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutor_contacts ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid()::text = clerk_id);

-- Tutor content: Public read, tutors can manage their own content
CREATE POLICY "Tutor content is viewable by everyone" ON tutor_content FOR SELECT USING (is_published = true);
CREATE POLICY "Tutors can manage their own content" ON tutor_content FOR ALL USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = tutor_id)
);

-- Transactions: Users can only see their own transactions
CREATE POLICY "Users can view their own transactions" ON transactions FOR SELECT USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = user_id)
);

-- User coins: Users can only see their own coin balance
CREATE POLICY "Users can view their own coins" ON user_coins FOR SELECT USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = user_id)
);

-- Community posts: Public read, users can manage their own posts
CREATE POLICY "Community posts are viewable by everyone" ON community_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Users can manage their own posts" ON community_posts FOR ALL USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = user_id)
);

-- Post likes: Users can manage their own likes
CREATE POLICY "Users can manage their own likes" ON post_likes FOR ALL USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = user_id)
);

-- Post comments: Public read, users can manage their own comments
CREATE POLICY "Post comments are viewable by everyone" ON post_comments FOR SELECT USING (true);
CREATE POLICY "Users can manage their own comments" ON post_comments FOR ALL USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = user_id)
);

-- Tutor contacts: Users can see contacts involving them
CREATE POLICY "Users can view their own contacts" ON tutor_contacts FOR SELECT USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = student_id) OR
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = tutor_id)
);
CREATE POLICY "Students can create contacts" ON tutor_contacts FOR INSERT WITH CHECK (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = student_id)
);
CREATE POLICY "Tutors can update contact status" ON tutor_contacts FOR UPDATE USING (
    auth.uid()::text = (SELECT clerk_id FROM profiles WHERE id = tutor_id)
);

