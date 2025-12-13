# Quick Start Guide

This guide will help you get the CodeCraft Solutions website with backend up and running in minutes.

## Prerequisites

Make sure you have:
- Node.js installed (check with `node --version`)
- npm installed (check with `npm --version`)

If not installed, download from: https://nodejs.org/

## Setup Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Create Admin User

```bash
node createAdmin.js
```

You'll be prompted for:
- Username (min 3 characters)
- Email address
- Password (min 6 characters)

Remember these credentials!

### 3. Start Backend Server

```bash
npm run dev
```

You should see:
```
Database initialized successfully
Server is running on http://localhost:3000
```

Keep this terminal open!

### 4. Start Frontend (New Terminal)

Open a new terminal and navigate to the project:

```bash
cd /home/peace/claude-project/company-website
./start-server.sh
```

Or use Python directly:
```bash
python3 -m http.server 8000
```

## Access the Website

Open your browser and visit:

- **Main Website**: http://localhost:8000
- **Login Page**: http://localhost:8000/login.html
- **Register Page**: http://localhost:8000/register.html
- **Admin Dashboard**: http://localhost:8000/admin.html (login required)

## First Login

1. Go to http://localhost:8000/login.html
2. Enter the admin credentials you created
3. You'll be redirected to the admin dashboard
4. You can now manage users!

## Testing the System

### Register a New User

1. Go to http://localhost:8000/register.html
2. Create a new account
3. Login with the new credentials
4. You'll see the main website

### Admin Functions

1. Login with your admin account
2. Go to http://localhost:8000/admin.html
3. You can:
   - View all users
   - Edit user roles
   - Delete users
   - See user statistics

## Troubleshooting

### "npm: command not found"
- Install Node.js from https://nodejs.org/

### "Port 3000 already in use"
- Change the port in `backend/.env`
- Or stop the process using port 3000

### "Port 8000 already in use"
- Use a different port: `python3 -m http.server 8080`
- Update the frontend URL in browser

### Can't login
- Make sure backend server is running (terminal 1)
- Make sure frontend server is running (terminal 2)
- Check browser console (F12) for errors

### CORS errors
- Ensure backend is running on port 3000
- Check that `js/auth.js` has correct API_URL

## API Testing (Optional)

You can test the API directly using curl:

### Register a user:
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

### Health check:
```bash
curl http://localhost:3000/api/health
```

## Next Steps

- Customize the website content
- Add more features to the backend
- Deploy to production
- Add email notifications
- Implement contact form backend

See README.md for more information!
