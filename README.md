# Video Sensitivity App

A full-stack application for managing and uploading videos with user authentication and role-based access control.

## Project Structure

```
video-sensitivity-app/
├── backend/
│   ├── src/
│   │   ├── app.js                 # Express app configuration
│   │   ├── index.js               # Server entry point
│   │   ├── controllers/           # Request handlers
│   │   ├── middlewares/           # Custom middleware
│   │   ├── models/                # Database models
│   │   └── routes/                # API routes
│   ├── uploads/                   # Video storage directory
│   └── package.json
└── frontend/                      # React/Frontend application
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

## Initial Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   # Add additional configuration as needed
   ```

4. Start the development server:
   ```bash
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

## Contributing

Please follow the existing code structure and naming conventions when adding new features.

## License

[Add your license here]
