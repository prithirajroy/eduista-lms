#!/usr/bin/env node

/**
 * Database Setup Script for Eduista
 * 
 * This script helps you set up the Supabase database for the Eduista application.
 * Run this script after setting up your Supabase project and environment variables.
 */

const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please make sure you have:')
  console.error('- NEXT_PUBLIC_SUPABASE_URL')
  console.error('- SUPABASE_SERVICE_ROLE_KEY')
  console.error('in your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('🚀 Setting up Eduista database...')
  
  try {
    // Read the SQL schema file
    const sqlPath = path.join(__dirname, '..', 'supabase', 'tutors.sql')
    const sqlContent = fs.readFileSync(sqlPath, 'utf8')
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`)
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement })
        
        if (error) {
          // Some errors are expected (like table already exists)
          if (error.message.includes('already exists') || 
              error.message.includes('relation') && error.message.includes('already exists')) {
            console.log(`⚠️  Statement ${i + 1}: ${error.message}`)
          } else {
            console.error(`❌ Statement ${i + 1} failed:`, error.message)
          }
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`)
        }
      }
    }
    
    // Verify the table was created
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .eq('table_name', 'tutors')
    
    if (tableError) {
      console.error('❌ Error checking table creation:', tableError.message)
    } else if (tables && tables.length > 0) {
      console.log('✅ Tutors table created successfully!')
      
      // Check if sample data was inserted
      const { data: tutors, error: tutorsError } = await supabase
        .from('tutors')
        .select('count')
        .limit(1)
      
      if (tutorsError) {
        console.error('❌ Error checking sample data:', tutorsError.message)
      } else {
        console.log('✅ Database setup completed successfully!')
        console.log('🎉 You can now use the tutor management features.')
      }
    } else {
      console.error('❌ Tutors table was not created. Please check the SQL schema.')
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message)
    console.error('\n📖 Manual Setup Instructions:')
    console.error('1. Go to your Supabase dashboard')
    console.error('2. Navigate to SQL Editor')
    console.error('3. Copy and paste the contents of supabase/tutors.sql')
    console.error('4. Execute the SQL')
  }
}

// Run the setup
setupDatabase()
