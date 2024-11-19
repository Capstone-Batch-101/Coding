const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const path = require('path');
const port = 5000;
const app = express();

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventopia')
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    studentId: { type: String, required: true },
    department: { type: String, required: true },
    password: { type: String, required: true },
    theme: { type: String, default: 'light' }, // Add theme preference
    language: { type: String, default: 'en' }, // Add language preference
    notifications: { type: [String], default: [] } // Add notifications preference
});

const users = mongoose.model("userdata", userSchema);

// Serve HTML files
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'loginpage.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});
function logout() {
    // Perform a logout request to the server
    fetch('/logout', {
        method: 'POST',
        credentials: 'include' // Include cookies for session management
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the login page upon successful logout
            window.location.href = 'frontpage.html'; // Change to your desired URL
        } else {
            alert('Logout failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error during logout:', error);
        alert('An error occurred while logging out.');
    });
}

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, studentId, department, password } = req.body;

    try {
        // Check if email already exists
        const existingUser  = await users.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser  = new users({
            firstName,
            lastName,
            email,
            studentId,
            department,
            password: hashedPassword,
        });

        // Save the user document to the database
        const savedUser  = await newUser .save();
        res.status(201).json(savedUser ); // Send back the saved user data 
        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during signup' });
    }
    
});
// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // If login is successful, return user data (omit password)
        const { password: _, ...userData } = user.toObject(); // Omit password from the response
        res.status(200).json(userData); // Send back user data without the password
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
});

// Get User Data Endpoint
app.get("/getuserdata", async (req, res) => {
    try {
        const newData = await users.find({});
        res.status(200).json(newData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update User Preferences Endpoint
app.post('/update-preferences', async (req, res) => {
    const { userId, theme, language, notifications } = req.body;

    try {
        // Update the user's preferences in the database
        const updatedUser  = await users.findByIdAndUpdate(userId, {
            theme,
            language,
            notifications,
        }, { new: true }); // Return the updated user document

        if (!updatedUser ) {
            return res.status(404).json({ error: 'User  not found' });
        }

        res.status(200).json(updatedUser ); // Send back the updated user data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating preferences' });
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server started on port " + port);
});
