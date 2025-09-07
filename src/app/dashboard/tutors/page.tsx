'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TutorModal from '@/components/tutor-modal'
import { toast } from 'sonner'
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Filter,
  GraduationCap,
  Award,
  Users,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MoreVertical,
  Shield,
  ShieldOff,
  Plus,
  Download,
  Upload
} from 'lucide-react'

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History',
  'Geography', 'Computer Science', 'Economics', 'Business Studies'
]

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Telugu', 'Marathi', 'Tamil', 'Gujarati'
]

const BUDGET_RANGES = [
  '₹200-500/hour',
  '₹500-1000/hour', 
  '₹1000-2000/hour',
  '₹2000-5000/hour',
  '₹5000+/hour'
]

// Mock data - in real app, this would come from Supabase
const tutors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    subject: 'Mathematics',
    subjects: ['Mathematics', 'Statistics', 'Calculus'],
    rating: 4.9,
    totalReviews: 127,
    hourlyRate: 1500,
    experience: 8,
    location: 'Mumbai, Maharashtra',
    languages: ['English', 'Hindi'],
    avatar: '/avatars/sarah.jpg',
    bio: 'PhD in Mathematics with 8+ years of teaching experience. Specializes in calculus, algebra, and statistics.',
    isVerified: true,
    totalStudents: 450,
    responseTime: '2 hours',
    isActive: true,
    isApproved: true,
    joinDate: '2023-01-15',
    lastActive: '2024-01-20',
    totalEarnings: 125000,
    totalLessons: 340
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@example.com',
    subject: 'Physics',
    subjects: ['Physics', 'Mechanics', 'Quantum Physics'],
    rating: 4.8,
    totalReviews: 98,
    hourlyRate: 2000,
    experience: 12,
    location: 'Bangalore, Karnataka',
    languages: ['English', 'Tamil'],
    avatar: '/avatars/michael.jpg',
    bio: 'Professor of Physics with extensive research background. Expert in quantum mechanics and thermodynamics.',
    isVerified: true,
    totalStudents: 320,
    responseTime: '1 hour',
    isActive: true,
    isApproved: true,
    joinDate: '2023-02-10',
    lastActive: '2024-01-19',
    totalEarnings: 98000,
    totalLessons: 280
  },
  {
    id: '3',
    name: 'Ms. Emily Davis',
    email: 'emily.davis@example.com',
    subject: 'English Literature',
    subjects: ['English', 'Literature', 'Creative Writing'],
    rating: 4.9,
    totalReviews: 156,
    hourlyRate: 1200,
    experience: 6,
    location: 'Delhi, NCR',
    languages: ['English', 'Hindi'],
    avatar: '/avatars/emily.jpg',
    bio: 'MA in English Literature with passion for teaching. Helps students excel in literature and writing.',
    isVerified: true,
    totalStudents: 280,
    responseTime: '3 hours',
    isActive: true,
    isApproved: true,
    joinDate: '2023-03-05',
    lastActive: '2024-01-18',
    totalEarnings: 75000,
    totalLessons: 220
  },
  {
    id: '4',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    subject: 'Chemistry',
    subjects: ['Chemistry', 'Organic Chemistry', 'Biochemistry'],
    rating: 4.7,
    totalReviews: 89,
    hourlyRate: 1800,
    experience: 10,
    location: 'Chennai, Tamil Nadu',
    languages: ['English', 'Tamil', 'Hindi'],
    avatar: '/avatars/rajesh.jpg',
    bio: 'PhD in Chemistry with industry experience. Makes complex chemistry concepts easy to understand.',
    isVerified: true,
    totalStudents: 200,
    responseTime: '4 hours',
    isActive: false,
    isApproved: true,
    joinDate: '2023-01-20',
    lastActive: '2024-01-10',
    totalEarnings: 65000,
    totalLessons: 180
  },
  {
    id: '5',
    name: 'Ms. Priya Sharma',
    email: 'priya.sharma@example.com',
    subject: 'Biology',
    subjects: ['Biology', 'Botany', 'Zoology'],
    rating: 4.8,
    totalReviews: 112,
    hourlyRate: 1400,
    experience: 7,
    location: 'Pune, Maharashtra',
    languages: ['English', 'Marathi', 'Hindi'],
    avatar: '/avatars/priya.jpg',
    bio: 'MSc in Biology with teaching certification. Specializes in making biology fun and engaging.',
    isVerified: true,
    totalStudents: 180,
    responseTime: '2 hours',
    isActive: true,
    isApproved: true,
    joinDate: '2023-04-12',
    lastActive: '2024-01-21',
    totalEarnings: 55000,
    totalLessons: 150
  },
  {
    id: '6',
    name: 'Mr. Amit Singh',
    email: 'amit.singh@example.com',
    subject: 'Computer Science',
    subjects: ['Computer Science', 'Programming', 'Data Structures'],
    rating: 4.6,
    totalReviews: 76,
    hourlyRate: 1600,
    experience: 5,
    location: 'Hyderabad, Telangana',
    languages: ['English', 'Telugu', 'Hindi'],
    avatar: '/avatars/amit.jpg',
    bio: 'Software Engineer turned educator. Expert in programming languages and computer science fundamentals.',
    isVerified: false,
    totalStudents: 120,
    responseTime: '1 hour',
    isActive: true,
    isApproved: false,
    joinDate: '2024-01-05',
    lastActive: '2024-01-21',
    totalEarnings: 12000,
    totalLessons: 45
  }
]

interface Tutor {
  id: string
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
  totalStudents?: number
  totalLessons?: number
  totalEarnings?: number
  responseTime: string
  joinDate: string
  lastActive: string
  rating?: number
  totalReviews?: number
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
  totalStudents?: number
  totalLessons?: number
  totalEarnings?: number
  responseTime: string
}

export default function TutorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [tutorsList, setTutorsList] = useState<Tutor[]>([])
  const [selectedTutors, setSelectedTutors] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTutor, setEditingTutor] = useState<Tutor | undefined>(undefined)
  const [isSaving, setIsSaving] = useState(false)

  // Fetch tutors from API
  const fetchTutors = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/tutors')
      const data = await response.json()
      
      if (!response.ok) {
        // Check if it's a database setup issue
        if (data.error?.includes('Database table not found')) {
          toast.error('Database not set up. Please check the setup guide.', {
            description: 'The tutors table needs to be created in your Supabase database.',
            duration: 10000
          })
          // Show mock data with a warning
          setTutorsList(tutors)
          return
        }
        throw new Error(data.error || 'Failed to fetch tutors')
      }
      
      setTutorsList(data.tutors || [])
    } catch (error) {
      console.error('Error fetching tutors:', error)
      toast.error('Failed to load tutors. Using sample data.', {
        description: 'Please check your database connection and setup.',
        duration: 8000
      })
      // Fallback to mock data
      setTutorsList(tutors)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTutors()
  }, [])

  const filteredTutors = tutorsList.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesSubject = !selectedSubject || tutor.subjects.includes(selectedSubject)
    const matchesLanguage = !selectedLanguage || tutor.languages.includes(selectedLanguage)
    const matchesBudget = !selectedBudget || (
      selectedBudget === '₹200-500/hour' && tutor.hourlyRate <= 500 ||
      selectedBudget === '₹500-1000/hour' && tutor.hourlyRate > 500 && tutor.hourlyRate <= 1000 ||
      selectedBudget === '₹1000-2000/hour' && tutor.hourlyRate > 1000 && tutor.hourlyRate <= 2000 ||
      selectedBudget === '₹2000-5000/hour' && tutor.hourlyRate > 2000 && tutor.hourlyRate <= 5000 ||
      selectedBudget === '₹5000+/hour' && tutor.hourlyRate > 5000
    )
    
    return matchesSearch && matchesSubject && matchesLanguage && matchesBudget
  })

  const handleContactTutor = (tutorId: string) => {
    // In real app, this would open a contact modal or redirect to contact page
    console.log('Contact tutor:', tutorId)
  }

  const handleEditTutor = (tutorId: string) => {
    const tutor = tutorsList.find(t => t.id === tutorId)
    if (tutor) {
      setEditingTutor(tutor)
      setIsModalOpen(true)
    }
  }

  const handleDeleteTutor = async (tutorId: string) => {
    if (confirm('Are you sure you want to delete this tutor? This action cannot be undone.')) {
      try {
        const response = await fetch(`/api/tutors/${tutorId}`, {
          method: 'DELETE'
        })
        
        if (!response.ok) {
          throw new Error('Failed to delete tutor')
        }
        
        setTutorsList(prev => prev.filter(tutor => tutor.id !== tutorId))
        toast.success('Tutor deleted successfully')
      } catch (error) {
        console.error('Error deleting tutor:', error)
        toast.error('Failed to delete tutor')
      }
    }
  }

  const handleToggleActive = async (tutorId: string) => {
    const tutor = tutorsList.find(t => t.id === tutorId)
    if (!tutor) return

    try {
      const response = await fetch(`/api/tutors/${tutorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !tutor.isActive })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update tutor')
      }
      
      setTutorsList(prev => prev.map(t => 
        t.id === tutorId ? { ...t, isActive: !t.isActive } : t
      ))
      toast.success(`Tutor ${!tutor.isActive ? 'activated' : 'deactivated'} successfully`)
    } catch (error) {
      console.error('Error updating tutor:', error)
      toast.error('Failed to update tutor')
    }
  }

  const handleToggleApproved = async (tutorId: string) => {
    const tutor = tutorsList.find(t => t.id === tutorId)
    if (!tutor) return

    try {
      const response = await fetch(`/api/tutors/${tutorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !tutor.isApproved })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update tutor')
      }
      
      setTutorsList(prev => prev.map(t => 
        t.id === tutorId ? { ...t, isApproved: !t.isApproved } : t
      ))
      toast.success(`Tutor ${!tutor.isApproved ? 'approved' : 'unapproved'} successfully`)
    } catch (error) {
      console.error('Error updating tutor:', error)
      toast.error('Failed to update tutor')
    }
  }

  const handleToggleVerified = async (tutorId: string) => {
    const tutor = tutorsList.find(t => t.id === tutorId)
    if (!tutor) return

    try {
      const response = await fetch(`/api/tutors/${tutorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerified: !tutor.isVerified })
      })
      
      if (!response.ok) {
        throw new Error('Failed to update tutor')
      }
      
      setTutorsList(prev => prev.map(t => 
        t.id === tutorId ? { ...t, isVerified: !t.isVerified } : t
      ))
      toast.success(`Tutor ${!tutor.isVerified ? 'verified' : 'unverified'} successfully`)
    } catch (error) {
      console.error('Error updating tutor:', error)
      toast.error('Failed to update tutor')
    }
  }

  const handleBulkAction = (action: string) => {
    if (selectedTutors.length === 0) {
      alert('Please select tutors first')
      return
    }

    switch (action) {
      case 'approve':
        setTutorsList(prev => prev.map(tutor => 
          selectedTutors.includes(tutor.id) ? { ...tutor, isApproved: true } : tutor
        ))
        break
      case 'activate':
        setTutorsList(prev => prev.map(tutor => 
          selectedTutors.includes(tutor.id) ? { ...tutor, isActive: true } : tutor
        ))
        break
      case 'deactivate':
        setTutorsList(prev => prev.map(tutor => 
          selectedTutors.includes(tutor.id) ? { ...tutor, isActive: false } : tutor
        ))
        break
      case 'delete':
        if (confirm(`Are you sure you want to delete ${selectedTutors.length} tutor(s)?`)) {
          setTutorsList(prev => prev.filter(tutor => !selectedTutors.includes(tutor.id)))
        }
        break
    }
    setSelectedTutors([])
  }

  const handleSelectTutor = (tutorId: string) => {
    setSelectedTutors(prev => 
      prev.includes(tutorId) 
        ? prev.filter(id => id !== tutorId)
        : [...prev, tutorId]
    )
  }

  const handleSelectAll = () => {
    if (selectedTutors.length === filteredTutors.length) {
      setSelectedTutors([])
    } else {
      setSelectedTutors(filteredTutors.map(tutor => tutor.id))
    }
  }

  const handleSaveTutor = async (tutorData: TutorFormData) => {
    setIsSaving(true)
    try {
      const url = editingTutor ? `/api/tutors/${editingTutor.id}` : '/api/tutors'
      const method = editingTutor ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tutorData)
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        // Check if it's a database setup issue
        if (data.error?.includes('Database table not found')) {
          toast.error('Database not set up. Cannot save tutor.', {
            description: 'Please set up your Supabase database first. Check the setup guide.',
            duration: 10000
          })
          throw new Error('Database not set up')
        }
        throw new Error(data.error || `Failed to ${editingTutor ? 'update' : 'create'} tutor`)
      }
      
      if (editingTutor) {
        setTutorsList(prev => prev.map(t => t.id === editingTutor.id ? data.tutor : t))
      } else {
        setTutorsList(prev => [data.tutor, ...prev])
      }
      
      setIsModalOpen(false)
      setEditingTutor(undefined)
      toast.success(`Tutor ${editingTutor ? 'updated' : 'created'} successfully`)
    } catch (error) {
      console.error('Error saving tutor:', error)
      if (error instanceof Error && error.message === 'Database not set up') {
        // Don't show additional error toast for database setup issues
        return
      }
      toast.error(`Failed to ${editingTutor ? 'update' : 'create'} tutor`)
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  const handleAddTutor = () => {
    setEditingTutor(undefined)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingTutor(undefined)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tutor Management</h1>
          <p className="text-gray-600 mt-2">
            Manage all tutors, approve applications, and monitor performance
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleAddTutor}>
            <Plus className="h-4 w-4 mr-2" />
            Add Tutor
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tutorsList.length}</div>
            <p className="text-xs text-muted-foreground">
              {tutorsList.filter(t => t.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tutorsList.filter(t => !t.isApproved).length}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Verified Tutors</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tutorsList.filter(t => t.isVerified).length}</div>
            <p className="text-xs text-muted-foreground">
              {tutorsList.length > 0 ? Math.round((tutorsList.filter(t => t.isVerified).length / tutorsList.length) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{tutorsList.reduce((sum, t) => sum + (t.totalEarnings || 0), 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Platform revenue
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Tutors</TabsTrigger>
          <TabsTrigger value="pending">Pending Approval</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        {/* All Tutors Tab */}
        <TabsContent value="all" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Search & Filter Tutors</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, subject, or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Subjects</SelectItem>
                        {SUBJECTS.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Language</label>
                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Languages</SelectItem>
                        {LANGUAGES.map((language) => (
                          <SelectItem key={language} value={language}>{language}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget Range</label>
                    <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any Budget</SelectItem>
                        {BUDGET_RANGES.map((range) => (
                          <SelectItem key={range} value={range}>{range}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedTutors.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {selectedTutors.length} tutor(s) selected
                  </span>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('approve')}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('activate')}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleBulkAction('deactivate')}
                    >
                      <EyeOff className="h-4 w-4 mr-2" />
                      Deactivate
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleBulkAction('delete')}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredTutors.length} tutor{filteredTutors.length !== 1 ? 's' : ''} found
            </p>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedTutors.length === filteredTutors.length ? 'Deselect All' : 'Select All'}
              </Button>
              <Select defaultValue="rating">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="experience">Experience</SelectItem>
                  <SelectItem value="earnings">Total Earnings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tutor Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map((tutor) => (
              <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedTutors.includes(tutor.id)}
                        onChange={() => handleSelectTutor(tutor.id)}
                        className="mt-1"
                      />
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={tutor.avatar} />
                        <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{tutor.name}</h3>
                          {tutor.isVerified && (
                            <Badge variant="secondary" className="text-xs">
                              <Award className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{tutor.subject}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditTutor(tutor.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleActive(tutor.id)}>
                          {tutor.isActive ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                          {tutor.isActive ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleApproved(tutor.id)}>
                          {tutor.isApproved ? <ShieldOff className="h-4 w-4 mr-2" /> : <Shield className="h-4 w-4 mr-2" />}
                          {tutor.isApproved ? 'Unapprove' : 'Approve'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleVerified(tutor.id)}>
                          <Award className="h-4 w-4 mr-2" />
                          {tutor.isVerified ? 'Remove Verification' : 'Verify'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteTutor(tutor.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-600">₹{tutor.hourlyRate}/hr</div>
                    <div className="flex space-x-1">
                      <Badge variant={tutor.isActive ? "default" : "secondary"}>
                        {tutor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                      <Badge variant={tutor.isApproved ? "default" : "destructive"}>
                        {tutor.isApproved ? 'Approved' : 'Pending'}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 line-clamp-2">{tutor.bio}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Students</p>
                      <p className="font-semibold">{tutor.totalStudents || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Lessons</p>
                      <p className="font-semibold">{tutor.totalLessons || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Earnings</p>
                      <p className="font-semibold">₹{(tutor.totalEarnings || 0).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rating</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{tutor.rating || 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{tutor.location}</span>
                  </div>

                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Last active: {tutor.lastActive}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.slice(0, 3).map((subject) => (
                      <Badge key={subject} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {tutor.subjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tutor.subjects.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleContactTutor(tutor.id)}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleEditTutor(tutor.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTutors.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tutors found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more tutors.
                </p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedSubject('')
                  setSelectedLanguage('')
                  setSelectedBudget('')
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Pending Approval Tab */}
        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorsList.filter(tutor => !tutor.isApproved).map((tutor) => (
              <Card key={tutor.id} className="border-orange-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{tutor.name}</h3>
                      <p className="text-sm text-gray-600">{tutor.subject}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="destructive">Pending Approval</Badge>
                  <p className="text-sm text-gray-700">{tutor.bio}</p>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleToggleApproved(tutor.id)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleDeleteTutor(tutor.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Active Tab */}
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorsList.filter(tutor => tutor.isActive && tutor.isApproved).map((tutor) => (
              <Card key={tutor.id} className="border-green-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{tutor.name}</h3>
                      <p className="text-sm text-gray-600">{tutor.subject}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="default">Active</Badge>
                  <p className="text-sm text-gray-700">{tutor.bio}</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleToggleActive(tutor.id)}
                    >
                      <EyeOff className="h-4 w-4 mr-2" />
                      Deactivate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleEditTutor(tutor.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Inactive Tab */}
        <TabsContent value="inactive">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorsList.filter(tutor => !tutor.isActive).map((tutor) => (
              <Card key={tutor.id} className="border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={tutor.avatar} />
                      <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{tutor.name}</h3>
                      <p className="text-sm text-gray-600">{tutor.subject}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Badge variant="secondary">Inactive</Badge>
                  <p className="text-sm text-gray-700">{tutor.bio}</p>
                  <div className="flex space-x-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleToggleActive(tutor.id)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleDeleteTutor(tutor.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Tutor Modal */}
      <TutorModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        tutor={editingTutor}
        onSave={handleSaveTutor}
        isLoading={isSaving}
      />
    </div>
  )
}

