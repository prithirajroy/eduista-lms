import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          clerk_id: string
          email: string
          full_name: string
          role: 'student' | 'parent' | 'tutor'
          avatar_url?: string
          bio?: string
          subjects?: string[]
          budget_range?: string
          languages?: string[]
          location?: string
          experience_years?: number
          hourly_rate?: number
          rating?: number
          total_reviews?: number
          is_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          clerk_id: string
          email: string
          full_name: string
          role: 'student' | 'parent' | 'tutor'
          avatar_url?: string
          bio?: string
          subjects?: string[]
          budget_range?: string
          languages?: string[]
          location?: string
          experience_years?: number
          hourly_rate?: number
          rating?: number
          total_reviews?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          clerk_id?: string
          email?: string
          full_name?: string
          role?: 'student' | 'parent' | 'tutor'
          avatar_url?: string
          bio?: string
          subjects?: string[]
          budget_range?: string
          languages?: string[]
          location?: string
          experience_years?: number
          hourly_rate?: number
          rating?: number
          total_reviews?: number
          is_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      tutor_content: {
        Row: {
          id: string
          tutor_id: string
          title: string
          description: string
          type: 'notes' | 'pdf' | 'video' | 'live_class'
          price: number
          file_url?: string
          thumbnail_url?: string
          duration?: number
          subject: string
          tags: string[]
          is_published: boolean
          sales_count: number
          rating: number
          total_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          tutor_id: string
          title: string
          description: string
          type: 'notes' | 'pdf' | 'video' | 'live_class'
          price: number
          file_url?: string
          thumbnail_url?: string
          duration?: number
          subject: string
          tags: string[]
          is_published?: boolean
          sales_count?: number
          rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          tutor_id?: string
          title?: string
          description?: string
          type?: 'notes' | 'pdf' | 'video' | 'live_class'
          price?: number
          file_url?: string
          thumbnail_url?: string
          duration?: number
          subject?: string
          tags?: string[]
          is_published?: boolean
          sales_count?: number
          rating?: number
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          type: 'coin_purchase' | 'subscription' | 'content_purchase' | 'commission'
          amount: number
          currency: string
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          payment_id?: string
          description: string
          metadata?: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'coin_purchase' | 'subscription' | 'content_purchase' | 'commission'
          amount: number
          currency: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          payment_id?: string
          description: string
          metadata?: Record<string, unknown>
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'coin_purchase' | 'subscription' | 'content_purchase' | 'commission'
          amount?: number
          currency?: string
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          payment_method?: string
          payment_id?: string
          description?: string
          metadata?: Record<string, unknown>
          created_at?: string
        }
      }
      user_coins: {
        Row: {
          id: string
          user_id: string
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      community_posts: {
        Row: {
          id: string
          user_id: string
          type: 'post' | 'reel' | 'live'
          content: string
          media_urls?: string[]
          tags: string[]
          likes_count: number
          comments_count: number
          shares_count: number
          is_published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: 'post' | 'reel' | 'live'
          content: string
          media_urls?: string[]
          tags: string[]
          likes_count?: number
          comments_count?: number
          shares_count?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'post' | 'reel' | 'live'
          content?: string
          media_urls?: string[]
          tags?: string[]
          likes_count?: number
          comments_count?: number
          shares_count?: number
          is_published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      post_likes: {
        Row: {
          id: string
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          created_at?: string
        }
      }
      post_comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          parent_id?: string
          likes_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          parent_id?: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          parent_id?: string
          likes_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      tutor_contacts: {
        Row: {
          id: string
          student_id: string
          tutor_id: string
          status: 'pending' | 'accepted' | 'declined'
          message?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          student_id: string
          tutor_id: string
          status?: 'pending' | 'accepted' | 'declined'
          message?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          tutor_id?: string
          status?: 'pending' | 'accepted' | 'declined'
          message?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
