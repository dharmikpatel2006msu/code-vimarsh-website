const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../')));

// In-memory storage for users
let users = [];

// POST /register API
app.post('/register', (req, res) => {
    console.log('Registration request received:', req.body);
    
    const { prn, username, email, password, confirmPassword } = req.body;
    
    // Basic validation
    if (!prn || !username || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }
    
    // PRN validation
    if (!prn.startsWith('80240') || prn.length !== 10) {
        return res.status(400).json({
            success: false,
            message: 'PRN must be exactly 10 digits and start with 80240'
        });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address'
        });
    }
    
    // Password validation
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters long'
        });
    }
    
    // Password confirmation
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: 'Passwords do not match'
        });
    }
    
    // Check if user already exists
    const existingUser = users.find(user => 
        user.prn === prn || user.username === username || user.email === email
    );
    
    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: 'User already exists with this information'
        });
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        prn,
        username,
        email,
        registeredAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    console.log('User registered successfully:', username);
    
    // Return success response
    res.status(201).json({
        success: true,
        message: 'Registration successful!',
        emailSent: true,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            prn: newUser.prn,
            registeredAt: newUser.registeredAt
        }
    });
});

// GET /users API (for testing)
app.get('/users', (req, res) => {
    res.json({
        success: true,
        count: users.length,
        users: users
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

// Serve main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Serving files from: ${path.join(__dirname, '../')}`);
    console.log('✅ Backend is ready!');
});