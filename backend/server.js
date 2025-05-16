const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load env vars
dotenv.config();


// Import routes
const userRoutes = require('./routes/userRoutes');
const cityRoutes = require('./routes/cityRoutes');
const featureRoutes = require('./routes/featureRoutes');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Mount routes
app.use('/api/users', userRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/features', featureRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Welcome to the Capstone Backend!');
  });
}

// Error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// GET request for checking server status
app.get('/', (req, res) => {
  res.send('Welcome to the Capstone Backend!');
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port http://localhost:${port}...`));
