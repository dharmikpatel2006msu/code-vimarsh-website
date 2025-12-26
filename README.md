# Code Vimarsh Discord Registration - Complete Solution

This is a **complete working solution** for Discord registration with database storage and email confirmation.

## 🚀 **What This Includes**

✅ **Frontend**: Fixed JavaScript with proper form handling  
✅ **Backend**: Complete Node.js/Express server with database  
✅ **Database**: SQLite database with user storage  
✅ **Security**: Password hashing with bcrypt  
✅ **Email**: Professional confirmation emails via Gmail  
✅ **Validation**: Complete input validation on both frontend and backend  

---

## 📁 **Project Structure**
```
your-website/
├── index.html              (your main website)
├── script.js               (fixed frontend JavaScript)
├── style.css               (your styles)
├── server/                 (backend folder)
│   ├── server.js           (complete backend server)
│   ├── package.json        (all dependencies)
│   ├── .env               (email configuration)
│   ├── README.md          (this file)
│   └── codevimarsh.db     (SQLite database - created automatically)
```

---

## 🛠️ **Step-by-Step Setup Instructions**

### **Step 1: Install Node.js**
1. Download Node.js from https://nodejs.org/
2. Install it on your computer
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### **Step 2: Install Backend Dependencies**
```bash
# Navigate to server folder
cd server

# Install all required packages
npm install
```

**Packages that will be installed:**
- `express` - Web server framework
- `cors` - Cross-origin resource sharing
- `nodemailer` - Email sending
- `bcrypt` - Password hashing
- `sqlite3` - Database
- `dotenv` - Environment variables

### **Step 3: Configure Email Settings**
1. **Open** `server/.env` file
2. **Replace** the placeholder values:
   ```env
   EMAIL_USER=your-actual-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

### **Step 4: Get Gmail App Password**
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. **Enable "2-Step Verification"** (if not already enabled)
3. Go to **"App passwords"** section
4. **Generate new app password** for "Mail"
5. **Copy the 16-character password** (ignore spaces)
6. **Paste it** in your `.env` file as `EMAIL_PASS`

**Example:**
```env
EMAIL_USER=codevimarsh@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
```

### **Step 5: Start the Backend Server**
```bash
# Make sure you're in the server folder
cd server

# Start the server
npm start
```

**You should see:**
```
🚀 ================================
🚀 Code Vimarsh server running on http://localhost:3000
📧 Email service: your-email@gmail.com
📁 Serving static files from: /path/to/your/website
💾 Database: /path/to/codevimarsh.db
🚀 ================================
```

### **Step 6: Test Your Website**
1. **Open your browser**
2. **Go to** http://localhost:3000
3. **Click** "Discord Server" in the contact section
4. **Fill out the registration form**:
   - PRN: Must start with 80240 (e.g., 8024012345)
   - Username: Any username
   - Email: Your real email address
   - Password: Must have letters, numbers, and special characters
5. **Click "Register for Discord"**
6. **Check your email** for confirmation message

---

## 🧪 **Testing the System**

### **Test 1: Check if Backend is Running**
Open http://localhost:3000/api/health in your browser.  
You should see:
```json
{
  "status": "OK",
  "message": "Code Vimarsh backend is running!",
  "database": "Connected",
  "email": "Configured"
}
```

### **Test 2: Register a User**
1. Fill out the Discord registration form
2. Check browser console (F12) for logs
3. Check your email inbox
4. Check database: http://localhost:3000/api/users

### **Test 3: Validation Testing**
Try these to test validation:
- PRN not starting with 80240 → Should show error
- Weak password → Should show error
- Mismatched passwords → Should show error
- Invalid email → Should show error

---

## 🗄️ **Database Information**

**Database Type:** SQLite (file-based, no setup required)  
**Database File:** `server/codevimarsh.db` (created automatically)  
**Table Structure:**
```sql
users (
    id INTEGER PRIMARY KEY,
    prn TEXT UNIQUE,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password_hash TEXT,
    created_at DATETIME,
    email_verified BOOLEAN,
    verification_token TEXT
)
```

**View Users:** http://localhost:3000/api/users

---

## 🔒 **Security Features**

✅ **Password Hashing**: Passwords are hashed with bcrypt (12 rounds)  
✅ **Input Validation**: All inputs validated on frontend and backend  
✅ **SQL Injection Protection**: Using parameterized queries  
✅ **CORS Configuration**: Proper cross-origin settings  
✅ **Unique Constraints**: Prevents duplicate PRN/username/email  

---

## 📧 **Email Features**

✅ **Professional HTML emails** with Code Vimarsh branding  
✅ **Registration confirmation** with user details  
✅ **Discord invite link** included  
✅ **Responsive email design** for all devices  
✅ **Error handling** if email fails to send  

---

## 🚨 **Troubleshooting**

### **Problem: "Cannot connect to server"**
**Solution:**
1. Make sure backend is running: `npm start` in server folder
2. Check if http://localhost:3000/api/health works
3. Look for error messages in terminal

### **Problem: "Email not sending"**
**Solution:**
1. Check Gmail credentials in `.env` file
2. Make sure 2-Step Verification is enabled
3. Use App Password, NOT regular Gmail password
4. Check spam folder

### **Problem: "Registration button not working"**
**Solution:**
1. Open browser console (F12) and check for errors
2. Make sure backend is running on port 3000
3. Check network tab for failed requests

### **Problem: "Database errors"**
**Solution:**
1. Delete `codevimarsh.db` file and restart server
2. Check file permissions in server folder
3. Make sure SQLite3 is installed: `npm install sqlite3`

---

## 🎯 **API Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Check server status |
| POST | `/api/register` | Register new user |
| GET | `/api/users` | View all users (admin) |
| GET | `/` | Serve main website |

---

## 📝 **Development Commands**

```bash
# Start server (production)
npm start

# Start server with auto-restart (development)
npm run dev

# Install dependencies
npm install

# Check server status
curl http://localhost:3000/api/health
```

---

## 🎉 **Success Indicators**

When everything is working correctly, you should see:

1. ✅ **Server starts** without errors
2. ✅ **Website loads** at http://localhost:3000
3. ✅ **Registration form** accepts valid data
4. ✅ **Confirmation email** arrives in inbox
5. ✅ **User data** saved in database
6. ✅ **Success message** shown on website

---

## 📞 **Need Help?**

If you encounter any issues:

1. **Check the terminal** for error messages
2. **Check browser console** (F12) for JavaScript errors
3. **Verify email configuration** in `.env` file
4. **Test API endpoints** directly
5. **Check database file** permissions

**Common Issues:**
- Gmail App Password not working → Generate new one
- Port 3000 already in use → Change PORT in `.env`
- Database permission errors → Check folder permissions

---

## 🚀 **You're All Set!**

Your Discord registration system is now **fully functional** with:
- ✅ Working registration form
- ✅ Secure password storage
- ✅ Email confirmation
- ✅ Database integration
- ✅ Complete error handling

**Test it now:** http://localhost:3000