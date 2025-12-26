// Code Vimarsh Discord Registration Backend
// This is the main server file that handles all backend operations

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, '../'))); // Serve static files (your HTML, CSS, JS)

// In-memory storage for registered users (in production, use a real database)
let registeredUsers = [];

// Email configuration using Gmail SMTP
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail app password
    }
});

// Validation functions
function validatePRN(prn) {
    // PRN must be exactly 10 digits and start with 80240
    const prnRegex = /^80240\d{5}$/;
    return prnRegex.test(prn);
}

function validateEmail(email) {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Password must be at least 8 characters with letter, number, and special character
    if (password.length < 8) return false;
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasLetter && hasNumber && hasSpecial;
}

function checkUserExists(prn, username, email) {
    // Check if user already exists with same PRN, username, or email
    return registeredUsers.find(user => 
        user.prn === prn || 
        user.username === username || 
        user.email === email
    );
}

// Function to send confirmation email
async function sendConfirmationEmail(userEmail, username, prn) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: userEmail,
        subject: '🎉 Welcome to Code Vimarsh Discord Community!',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
                <div style="background: linear-gradient(135deg, #ff6b35, #6c5ce7); padding: 30px; border-radius: 10px; text-align: center; color: white;">
                    <h1 style="margin: 0; font-size: 28px;">Welcome to Code Vimarsh!</h1>
                    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Your Discord registration is complete</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #333; margin-top: 0;">Registration Successful! 🚀</h2>
                    
                    <p style="color: #666; line-height: 1.6;">Hi <strong>${username}</strong>,</p>
                    
                    <p style="color: #666; line-height: 1.6;">
                        Congratulations! Your registration for the Code Vimarsh Discord server has been completed successfully.
                    </p>
                    
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ff6b35;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">Registration Details:</h3>
                        <p style="margin: 5px 0; color: #666;"><strong>Username:</strong> ${username}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>PRN:</strong> ${prn}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Email:</strong> ${userEmail}</p>
                        <p style="margin: 5px 0; color: #666;"><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <h3 style="color: #333;">Next Steps:</h3>
                    <ol style="color: #666; line-height: 1.8;">
                        <li>Join our Discord server: <a href="https://discord.gg/codevimarsh" style="color: #ff6b35; text-decoration: none;">https://discord.gg/codevimarsh</a></li>
                        <li>Introduce yourself in the #introductions channel</li>
                        <li>Check out our coding challenges and events</li>
                        <li>Connect with fellow developers and mentors</li>
                    </ol>
                    
                    <div style="background: linear-gradient(135deg, #ff6b35, #6c5ce7); padding: 20px; border-radius: 8px; margin: 30px 0; text-align: center;">
                        <a href="https://discord.gg/codevimarsh" style="color: white; text-decoration: none; font-weight: bold; font-size: 16px;">
                            🎮 Join Discord Server Now
                        </a>
                    </div>
                    
                    <h3 style="color: #333;">Need Help?</h3>
                    <p style="color: #666; line-height: 1.6;">
                        If you have any questions or need assistance, feel free to reach out to us at 
                        <a href="mailto:codingclub-cse@msubaroda.ac.in" style="color: #ff6b35; text-decoration: none;">codingclub-cse@msubaroda.ac.in</a>
                    </p>
                    
                    <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
                        <p style="color: #999; font-size: 14px; margin: 0;">
                            Welcome to the community!<br>
                            <strong>Code Vimarsh Team</strong><br>
                            MSU Baroda
                        </p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Confirmation email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// API Routes

// Test endpoint to check if server is running
app.get('/api/test', (req, res) => {
    res.json({ 
        message: 'Code Vimarsh backend is running!', 
        timestamp: new Date().toISOString() 
    });
});

// Discord registration endpoint
app.post('/api/register', async (req, res) => {
    try {
        console.log('Registration request received:', req.body);
        
        // Extract data from request body
        const { prn, username, email, password, confirmPassword } = req.body;
        
        // Validation: Check if all fields are provided
        if (!prn || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Validation: PRN format
        if (!validatePRN(prn)) {
            return res.status(400).json({
                success: false,
                message: 'PRN must be exactly 10 digits and start with 80240'
            });
        }
        
        // Validation: Email format
        if (!validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }
        
        // Validation: Password strength
        if (!validatePassword(password)) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters with letters, numbers, and special characters'
            });
        }
        
        // Validation: Password confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }
        
        // Check if user already exists
        const existingUser = checkUserExists(prn, username, email);
        if (existingUser) {
            let message = 'User already exists with this ';
            if (existingUser.prn === prn) message += 'PRN';
            else if (existingUser.username === username) message += 'username';
            else if (existingUser.email === email) message += 'email';
            
            return res.status(409).json({
                success: false,
                message: message
            });
        }
        
        // Create new user object
        const newUser = {
            id: Date.now(), // Simple ID generation (use UUID in production)
            prn,
            username,
            email,
            registeredAt: new Date().toISOString()
            // Note: Never store plain text passwords in production!
            // Use bcrypt to hash passwords: password: await bcrypt.hash(password, 10)
        };
        
        // Save user to our in-memory storage
        registeredUsers.push(newUser);
        console.log(`New user registered: ${username} (${email})`);
        
        // Send confirmation email
        const emailSent = await sendConfirmationEmail(email, username, prn);
        
        // Return success response
        res.status(201).json({
            success: true,
            message: 'Registration successful!',
            emailSent: emailSent,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                prn: newUser.prn,
                registeredAt: newUser.registeredAt
            }
        });
        
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// Get all registered users (for admin purposes - remove in production)
app.get('/api/users', (req, res) => {
    res.json({
        success: true,
        count: registeredUsers.length,
        users: registeredUsers.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            prn: user.prn,
            registeredAt: user.registeredAt
        }))
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Code Vimarsh server is running on http://localhost:${PORT}`);
    console.log(`📧 Email service configured with: ${process.env.EMAIL_USER || 'Not configured'}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, '../')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('Server shutting down gracefully...');
    process.exit(0);
});