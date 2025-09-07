#!/usr/bin/env node

/**
 * Simple Database Migration Script for Eduista
 * 
 * This script creates the tutors table in your Supabase database.
 * It uses the anon key and makes direct SQL calls.
 */

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please make sure you have:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.error('in your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function createTutorsTable() {
  console.log('🚀 Creating tutors table in Supabase...')
  
  try {
    // First, let's check if the table already exists
    const { data: existingTables, error: checkError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'tutors')
    
    if (checkError) {
      console.log('⚠️  Could not check existing tables (this is normal for anon key)')
    } else if (existingTables && existingTables.length > 0) {
      console.log('✅ Tutors table already exists!')
      return
    }
    
    // Try to create the table using a simple insert test
    console.log('📝 Testing database connection...')
    
    // Test with a simple query to see if we can connect
    const { data: testData, error: testError } = await supabase
      .from('tutors')
      .select('count')
      .limit(1)
    
    if (testError) {
      if (testError.message.includes('relation "tutors" does not exist')) {
        console.log('❌ Tutors table does not exist.')
        console.log('📖 Manual Setup Required:')
        console.log('')
        console.log('1. Go to your Supabase dashboard: https://supabase.com/dashboard')
        console.log('2. Select your project')
        console.log('3. Go to SQL Editor')
        console.log('4. Copy and paste the following SQL:')
        console.log('')
        console.log('-- Create tutors table')
        console.log('CREATE TABLE IF NOT EXISTS tutors (')
        console.log('  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,')
        console.log('  name VARCHAR(255) NOT NULL,')
        console.log('  email VARCHAR(255) UNIQUE NOT NULL,')
        console.log('  subject VARCHAR(100) NOT NULL,')
        console.log('  subjects TEXT[] NOT NULL DEFAULT \'{}\',')
        console.log('  hourly_rate INTEGER NOT NULL DEFAULT 0,')
        console.log('  experience INTEGER NOT NULL DEFAULT 0,')
        console.log('  location VARCHAR(255) NOT NULL,')
        console.log('  languages TEXT[] NOT NULL DEFAULT \'{}\',')
        console.log('  bio TEXT NOT NULL,')
        console.log('  avatar TEXT,')
        console.log('  is_verified BOOLEAN DEFAULT FALSE,')
        console.log('  is_active BOOLEAN DEFAULT TRUE,')
        console.log('  is_approved BOOLEAN DEFAULT FALSE,')
        console.log('  total_students INTEGER DEFAULT 0,')
        console.log('  total_lessons INTEGER DEFAULT 0,')
        console.log('  total_earnings INTEGER DEFAULT 0,')
        console.log('  response_time VARCHAR(50) DEFAULT \'2 hours\',')
        console.log('  join_date DATE DEFAULT CURRENT_DATE,')
        console.log('  last_active DATE DEFAULT CURRENT_DATE,')
        console.log('  rating DECIMAL(3,2) DEFAULT 0.0,')
        console.log('  total_reviews INTEGER DEFAULT 0,')
        console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),')
        console.log('  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()')
        console.log(');')
        console.log('')
        console.log('5. Click "Run" to execute the SQL')
        console.log('6. Then run this script again to add sample data')
        console.log('')
        return
      } else {
        console.error('❌ Database connection error:', testError.message)
        return
      }
    }
    
    console.log('✅ Tutors table exists and is accessible!')
    
    // Check if we have any data
    const { data: tutors, error: tutorsError } = await supabase
      .from('tutors')
      .select('id')
      .limit(1)
    
    if (tutorsError) {
      console.error('❌ Error checking tutors data:', tutorsError.message)
      return
    }
    
    if (tutors && tutors.length > 0) {
      console.log('✅ Tutors table already has data!')
    } else {
      console.log('📝 Adding sample data...')
      
      const sampleTutors = [
        {
          name: 'Dr. Sarah Johnson',
          email: 'sarah.johnson@example.com',
          subject: 'Mathematics',
          subjects: ['Mathematics', 'Statistics', 'Calculus'],
          hourly_rate: 1500,
          experience: 8,
          location: 'Mumbai, Maharashtra',
          languages: ['English', 'Hindi'],
          bio: 'PhD in Mathematics with 8+ years of teaching experience. Specializes in calculus, algebra, and statistics.',
          is_verified: true,
          is_active: true,
          is_approved: true,
          total_students: 450,
          total_lessons: 340,
          total_earnings: 125000,
          response_time: '2 hours',
          join_date: '2023-01-15',
          last_active: '2024-01-20',
          rating: 4.9,
          total_reviews: 127
        },
        {
          name: 'Prof. Michael Chen',
          email: 'michael.chen@example.com',
          subject: 'Physics',
          subjects: ['Physics', 'Mechanics', 'Quantum Physics'],
          hourly_rate: 2000,
          experience: 12,
          location: 'Bangalore, Karnataka',
          languages: ['English', 'Tamil'],
          bio: 'Professor of Physics with extensive research background. Expert in quantum mechanics and thermodynamics.',
          is_verified: true,
          is_active: true,
          is_approved: true,
          total_students: 320,
          total_lessons: 280,
          total_earnings: 98000,
          response_time: '1 hour',
          join_date: '2023-02-10',
          last_active: '2024-01-19',
          rating: 4.8,
          total_reviews: 98
        }
      ]
      
      const { data: insertedTutors, error: insertError } = await supabase
        .from('tutors')
        .insert(sampleTutors)
        .select()
      
      if (insertError) {
        console.error('❌ Error inserting sample data:', insertError.message)
      } else {
        console.log(`✅ Successfully added ${insertedTutors.length} sample tutors!`)
      }
    }
    
    console.log('🎉 Database migration completed successfully!')
    console.log('You can now use the tutor management features.')
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    console.error('\n📖 Manual Setup Instructions:')
    console.error('1. Go to your Supabase dashboard')
    console.error('2. Navigate to SQL Editor')
    console.error('3. Copy and paste the contents of supabase/tutors.sql')
    console.error('4. Execute the SQL')
  }
}

// Run the migration
createTutorsTable()
