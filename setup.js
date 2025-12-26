#!/usr/bin/env node

/**
 * Code Vimarsh Discord Registration - Setup Script
 * This script helps you set up the backend server quickly
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Code Vimarsh Discord Registration Setup');
console.log('==========================================\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 14) {
    console.error('❌ Node.js version 14 or higher is required');
    console.error(`   Current version: ${nodeVersion}`);
    console.error('   Please update Node.js from https://nodejs.org/');
    process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if we're in the server directory
const currentDir = process.cwd();
const packageJsonPath = path.join(currentDir, 'package.json');

if (!fs.existsSync(packageJsonPath)) {
    console.error('❌ package.json not found');
    console.error('   Please run this script from the server directory');
    console.error('   cd server && node setup.js');
    process.exit(1);
}

console.log('✅ Found package.json');

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dependencies installed successfully');
} catch (error) {
    console.error('❌ Failed to install dependencies');
    console.error('   Please run: npm install');
    process.exit(1);
}

// Check .env file
const envPath = path.join(currentDir, '.env');
if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    
    if (envContent.includes('your-gmail@gmail.com') || envContent.includes('your-app-password')) {
        console.log('\n⚠️  Email configuration needed');
        console.log('   Please edit server/.env file with your Gmail credentials');
        console.log('   1. Replace your-gmail@gmail.com with your actual Gmail');
        console.log('   2. Replace your-app-password with your Gmail App Password');
        console.log('   3. See README.md for detailed instructions');
    } else {
        console.log('✅ Email configuration found');
    }
} else {
    console.error('❌ .env file not found');
    console.error('   Please make sure .env file exists in server directory');
}

// Test database creation
console.log('\n💾 Testing database setup...');
try {
    const sqlite3 = require('sqlite3');
    const dbPath = path.join(currentDir, 'test.db');
    
    const db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('❌ Database test failed:', err.message);
        } else {
            console.log('✅ Database setup working');
            db.close();
            // Clean up test database
            if (fs.existsSync(dbPath)) {
                fs.unlinkSync(dbPath);
            }
        }
    });
} catch (error) {
    console.error('❌ SQLite3 not properly installed');
    console.error('   Try: npm install sqlite3');
}

console.log('\n🎉 Setup Complete!');
console.log('==================');
console.log('Next steps:');
console.log('1. Configure email in .env file (if not done)');
console.log('2. Start server: npm start');
console.log('3. Open http://localhost:3000');
console.log('4. Test Discord registration form');
console.log('\nFor help, see README.md');