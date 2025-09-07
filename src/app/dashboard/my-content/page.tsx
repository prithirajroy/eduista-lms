'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  Upload,
  FileText,
  Video,
  Play,
  BookOpen,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  Save,
  X
} from 'lucide-react'
import { toast } from 'sonner'

const CONTENT_TYPES = [
  { value: 'notes', label: 'Notes', icon: FileText },
  { value: 'pdf', label: 'PDF', icon: FileText },
  { value: 'video', label: 'Video', icon: Video },
  { value: 'live_class', label: 'Live Class', icon: Play }
]

const SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History',
  'Geography', 'Computer Science', 'Economics', 'Business Studies'
]

// Mock data - in real app, this would come from Supabase
const mockContent = [
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
    salesCount: 45,
    rating: 4.8,
    totalReviews: 23,
    isPublished: true,
    earnings: 22500,
    createdAt: '2024-01-15'
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
    salesCount: 67,
    rating: 4.9,
    totalReviews: 34,
    isPublished: true,
    earnings: 13400,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
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
    earnings: 3200,
    createdAt: '2024-01-20'
  }
]

export default function MyContentPage() {
  const [content, setContent] = useState(mockContent)
  const [isCreating, setIsCreating] = useState(false)
  const [editingContent, setEditingContent] = useState<string | null>(null)
  const [newContent, setNewContent] = useState({
    title: '',
    description: '',
    type: 'notes',
    price: 0,
    subject: '',
    tags: [] as string[],
    duration: null as number | null
  })

  const handleCreateContent = () => {
    if (newContent.title && newContent.description && newContent.subject && newContent.price > 0) {
      const contentItem = {
        id: Date.now().toString(),
        ...newContent,
        thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=200&fit=crop',
        salesCount: 0,
        rating: 0,
        totalReviews: 0,
        isPublished: false,
        earnings: 0,
        createdAt: new Date().toISOString().split('T')[0]
      }
      setContent(prev => [contentItem, ...prev])
      setNewContent({
        title: '',
        description: '',
        type: 'notes',
        price: 0,
        subject: '',
        tags: [],
        duration: null
      })
      setIsCreating(false)
      toast.success('Content created successfully!')
    } else {
      toast.error('Please fill in all required fields')
    }
  }

  const handleEditContent = (id: string) => {
    setEditingContent(id)
  }

  const handleSaveEdit = (id: string) => {
    setEditingContent(null)
    toast.success('Content updated successfully!')
  }

  const handleDeleteContent = (id: string) => {
    if (confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
      setContent(prev => prev.filter(item => item.id !== id))
      toast.success('Content deleted successfully!')
    }
  }

  const handleTogglePublish = (id: string) => {
    setContent(prev => prev.map(item => 
      item.id === id ? { ...item, isPublished: !item.isPublished } : item
    ))
    toast.success('Content status updated!')
  }

  const handleTagToggle = (tag: string) => {
    setNewContent(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const getContentIcon = (type: string) => {
    const contentType = CONTENT_TYPES.find(t => t.value === type)
    return contentType ? contentType.icon : FileText
  }

  const formatDuration = (minutes: number | null) => {
    if (!minutes) return null
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const totalEarnings = content.reduce((sum, item) => sum + item.earnings, 0)
  const totalSales = content.reduce((sum, item) => sum + item.salesCount, 0)
  const publishedContent = content.filter(item => item.isPublished).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Content</h1>
          <p className="text-gray-600 mt-2">
            Manage your educational content and track performance
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{content.length}</div>
            <p className="text-xs text-muted-foreground">
              {publishedContent} published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              After platform fees
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {content.length > 0 ? (content.reduce((sum, item) => sum + item.rating, 0) / content.length).toFixed(1) : '0.0'}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all content
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* All Content Tab */}
        <TabsContent value="all" className="space-y-6">
          {/* Create Content Form */}
          {isCreating && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Content</CardTitle>
                <CardDescription>Add new educational content to your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newContent.title}
                      onChange={(e) => setNewContent(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter content title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={newContent.subject} onValueChange={(value) => setNewContent(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUBJECTS.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newContent.description}
                    onChange={(e) => setNewContent(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your content..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Content Type</Label>
                    <Select value={newContent.type} onValueChange={(value) => setNewContent(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CONTENT_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center space-x-2">
                              <type.icon className="h-4 w-4" />
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Price (₹)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newContent.price}
                      onChange={(e) => setNewContent(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newContent.duration || ''}
                      onChange={(e) => setNewContent(prev => ({ ...prev, duration: parseInt(e.target.value) || null }))}
                      placeholder="Optional"
                    />
                  </div>
                </div>

                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Beginner', 'Intermediate', 'Advanced', 'Practice Problems', 'Theory', 'Examples'].map((tag) => (
                      <Badge
                        key={tag}
                        variant={newContent.tags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={handleCreateContent}>
                    <Save className="h-4 w-4 mr-2" />
                    Create Content
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreating(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Content List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.map((item) => {
              const IconComponent = getContentIcon(item.type)
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <IconComponent className="h-3 w-3" />
                        <span className="capitalize">{item.type.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant={item.isPublished ? "default" : "secondary"}>
                        {item.isPublished ? 'Published' : 'Draft'}
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

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">
                        ₹{item.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{item.earnings.toLocaleString()} earned
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

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditContent(item.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTogglePublish(item.id)}
                      >
                        {item.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteContent(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Published Content Tab */}
        <TabsContent value="published">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.filter(item => item.isPublished).map((item) => {
              const IconComponent = getContentIcon(item.type)
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <IconComponent className="h-3 w-3" />
                        <span className="capitalize">{item.type.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="default">Published</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
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

                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">
                        ₹{item.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        ₹{item.earnings.toLocaleString()} earned
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditContent(item.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTogglePublish(item.id)}
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Drafts Tab */}
        <TabsContent value="drafts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.filter(item => !item.isPublished).map((item) => {
              const IconComponent = getContentIcon(item.type)
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <IconComponent className="h-3 w-3" />
                        <span className="capitalize">{item.type.replace('_', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary">Draft</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {item.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-green-600">
                        ₹{item.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        Not published
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleEditContent(item.id)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleTogglePublish(item.id)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Publish
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteContent(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
                <CardDescription>Your best-selling content by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {content
                    .sort((a, b) => b.earnings - a.earnings)
                    .slice(0, 5)
                    .map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{item.title}</p>
                            <p className="text-sm text-gray-500">{item.salesCount} sales</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{item.earnings.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">₹{item.price} each</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Performance</CardTitle>
                <CardDescription>Overview of your content metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Content</span>
                    <span className="font-semibold">{content.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Published</span>
                    <span className="font-semibold">{publishedContent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Drafts</span>
                    <span className="font-semibold">{content.length - publishedContent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Sales</span>
                    <span className="font-semibold">{totalSales}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Earnings</span>
                    <span className="font-semibold">₹{totalEarnings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Rating</span>
                    <span className="font-semibold">
                      {content.length > 0 ? (content.reduce((sum, item) => sum + item.rating, 0) / content.length).toFixed(1) : '0.0'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
