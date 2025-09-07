# Eduista Setup Guide

## 1. Environment Variables Setup

1. Copy the environment template:
   ```bash
   cp env.example .env.local
   ```

2. Edit `.env.local` and add your credentials:

### Clerk Authentication
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
```

### Supabase Database
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

## 2. Database Setup

### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Get your project URL and API keys from Settings > API

### Create Database Tables
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/tutors.sql`
4. Execute the SQL to create the tutors table and sample data

### Alternative: Use Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase in your project
supabase init

# Link to your project
supabase link --project-ref your-project-id

# Run migrations
supabase db push
```

## 3. Clerk Setup

1. Go to [clerk.com](https://clerk.com)
2. Create a new application
3. Get your publishable key and secret key
4. Add them to your `.env.local` file

## 4. Run the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 5. Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. Sign up for a new account
3. Go to Dashboard > Tutors
4. Try adding a new tutor

## Troubleshooting

### Database Connection Issues
- Verify your Supabase URL and API keys are correct
- Make sure the tutors table exists in your database
- Check the Supabase dashboard for any error logs

### Authentication Issues
- Verify your Clerk keys are correct
- Make sure the redirect URLs are set up properly in Clerk dashboard

### API Errors
- Check the browser console for detailed error messages
- Verify all environment variables are set correctly
- Make sure the database table exists and has the correct schema

## Database Schema

The tutors table includes the following fields:
- `id` (UUID, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR, Unique)
- `subject` (VARCHAR)
- `subjects` (TEXT[])
- `hourly_rate` (INTEGER)
- `experience` (INTEGER)
- `location` (VARCHAR)
- `languages` (TEXT[])
- `bio` (TEXT)
- `avatar` (TEXT)
- `is_verified` (BOOLEAN)
- `is_active` (BOOLEAN)
- `is_approved` (BOOLEAN)
- `total_students` (INTEGER)
- `total_lessons` (INTEGER)
- `total_earnings` (INTEGER)
- `response_time` (VARCHAR)
- `join_date` (DATE)
- `last_active` (DATE)
- `rating` (DECIMAL)
- `total_reviews` (INTEGER)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
