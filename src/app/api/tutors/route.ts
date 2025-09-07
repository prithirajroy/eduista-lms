import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const tutorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Subject is required'),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  hourlyRate: z.number().min(0, 'Hourly rate must be positive'),
  experience: z.number().min(0, 'Experience must be positive'),
  location: z.string().min(1, 'Location is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatar: z.string().url().optional(),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isApproved: z.boolean().default(false),
  totalStudents: z.number().default(0),
  totalLessons: z.number().default(0),
  totalEarnings: z.number().default(0),
  responseTime: z.string().default('2 hours'),
  joinDate: z.string().default(new Date().toISOString().split('T')[0]),
  lastActive: z.string().default(new Date().toISOString().split('T')[0])
})

export async function GET() {
  try {
    const { data: tutors, error } = await supabase
      .from('tutors')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching tutors:', error)
      
      // Check if it's a table doesn't exist error
      if (error.message?.includes('relation "tutors" does not exist')) {
        return NextResponse.json({ 
          error: 'Database table not found. Please run the SQL schema to create the tutors table.',
          details: 'The tutors table needs to be created in your Supabase database. Please execute the SQL from supabase/tutors.sql in your Supabase dashboard.'
        }, { status: 404 })
      }
      
      return NextResponse.json({ 
        error: 'Failed to fetch tutors',
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ tutors: tutors || [] })
  } catch (error) {
    console.error('Error in GET /api/tutors:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate the request body
    const validatedData = tutorSchema.parse(body)
    
    const { data: tutor, error } = await supabase
      .from('tutors')
      .insert([validatedData])
      .select()
      .single()

    if (error) {
      console.error('Error creating tutor:', error)
      
      // Check if it's a table doesn't exist error
      if (error.message?.includes('relation "tutors" does not exist')) {
        return NextResponse.json({ 
          error: 'Database table not found. Please run the SQL schema to create the tutors table.',
          details: 'The tutors table needs to be created in your Supabase database. Please execute the SQL from supabase/tutors.sql in your Supabase dashboard.'
        }, { status: 404 })
      }
      
      return NextResponse.json({ 
        error: 'Failed to create tutor',
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ tutor }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    
    console.error('Error in POST /api/tutors:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
