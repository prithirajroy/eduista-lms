-- Seed data for Eduista application
-- Run this after setting up the main schema

-- Insert sample profiles
INSERT INTO profiles (clerk_id, email, full_name, role, avatar_url, bio, subjects, budget_range, languages, location, experience_years, hourly_rate, rating, total_reviews, is_verified) VALUES
('user_2abc123', 'sarah.johnson@example.com', 'Dr. Sarah Johnson', 'tutor', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', 'PhD in Mathematics with 8+ years of teaching experience. Specializes in calculus, algebra, and statistics. Passionate about making complex concepts simple.', ARRAY['Mathematics', 'Statistics', 'Calculus'], null, ARRAY['English', 'Hindi'], 'Mumbai, Maharashtra', 8, 1500, 4.9, 127, true),
('user_2def456', 'michael.chen@example.com', 'Prof. Michael Chen', 'tutor', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', 'Professor of Physics with extensive research background. Expert in quantum mechanics and thermodynamics. Published researcher with 50+ papers.', ARRAY['Physics', 'Mechanics', 'Quantum Physics'], null, ARRAY['English', 'Tamil'], 'Bangalore, Karnataka', 12, 2000, 4.8, 98, true),
('user_2ghi789', 'emily.davis@example.com', 'Ms. Emily Davis', 'tutor', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', 'MA in English Literature with passion for teaching. Helps students excel in literature and writing. Creative writing specialist.', ARRAY['English', 'Literature', 'Creative Writing'], null, ARRAY['English', 'Hindi'], 'Delhi, NCR', 6, 1200, 4.9, 156, true),
('user_2jkl012', 'rajesh.kumar@example.com', 'Dr. Rajesh Kumar', 'tutor', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', 'PhD in Chemistry with industry experience. Makes complex chemistry concepts easy to understand. Former research scientist.', ARRAY['Chemistry', 'Organic Chemistry', 'Biochemistry'], null, ARRAY['English', 'Tamil', 'Hindi'], 'Chennai, Tamil Nadu', 10, 1800, 4.7, 89, true),
('user_2mno345', 'priya.sharma@example.com', 'Ms. Priya Sharma', 'tutor', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', 'MSc in Biology with teaching certification. Specializes in making biology fun and engaging. Interactive teaching methods.', ARRAY['Biology', 'Botany', 'Zoology'], null, ARRAY['English', 'Marathi', 'Hindi'], 'Pune, Maharashtra', 7, 1400, 4.8, 112, true),
('user_2pqr678', 'amit.singh@example.com', 'Mr. Amit Singh', 'tutor', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', 'Software Engineer turned educator. Expert in programming languages and computer science fundamentals. Industry experience.', ARRAY['Computer Science', 'Programming', 'Data Structures'], null, ARRAY['English', 'Telugu', 'Hindi'], 'Hyderabad, Telangana', 5, 1600, 4.6, 76, false),
('user_2stu901', 'alex.kumar@example.com', 'Alex Kumar', 'student', null, 'Computer Science student passionate about learning. Interested in mathematics and programming.', ARRAY['Mathematics', 'Computer Science'], '₹1000-2000/hour', ARRAY['English', 'Hindi'], 'Mumbai, Maharashtra', null, null, null, null, false),
('user_2vwx234', 'priya.sharma@example.com', 'Priya Sharma', 'student', null, 'High school student preparing for competitive exams. Loves physics and chemistry.', ARRAY['Physics', 'Chemistry'], '₹500-1000/hour', ARRAY['English', 'Hindi'], 'Delhi, NCR', null, null, null, null, false),
('user_2yza567', 'rahul.mehta@example.com', 'Rahul Mehta', 'student', null, 'Engineering student with interest in mathematics and science. Looking for quality tutoring.', ARRAY['Mathematics', 'Physics'], '₹1000-2000/hour', ARRAY['English', 'Gujarati'], 'Ahmedabad, Gujarat', null, null, null, null, false);

-- Insert user coins
INSERT INTO user_coins (user_id, balance) 
SELECT id, 500 FROM profiles WHERE role = 'student';

-- Insert tutor content
INSERT INTO tutor_content (tutor_id, title, description, type, price, file_url, thumbnail_url, duration, subject, tags, is_published, sales_count, rating, total_reviews) VALUES
((SELECT id FROM profiles WHERE clerk_id = 'user_2abc123'), 'Complete Calculus Course', 'Comprehensive calculus course covering limits, derivatives, and integrals with practical examples.', 'video', 500, 'https://example.com/calculus-course.mp4', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop', 120, 'Mathematics', ARRAY['Calculus', 'Mathematics', 'Video Course'], true, 45, 4.8, 23),
((SELECT id FROM profiles WHERE clerk_id = 'user_2abc123'), 'Calculus Practice Problems', 'Collection of 100+ calculus problems with detailed solutions and explanations.', 'pdf', 200, 'https://example.com/calculus-problems.pdf', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop', null, 'Mathematics', ARRAY['Calculus', 'Practice Problems', 'PDF'], true, 67, 4.9, 34),
((SELECT id FROM profiles WHERE clerk_id = 'user_2def456'), 'Quantum Physics Fundamentals', 'Introduction to quantum mechanics with visual explanations and mathematical derivations.', 'video', 800, 'https://example.com/quantum-physics.mp4', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop', 180, 'Physics', ARRAY['Quantum Physics', 'Physics', 'Advanced'], true, 23, 4.7, 12),
((SELECT id FROM profiles WHERE clerk_id = 'user_2def456'), 'Physics Formula Sheet', 'Comprehensive formula sheet covering all major physics concepts with examples.', 'pdf', 150, 'https://example.com/physics-formulas.pdf', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop', null, 'Physics', ARRAY['Physics', 'Formulas', 'Reference'], true, 89, 4.6, 45),
((SELECT id FROM profiles WHERE clerk_id = 'user_2ghi789'), 'Shakespeare Analysis Guide', 'Detailed analysis of major Shakespeare plays with character studies and themes.', 'pdf', 300, 'https://example.com/shakespeare-guide.pdf', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop', null, 'English Literature', ARRAY['Shakespeare', 'Literature', 'Analysis'], true, 34, 4.9, 18),
((SELECT id FROM profiles WHERE clerk_id = 'user_2jkl012'), 'Organic Chemistry Notes', 'Complete organic chemistry notes with reaction mechanisms and synthesis strategies.', 'pdf', 400, 'https://example.com/organic-chemistry.pdf', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop', null, 'Chemistry', ARRAY['Organic Chemistry', 'Chemistry', 'Notes'], true, 56, 4.8, 28),
((SELECT id FROM profiles WHERE clerk_id = 'user_2mno345'), 'Biology Diagrams Collection', 'High-quality biology diagrams with detailed explanations for better understanding.', 'pdf', 250, 'https://example.com/biology-diagrams.pdf', 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop', null, 'Biology', ARRAY['Biology', 'Diagrams', 'Visual Learning'], true, 42, 4.7, 21),
((SELECT id FROM profiles WHERE clerk_id = 'user_2pqr678'), 'Python Programming Basics', 'Complete Python programming course for beginners with hands-on exercises.', 'video', 600, 'https://example.com/python-course.mp4', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop', 240, 'Computer Science', ARRAY['Python', 'Programming', 'Beginner'], true, 78, 4.5, 39);

-- Insert community posts
INSERT INTO community_posts (user_id, type, content, media_urls, tags, likes_count, comments_count, shares_count, is_published) VALUES
((SELECT id FROM profiles WHERE clerk_id = 'user_2stu901'), 'post', 'Just finished an amazing calculus session with Dr. Sarah! Her teaching style is incredible. Highly recommend her for anyone struggling with calculus concepts.', null, ARRAY['Mathematics', 'Calculus', 'Study Tips'], 24, 8, 3, true),
((SELECT id FROM profiles WHERE clerk_id = 'user_2vwx234'), 'reel', 'Quick physics tip: Remember the right-hand rule for magnetic fields! 🧲', ARRAY['https://example.com/physics-tip.mp4'], ARRAY['Physics', 'Study Tips', 'Quick Tips'], 45, 12, 7, true),
((SELECT id FROM profiles WHERE clerk_id = 'user_2abc123'), 'post', 'Excited to announce my new advanced calculus course! We''ll cover multivariable calculus, vector fields, and more. Limited seats available.', null, ARRAY['Mathematics', 'Course Announcement', 'Calculus'], 67, 23, 15, true),
((SELECT id FROM profiles WHERE clerk_id = 'user_2yza567'), 'post', 'Looking for study partners for chemistry. Anyone interested in forming a study group for organic chemistry? We can meet online twice a week.', null, ARRAY['Chemistry', 'Study Group', 'Organic Chemistry'], 18, 15, 4, true),
((SELECT id FROM profiles WHERE clerk_id = 'user_2ghi789'), 'live', 'Live Q&A session on Shakespeare''s Hamlet! Join me for an interactive discussion about the themes and characters.', null, ARRAY['English Literature', 'Shakespeare', 'Live Session'], 89, 34, 22, true),
((SELECT id FROM profiles WHERE clerk_id = 'user_2def456'), 'post', 'Physics can be fun! Here''s a simple experiment you can do at home to understand the concept of momentum. Check out the video in my profile.', ARRAY['https://example.com/momentum-experiment.mp4'], ARRAY['Physics', 'Experiments', 'Fun Learning'], 56, 19, 11, true),
((SELECT id FROM profiles WHERE clerk_id = 'user_2jkl012'), 'post', 'Organic chemistry made easy! Here are the top 5 reaction mechanisms every student should know. Practice these and you''ll ace your exams!', null, ARRAY['Chemistry', 'Organic Chemistry', 'Exam Tips'], 43, 16, 8, true),
((SELECT id FROM profiles WHERE clerk_id = 'user_2mno345'), 'reel', 'Biology fact: Did you know that the human brain contains approximately 86 billion neurons? 🧠', ARRAY['https://example.com/brain-fact.mp4'], ARRAY['Biology', 'Fun Facts', 'Neuroscience'], 72, 25, 13, true);

-- Insert some post likes
INSERT INTO post_likes (post_id, user_id) 
SELECT 
    cp.id,
    p.id
FROM community_posts cp
CROSS JOIN profiles p
WHERE p.role = 'student'
AND cp.id IN (
    SELECT id FROM community_posts ORDER BY RANDOM() LIMIT 3
)
LIMIT 20;

-- Insert some post comments
INSERT INTO post_comments (post_id, user_id, content, likes_count) VALUES
((SELECT id FROM community_posts WHERE content LIKE '%calculus session%'), (SELECT id FROM profiles WHERE clerk_id = 'user_2vwx234'), 'That sounds amazing! I''ve been looking for a good calculus tutor. How can I contact Dr. Sarah?', 5),
((SELECT id FROM community_posts WHERE content LIKE '%physics tip%'), (SELECT id FROM profiles WHERE clerk_id = 'user_2yza567'), 'Great tip! This really helps with understanding magnetic fields. Thanks for sharing!', 3),
((SELECT id FROM community_posts WHERE content LIKE '%study group%'), (SELECT id FROM profiles WHERE clerk_id = 'user_2stu901'), 'I''m interested! I''m also preparing for chemistry exams. When do you plan to start?', 2),
((SELECT id FROM community_posts WHERE content LIKE '%Shakespeare%'), (SELECT id FROM profiles WHERE clerk_id = 'user_2vwx234'), 'Hamlet is one of my favorite plays! I''d love to join the discussion.', 7);

-- Insert some tutor contacts
INSERT INTO tutor_contacts (student_id, tutor_id, status, message) VALUES
((SELECT id FROM profiles WHERE clerk_id = 'user_2stu901'), (SELECT id FROM profiles WHERE clerk_id = 'user_2abc123'), 'accepted', 'Hi Dr. Sarah, I''m interested in your calculus course. Can we schedule a trial session?'),
((SELECT id FROM profiles WHERE clerk_id = 'user_2vwx234'), (SELECT id FROM profiles WHERE clerk_id = 'user_2def456'), 'pending', 'Hello Prof. Chen, I need help with quantum physics. Are you available for tutoring?'),
((SELECT id FROM profiles WHERE clerk_id = 'user_2yza567'), (SELECT id FROM profiles WHERE clerk_id = 'user_2jkl012'), 'accepted', 'Hi Dr. Kumar, I''m struggling with organic chemistry. Can you help me understand the reaction mechanisms?'),
((SELECT id FROM profiles WHERE clerk_id = 'user_2stu901'), (SELECT id FROM profiles WHERE clerk_id = 'user_2pqr678'), 'pending', 'Hello Mr. Singh, I want to learn Python programming. Do you offer beginner courses?');

-- Insert some transactions
INSERT INTO transactions (user_id, type, amount, currency, status, payment_method, description, metadata) VALUES
((SELECT id FROM profiles WHERE clerk_id = 'user_2stu901'), 'coin_purchase', 500, 'INR', 'completed', 'Credit Card', 'Purchased Popular Pack (500 coins)', '{"pack_id": "popular_pack", "coins": 500}'),
((SELECT id FROM profiles WHERE clerk_id = 'user_2stu901'), 'content_purchase', 50, 'coins', 'completed', 'Coins', 'Purchased Calculus Notes by Dr. Sarah', '{"content_id": "calculus_notes", "tutor_id": "user_2abc123"}'),
((SELECT id FROM profiles WHERE clerk_id = 'user_2vwx234'), 'subscription', 999, 'INR', 'completed', 'UPI', 'Premium Subscription - Monthly', '{"plan": "premium", "duration": "monthly"}'),
((SELECT id FROM profiles WHERE clerk_id = 'user_2yza567'), 'content_purchase', 25, 'coins', 'completed', 'Coins', 'Purchased Physics Video by Prof. Chen', '{"content_id": "physics_video", "tutor_id": "user_2def456"}'),
((SELECT id FROM profiles WHERE clerk_id = 'user_2stu901'), 'coin_purchase', 1000, 'INR', 'pending', 'Net Banking', 'Purchased Value Pack (1000 coins)', '{"pack_id": "value_pack", "coins": 1000}');

-- Update user coins balance based on transactions
UPDATE user_coins 
SET balance = (
    SELECT COALESCE(SUM(
        CASE 
            WHEN t.type = 'coin_purchase' AND t.status = 'completed' THEN t.amount
            WHEN t.type = 'content_purchase' AND t.currency = 'coins' THEN -t.amount
            ELSE 0
        END
    ), 0)
    FROM transactions t
    WHERE t.user_id = user_coins.user_id
)
WHERE user_id IN (SELECT id FROM profiles WHERE role = 'student');

