import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { z } from 'zod'

const tutorUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  email: z.string().email('Invalid email').optional(),
  subject: z.string().min(1, 'Subject is required').optional(),
  subjects: z.array(z.string()).min(1, 'At least one subject is required').optional(),
  hourlyRate: z.number().min(0, 'Hourly rate must be positive').optional(),
  experience: z.number().min(0, 'Experience must be positive').optional(),
  location: z.string().min(1, 'Location is required').optional(),
  languages: z.array(z.string()).min(1, 'At least one language is required').optional(),
  bio: z.string().min(10, 'Bio must be at least 10 characters').optional(),
  avatar: z.string().url().optional(),
  isVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isApproved: z.boolean().optional(),
  totalStudents: z.number().optional(),
  totalLessons: z.number().optional(),
  totalEarnings: z.number().optional(),
  responseTime: z.string().optional(),
  lastActive: z.string().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { data: tutor, error } = await supabase
      .from('tutors')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching tutor:', error)
      return NextResponse.json({ error: 'Tutor not found' }, { status: 404 })
    }

    return NextResponse.json({ tutor })
  } catch (error) {
    console.error('Error in GET /api/tutors/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Validate the request body
    const validatedData = tutorUpdateSchema.parse(body)
    
    const { data: tutor, error } = await supabase
      .from('tutors')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating tutor:', error)
      return NextResponse.json({ error: 'Failed to update tutor' }, { status: 500 })
    }

    return NextResponse.json({ tutor })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    
    console.error('Error in PUT /api/tutors/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { error } = await supabase
      .from('tutors')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting tutor:', error)
      return NextResponse.json({ error: 'Failed to delete tutor' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Tutor deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/tutors/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
