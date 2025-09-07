'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Wallet, 
  Coins, 
  CreditCard, 
  TrendingUp, 
  Download, 
  Plus,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  Users,
  BookOpen
} from 'lucide-react'

// Mock data - in real app, this would come from Supabase
const coinPacks = [
  {
    id: '1',
    name: 'Starter Pack',
    coins: 100,
    price: 100,
    bonus: 0,
    popular: false
  },
  {
    id: '2',
    name: 'Popular Pack',
    coins: 500,
    price: 400,
    bonus: 100,
    popular: true
  },
  {
    id: '3',
    name: 'Value Pack',
    coins: 1000,
    price: 750,
    bonus: 250,
    popular: false
  },
  {
    id: '4',
    name: 'Premium Pack',
    coins: 2500,
    price: 1800,
    bonus: 700,
    popular: false
  }
]

const subscriptionPlans = [
  {
    id: '1',
    name: 'Basic',
    price: 299,
    duration: 'month',
    features: [
      '5 free tutor contacts per month',
      'Access to community posts',
      'Basic support'
    ],
    popular: false
  },
  {
    id: '2',
    name: 'Premium',
    price: 999,
    duration: 'month',
    features: [
      'Unlimited tutor contacts',
      'Priority support',
      'Access to premium content',
      'Advanced search filters',
      'Study group creation'
    ],
    popular: true
  }
]

const transactions = [
  {
    id: '1',
    type: 'coin_purchase',
    amount: 500,
    currency: 'INR',
    status: 'completed',
    description: 'Purchased Popular Pack (500 coins)',
    date: '2024-01-15',
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    type: 'content_purchase',
    amount: -50,
    currency: 'coins',
    status: 'completed',
    description: 'Purchased Calculus Notes by Dr. Sarah',
    date: '2024-01-14',
    paymentMethod: 'Coins'
  },
  {
    id: '3',
    type: 'subscription',
    amount: 999,
    currency: 'INR',
    status: 'completed',
    description: 'Premium Subscription - Monthly',
    date: '2024-01-10',
    paymentMethod: 'UPI'
  },
  {
    id: '4',
    type: 'content_purchase',
    amount: -25,
    currency: 'coins',
    status: 'completed',
    description: 'Purchased Physics Video by Prof. Chen',
    date: '2024-01-12',
    paymentMethod: 'Coins'
  },
  {
    id: '5',
    type: 'coin_purchase',
    amount: 1000,
    currency: 'INR',
    status: 'pending',
    description: 'Purchased Value Pack (1000 coins)',
    date: '2024-01-16',
    paymentMethod: 'Net Banking'
  }
]

const usageStats = {
  totalCoinsSpent: 75,
  totalMoneySpent: 1798,
  tutorContactsUsed: 3,
  tutorContactsLimit: 5,
  subscriptionActive: true,
  subscriptionType: 'Premium',
  subscriptionExpiry: '2024-02-10'
}

export default function WalletPage() {
  const [selectedCoinPack, setSelectedCoinPack] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')

  const handlePurchaseCoins = (packId: string) => {
    // In real app, this would integrate with payment gateway
    console.log('Purchase coins:', packId)
  }

  const handleSubscribe = (planId: string) => {
    // In real app, this would integrate with payment gateway
    console.log('Subscribe to plan:', planId)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'pending':
        return 'text-yellow-600'
      case 'failed':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wallet & Payments</h1>
        <p className="text-gray-600 mt-2">
          Manage your coins, subscriptions, and payment history
        </p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coin Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">425</div>
            <p className="text-xs text-muted-foreground">
              Available for use
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tutor Contacts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {usageStats.tutorContactsUsed}/{usageStats.tutorContactsLimit}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subscription</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usageStats.subscriptionType}</div>
            <p className="text-xs text-muted-foreground">
              Expires {usageStats.subscriptionExpiry}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="coins" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="coins">Buy Coins</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="history">Transaction History</TabsTrigger>
        </TabsList>

        {/* Buy Coins Tab */}
        <TabsContent value="coins" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Coins</CardTitle>
              <CardDescription>
                Buy coins to access premium content and contact tutors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coinPacks.map((pack) => (
                  <Card 
                    key={pack.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      pack.popular ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedCoinPack(pack.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{pack.name}</CardTitle>
                        {pack.popular && (
                          <Badge variant="default">Popular</Badge>
                        )}
                      </div>
                      <CardDescription>
                        {pack.coins} coins
                        {pack.bonus > 0 && (
                          <span className="text-green-600 ml-2">
                            +{pack.bonus} bonus
                          </span>
                        )}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold mb-4">
                        ₹{pack.price}
                      </div>
                      <Button 
                        className="w-full"
                        onClick={() => handlePurchaseCoins(pack.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Purchase
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">This Month</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Coins Spent:</span>
                      <span className="font-medium">{usageStats.totalCoinsSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Tutor Contacts:</span>
                      <span className="font-medium">
                        {usageStats.tutorContactsUsed}/{usageStats.tutorContactsLimit}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Total Spent</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">This Month:</span>
                      <span className="font-medium">₹{usageStats.totalMoneySpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">All Time:</span>
                      <span className="font-medium">₹{usageStats.totalMoneySpent + 500}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
              <CardDescription>
                Choose a plan that fits your learning needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptionPlans.map((plan) => (
                  <Card 
                    key={plan.id} 
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      plan.popular ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        {plan.popular && (
                          <Badge variant="default">Popular</Badge>
                        )}
                      </div>
                      <CardDescription>
                        ₹{plan.price}/{plan.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full"
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => handleSubscribe(plan.id)}
                      >
                        {usageStats.subscriptionActive && usageStats.subscriptionType === plan.name 
                          ? 'Current Plan' 
                          : 'Subscribe'
                        }
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Subscription */}
          {usageStats.subscriptionActive && (
            <Card>
              <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{usageStats.subscriptionType} Plan</h3>
                    <p className="text-sm text-gray-600">
                      Expires on {usageStats.subscriptionExpiry}
                    </p>
                  </div>
                  <Button variant="outline">
                    Manage Subscription
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Transaction History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                View all your payments and transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(transaction.status)}
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.date} • {transaction.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.amount > 0 ? '+' : ''}
                        {transaction.currency === 'INR' ? '₹' : ''}
                        {Math.abs(transaction.amount)}
                        {transaction.currency === 'coins' ? ' coins' : ''}
                      </p>
                      <p className={`text-sm ${getStatusColor(transaction.status)}`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Statement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

