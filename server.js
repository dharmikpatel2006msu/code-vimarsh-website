// Code Vimarsh Discord Registration Backend - COMPLETE WORKING VERSION
// This server handles Discord registration with database storage and email confirmation

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5500', 'http://127.0.0.1:5500'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../')));

console.log('🚀 Starting Code Vimarsh Discord Registration Server...');

// Initialize SQLite Database
const dbPath = path.join(__dirname, 'codevimarsh.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Connected to SQLite database');
        initializeDatabase();
    }
});

// Create users table if it doesn't exist
function initializeDatabase() {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            prn TEXT UNIQUE NOT NULL,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            email_verified BOOLEAN DEFAULT FALSE,
            verification_token TEXT
        )
    `;
    
    db.run(createUsersTable, (err) => {
        if (err) {
            console.error('❌ Error creating users table:', err.message);
            process.exit(1);
        } else {
            console.log('✅ Users table ready');
        }
    });
}

// Email configuration using Gmail SMTP
let transporter = null;

function initializeEmailTransporter() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️  Email not configured - EMAIL_USER and EMAIL_PASS not set in .env');
        return;
    }

    transporter = nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Test email configuration
    transporter.verify((error, success) => {
        if (error) {
            console.error('❌ Email configuration error:', error.message);
            console.log('⚠️  Please check your EMAIL_USER and EMAIL_PASS in .env file');
            transporter = null;
        } else {
            console.log('✅ Email server is ready');
        }
    });
}

// Initialize email transporter
initializeEmailTransporter();

// Validation functions
function validatePRN(prn) {
    if (!prn || typeof prn !== 'string') return false;
    const prnRegex = /^80240\d{5}$/;
    return prnRegex.test(prn.trim());
}

function validateEmail(email) {
    if (!email || typeof email !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validatePassword(password) {
    if (!password || typeof password !== 'string') return false;
    if (password.length < 8) return false;
    
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasLetter && hasNumber && hasSpecial;
}

function validateUsername(username) {
    if (!username || typeof username !== 'string') return false;
    const trimmed = username.trim();
    return trimmed.length >= 3 && trimmed.length <= 50;
}

// Function to send confirmation email
async function sendConfirmationEmail(userEmail, username, prn) {
    if (!transporter) {
        console.log('⚠️  Email transporter not available - skipping email');
        return false;
    }

    const mailOptions = {
        from: `"Code Vimarsh Team" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: '🎉 Welcome to Code Vimarsh Discord Community!',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome to Code Vimarsh!</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #ff6b35, #6c5ce7); padding: 40px 20px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to Code Vimarsh!</h1>
                        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Your Discord registration is complete</p>
                    </div>
                    
                    <!-- Content -->
                    <div style="padding: 40px 30px;">
                        <h2 style="color: #333; margin-top: 0; font-size: 24px;">Registration Successful! 🚀</h2>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 16px;">Hi <strong style="color: #ff6b35;">${username}</strong>,</p>
                        
                        <p style="color: #666; line-height: 1.6; font-size: 16px;">
                            Congratulations! Your registration for the Code Vimarsh Discord server has been completed successfully.
                        </p>
                        
                        <!-- Registration Details -->
                        <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #ff6b35;">
                            <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Registration Details:</h3>
                            <table style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Username:</td>
                                    <td style="padding: 8px 0; color: #333;">${username}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-weight: bold;">PRN:</td>
                                    <td style="padding: 8px 0; color: #333;">${prn}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Email:</td>
                                    <td style="padding: 8px 0; color: #333;">${userEmail}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 8px 0; color: #666; font-weight: bold;">Registration Date:</td>
                                    <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString()}</td>
                                </tr>
                            </table>
                        </div>
                        
                        <!-- Next Steps -->
                        <h3 style="color: #333; font-size: 20px; margin-top: 30px;">Next Steps:</h3>
                        <ol style="color: #666; line-height: 1.8; font-size: 16px; padding-left: 20px;">
                            <li>Join our Discord server using the invite link below</li>
                            <li>Introduce yourself in the #introductions channel</li>
                            <li>Check out our coding challenges and events</li>
                            <li>Connect with fellow developers and mentors</li>
                        </ol>
                        
                        <!-- Discord Button -->
                        <div style="text-align: center; margin: 35px 0;">
                            <a href="https://discord.gg/codevimarsh" 
                               style="display: inline-block; background: linear-gradient(135deg, #ff6b35, #6c5ce7); 
                                      color: white; text-decoration: none; padding: 15px 30px; 
                                      border-radius: 8px; font-weight: bold; font-size: 16px;">
                                🎮 Join Discord Server Now
                            </a>
                        </div>
                        
                        <!-- Help Section -->
                        <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 30px 0;">
                            <h3 style="color: #333; margin: 0 0 10px 0; font-size: 18px;">Need Help?</h3>
                            <p style="color: #666; line-height: 1.6; margin: 0; font-size: 16px;">
                                If you have any questions or need assistance, feel free to reach out to us at 
                                <a href="mailto:codingclub-cse@msubaroda.ac.in" style="color: #ff6b35; text-decoration: none;">
                                    codingclub-cse@msubaroda.ac.in
                                </a>
                            </p>
                        </div>
                    </div>
                    
                    <!-- Footer -->
                    <div style="background: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
                        <p style="color: #999; font-size: 14px; margin: 0; line-height: 1.5;">
                            Welcome to the community!<br>
                            <strong style="color: #333;">Code Vimarsh Team</strong><br>
                            MSU Baroda
                        </p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Confirmation email sent to ${userEmail}`);
        return true;
    } catch (error) {
        console.error('❌ Error sending email:', error.message);
        return false;
    }
}

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK',
        message: 'Code Vimarsh backend is running!', 
        timestamp: new Date().toISOString(),
        database: 'Connected',
        email: transporter ? 'Configured' : 'Not configured'
    });
});

// Discord registration endpoint - COMPLETE WORKING VERSION
app.post('/api/register', async (req, res) => {
    console.log('📝 Registration request received');
    console.log('📝 Request body:', { ...req.body, password: '***', confirmPassword: '***' });
    
    try {
        // Extract and validate data from request body
        const { prn, username, email, password, confirmPassword } = req.body;
        
        // Check if all fields are provided
        if (!prn || !username || !email || !password || !confirmPassword) {
            console.log('❌ Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }
        
        // Validation: PRN format
        if (!validatePRN(prn)) {
            console.log('❌ Invalid PRN format:', prn);
            return res.status(400).json({
                success: false,
                message: 'PRN must be exactly 10 digits and start with 80240'
            });
        }
        
        // Validation: Username
        if (!validateUsername(username)) {
            console.log('❌ Invalid username:', username);
            return res.status(400).json({
                success: false,
                message: 'Username must be between 3 and 50 characters'
            });
        }
        
        // Validation: Email format
        if (!validateEmail(email)) {
            console.log('❌ Invalid email format:', email);
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }
        
        // Validation: Password strength
        if (!validatePassword(password)) {
            console.log('❌ Invalid password format');
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters with letters, numbers, and special characters'
            });
        }
        
        // Validation: Password confirmation
        if (password !== confirmPassword) {
            console.log('❌ Passwords do not match');
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }
        
        console.log('✅ All validations passed');
        
        // Check if user already exists
        const checkUserQuery = `
            SELECT id, prn, username, email FROM users 
            WHERE prn = ? OR username = ? OR email = ?
        `;
        
        const existingUser = await new Promise((resolve, reject) => {
            db.get(checkUserQuery, [prn.trim(), username.trim(), email.trim()], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        
        if (existingUser) {
            let message = 'User already exists with this ';
            if (existingUser.prn === prn.trim()) message += 'PRN';
            else if (existingUser.username === username.trim()) message += 'username';
            else if (existingUser.email === email.trim()) message += 'email';
            
            console.log('❌ User already exists:', message);
            return res.status(409).json({
                success: false,
                message: message
            });
        }
        
        console.log('✅ User does not exist, proceeding with registration');
        
        // Hash password
        const saltRounds = 12;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        console.log('✅ Password hashed successfully');
        
        // Generate verification token
        const verificationToken = require('crypto').randomBytes(32).toString('hex');
        
        // Insert new user into database
        const insertUserQuery = `
            INSERT INTO users (prn, username, email, password_hash, verification_token)
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const userId = await new Promise((resolve, reject) => {
            db.run(insertUserQuery, [
                prn.trim(),
                username.trim(),
                email.trim(),
                passwordHash,
                verificationToken
            ], function(err) {
                if (err) reject(err);
                else resolve(this.lastID);
            });
        });
        
        console.log(`✅ User created successfully with ID: ${userId}`);
        
        // Send confirmation email
        console.log('📧 Sending confirmation email...');
        const emailSent = await sendConfirmationEmail(email.trim(), username.trim(), prn.trim());
        
        // Return success response
        const response = {
            success: true,
            message: 'Registration successful!',
            emailSent: emailSent,
            user: {
                id: userId,
                username: username.trim(),
                email: email.trim(),
                prn: prn.trim(),
                registeredAt: new Date().toISOString()
            }
        };
        
        console.log('🎉 Registration completed successfully');
        res.status(201).json(response);
        
    } catch (error) {
        console.error('❌ Registration error:', error);
        
        // Handle specific database errors
        if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            return res.status(409).json({
                success: false,
                message: 'User with this information already exists'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.'
        });
    }
});

// Get all registered users (for admin purposes)
app.get('/api/users', (req, res) => {
    const query = `
        SELECT id, prn, username, email, created_at, email_verified 
        FROM users 
        ORDER BY created_at DESC
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err);
            return res.status(500).json({
                success: false,
                message: 'Error fetching users'
            });
        }
        
        res.json({
            success: true,
            count: rows.length,
            users: rows
        });
    });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// Handle 404 for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

// Start the server
app.listen(PORT, () => {
    console.log('🚀 ================================');
    console.log(`🚀 Code Vimarsh server running on http://localhost:${PORT}`);
    console.log(`📧 Email service: ${process.env.EMAIL_USER || 'Not configured'}`);
    console.log(`📁 Serving static files from: ${path.join(__dirname, '../')}`);
    console.log(`💾 Database: ${dbPath}`);
    console.log('🚀 ================================');
    console.log('');
    console.log('✅ Server is ready! You can now:');
    console.log('   1. Open http://localhost:3000 in your browser');
    console.log('   2. Click "Discord Server" to test registration');
    console.log('   3. Fill out the form and click "Register for Discord"');
    console.log('   4. Check your email for confirmation');
    console.log('');
    console.log('📊 API Endpoints:');
    console.log('   GET  /api/health  - Check server status');
    console.log('   POST /api/register - Register new user');
    console.log('   GET  /api/users   - View all users');
    console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('🛑 Server shutting down gracefully...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
    });
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('🛑 Server shutting down gracefully...');
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('✅ Database connection closed');
        }
    });
    process.exit(0);
});