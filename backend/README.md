# Video Upload & Streaming Backend

## Features
- JWT Authentication
- Role-Based Access Control (Viewer / Editor / Admin)
- Secure Video Upload (Multer)
- Background Video Processing
- Sensitivity Classification (Safe / Flagged)
- Authorized Video Streaming with HTTP Range Requests
- Short-lived Signed Streaming URLs

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- Multer
- FFmpeg (simulated)
- Socket.io (ready)
- JWT

## Streaming Security Design
HTML video elements cannot send authorization headers.  
To maintain security, the backend issues short-lived signed streaming URLs after authenticating the user.  
The streaming endpoint validates this token before serving video data.

## How to Run
1. Install dependencies
2. Set environment variables
3. Run `npm run dev`

## API Overview
- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/videos/upload`
- GET `/api/videos/:id/stream-url`
- GET `/api/stream/:id?token=...`
