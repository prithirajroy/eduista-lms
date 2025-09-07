'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Star, 
  Download, 
  Play, 
  FileText, 
  Video,
  Filter,
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
  Plus,
  Edit,
  Trash2
} from 'lucide-react'

const CONTENT_TYPES = [
  'All Types',
  'Notes', 
  'PDF', 
  'Video', 
  'Live Class'
]

const SUBJECTS = [
  'All Subjects',
  'Mathematics', 
  'Physics', 
  'Chemistry', 
  'Biology', 
  'English', 
  'History',
  'Geography', 
  'Computer Science', 
  'Economics'
]

// Mock data - in real app, this would come from Supabase
const marketplaceContent = [
  {
    id: '1',
    title: 'Complete Calculus Course',
    description: 'Comprehensive calculus course covering limits, derivatives, and integrals with practical examples.',
    type: 'video',
    price: 500,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
    duration: 120,
    subject: 'Mathematics',
    tags: ['Calculus', 'Mathematics', 'Video Course'],
    tutor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      totalReviews: 127
    },
    salesCount: 45,
    rating: 4.8,
    totalReviews: 23,
    isOwned: false
  },
  {
    id: '2',
    title: 'Calculus Practice Problems',
    description: 'Collection of 100+ calculus problems with detailed solutions and explanations.',
    type: 'pdf',
    price: 200,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
    duration: null,
    subject: 'Mathematics',
    tags: ['Calculus', 'Practice Problems', 'PDF'],
    tutor: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      totalReviews: 127
    },
    salesCount: 67,
    rating: 4.9,
    totalReviews: 34,
    isOwned: true
  },
  {
    id: '3',
    title: 'Quantum Physics Fundamentals',
    description: 'Introduction to quantum mechanics with visual explanations and mathematical derivations.',
    type: 'video',
    price: 800,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
    duration: 180,
    subject: 'Physics',
    tags: ['Quantum Physics', 'Physics', 'Advanced'],
    tutor: {
      name: 'Prof. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      totalReviews: 98
    },
    salesCount: 23,
    rating: 4.7,
    totalReviews: 12,
    isOwned: false
  },
  {
    id: '4',
    title: 'Physics Formula Sheet',
    description: 'Comprehensive formula sheet covering all major physics concepts with examples.',
    type: 'pdf',
    price: 150,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
    duration: null,
    subject: 'Physics',
    tags: ['Physics', 'Formulas', 'Reference'],
    tutor: {
      name: 'Prof. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      totalReviews: 98
    },
    salesCount: 89,
    rating: 4.6,
    totalReviews: 45,
    isOwned: false
  },
  {
    id: '5',
    title: 'Shakespeare Analysis Guide',
    description: 'Detailed analysis of major Shakespeare plays with character studies and themes.',
    type: 'pdf',
    price: 300,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
    duration: null,
    subject: 'English Literature',
    tags: ['Shakespeare', 'Literature', 'Analysis'],
    tutor: {
      name: 'Ms. Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      totalReviews: 156
    },
    salesCount: 34,
    rating: 4.9,
    totalReviews: 18,
    isOwned: false
  },
  {
    id: '6',
    title: 'Python Programming Basics',
    description: 'Complete Python programming course for beginners with hands-on exercises.',
    type: 'video',
    price: 600,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
    duration: 240,
    subject: 'Computer Science',
    tags: ['Python', 'Programming', 'Beginner'],
    tutor: {
      name: 'Mr. Amit Singh',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      totalReviews: 76
    },
    salesCount: 78,
    rating: 4.5,
    totalReviews: 39,
    isOwned: false
  }
]

const myContent = [
  {
    id: '7',
    title: 'My Calculus Notes',
    description: 'Personal notes from calculus classes with examples and practice problems.',
    type: 'pdf',
    price: 250,
    thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
    duration: null,
    subject: 'Mathematics',
    tags: ['Calculus', 'Notes', 'Personal'],
    salesCount: 12,
    rating: 4.7,
    totalReviews: 8,
    isPublished: true,
    earnings: 3000
  },
  {
    id: '8',
    title: 'Physics Problem Solving',
    description: 'Step-by-step solutions to common physics problems with explanations.',
    type: 'video',
    price: 400,
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop',
    duration: 90,
    subject: 'Physics',
    tags: ['Physics', 'Problem Solving', 'Video'],
    salesCount: 8,
    rating: 4.8,
    totalReviews: 5,
    isPublished: false,
    earnings: 3200
  }
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [selectedSubject, setSelectedSubject] = useState('All Subjects')
  const [showFilters, setShowFilters] = useState(false)

  const filteredContent = marketplaceContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = selectedType === 'All Types' || item.type === selectedType.toLowerCase()
    const matchesSubject = selectedSubject === 'All Subjects' || item.subject === selectedSubject
    
    return matchesSearch && matchesType && matchesSubject
  })

  const handlePurchase = (contentId: string) => {
    // In real app, this would handle the purchase flow
    console.log('Purchase content:', contentId)
  }

  const handleEdit = (contentId: string) => {
    // In real app, this would open edit modal
    console.log('Edit content:', contentId)
  }

  const handleDelete = (contentId: string) => {
    // In real app, this would show confirmation and delete
    console.log('Delete content:', contentId)
  }

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play className="h-4 w-4" />
      case 'pdf':
        return <FileText className="h-4 w-4" />
      case 'notes':
        return <BookOpen className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return null
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-2">
            Discover and purchase quality educational content from verified tutors
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      <Tabs defaultValue="browse" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Content</TabsTrigger>
          <TabsTrigger value="my-content">My Content</TabsTrigger>
        </TabsList>

        {/* Browse Content Tab */}
        <TabsContent value="browse" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Search Content</CardTitle>
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
                  placeholder="Search by title, description, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Content Type</label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTENT_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {filteredContent.length} content item{filteredContent.length !== 1 ? 's' : ''} found
            </p>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Sort by Rating</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      {getContentIcon(item.type)}
                      <span className="capitalize">{item.type}</span>
                    </Badge>
                  </div>
                  {item.duration && (
                    <div className="absolute bottom-2 right-2">
                      <Badge variant="secondary">
                        {formatDuration(item.duration)}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.tutor.avatar} />
                      <AvatarFallback>{item.tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.tutor.name}</p>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">{item.tutor.rating}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{item.salesCount} sales</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{item.rating}</span>
                      <span className="text-gray-500">({item.totalReviews})</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold text-green-600">
                      ₹{item.price}
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handlePurchase(item.id)}
                      disabled={item.isOwned}
                    >
                      {item.isOwned ? 'Owned' : 'Purchase'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No content found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters to find more content.
                </p>
                <Button onClick={() => {
                  setSearchQuery('')
                  setSelectedType('All Types')
                  setSelectedSubject('All Subjects')
                }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* My Content Tab */}
        <TabsContent value="my-content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My Content</CardTitle>
              <CardDescription>
                Manage your published content and track earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myContent.map((item) => (
                  <Card key={item.id}>
                    <div className="relative">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge variant={item.isPublished ? "default" : "secondary"}>
                          {item.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {item.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Sales</p>
                          <p className="font-semibold">{item.salesCount}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Earnings</p>
                          <p className="font-semibold">₹{item.earnings}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rating</p>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="font-semibold">{item.rating}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-600">Reviews</p>
                          <p className="font-semibold">{item.totalReviews}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {myContent.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No content yet</h3>
                  <p className="text-gray-600 mb-4">
                    Start creating educational content to share with students.
                  </p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Content
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Earnings Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Earnings Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">₹6,200</div>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">20</div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">₹310</div>
                  <p className="text-sm text-gray-600">Average per Sale</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

