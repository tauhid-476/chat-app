# 🚀 Real-Time Chat Application

💬 A full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Socket.IO for real-time messaging, JWT authentication, and Cloudinary for image uploads.

## 🌟 Features

- **⚡ Real-time messaging** with Socket.IO
- **🔐 User authentication** (Login/Register/Logout)
- **👤 Profile management** with image upload
- **🟢 Online/🔴 Offline status** tracking
- **🖼️ Image sharing** in messages
- **🎨 Multiple theme support** (35+ DaisyUI themes)
- **📱 Responsive design** with Tailwind CSS
- **📜 Message history** persistence
- **👥 User sidebar** with online users filter

## 🛠️ Tech Stack

### Frontend
- **⚛️ React 18** with Vite
- **🎨 Tailwind CSS** for styling
- **💅 DaisyUI** for UI components
- **📦 Zustand** for state management
- **🔌 Socket.IO Client** for real-time communication
- **🛣️ React Router** for navigation
- **📡 Axios** for HTTP requests
- **🍞 React Hot Toast** for notifications
- **✨ Lucide React** for icons

### Backend
- **🟢 Node.js** with Express.js
- **🍃 MongoDB** with Mongoose ODM
- **🔌 Socket.IO** for real-time communication
- **🔑 JWT** for authentication
- **🔒 bcryptjs** for password hashing
- **☁️ Cloudinary** for image storage
- **🍪 Cookie Parser** for handling cookies
- **🌐 CORS** for cross-origin requests

## 📁 Project Structure


```
chat-app/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Zustand stores
│   │   ├── lib/             # Utility functions
│   │   ├── constants/       # App constants
│   │   └── App.jsx          # Main App component
│   └── package.json
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── models/          # MongoDB models
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   ├── lib/             # Utility functions
│   │   └── index.js         # Server entry point
│   └── package.json
└── package.json             # Root package.json
```

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/chat-app
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/chat-app

# JWT Secret (generate a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Getting Cloudinary Credentials

1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy the Cloud Name, API Key, and API Secret
4. Add them to your `.env` file

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone https://github.com/tauhid-476/chat-app
cd chat-app
```

### 2. Install Dependencies
```bash
# Install root dependencies and build the project
npm install
npm run build
```

This will:
- Install backend dependencies
- Install frontend dependencies  
- Build the frontend for production

### 3. Set Up Environment Variables
Create a `.env` file in the `backend` directory with the required environment variables (see above).

### 4. Start the Application

#### For Production:
```bash
npm start
```
This starts only the backend server, which also serves the built frontend.

#### For Development:
```bash
# Start backend (from root directory)
cd backend
npm run dev

# Start frontend (in another terminal, from root directory)
cd frontend
npm run dev
```

## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /checkAuth` - Check authentication status
- `PUT /update-profile` - Update user profile

### Message Routes (`/api/message`)
- `GET /users` - Get all users for sidebar
- `GET /:id` - Get messages with specific user
- `POST /send/:id` - Send message to user

## WebSocket Events

### Client → Server
- `connection` - User connects with userId
- `disconnect` - User disconnects

### Server → Client
- `getOnlineUsers` - Broadcast online user IDs
- `newMessage` - Send new message to recipient

## State Management

The application uses Zustand for state management with three main stores:

- **`useAuthStore`** - Authentication, user data, socket connection
- **`useChatStore`** - Messages, users list, selected user
- **`useThemeStore`** - Theme selection and persistence

## Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in your environment
2. Ensure all environment variables are configured
3. The backend serves the built frontend automatically

### Frontend Build
The frontend is built and served by the backend in production mode.

## Development Notes

- The app uses JWT tokens stored in HTTP-only cookies for authentication
- Socket.IO handles real-time messaging with online status tracking
- Images are uploaded to Cloudinary and URLs are stored in MongoDB
- The app supports 35+ themes from DaisyUI
- Responsive design works on mobile and desktop

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS configuration matches your frontend URL
2. **Socket Connection Issues**:Ensure that the Socket.IO client is connecting to the correct backend URL
3. **Image Upload Fails**: Verify Cloudinary credentials are correct
4. **Authentication Issues**: Ensure JWT_SECRET is set and cookies are enabled

### Development Tips

- Use browser dev tools to monitor WebSocket connections
- Check MongoDB connection in server logs
- Verify environment variables are loaded correctly
- Test with multiple browser tabs/windows for real-time features

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
