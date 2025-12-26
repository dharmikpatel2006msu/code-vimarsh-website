# Code Vimarsh Discord Registration Backend

This is the backend server for the Code Vimarsh Discord registration form.

## 📁 Project Structure
```
your-website/
├── index.html          (your main website)
├── script.js           (frontend JavaScript)
├── style.css           (your styles)
├── server/             (backend folder)
│   ├── server.js       (main server file)
│   ├── package.json    (dependencies)
│   ├── .env           (environment variables)
│   └── README.md      (this file)
```

## 🚀 Quick Setup

### Step 1: Install Node.js
1. Download and install Node.js from https://nodejs.org/
2. Verify installation: `node --version` and `npm --version`

### Step 2: Install Dependencies
```bash
cd server
npm install
```

### Step 3: Configure Email
1. Open `server/.env` file
2. Replace `your-gmail@gmail.com` with your actual Gmail address
3. Get Gmail App Password:
   - Go to Google Account > Security
   - Enable 2-Step Verification
   - Go to App passwords > Generate new app password
   - Copy the 16-character password (without spaces)
4. Replace `your-app-password` with the app password

### Step 4: Start the Server
```bash
npm start
```

The server will start at http://localhost:3000

## 🧪 Testing

### Test if server is running:
Open http://localhost:3000/api/test in your browser

### Test registration:
1. Open http://localhost:3000 (your website)
2. Fill out the Discord registration form
3. Click "Register for Discord"
4. Check your email for confirmation

## 📧 Email Configuration

The server uses Gmail SMTP to send confirmation emails. You need:

1. **Gmail Account**: Any Gmail address
2. **App Password**: 16-character password from Google
   - NOT your regular Gmail password
   - Generated from Google Account > Security > App passwords

### Example .env configuration:
```
EMAIL_USER=codevimarsh@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

## 🔧 API Endpoints

### POST /api/register
Handles Discord registration form submission.

**Request Body:**
```json
{
  "prn": "8024012345",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Registration successful!",
  "emailSent": true,
  "user": {
    "id": 1234567890,
    "username": "johndoe",
    "email": "john@example.com",
    "prn": "8024012345",
    "registeredAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "PRN must be exactly 10 digits and start with 80240"
}
```

### GET /api/test
Test endpoint to check if server is running.

### GET /api/users
Get all registered users (for admin purposes).

## 🛡️ Validation Rules

- **PRN**: Exactly 10 digits, must start with "80240"
- **Email**: Valid email format
- **Password**: At least 8 characters with letters, numbers, and special characters
- **Username**: Required field
- **Confirm Password**: Must match password

## 🚨 Troubleshooting

### Server won't start:
- Check if Node.js is installed: `node --version`
- Check if dependencies are installed: `npm install`
- Check if port 3000 is available

### Email not sending:
- Verify Gmail credentials in `.env` file
- Make sure 2-Step Verification is enabled
- Use App Password, not regular password
- Check spam folder

### Registration not working:
- Check browser console for errors
- Verify server is running at http://localhost:3000
- Test API endpoint: http://localhost:3000/api/test

## 📝 Development

### Start with auto-restart:
```bash
npm run dev
```

### View registered users:
http://localhost:3000/api/users

## 🔒 Security Notes

- This is a basic implementation for learning
- In production, use a real database (MongoDB, PostgreSQL)
- Hash passwords with bcrypt
- Add rate limiting
- Use HTTPS
- Validate and sanitize all inputs
- Add authentication for admin endpoints

## 📞 Support

If you need help:
1. Check the troubleshooting section above
2. Verify all setup steps are completed
3. Check server logs for error messages
4. Contact Code Vimarsh team for assistance