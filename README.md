# CodeNChip - National Hackathon Platform

A comprehensive full-stack web application for managing national hackathons with Google OAuth authentication, team management, project submissions, and administrative controls.

## 🚀 Features

### **For Team Leaders**
- **Google OAuth Authentication** - Secure login with Google accounts
- **Team Creation** - Create teams with 2-4 members
- **Member Management** - Add team member details (name, email, phone)
- **Project Submission** - Submit project details with themes, ideology, and methodology
- **Submission Tracking** - Real-time status updates for project submissions

### **For Team Members**
- **Google OAuth Login** - Must match email added by team leader
- **Team Dashboard** - Collaborative workspace with team information
- **Submission Status** - View project submission status and details

### **For Administrators**
- **Team Management** - View all teams and member details
- **Submission Management** - Review and update project status (Selected/Rejected/Waiting)
- **CSV Export** - Download all teams and submissions data
- **Bulk Email System** - Send emails to selected groups (all teams, selected teams, etc.)
- **Statistics Dashboard** - Overview of participation and submission metrics

## 🛠 Technology Stack

- **Frontend**: Next.js 14 with App Router, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: NeonDB (PostgreSQL) with Prisma ORM
- **Authentication**: NextAuth.js with Google OAuth
- **Email**: Nodemailer for bulk email functionality
- **Styling**: TailwindCSS with custom components
- **Icons**: Lucide React

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- NeonDB account
- Google OAuth credentials
- SMTP email service (Gmail recommended)

### 1. Clone and Install
\`\`\`bash
git clone <your-repo-url>
cd codenchip
npm install
\`\`\`

### 2. Environment Variables
Create a \`.env\` file in the root directory:

\`\`\`env
# Database
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration (Nodemailer)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FROM_EMAIL="codenchip@yourorganization.com"

# Admin Configuration
ADMIN_EMAILS="admin1@example.com,admin2@example.com"

# Application Configuration
APP_NAME="CodeNChip Hackathon"
APP_URL="http://localhost:3000"
\`\`\`

### 3. Database Setup

#### Set up NeonDB:
1. Create a NeonDB account at [neon.tech](https://neon.tech)
2. Create a new database
3. Copy the connection string to \`DATABASE_URL\`

#### Run database migrations:
\`\`\`bash
npx prisma generate
npx prisma migrate dev --name init
\`\`\`

### 4. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - \`http://localhost:3000/api/auth/callback/google\`
   - \`https://yourdomain.com/api/auth/callback/google\`

### 5. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an app password
3. Use the app password in \`SMTP_PASS\`

### 6. Run the Application
\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:3000\` to see the application.

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth.js
│   │   ├── teams/             # Team management
│   │   ├── submissions/       # Project submissions
│   │   └── admin/             # Admin functions
│   ├── dashboard/             # Team dashboard
│   ├── admin/                 # Admin panel
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── dashboard/             # Dashboard components
│   ├── admin/                 # Admin components
│   └── ...                    # Landing page components
├── lib/
│   ├── auth.ts                # NextAuth configuration
│   ├── db.ts                  # Database connection
│   ├── email.ts               # Email service
│   └── utils.ts               # Utility functions
├── types/
│   └── next-auth.d.ts         # TypeScript definitions
└── prisma/
    └── schema.prisma          # Database schema
\`\`\`

## 🎯 Key Features Implemented

### Authentication & Authorization
- ✅ Google OAuth integration with NextAuth.js
- ✅ Role-based access control (Admin, Leader, Member)
- ✅ Protected routes and API endpoints
- ✅ Session management

### Team Management
- ✅ Team creation with validation
- ✅ Member email verification system
- ✅ Team information display
- ✅ Member status tracking

### Project Submissions
- ✅ Comprehensive submission form
- ✅ 16 different project themes
- ✅ Project type selection (Software/Hardware/Both)
- ✅ Guide information collection
- ✅ Status tracking (Waiting/Selected/Rejected)

### Admin Panel
- ✅ Statistics dashboard
- ✅ Team and submission management
- ✅ Status update functionality
- ✅ CSV export for teams and submissions
- ✅ Bulk email system with group targeting

### Email System
- ✅ Automated welcome emails
- ✅ Submission confirmation emails
- ✅ Status update notifications
- ✅ Bulk email with group filtering
- ✅ Email templates

## 🎨 UI/UX Features

- **Responsive Design** - Works on all devices
- **Modern Interface** - Clean, professional design
- **Interactive Components** - Smooth animations and transitions
- **Accessible** - WCAG compliant design patterns
- **Real-time Updates** - Live status updates and notifications

## 🔒 Security Features

- **OAuth Authentication** - Secure Google login
- **Protected API Routes** - Server-side authentication checks
- **Role-based Access** - Granular permission system
- **Input Validation** - Client and server-side validation
- **SQL Injection Protection** - Prisma ORM with parameterized queries

## 📊 Database Schema

The application uses a comprehensive PostgreSQL schema with:
- **Users** - Authentication and role management
- **Teams** - Team information and relationships
- **TeamMembers** - Member details and contact info
- **ProjectSubmissions** - Complete project details
- **AdminEmails** - Admin user management

## 🚀 Deployment

### Production Environment Variables
Update your \`.env\` file for production:
- Change \`NEXTAUTH_URL\` to your domain
- Use production database URL
- Update OAuth redirect URIs
- Configure production SMTP settings

### Deploy to Vercel
\`\`\`bash
npm run build
npx vercel --prod
\`\`\`

## 📝 Usage Guide

### For Organizers
1. **Setup Admin Accounts**: Add admin emails to \`ADMIN_EMAILS\`
2. **Configure Email Templates**: Customize email content in \`src/lib/email.ts\`
3. **Set Registration Dates**: Update timeline in landing page
4. **Monitor Submissions**: Use admin panel for real-time tracking

### For Participants
1. **Registration**: Sign in with Google account
2. **Team Creation**: Leaders create teams and add members
3. **Project Submission**: Submit detailed project information
4. **Status Tracking**: Monitor submission status in dashboard

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for CodeNChip National Hackathon**
