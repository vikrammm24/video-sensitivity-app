# Video Sensitivity App

A full-stack application for managing, uploading, and streaming videos with user authentication and role-based access control. Features include user registration, login, video upload with processing, real-time streaming capabilities, and editor-level access management.

## 🎯 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Role-Based Access Control**: Different permission levels for users and editors
- **Video Management**: Upload, process, and manage video content
- **Real-time Streaming**: Socket.io integration for live video streaming
- **Video Library**: Browse and organize uploaded videos
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Secure API**: Protected endpoints with middleware authentication

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community) or use MongoDB Atlas
- **Git** (for cloning the repository)
- A modern web browser

## 📁 Project Structure

```
video-sensitivity-app/
├── backend/                       # Node.js/Express API server
│   ├── src/
│   │   ├── app.js                 # Express app configuration & middleware
│   │   ├── index.js               # Server entry point with Socket.io setup
│   │   ├── controllers/           # Business logic for handling requests
│   │   │   ├── authController.js
│   │   │   ├── videoController.js
│   │   │   └── streamController.js
│   │   ├── middlewares/           # Custom middleware for auth, roles, uploads
│   │   │   ├── authMiddleware.js
│   │   │   ├── roleMiddleware.js
│   │   │   ├── editorOnly.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/                # MongoDB schemas
│   │   │   ├── User.js
│   │   │   └── Video.js
│   │   ├── routes/                # API route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── videoRoutes.js
│   │   │   └── streamRoutes.js
│   │   └── utils/
│   │       └── videoProcessor.js  # Video processing utilities
│   ├── uploads/                   # Video storage directory
│   └── package.json
│
└── frontend/                      # React/Vite application
    ├── src/
    │   ├── components/            # Reusable React components
    │   │   ├── Navbar.jsx
    │   │   └── VideoPlayer.jsx
    │   ├── pages/                 # Page components (routes)
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── EditorDashboard.jsx
    │   │   ├── Upload.jsx
    │   │   └── VideoLibrary.jsx
    │   ├── api/                   # API client configuration
    │   │   └── axios.js
    │   ├── auth/                  # Authentication utilities
    │   ├── App.jsx                # Main App component
    │   └── main.jsx               # React entry point
    ├── public/                    # Static assets
    ├── package.json
    ├── vite.config.js             # Vite configuration
    ├── tailwind.config.js         # Tailwind CSS configuration
    ├── eslint.config.js           # ESLint configuration
    └── index.html                 # HTML entry point
```

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd video-sensitivity-app
```

### 2. Backend Setup

#### Step 1: Navigate to Backend Directory
```bash
cd backend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment Configuration
Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration (use your connection string)
MONGODB_URI=mongodb://localhost:27017/video-sensitivity-app
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/video-sensitivity-app

# JWT Secret (generate a strong random string)
JWT_SECRET=your-secret-key-change-this-in-production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Optional: Video Processing
VIDEO_UPLOAD_LIMIT=52428800  # 50MB in bytes
```

#### Step 4: Start the Backend Server
```bash
npm run dev
```

The backend will start on `http://localhost:5000`

You should see output like:
```
Connected to MongoDB
Server running on port 5000
```

### 3. Frontend Setup

#### Step 1: Open a New Terminal and Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment Configuration (Optional)
Create a `.env` file in the `frontend` directory if needed for API configuration:

```env
VITE_API_URL=http://localhost:5000
```

#### Step 4: Start the Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📱 Using the Application

1. **Open your browser** and navigate to `http://localhost:5173`
2. **Register a new account** by clicking the Register link
3. **Login** with your credentials
4. **Upload videos** through the Upload page
5. **Browse videos** in the Video Library
6. **Stream videos** using the Video Player
7. **Access editor features** if your account has editor privileges

## 🔧 Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^9.1.2 | MongoDB ODM |
| jsonwebtoken | ^9.0.3 | JWT authentication |
| bcryptjs | ^3.0.3 | Password hashing |
| multer | ^2.0.2 | File upload handling |
| socket.io | ^4.8.3 | Real-time communication |
| cors | ^2.8.5 | Cross-Origin Resource Sharing |
| dotenv | ^17.2.3 | Environment variable management |
| nodemon | ^3.1.11 | (Dev) Auto-restart on file changes |

## 🎨 Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.0 | UI library |
| react-dom | ^19.2.0 | React DOM binding |
| react-router-dom | ^7.12.0 | Client-side routing |
| axios | ^1.13.2 | HTTP client |
| socket.io-client | ^4.8.3 | Real-time client |
| tailwindcss | ^3.4.17 | Utility CSS framework |
| vite | ^7.2.4 | Build tool |
| eslint | ^9.39.1 | Code quality |

## 📝 Available Scripts

### Backend

```bash
# Run development server with hot reload
npm run dev

# (Add build/start scripts as needed)
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start the MongoDB service:
   ```bash
   # On macOS (with Homebrew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows (in Command Prompt as Admin)
   net start MongoDB
   ```
3. Verify connection: `mongodb://localhost:27017`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string (replace credentials and database name)
4. Add the connection string to your `.env` file as `MONGODB_URI`

## 🔐 Security Best Practices

1. **Change JWT_SECRET**: Use a strong, random string in production
2. **Use Environment Variables**: Never commit `.env` files to version control
3. **HTTPS in Production**: Deploy with HTTPS/SSL certificates
4. **MongoDB Authentication**: Enable authentication for MongoDB instances
5. **API Rate Limiting**: Consider adding rate limiting middleware
6. **Validate Input**: All user inputs are validated before processing
7. **Secure Password Storage**: Passwords are hashed using bcryptjs

## 🚨 Common Issues & Solutions

### Port Already in Use
```bash
# Kill process on port 5000 (Linux/macOS)
lsof -ti:5000 | xargs kill -9

# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify network access to MongoDB server

### CORS Errors
- Check that frontend URL matches `FRONTEND_URL` in backend `.env`
- Ensure CORS headers are properly configured in `app.js`

### Port 5173 in Use
```bash
# Kill process on port 5173 (Linux/macOS)
lsof -ti:5173 | xargs kill -9
```

## 🏗️ Architecture Overview

**Backend Architecture:**
- **Express.js**: RESTful API server
- **MongoDB + Mongoose**: Data persistence
- **Socket.io**: Real-time bidirectional communication
- **JWT**: Stateless authentication
- **Multer**: File upload handling

**Frontend Architecture:**
- **React**: Component-based UI
- **React Router**: Client-side navigation
- **Axios**: HTTP requests to backend
- **Socket.io Client**: Real-time updates
- **Tailwind CSS**: Styling

## 📦 Building for Production

### Backend
1. Update `.env` with production values
2. Build/optimize as needed
3. Deploy to a Node.js hosting service (Heroku, AWS, DigitalOcean, etc.)

### Frontend
```bash
cd frontend
npm run build
```

The optimized build will be in `dist/` directory. Deploy to a static hosting service (Vercel, Netlify, AWS S3, etc.)

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add new feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## 📄 License

This project is licensed under the ISC License - see the package.json files for details.

## 📞 Support

For issues, questions, or suggestions:
1. Check existing GitHub issues
2. Create a new issue with detailed description
3. Include screenshots or error logs when applicable

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [Socket.io Documentation](https://socket.io/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
   npm start
   ```

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will typically run on `http://localhost:3000`

## Features

- User authentication and registration
- Role-based access control (RBAC)
- Video upload and management
- User profile management

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

## Development

To develop both frontend and backend concurrently:

1. Open two terminals
2. Run backend server in one terminal: `cd backend && npm start`
3. Run frontend server in another terminal: `cd frontend && npm start`

## Project Status

This project is in initial development phase.


