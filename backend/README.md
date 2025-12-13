# CodeCraft Solutions Backend

This is the backend API for the CodeCraft Solutions website, built with Node.js, Express, and SQLite.

## Features

- User authentication with JWT tokens
- User registration and login
- Admin dashboard for user management
- SQLite database for persistent data storage
- Password hashing with bcrypt
- Role-based access control (admin/user)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
The `.env` file is already created with default values. For production, update:
- `JWT_SECRET`: Change to a strong, random secret key
- `PORT`: Change if you want to use a different port

## Database Setup

The database will be automatically created when you first start the server. The SQLite database file will be created at `backend/database.db`.

## Creating an Admin User

Before you can access the admin dashboard, you need to create an admin user:

```bash
node createAdmin.js
```

Follow the prompts to enter:
- Username (minimum 3 characters)
- Email address
- Password (minimum 6 characters)

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`)

## API Endpoints

### Authentication

- **POST** `/api/auth/register` - Register a new user
  - Body: `{ username, email, password }`
  - Returns: `{ token, user }`

- **POST** `/api/auth/login` - Login
  - Body: `{ username, password }`
  - Returns: `{ token, user }`

- **GET** `/api/auth/profile` - Get current user profile
  - Headers: `Authorization: Bearer <token>`
  - Returns: User profile data

### User Management (Admin only)

- **GET** `/api/users` - Get all users
  - Headers: `Authorization: Bearer <token>`
  - Requires: Admin role

- **GET** `/api/users/:id` - Get user by ID
  - Headers: `Authorization: Bearer <token>`
  - Requires: Admin role

- **PUT** `/api/users/:id` - Update user
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ username?, email?, password?, role? }`
  - Requires: Admin role

- **DELETE** `/api/users/:id` - Delete user
  - Headers: `Authorization: Bearer <token>`
  - Requires: Admin role

### Health Check

- **GET** `/api/health` - Check if server is running
  - Returns: `{ status: "OK", message: "Server is running" }`

## Database Schema

### Users Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| username | TEXT | Unique username |
| email | TEXT | Unique email address |
| password | TEXT | Hashed password (bcrypt) |
| role | TEXT | User role ('user' or 'admin') |
| created_at | DATETIME | Account creation timestamp |
| updated_at | DATETIME | Last update timestamp |

### Sessions Table

| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key, auto-increment |
| user_id | INTEGER | Foreign key to users table |
| token | TEXT | JWT token |
| created_at | DATETIME | Session creation timestamp |
| expires_at | DATETIME | Session expiration timestamp |

## Security Features

- Passwords are hashed using bcrypt (10 salt rounds)
- JWT tokens for authentication
- Token expiration (24 hours)
- Role-based access control
- Input validation using express-validator
- CORS enabled for cross-origin requests

## Development

### Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js       # Database configuration
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   └── userController.js  # User management logic
│   ├── middleware/
│   │   └── auth.js           # Authentication middleware
│   ├── models/
│   │   └── User.js           # User model
│   ├── routes/
│   │   ├── authRoutes.js     # Authentication routes
│   │   └── userRoutes.js     # User management routes
│   └── server.js             # Main server file
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── createAdmin.js           # Script to create admin user
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## Troubleshooting

### Port already in use
If you get an error that the port is already in use, either:
1. Stop the process using that port
2. Change the `PORT` in `.env` to a different port

### Database locked
If you get a "database is locked" error, make sure you don't have multiple server instances running.

### CORS errors
If you're getting CORS errors from the frontend, make sure:
1. The backend server is running
2. The frontend is making requests to the correct URL (`http://localhost:3000`)

## Production Deployment

For production deployment:

1. Update the `.env` file with production values
2. Set `NODE_ENV=production`
3. Use a strong, random `JWT_SECRET`
4. Consider using a production-grade database (PostgreSQL, MySQL)
5. Set up proper HTTPS/SSL
6. Use a process manager like PM2
7. Set up proper logging
8. Configure CORS to only allow your domain

## License

This project is proprietary to CodeCraft Solutions.
