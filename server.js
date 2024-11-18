// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/report';

// Connect to MongoDB
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Eventopia API!');
});

// Sample route
app.get('/api/events', (req, res) => {
    // Here you would fetch data from your MongoDB collection
    res.json({ message: 'Hello from the backend!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});