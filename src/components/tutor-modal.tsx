'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import TutorForm from './tutor-form'

interface Tutor {
  id?: string
  name: string
  email: string
  subject: string
  subjects: string[]
  hourlyRate: number
  experience: number
  location: string
  languages: string[]
  bio: string
  avatar?: string
  isVerified: boolean
  isActive: boolean
  isApproved: boolean
  totalStudents: number
  totalLessons: number
  totalEarnings: number
  responseTime: string
}

interface TutorFormData {
  name: string
  email: string
  subject: string
  subjects: string[]
  hourlyRate: number
  experience: number
  location: string
  languages: string[]
  bio: string
  avatar?: string
  isVerified: boolean
  isActive: boolean
  isApproved: boolean
  totalStudents: number
  totalLessons: number
  totalEarnings: number
  responseTime: string
}

interface TutorModalProps {
  isOpen: boolean
  onClose: () => void
  tutor?: Tutor
  onSave: (data: TutorFormData) => Promise<void>
  isLoading?: boolean
}

export default function TutorModal({ isOpen, onClose, tutor, onSave, isLoading = false }: TutorModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{tutor ? 'Edit Tutor' : 'Add New Tutor'}</DialogTitle>
          <DialogDescription>
            {tutor ? 'Update tutor information and settings' : 'Create a new tutor profile with all necessary details'}
          </DialogDescription>
        </DialogHeader>
        <TutorForm
          tutor={tutor}
          onSave={onSave}
          onCancel={onClose}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  )
}
