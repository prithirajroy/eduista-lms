'use client'

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Plus,
  Star,
  Users,
  MapPin,
  DollarSign,
  GraduationCap,
  Award,
  Upload,
  Camera
} from 'lucide-react'
import { toast } from 'sonner'

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History',
  'Geography', 'Computer Science', 'Economics', 'Business Studies',
  'Psychology', 'Art', 'Music', 'Physical Education', 'Other'
]

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati',
  'Kannada', 'Malayalam', 'Punjabi', 'Odia', 'Assamese', 'Urdu', 'Other'
]

const EXPERIENCE_LEVELS = [
  '0-1 years',
  '1-3 years', 
  '3-5 years',
  '5-10 years',
  '10+ years'
]

// Mock data - in real app, this would come from Supabase
const mockTutorProfile = {
  id: '1',
  fullName: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@example.com',
  bio: 'PhD in Mathematics with 8+ years of teaching experience. Specializes in calculus, algebra, and statistics. Passionate about making complex concepts simple.',
  subjects: ['Mathematics', 'Statistics', 'Calculus'],
  languages: ['English', 'Hindi'],
  location: 'Mumbai, Maharashtra',
  experienceYears: '8',
  hourlyRate: 1500,
  rating: 4.9,
  totalReviews: 127,
  totalStudents: 450,
  isVerified: true,
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  qualifications: [
    {
      id: '1',
      degree: 'PhD in Mathematics',
      institution: 'IIT Bombay',
      year: '2015'
    },
    {
      id: '2', 
      degree: 'MSc in Mathematics',
      institution: 'Delhi University',
      year: '2012'
    }
  ],
  achievements: [
    {
      id: '1',
      title: 'Best Teacher Award',
      organization: 'Mumbai Education Board',
      year: '2023'
    },
    {
      id: '2',
      title: 'Published Research Paper',
      organization: 'Journal of Mathematics',
      year: '2022'
    }
  ]
}

export default function TutorProfilePage() {
  const { user } = useUser()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockTutorProfile)
  const [editingQualification, setEditingQualification] = useState<string | null>(null)
  const [editingAchievement, setEditingAchievement] = useState<string | null>(null)
  const [newQualification, setNewQualification] = useState({
    degree: '',
    institution: '',
    year: ''
  })
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    organization: '',
    year: ''
  })

  const handleSaveProfile = () => {
    // In real app, this would save to Supabase
    toast.success('Profile updated successfully!')
    setIsEditing(false)
  }

  const handleDeleteProfile = () => {
    // In real app, this would show confirmation dialog
    if (confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      toast.success('Profile deleted successfully!')
      // Redirect to home page
    }
  }

  const handleAddQualification = () => {
    if (newQualification.degree && newQualification.institution && newQualification.year) {
      const qualification = {
        id: Date.now().toString(),
        ...newQualification
      }
      setProfile(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, qualification]
      }))
      setNewQualification({ degree: '', institution: '', year: '' })
      toast.success('Qualification added!')
    }
  }

  const handleDeleteQualification = (id: string) => {
    setProfile(prev => ({
      ...prev,
      qualifications: prev.qualifications.filter(q => q.id !== id)
    }))
    toast.success('Qualification removed!')
  }

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.organization && newAchievement.year) {
      const achievement = {
        id: Date.now().toString(),
        ...newAchievement
      }
      setProfile(prev => ({
        ...prev,
        achievements: [...prev.achievements, achievement]
      }))
      setNewAchievement({ title: '', organization: '', year: '' })
      toast.success('Achievement added!')
    }
  }

  const handleDeleteAchievement = (id: string) => {
    setProfile(prev => ({
      ...prev,
      achievements: prev.achievements.filter(a => a.id !== id)
    }))
    toast.success('Achievement removed!')
  }

  const handleSubjectToggle = (subject: string) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter(s => s !== subject)
        : [...prev.subjects, subject]
    }))
  }

  const handleLanguageToggle = (language: string) => {
    setProfile(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tutor Profile</h1>
          <p className="text-gray-600 mt-2">
            Manage your profile information and showcase your expertise
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="qualifications">Qualifications</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Profile Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{profile.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full"
                        variant="secondary"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-2xl font-bold">{profile.fullName}</h2>
                      {profile.isVerified && (
                        <Badge variant="default">
                          <Award className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600">{profile.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{profile.rating}</span>
                        <span className="text-gray-500">({profile.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Users className="h-4 w-4" />
                        <span>{profile.totalStudents} students</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">₹{profile.hourlyRate}/hr</div>
                  <div className="text-sm text-gray-500">Hourly Rate</div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profile.fullName}
                    onChange={(e) => setProfile(prev => ({ ...prev, fullName: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="experience">Experience</Label>
                  <Select 
                    value={profile.experienceYears} 
                    onValueChange={(value) => setProfile(prev => ({ ...prev, experienceYears: value }))}
                    disabled={!isEditing}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="hourlyRate"
                    type="number"
                    value={profile.hourlyRate}
                    onChange={(e) => setProfile(prev => ({ ...prev, hourlyRate: parseInt(e.target.value) }))}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subjects and Languages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subjects</CardTitle>
                <CardDescription>Select the subjects you teach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((subject) => (
                    <Badge
                      key={subject}
                      variant={profile.subjects.includes(subject) ? "default" : "outline"}
                      className={`cursor-pointer ${isEditing ? '' : 'cursor-default'}`}
                      onClick={() => isEditing && handleSubjectToggle(subject)}
                    >
                      {subject}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Languages</CardTitle>
                <CardDescription>Languages you can teach in</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map((language) => (
                    <Badge
                      key={language}
                      variant={profile.languages.includes(language) ? "default" : "outline"}
                      className={`cursor-pointer ${isEditing ? '' : 'cursor-default'}`}
                      onClick={() => isEditing && handleLanguageToggle(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Qualifications Tab */}
        <TabsContent value="qualifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Qualifications</CardTitle>
                  <CardDescription>Your educational background and certifications</CardDescription>
                </div>
                <Button onClick={() => setEditingQualification('new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Qualification
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.qualifications.map((qualification) => (
                <div key={qualification.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{qualification.degree}</h3>
                    <p className="text-gray-600">{qualification.institution}</p>
                    <p className="text-sm text-gray-500">{qualification.year}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteQualification(qualification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {editingQualification === 'new' && (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-4">Add New Qualification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="degree">Degree/Certification</Label>
                      <Input
                        id="degree"
                        value={newQualification.degree}
                        onChange={(e) => setNewQualification(prev => ({ ...prev, degree: e.target.value }))}
                        placeholder="e.g., PhD in Mathematics"
                      />
                    </div>
                    <div>
                      <Label htmlFor="institution">Institution</Label>
                      <Input
                        id="institution"
                        value={newQualification.institution}
                        onChange={(e) => setNewQualification(prev => ({ ...prev, institution: e.target.value }))}
                        placeholder="e.g., IIT Bombay"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        value={newQualification.year}
                        onChange={(e) => setNewQualification(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="e.g., 2015"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={handleAddQualification}>
                      <Save className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                    <Button variant="outline" onClick={() => setEditingQualification(null)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your awards, recognitions, and accomplishments</CardDescription>
                </div>
                <Button onClick={() => setEditingAchievement('new')}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {profile.achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{achievement.title}</h3>
                    <p className="text-gray-600">{achievement.organization}</p>
                    <p className="text-sm text-gray-500">{achievement.year}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteAchievement(achievement.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {editingAchievement === 'new' && (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-4">Add New Achievement</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newAchievement.title}
                        onChange={(e) => setNewAchievement(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., Best Teacher Award"
                      />
                    </div>
                    <div>
                      <Label htmlFor="organization">Organization</Label>
                      <Input
                        id="organization"
                        value={newAchievement.organization}
                        onChange={(e) => setNewAchievement(prev => ({ ...prev, organization: e.target.value }))}
                        placeholder="e.g., Mumbai Education Board"
                      />
                    </div>
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input
                        id="year"
                        value={newAchievement.year}
                        onChange={(e) => setNewAchievement(prev => ({ ...prev, year: e.target.value }))}
                        placeholder="e.g., 2023"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={handleAddAchievement}>
                      <Save className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                    <Button variant="outline" onClick={() => setEditingAchievement(null)}>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Profile Visibility</h3>
                  <p className="text-sm text-gray-600">Make your profile visible to students</p>
                </div>
                <Button variant="outline">Public</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Email Notifications</h3>
                  <p className="text-sm text-gray-600">Receive notifications about new messages and bookings</p>
                </div>
                <Button variant="outline">Enabled</Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">SMS Notifications</h3>
                  <p className="text-sm text-gray-600">Receive SMS notifications for urgent messages</p>
                </div>
                <Button variant="outline">Disabled</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-red-600">Delete Profile</h3>
                  <p className="text-sm text-gray-600">Permanently delete your tutor profile and all associated data</p>
                </div>
                <Button variant="destructive" onClick={handleDeleteProfile}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
