TaskFlow - Task Management System



A comprehensive task management system built with the MERN stack featuring role-based access control, team collaboration, and intuitive task tracking.

🌟 Features

🔐 Authentication & Security

JWT-based Authentication - Secure token-based login system
Role-Based Access Control - Three distinct user roles with granular permissions
Password Hashing - bcryptjs for secure password storage
Protected Routes - Automatic route protection based on user roles
👥 User Management

Admin Panel - Complete user management capabilities
Team Structure - Managers can oversee team members
Profile Management - Personal information and password updates
Role Assignment - Flexible user role management
📋 Task Management

Create & Assign Tasks - Managers and admins can create and assign tasks
Status Tracking - Pending, In Progress, Completed statuses
Priority Levels - Low, Medium, High priority classification
Due Date Management - Set and track task deadlines
Advanced Filtering - Filter by status, priority, assignee, and dates
Search Functionality - Quick search across task titles and descriptions
🗓️ Calendar & Scheduling

Calendar View - Visual timeline of all tasks
Date Range Filtering - View tasks within specific date ranges
Task Scheduling - Plan and organize tasks efficiently
🎯 Role-Based Features

👑 Admin

Full system access and user management
Create, edit, and delete any task or user
View system-wide statistics and analytics
Assign tasks to any team member
👨‍💼 Manager

Manage team tasks and assignments
Create tasks for team members
View team calendar and progress
Update team task status and details
👤 User

View assigned tasks only
Update personal task status
Access personal calendar view
Manage personal profile
🛠️ Tech Stack

Backend

Node.js - Runtime environment
Express.js - Web application framework
MongoDB - NoSQL database
Mongoose - MongoDB object modeling
JWT - JSON Web Tokens for authentication
bcryptjs - Password hashing
Express Validator - Input validation and sanitization
CORS - Cross-origin resource sharing
Dotenv - Environment variable management
Frontend

React 18 - Modern UI library with hooks
React Router DOM - Client-side routing
Axios - HTTP client for API calls
React Hot Toast - Beautiful notifications
React Icons - Comprehensive icon library
Tailwind CSS - Utility-first CSS framework
📁 Project Structure

text
```bash
taskflow/
├── 📁 backend/
│   ├── 📁 config/
│   │   └── 🔧 db.js                 # Database connection
│   ├── 📁 controllers/
│   │   ├── 🔧 authController.js      # Authentication logic
│   │   ├── 🔧 taskController.js      # Task business logic
│   │   └── 🔧 userController.js      # User management logic
│   ├── 📁 middleware/
│   │   ├── 🔧 auth.js               # Authentication middleware
│   │   └── 🔧 errorHandler.js       # Global error handling
│   ├── 📁 models/
│   │   ├── 🔧 Task.js               # Task schema and model
│   │   └── 🔧 User.js               # User schema and model
│   ├── 📁 routes/
│   │   ├── 🔧 authRoutes.js         # Authentication routes
│   │   ├── 🔧 taskRoutes.js         # Task management routes
│   │   └── 🔧 userRoutes.js         # User management routes
│   ├── 📁 utils/
│   │   └── 🔧 generateToken.js      # JWT token generation
│   ├── 🔧 server.js                 # Application entry point
│   └── 📄 .env                      # Environment variables
│
├── 📁 frontend/
│   ├── 📁 public/                   # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   │   └── 🎨 Layout.jsx        # Main layout component
│   │   ├── 📁 context/
│   │   │   └── 🔧 AuthContext.js    # Authentication context
│   │   ├── 📁 pages/
│   │   │   ├── 🎨 Dashboard.jsx     # Main dashboard
│   │   │   ├── 🎨 Login.jsx         # Login page
│   │   │   ├── 🎨 Signup.jsx        # Registration page
│   │   │   ├── 🎨 Tasks.jsx         # Task management
│   │   │   ├── 🎨 TaskForm.jsx      # Create/edit tasks
│   │   │   ├── 🎨 Users.jsx         # User management (Admin)
│   │   │   ├── 🎨 UserForm.jsx      # Create/edit users
│   │   │   ├── 🎨 Calendar.jsx      # Calendar view
│   │   │   └── 🎨 Profile.jsx       # User profile
│   │   ├── 📁 services/
│   │   │   └── 🔧 api.js            # API service layer
│   │   ├── 🎨 App.jsx               # Main App component
│   │   └── 🔧 main.jsx              # Application entry point
│   ├── 📄 package.json
│   └── 📄 tailwind.config.js        # Tailwind configuration
│
└── 📄 README.md                     # Project documentation
```
🚀 Quick Start

Prerequisites

Node.js (v18 or higher)
MongoDB (local installation or MongoDB Atlas)
npm or yarn package manager
Installation Steps

1. Clone the Repository

bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
2. Backend Setup

bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
Edit the .env file:

env
NODE_ENV=development
PORT=5050
MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=30d
3. Frontend Setup

bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
4. Start the Application

Start Backend Server:

bash
cd backend
npm run dev
Backend will run on http://localhost:5050

Start Frontend Development Server:

bash
cd frontend
npm run dev
Frontend will run on http://localhost:5173

5. Access the Application

Open your browser and navigate to http://localhost:5173

🔧 Configuration

Backend Environment Variables

Variable	Description	Default
NODE_ENV	Application environment	development
PORT	Server port	5050
MONGODB_URI	MongoDB connection string	mongodb://localhost:27017/taskflow
JWT_SECRET	Secret key for JWT tokens	Required
JWT_EXPIRE	JWT token expiration	30d
Frontend Configuration

The frontend is configured to connect to the backend API at http://localhost:5050/api. Update the base URL in services/api.js for production.

📚 API Documentation

Authentication Endpoints

🔐 Register User

http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user"
}
🔐 Login User

http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "123456"
}
🔐 Get Current User

http
GET /api/auth/me
Authorization: Bearer <token>
Task Endpoints (Protected)

📋 Get All Tasks

http
GET /api/tasks?status=pending&priority=high&page=1&limit=10
Authorization: Bearer <token>
➕ Create Task (Admin/Manager)

http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs for the API",
  "status": "pending",
  "priority": "high",
  "dueDate": "2024-12-31",
  "assignedTo": "64f1a2b3c5d6e7f8a9b0c1d2"
}
📅 Get Calendar Tasks

http
GET /api/tasks/calendar?start=2024-01-01&end=2024-12-31
Authorization: Bearer <token>
User Endpoints (Admin Only)

👥 Get All Users

http
GET /api/users?role=manager&search=john
Authorization: Bearer <token>
➕ Create User

http
POST /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "123456",
  "role": "user",
  "manager": "64f1a2b3c5d6e7f8a9b0c1d3"
}
🎯 User Roles & Permissions

👑 Administrator

Full system access
Create, read, update, delete all users
Manage all tasks across the organization
View system analytics and reports
Assign tasks to any team member
👨‍💼 Manager

Team management capabilities
Create and assign tasks to team members
View and update team tasks
Access team calendar and progress
Cannot manage users or delete tasks
👤 Regular User

Personal task management
View assigned tasks only
Update personal task status
Access personal calendar
Manage own profile information
🎨 UI Components Overview

Layout Component

Responsive sidebar navigation
Mobile-friendly hamburger menu
User profile display
Role-based menu items
Logout functionality
Dashboard

Role-specific overview cards
Quick statistics and metrics
Recent activity feed
Quick action buttons
Task Management

Task list with advanced filtering
Status and priority badges
Pagination support
Bulk actions (where applicable)
User Management (Admin Only)

User table with search and filters
Role assignment interface
Manager assignment for users
User creation and editing
🚀 Deployment

Backend Deployment (Heroku/Railway)

Prepare for production:

bash
# Set production environment variables
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
Deploy to Heroku:

bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-taskflow-backend

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
Frontend Deployment (Vercel/Netlify)

Build the project:

bash
npm run build
Update API configuration:

javascript
// In services/api.js
baseURL: "https://your-backend-domain.com/api"
Deploy to Vercel:

bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
🐛 Troubleshooting

Common Issues

MongoDB Connection Issues

bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB service
sudo systemctl start mongod
Port Already in Use

bash
# Find process using port 5050
lsof -i :5050

# Kill the process
kill -9 <PID>
CORS Errors

Ensure backend CORS is configured for frontend URL
Check if requests include proper headers
Verify frontend API base URL
JWT Token Issues

Verify JWT_SECRET is set in environment variables
Check token expiration settings
Ensure tokens are included in request headers
Debug Mode

Enable detailed logging by setting:

env
NODE_ENV=development
DEBUG=true
📝 Available Scripts

Backend Scripts

bash
npm run dev      # Start development server with nodemon
npm start        # Start production server
npm test         # Run test suite
Frontend Scripts

bash
npm run dev      # Start development server
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
🤝 Contributing

We welcome contributions! Please follow these steps:

Fork the repository
Create a feature branch

bash
git checkout -b feature/amazing-feature
Commit your changes

bash
git commit -m 'Add some amazing feature'
Push to the branch

bash
git push origin feature/amazing-feature
Open a Pull Request
Development Guidelines

Follow existing code style and patterns
Write meaningful commit messages
Add tests for new functionality
Update documentation as needed
📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support

If you encounter any issues or have questions:

Check the documentation - This README and code comments
Search existing issues - Your question might already be answered
Create a new issue - Provide detailed information about your problem
Contact the team - For urgent matters
Community Resources

📖 Full Documentation
🐛 Issue Tracker
💬 Discussions
📋 Project Board
🔄 Changelog

v1.0.0 (Current)

✅ Initial release with core task management
✅ Role-based access control
✅ User authentication and authorization
✅ Calendar view and scheduling
✅ Responsive design with Tailwind CSS
Planned Features

🔄 Real-time notifications
📊 Advanced analytics and reporting
📱 Mobile application
🔔 Email notifications
📎 File attachments for tasks
🏷️ Task categories and tags
<div align="center">
Built with ❤️ using the MERN Stack

Report Bug · Request Feature

</div>
