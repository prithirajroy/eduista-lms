# Eduista - Full-Stack Learning Platform

Eduista is a comprehensive learning platform that connects students with verified tutors, provides access to quality educational content, and fosters a vibrant learning community.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure signup/login with Clerk
- **Role-based Access**: Students, Parents, and Tutors with different permissions
- **Tutor Matching**: AI-powered matching system with filters
- **Community Feed**: Posts, reels, and live sessions
- **Coin System**: Freemium model with coin-based purchases
- **Subscription Plans**: Monthly plans for unlimited access
- **Content Marketplace**: Tutors can sell notes, videos, and courses
- **Tutor Management**: Complete profile and content management system
- **Payment Integration**: Secure payment processing

### User Roles
- **Students**: Find tutors, purchase content, join community
- **Parents**: Find tutors for their children, manage payments
- **Tutors**: Create profiles, sell content, earn money

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **shadcn/ui** for UI components
- **Framer Motion** for animations
- **React Hook Form** with Zod validation

### Backend & Database
- **Supabase** for PostgreSQL database
- **Supabase Auth** for authentication
- **Supabase Storage** for file uploads
- **Row Level Security (RLS)** for data protection

### Authentication
- **Clerk** for user management
- **Role-based access control**
- **Session management**
- **UserButton** for account management and logout
- **Middleware protection** for dashboard routes

### Deployment
- **Vercel** for frontend hosting
- **Supabase** for backend services

## 📁 Project Structure

```
eduista/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── dashboard/          # Dashboard pages
│   │   ├── sign-in/           # Authentication pages
│   │   ├── sign-up/
│   │   └── onboarding/        # User onboarding flow
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   └── lib/
│       ├── supabase.ts        # Supabase client & types
│       └── utils.ts           # Utility functions
├── supabase-schema.sql        # Database schema
├── seed-data.sql              # Sample data
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account
- Clerk account

### 1. Clone and Install

```bash
git clone <repository-url>
cd eduista
npm install
```

### 2. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a new Supabase project
2. Run the schema file in your Supabase SQL editor:
   ```sql
   -- Copy and paste contents of supabase-schema.sql
   ```
3. Run the seed data file:
   ```sql
   -- Copy and paste contents of seed-data.sql
   ```

### 4. Clerk Setup

1. Create a Clerk account and application
2. Configure the following settings:
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`
   - **After sign-in URL**: `/dashboard`
   - **After sign-up URL**: `/onboarding`
3. Copy your API keys to `.env.local`

### 5. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📊 Database Schema

### Core Tables
- **profiles**: User profiles with role-based data
- **tutor_content**: Educational content for sale
- **transactions**: Payment and coin transactions
- **user_coins**: Coin balance tracking
- **community_posts**: Social feed posts
- **tutor_contacts**: Student-tutor connections

### Key Features
- Row Level Security (RLS) enabled
- Automatic timestamps with triggers
- Optimized indexes for performance
- Foreign key constraints for data integrity

## 🎨 UI Components

Built with shadcn/ui components:
- **Button**: Various styles and sizes
- **Card**: Content containers
- **Input/Textarea**: Form inputs
- **Select**: Dropdown selections
- **Badge**: Status indicators
- **Avatar**: User profile images
- **Tabs**: Content organization
- **Dialog**: Modal dialogs
- **Toast**: Notifications

## 🔐 Security Features

- **Clerk Authentication**: Secure user management
- **Supabase RLS**: Database-level security
- **Role-based Access**: Different permissions per user type
- **Input Validation**: Zod schema validation
- **CSRF Protection**: Built-in Next.js protection

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚀 Deployment

### Vercel Deployment
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Supabase Deployment
1. Your Supabase project is already hosted
2. Configure production environment variables
3. Update CORS settings for production domain

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component-based architecture

## 📈 Future Enhancements

### Phase 2 Features
- **AI Tutor Matching**: Machine learning-based recommendations
- **Live Classes**: Real-time video sessions
- **Mobile App**: React Native application
- **Advanced Analytics**: Learning progress tracking
- **Gamification**: Points, badges, and achievements

### Technical Improvements
- **Caching**: Redis for improved performance
- **CDN**: Global content delivery
- **Monitoring**: Error tracking and analytics
- **Testing**: Unit and integration tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Contact the development team

---

Built with ❤️ using Next.js, Supabase, and Clerk