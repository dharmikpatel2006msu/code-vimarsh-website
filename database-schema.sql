-- Code Vimarsh Discord Registration Database Schema
-- This file shows the database structure (for reference only)
-- The actual database is created automatically by server.js

-- Users table to store registration data
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    prn TEXT UNIQUE NOT NULL,                    -- Student PRN (must start with 80240)
    username TEXT UNIQUE NOT NULL,               -- Discord username
    email TEXT UNIQUE NOT NULL,                  -- Email address
    password_hash TEXT NOT NULL,                 -- Hashed password (bcrypt)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Registration timestamp
    email_verified BOOLEAN DEFAULT FALSE,        -- Email verification status
    verification_token TEXT                      -- Token for email verification
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_prn ON users(prn);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Sample queries you can use:

-- View all registered users
-- SELECT id, prn, username, email, created_at, email_verified FROM users ORDER BY created_at DESC;

-- Count total registrations
-- SELECT COUNT(*) as total_users FROM users;

-- Find user by PRN
-- SELECT * FROM users WHERE prn = '8024012345';

-- Find user by email
-- SELECT * FROM users WHERE email = 'user@example.com';

-- Get recent registrations (last 7 days)
-- SELECT * FROM users WHERE created_at >= datetime('now', '-7 days') ORDER BY created_at DESC;

-- Verify email for a user
-- UPDATE users SET email_verified = TRUE WHERE id = 1;