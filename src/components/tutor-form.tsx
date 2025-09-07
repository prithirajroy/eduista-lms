'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { X, Plus, Trash2 } from 'lucide-react'

const tutorFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(1, 'Subject is required'),
  subjects: z.array(z.string()).min(1, 'At least one subject is required'),
  hourlyRate: z.number().min(0, 'Hourly rate must be positive'),
  experience: z.number().min(0, 'Experience must be positive'),
  location: z.string().min(1, 'Location is required'),
  languages: z.array(z.string()).min(1, 'At least one language is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatar: z.string().min(1, "Avatar URL is required"),
  isVerified: z.boolean(),
  isActive: z.boolean(),
  isApproved: z.boolean(),
  totalStudents: z.number(),
  totalLessons: z.number(),
  totalEarnings: z.number(),
  responseTime: z.string()
})

type TutorFormData = z.infer<typeof tutorFormSchema>

interface TutorFormProps {
  tutor?: TutorFormData & { id?: string }
  onSave: (data: TutorFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History',
  'Geography', 'Computer Science', 'Economics', 'Business Studies'
]

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati'
]

const RESPONSE_TIMES = [
  '1 hour', '2 hours', '3 hours', '4 hours', '1 day', '2 days'
]

export default function TutorForm({ tutor, onSave, onCancel, isLoading = false }: TutorFormProps) {
  const [newSubject, setNewSubject] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<TutorFormData>({
    resolver: zodResolver(tutorFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      subjects: [],
      hourlyRate: 0,
      experience: 0,
      location: '',
      languages: [],
      bio: '',
      avatar: '',
      isVerified: false,
      isActive: true,
      isApproved: false,
      totalStudents: 0,
      totalLessons: 0,
      totalEarnings: 0,
      responseTime: '2 hours'
    }
  })

  const watchedSubjects = watch('subjects')
  const watchedLanguages = watch('languages')

  useEffect(() => {
    if (tutor) {
      reset(tutor)
    }
  }, [tutor, reset])

  const addSubject = () => {
    if (newSubject && !watchedSubjects.includes(newSubject)) {
      setValue('subjects', [...watchedSubjects, newSubject])
      setNewSubject('')
    }
  }

  const removeSubject = (subjectToRemove: string) => {
    setValue('subjects', watchedSubjects.filter(subject => subject !== subjectToRemove))
  }

  const addLanguage = () => {
    if (newLanguage && !watchedLanguages.includes(newLanguage)) {
      setValue('languages', [...watchedLanguages, newLanguage])
      setNewLanguage('')
    }
  }

  const removeLanguage = (languageToRemove: string) => {
    setValue('languages', watchedLanguages.filter(language => language !== languageToRemove))
  }

  const onSubmit = async (data: TutorFormData) => {
    try {
      await onSave(data)
      toast.success(tutor ? 'Tutor updated successfully!' : 'Tutor created successfully!')
    
    }
    /* eslint-disable @typescript-eslint/no-explicit-any */
    catch (error: any) {
      let errorMessage = 'Failed to save tutor. Please try again.';
      if (error && typeof error === 'object') {
        if (error.message) {
          errorMessage = error.message;
        } else if (error.error) {
          errorMessage = error.error;
        }
      }
      toast.error(errorMessage);
      console.error('Error saving tutor:', error);
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{tutor ? 'Edit Tutor' : 'Add New Tutor'}</CardTitle>
        <CardDescription>
          {tutor ? 'Update tutor information' : 'Create a new tutor profile'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter full name"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="Enter email address"
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Primary Subject *</Label>
              <Select onValueChange={(value) => setValue('subject', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="Enter location"
              />
              {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
            </div>
          </div>

          {/* Subjects */}
          <div className="space-y-2">
            <Label>Teaching Subjects *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {watchedSubjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="flex items-center gap-1">
                  {subject}
                  <button
                    type="button"
                    onClick={() => removeSubject(subject)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Add new subject"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())}
              />
              <Button type="button" onClick={addSubject} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.subjects && <p className="text-sm text-red-500">{errors.subjects.message}</p>}
          </div>

          {/* Languages */}
          <div className="space-y-2">
            <Label>Teaching Languages *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {watchedLanguages.map((language) => (
                <Badge key={language} variant="secondary" className="flex items-center gap-1">
                  {language}
                  <button
                    type="button"
                    onClick={() => removeLanguage(language)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Select onValueChange={(value) => setNewLanguage(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map((language) => (
                    <SelectItem key={language} value={language}>{language}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addLanguage} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {errors.languages && <p className="text-sm text-red-500">{errors.languages.message}</p>}
          </div>

          {/* Pricing and Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hourlyRate">Hourly Rate (₹) *</Label>
              <Input
                id="hourlyRate"
                type="number"
                {...register('hourlyRate', { valueAsNumber: true })}
                placeholder="Enter hourly rate"
              />
              {errors.hourlyRate && <p className="text-sm text-red-500">{errors.hourlyRate.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (years) *</Label>
              <Input
                id="experience"
                type="number"
                {...register('experience', { valueAsNumber: true })}
                placeholder="Enter years of experience"
              />
              {errors.experience && <p className="text-sm text-red-500">{errors.experience.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="responseTime">Response Time</Label>
              <Select onValueChange={(value) => setValue('responseTime', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select response time" />
                </SelectTrigger>
                <SelectContent>
                  {RESPONSE_TIMES.map((time) => (
                    <SelectItem key={time} value={time}>{time}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              {...register('bio')}
              placeholder="Tell us about your teaching experience and approach..."
              rows={4}
            />
            {errors.bio && <p className="text-sm text-red-500">{errors.bio.message}</p>}
          </div>

          {/* Avatar URL */}
          <div className="space-y-2">
            <Label htmlFor="avatar">Avatar URL *</Label>
            <Input
              id="avatar"
              {...register('avatar')}
              placeholder="Enter avatar image URL"
            />
            {errors.avatar && <p className="text-sm text-red-500">{errors.avatar.message}</p>}
          </div>

          {/* Status Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={watch('isActive')}
                onCheckedChange={(checked) => setValue('isActive', checked)}
              />
              <Label htmlFor="isActive">Active</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isApproved"
                checked={watch('isApproved')}
                onCheckedChange={(checked) => setValue('isApproved', checked)}
              />
              <Label htmlFor="isApproved">Approved</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isVerified"
                checked={watch('isVerified')}
                onCheckedChange={(checked) => setValue('isVerified', checked)}
              />
              <Label htmlFor="isVerified">Verified</Label>
            </div>
          </div>

          {/* Statistics (for editing) */}
          {tutor && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalStudents">Total Students</Label>
                <Input
                  id="totalStudents"
                  type="number"
                  {...register('totalStudents', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalLessons">Total Lessons</Label>
                <Input
                  id="totalLessons"
                  type="number"
                  {...register('totalLessons', { valueAsNumber: true })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalEarnings">Total Earnings (₹)</Label>
                <Input
                  id="totalEarnings"
                  type="number"
                  {...register('totalEarnings', { valueAsNumber: true })}
                />
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : (tutor ? 'Update Tutor' : 'Create Tutor')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
