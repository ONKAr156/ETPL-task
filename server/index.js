const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const mongoString = process.env.DATABASE_URL;

// CORS options
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Log requests for debugging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/user', userRoutes);

// Fallback route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An error occurred!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

// MongoDB connection
mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 10000,  // 10 seconds
    socketTimeoutMS: 45000,  // 45 seconds
})
.then(() => console.log("Database Connected"))
.catch((error) => console.error("Database Connection Error:", error));