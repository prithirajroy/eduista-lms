import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Users, Star, Zap, Shield, Heart } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Eduista</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Get Started</Button>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <div className="flex items-center space-x-4">
                <Link href="/dashboard">
                  <Button>Go to Dashboard</Button>
                </Link>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🎓 Trusted by 10,000+ Students
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Best Tutors
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Find verified tutors, access quality educational content, and join a vibrant learning community. 
            Your journey to academic excellence starts here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Learning Today
                </Button>
              </SignUpButton>
            </SignedOut>
            
            <SignedIn>
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Go to Dashboard
                </Button>
              </Link>
            </SignedIn>
            
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Eduista?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We provide everything you need for a successful learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Verified Tutors</CardTitle>
              <CardDescription>
                All tutors are thoroughly verified with background checks and teaching credentials
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Quality Content</CardTitle>
              <CardDescription>
                Access premium educational materials, notes, and recorded classes from top tutors
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Smart Matching</CardTitle>
              <CardDescription>
                Our AI-powered system matches you with the perfect tutor based on your needs
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>
                Safe and secure payment processing with multiple options and transparent pricing
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Community Learning</CardTitle>
              <CardDescription>
                Join study groups, share knowledge, and learn together with peers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Flexible Learning</CardTitle>
              <CardDescription>
                Learn at your own pace with flexible scheduling and multiple learning formats
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">2,500+</div>
              <div className="text-gray-600">Verified Tutors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">50,000+</div>
              <div className="text-gray-600">Lessons Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students who are already learning with Eduista
          </p>
          
          <SignedOut>
            <SignUpButton mode="modal">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </SignUpButton>
          </SignedOut>
          
          <SignedIn>
            <Link href="/dashboard">
              <Button size="lg" className="w-full sm:w-auto">
                Go to Dashboard
              </Button>
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="h-6 w-6" />
                <span className="text-xl font-bold">Eduista</span>
              </div>
              <p className="text-gray-400">
                Connecting students with the best tutors for a brighter future.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Students</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Tutors</a></li>
                <li><a href="#" className="hover:text-white">Browse Content</a></li>
                <li><a href="#" className="hover:text-white">Study Groups</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">For Tutors</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Become a Tutor</a></li>
                <li><a href="#" className="hover:text-white">Sell Content</a></li>
                <li><a href="#" className="hover:text-white">Earn Money</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <div className="space-y-2">
                <SignedIn>
                  <div className="flex items-center space-x-2">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-6 h-6"
                        }
                      }}
                    />
                    <span className="text-gray-400 text-sm">Manage Account</span>
                  </div>
                </SignedIn>
                <SignedOut>
                  <div className="text-gray-400 text-sm">Sign in to manage your account</div>
                </SignedOut>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Eduista. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}