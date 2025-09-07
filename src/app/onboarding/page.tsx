'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, GraduationCap, MapPin, DollarSign, Languages } from 'lucide-react'
import { toast } from 'sonner'

type UserRole = 'student' | 'parent' | 'tutor'

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History',
  'Geography', 'Computer Science', 'Economics', 'Business Studies',
  'Psychology', 'Art', 'Music', 'Physical Education', 'Other'
]

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati',
  'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Other'
]

const BUDGET_RANGES = [
  '₹200-500/hour',
  '₹500-1000/hour', 
  '₹1000-2000/hour',
  '₹2000-5000/hour',
  '₹5000+/hour'
]

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole | null>(null)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    bio: '',
    subjects: [] as string[],
    budgetRange: '',
    languages: [] as string[],
    location: '',
    experienceYears: '',
    hourlyRate: '',
  })

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole)
    setStep(2)
  }

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const handleSubmit = async () => {
    try {
      // Here you would typically save the profile to Supabase
      // For now, we'll just show a success message and redirect
      toast.success('Profile created successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to create profile. Please try again.')
    }
  }

  const isStep2Valid = formData.fullName && formData.bio && formData.location
  const isStep3Valid = role === 'tutor' 
    ? formData.subjects.length > 0 && formData.hourlyRate
    : formData.subjects.length > 0 && formData.budgetRange

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Step {step} of 3</span>
            <span className="text-sm font-medium text-gray-600">{Math.round((step / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Choose Your Role</CardTitle>
              <CardDescription>
                Tell us how you&apos;ll be using Eduista
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div 
                    className="p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                    onClick={() => handleRoleSelect('student')}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Student</h3>
                        <p className="text-gray-600">I want to learn and find tutors</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                    onClick={() => handleRoleSelect('parent')}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Parent</h3>
                        <p className="text-gray-600">I want to find tutors for my child</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="p-6 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
                    onClick={() => handleRoleSelect('tutor')}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <GraduationCap className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Tutor</h3>
                        <p className="text-gray-600">I want to teach and earn money</p>
                      </div>
                    </div>
                  </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Basic Information */}
        {step === 2 && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Tell Us About Yourself</CardTitle>
              <CardDescription>
                Help us personalize your experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter your city"
                    className="pl-10"
                  />
                </div>
              </div>

              {role === 'tutor' && (
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select value={formData.experienceYears} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceYears: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={!isStep2Valid}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Set Your Preferences</CardTitle>
              <CardDescription>
                Help us match you with the right opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Subjects of Interest</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {SUBJECTS.map((subject) => (
                    <Badge
                      key={subject}
                      variant={formData.subjects.includes(subject) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleSubjectToggle(subject)}
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label>Languages</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {LANGUAGES.map((language) => (
                    <Badge
                      key={language}
                      variant={formData.languages.includes(language) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleLanguageToggle(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              {role === 'student' || role === 'parent' ? (
                <div>
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select value={formData.budgetRange} onValueChange={(value) => setFormData(prev => ({ ...prev, budgetRange: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_RANGES.map((range) => (
                        <SelectItem key={range} value={range}>{range}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                      placeholder="Enter your hourly rate"
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!isStep3Valid}
                  className="flex-1"
                >
                  Complete Setup
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
