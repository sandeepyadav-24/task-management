# TaskFlow – Intelligent Task Management Platform

TaskFlow is a powerful and intelligent task management platform that helps users organize, track, and complete their tasks effortlessly. With AI-powered task suggestions, real-time collaboration, advanced analytics, and an intuitive dashboard, TaskFlow ensures a seamless productivity experience. It features JWT-based authentication, secure data handling, and a user-friendly interface to make task management hassle-free.


## Tech Stack

**Client:** 
- **React** - Component-based UI development.  
- **React Router DOM** - Client-side routing for seamless navigation.
- **TailwindCSS** - Utility-first CSS framework for fast and responsive styling.  
- **JavaScript (ES6+)** - Core language powering the frontend logic.
- **Framer Motion** - Smooth and modern animations for UI interactions.
- **Axios** - Promise-based HTTP client for API requests.
- **React Hot Toast** - Lightweight toast notifications. 
- **React Icons** - Extensive library of customizable icons.

**Server:** 
- **Express.js** - Minimal and robust web framework for building APIs.
- **bcrypt** - Secure password hashing.
- **CORS** - Middleware to manage cross-origin resource sharing.
- **dotenv** - Manages environment variables securely.
- **express-validator** - Middleware for validating and sanitizing inputs.
- **jsonwebtoken (JWT)** - Token-based authentication.
- **Mongoose** - ODM for interacting with MongoDB.
- **Nodemon** - Automatically restarts server during development.

**Deployment**
- **Render** - Backend hosting platform for APIs and servers.
- **Vercel** - Frontend hosting for fast and reliable deployments.

## Key Features Explained
### Intelligent Task Organization
TaskFlow uses AI algorithms to help you organize tasks efficiently. The system learns from your task patterns and suggests optimal ways to categorize and prioritize your work.

### Real-Time Collaboration
Work with your team in real-time. Share tasks, assign responsibilities, and communicate through integrated comments and attachments. Everyone stays on the same page.

### Advanced Analytics
Get insights into your productivity with comprehensive analytics. Track completion rates, identify bottlenecks, and optimize your workflow with data-driven recommendations.

###  Smart Notifications
Receive intelligent notifications for upcoming deadlines, task assignments, and team updates. Customize notification preferences to stay informed without being overwhelmed.

### Customizable Workflows
Create custom workflows that match your team's process. Set up automation rules, create task templates, and automate repetitive tasks.


## API Reference
### Authentication Endpoints
#### Sign Up 

```http
  POST /api/auth/signup
  Content-Type: application/json

  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
```



#### Sign In

```http
  POST /api/auth/signin
  Content-Type: application/json

  {
    "email": "user@example.com",
    "password": "password123"
  }
```



#### Log Out

```http
  GET /api/tasks
  Authorization: Bearer <token>
```

### Task Endpoints

#### Get All tasks

```http
  GET /api/tasks
  Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the TaskFlow project",
  "priority": "high",
  "dueDate": "2024-12-31",
  "category": "work"
}
```

#### Update Task
```http
  PATCH /api/tasks/:id
  Authorization: Bearer <token>
  Content-Type: application/json

  {
    "status": "completed",
    "priority": "medium"
  }
```

#### Delete Task

```http
  DELETE /api/tasks/:id
  Authorization: Bearer <token>
```



## Different Login

### Admin Login 
```bash
  Email - admin123@gmail.com
  Password - @dmin@123
```

### Manager Login 
```bash
  Email - manager123@gmail.com
  Password - m@nager@123
```

### User Login 
```bash
  Email - user123@gmail.com
  Password - user@123
```
