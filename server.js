require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const socketio = require('socket.io');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === 'test') {
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('In-memory MongoDB connected successfully');
    } else {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/freelancerDB');
      console.log('MongoDB connected successfully');
    }
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

connectDB();

// Routes
const authRoutes = require('./routes/auth.routes');
const jobRoutes = require('./routes/job.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Freelancer App API');
});

// JWT Middleware
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token) {
    const secret = process.env.JWT_SECRET || 'test-secret-key-12345';
    jwt.verify(token, secret, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }
  next();
});

// Server Setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Socket.io Setup
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

module.exports = server;