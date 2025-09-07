'use client'

import { useUser } from '@clerk/nextjs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  BookOpen, 
  Users, 
  Star, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  Search,
  Plus,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user } = useUser()

  // Mock data - in real app, this would come from Supabase
  const stats = {
    totalTutors: 12,
    completedLessons: 45,
    coinsBalance: 1200,
    upcomingSessions: 3
  }

  const recentTutors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      rating: 4.9,
      avatar: '/avatars/sarah.jpg',
      lastLesson: '2 days ago'
    },
    {
      id: '2', 
      name: 'Prof. Michael Chen',
      subject: 'Physics',
      rating: 4.8,
      avatar: '/avatars/michael.jpg',
      lastLesson: '1 week ago'
    },
    {
      id: '3',
      name: 'Ms. Emily Davis',
      subject: 'English Literature',
      rating: 4.9,
      avatar: '/avatars/emily.jpg',
      lastLesson: '3 days ago'
    }
  ]

  const upcomingSessions = [
    {
      id: '1',
      tutor: 'Dr. Sarah Johnson',
      subject: 'Calculus',
      time: 'Today, 3:00 PM',
      type: 'Online'
    },
    {
      id: '2',
      tutor: 'Prof. Michael Chen', 
      subject: 'Quantum Physics',
      time: 'Tomorrow, 10:00 AM',
      type: 'Online'
    },
    {
      id: '3',
      tutor: 'Ms. Emily Davis',
      subject: 'Shakespeare Analysis',
      time: 'Friday, 2:00 PM',
      type: 'Online'
    }
  ]

  const communityPosts = [
    {
      id: '1',
      author: 'Alex Kumar',
      content: 'Just finished an amazing calculus session with Dr. Sarah! Highly recommend her teaching style.',
      likes: 12,
      comments: 3,
      time: '2 hours ago'
    },
    {
      id: '2',
      author: 'Priya Sharma',
      content: 'Looking for study partners for physics. Anyone interested in forming a study group?',
      likes: 8,
      comments: 5,
      time: '4 hours ago'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.firstName || 'Student'}! 👋
        </h1>
        <p className="text-blue-100">
          Ready to continue your learning journey? Let&apos;s make today productive!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTutors}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Lessons</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedLessons}</div>
            <p className="text-xs text-muted-foreground">
              +12 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coin Balance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.coinsBalance}</div>
            <p className="text-xs text-muted-foreground">
              Available for use
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingSessions}</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tutors */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Tutors</CardTitle>
              <Link href="/dashboard/tutors">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>
              Your recently connected tutors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTutors.map((tutor) => (
              <div key={tutor.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={tutor.avatar} />
                  <AvatarFallback>{tutor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {tutor.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {tutor.subject}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{tutor.rating}</span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tutor.lastLesson}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Upcoming Sessions</CardTitle>
              <Link href="/dashboard/schedule">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <CardDescription>
              Your scheduled learning sessions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {session.tutor}
                  </p>
                  <p className="text-sm text-gray-500">
                    {session.subject}
                  </p>
                  <p className="text-xs text-gray-400">
                    {session.time}
                  </p>
                </div>
                <Badge variant="outline">
                  {session.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Community Feed */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Community Feed</CardTitle>
            <Link href="/dashboard/community">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <CardDescription>
            Latest updates from the Eduista community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              <p className="text-sm text-gray-900 mb-3">{post.content}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-gray-700">
                  <MessageSquare className="h-4 w-4" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and shortcuts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/dashboard/tutors">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Search className="h-6 w-6" />
                <span>Find New Tutors</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/community">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Plus className="h-6 w-6" />
                <span>Create Post</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/wallet">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <TrendingUp className="h-6 w-6" />
                <span>Buy Coins</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
