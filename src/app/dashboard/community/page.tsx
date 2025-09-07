'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Plus, 
  Search,
  Filter,
  TrendingUp,
  Users,
  BookOpen,
  Video,
  Radio
} from 'lucide-react'

// Mock data - in real app, this would come from Supabase
const posts = [
  {
    id: '1',
    author: {
      name: 'Alex Kumar',
      avatar: '/avatars/alex.jpg',
      role: 'Student',
      isVerified: true
    },
    type: 'post',
    content: 'Just finished an amazing calculus session with Dr. Sarah! Her teaching style is incredible. Highly recommend her for anyone struggling with calculus concepts.',
    media: null,
    tags: ['Mathematics', 'Calculus', 'Study Tips'],
    likes: 24,
    comments: 8,
    shares: 3,
    time: '2 hours ago',
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Priya Sharma',
      avatar: '/avatars/priya.jpg',
      role: 'Student',
      isVerified: false
    },
    type: 'reel',
    content: 'Quick physics tip: Remember the right-hand rule for magnetic fields! 🧲',
    media: '/media/physics-tip.mp4',
    tags: ['Physics', 'Study Tips', 'Quick Tips'],
    likes: 45,
    comments: 12,
    shares: 7,
    time: '4 hours ago',
    isLiked: true
  },
  {
    id: '3',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: '/avatars/sarah.jpg',
      role: 'Tutor',
      isVerified: true
    },
    type: 'post',
    content: 'Excited to announce my new advanced calculus course! We\'ll cover multivariable calculus, vector fields, and more. Limited seats available.',
    media: null,
    tags: ['Mathematics', 'Course Announcement', 'Calculus'],
    likes: 67,
    comments: 23,
    shares: 15,
    time: '6 hours ago',
    isLiked: false
  },
  {
    id: '4',
    author: {
      name: 'Rahul Mehta',
      avatar: '/avatars/rahul.jpg',
      role: 'Student',
      isVerified: false
    },
    type: 'post',
    content: 'Looking for study partners for chemistry. Anyone interested in forming a study group for organic chemistry? We can meet online twice a week.',
    media: null,
    tags: ['Chemistry', 'Study Group', 'Organic Chemistry'],
    likes: 18,
    comments: 15,
    shares: 4,
    time: '8 hours ago',
    isLiked: false
  },
  {
    id: '5',
    author: {
      name: 'Ms. Emily Davis',
      avatar: '/avatars/emily.jpg',
      role: 'Tutor',
      isVerified: true
    },
    type: 'live',
    content: 'Live Q&A session on Shakespeare\'s Hamlet! Join me for an interactive discussion about the themes and characters.',
    media: null,
    tags: ['English Literature', 'Shakespeare', 'Live Session'],
    likes: 89,
    comments: 34,
    shares: 22,
    time: '1 day ago',
    isLiked: true
  }
]

const trendingTopics = [
  { name: 'Calculus', posts: 156, trend: 'up' },
  { name: 'Physics', posts: 134, trend: 'up' },
  { name: 'Study Groups', posts: 98, trend: 'up' },
  { name: 'Exam Tips', posts: 87, trend: 'down' },
  { name: 'Chemistry', posts: 76, trend: 'up' }
]

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newPostTags, setNewPostTags] = useState('')
  const [showCreatePost, setShowCreatePost] = useState(false)

  const handleLike = (postId: string) => {
    // In real app, this would update the database
    console.log('Like post:', postId)
  }

  const handleComment = (postId: string) => {
    // In real app, this would open a comment modal
    console.log('Comment on post:', postId)
  }

  const handleShare = (postId: string) => {
    // In real app, this would open share options
    console.log('Share post:', postId)
  }

  const handleCreatePost = () => {
    // In real app, this would save to database
    console.log('Create post:', { content: newPostContent, tags: newPostTags })
    setNewPostContent('')
    setNewPostTags('')
    setShowCreatePost(false)
  }

  const filteredPosts = posts.filter(post => 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Community</h1>
          <p className="text-gray-600 mt-2">
            Connect, learn, and share with fellow students and tutors
          </p>
        </div>
        <Button onClick={() => setShowCreatePost(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search posts, topics, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Create Post Modal */}
          {showCreatePost && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind? Share your thoughts, ask questions, or start a discussion..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  rows={4}
                />
                <Input
                  placeholder="Add tags (comma separated)"
                  value={newPostTags}
                  onChange={(e) => setNewPostTags(e.target.value)}
                />
                <div className="flex space-x-2">
                  <Button onClick={handleCreatePost} disabled={!newPostContent.trim()}>
                    Post
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="reels">Reels</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.role}
                          </Badge>
                          {post.author.isVerified && (
                            <Badge variant="default" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {post.type === 'reel' && <Video className="h-4 w-4 text-blue-500" />}
                        {post.type === 'live' && <Radio className="h-4 w-4 text-red-500" />}
                        {post.type === 'post' && <BookOpen className="h-4 w-4 text-gray-500" />}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-900">{post.content}</p>
                    
                    {post.media && (
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Video content</p>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <button 
                          className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                          onClick={() => handleComment(post.id)}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
                          onClick={() => handleShare(post.id)}
                        >
                          <Share2 className="h-5 w-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="posts">
              {filteredPosts.filter(post => post.type === 'post').map((post) => (
                <Card key={post.id}>
                  {/* Same post structure as above */}
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.role}
                          </Badge>
                          {post.author.isVerified && (
                            <Badge variant="default" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-900">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <button 
                          className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                          onClick={() => handleComment(post.id)}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
                          onClick={() => handleShare(post.id)}
                        >
                          <Share2 className="h-5 w-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="reels">
              {filteredPosts.filter(post => post.type === 'reel').map((post) => (
                <Card key={post.id}>
                  {/* Same post structure as above */}
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.role}
                          </Badge>
                          {post.author.isVerified && (
                            <Badge variant="default" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                      <Video className="h-4 w-4 text-blue-500" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-900">{post.content}</p>
                    
                    <div className="bg-gray-100 rounded-lg p-4 text-center">
                      <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Video content</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <button 
                          className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                          onClick={() => handleComment(post.id)}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
                          onClick={() => handleShare(post.id)}
                        >
                          <Share2 className="h-5 w-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="live">
              {filteredPosts.filter(post => post.type === 'live').map((post) => (
                <Card key={post.id}>
                  {/* Same post structure as above */}
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{post.author.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {post.author.role}
                          </Badge>
                          {post.author.isVerified && (
                            <Badge variant="default" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{post.time}</p>
                      </div>
                      <Radio className="h-4 w-4 text-red-500" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-gray-900">{post.content}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-6">
                        <button 
                          className={`flex items-center space-x-2 ${post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <Heart className={`h-5 w-5 ${post.isLiked ? 'fill-current' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
                          onClick={() => handleComment(post.id)}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span>{post.comments}</span>
                        </button>
                        
                        <button 
                          className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
                          onClick={() => handleShare(post.id)}
                        >
                          <Share2 className="h-5 w-5" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Topics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Trending Topics</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {trendingTopics.map((topic) => (
                <div key={topic.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">#{topic.name}</span>
                    <TrendingUp className={`h-4 w-4 ${topic.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                  <span className="text-sm text-gray-500">{topic.posts} posts</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Study Groups */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Study Groups</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-center py-4">
                <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">No active study groups</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Create Group
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

