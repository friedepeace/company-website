# CodeCraft Solutions Website

A simple, clean website for a Java and mobile app development company.

## Quick Start

### Starting the Website

To view the website on your local computer:

1. Open a terminal
2. Navigate to this directory:
   ```bash
   cd /home/peace/claude-project/company-website
   ```
3. Run the start script:
   ```bash
   ./start-server.sh
   ```
4. Open your web browser and go to: `http://localhost:8000`
5. To stop the server, press `Ctrl+C` in the terminal

### Alternative Method

If the script doesn't work, you can start the server directly:
```bash
python3 -m http.server 8000
```

## Project Structure

```
company-website/
├── index.html          # Home page
├── services.html       # Services page
├── about.html          # About page
├── contact.html        # Contact page
├── login.html          # User login page
├── register.html       # User registration page
├── admin.html          # Admin dashboard
├── css/
│   └── style.css       # All styles
├── js/
│   ├── contact.js      # Contact form functionality
│   ├── auth.js         # Authentication utilities
│   └── admin.js        # Admin dashboard functionality
├── images/
│   └── logo.svg        # Company logo
├── backend/            # Backend API server
│   ├── src/            # Source code
│   ├── package.json    # Dependencies
│   ├── createAdmin.js  # Admin user creation script
│   └── README.md       # Backend documentation
└── README.md           # This file
```

## How to Make Changes

### Editing Content

All website content is in plain HTML files. To edit:

1. Open the HTML file you want to change (e.g., `index.html`) in any text editor
2. Find the text you want to modify
3. Make your changes
4. Save the file
5. Refresh your browser to see the changes

### Changing Colors and Styles

All visual styling is in `css/style.css`. To change colors:

1. Open `css/style.css`
2. Look for color codes (e.g., `#2563eb` is the main blue color)
3. Replace with your preferred colors
4. Save and refresh your browser

Key colors used:
- Primary Blue: `#2563eb`
- Dark Blue: `#1e40af`
- Dark Text: `#1e293b`
- Light Gray: `#f8fafc`

### Modifying the Logo

The logo is an SVG file at `images/logo.svg`. You can:
- Edit it with a text editor (it's XML-based)
- Replace it with a different SVG file
- Replace it with a PNG/JPG image (update the `src` attribute in HTML files)

### Adding New Pages

1. Copy one of the existing HTML files (e.g., `about.html`)
2. Rename it to your new page name
3. Edit the content
4. Add a link to it in the navigation menu of all pages

## Making the Website Public

This setup currently only works on your local computer. To make it available online, you have several options:

### Option 1: Static Hosting (Easiest)
- Upload files to services like:
  - GitHub Pages (free)
  - Netlify (free)
  - Vercel (free)
  - AWS S3 + CloudFront

### Option 2: Traditional Web Hosting
- Purchase web hosting
- Upload files via FTP
- Configure your domain

### Option 3: Self-Hosting
- Set up a web server (Apache, Nginx)
- Configure firewall and port forwarding
- Point your domain to your IP address

## Backend & Database

This website now includes a full backend system with user authentication and an admin dashboard!

### Features

- User registration and login with JWT authentication
- Password hashing and security
- Admin dashboard for user management
- SQLite database for persistent data storage
- Role-based access control

### Setting Up the Backend

1. **Install Node.js** (if not already installed):
   - Download from https://nodejs.org/
   - Version 14 or higher recommended

2. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Create an admin user**:
   ```bash
   node createAdmin.js
   ```
   Follow the prompts to create your first admin account.

5. **Start the backend server**:
   ```bash
   npm run dev
   ```
   The API server will run on http://localhost:3000

6. **Start the frontend** (in a new terminal):
   ```bash
   ./start-server.sh
   ```
   The website will run on http://localhost:8000

### Using the System

- **Register**: Visit http://localhost:8000/register.html to create a new account
- **Login**: Visit http://localhost:8000/login.html to login
- **Admin Dashboard**: Login with an admin account to access http://localhost:8000/admin.html

See `backend/README.md` for detailed API documentation and backend information.

## Contact Form

The contact form currently shows an alert message. To make it send real emails or save to database, you can:

1. Extend the existing backend with a contact form endpoint
2. Use a form service like:
   - Formspree
   - EmailJS
   - Google Forms
   - Netlify Forms (if using Netlify hosting)

## Customization Tips

### Company Information
- Update company name in all HTML files
- Change email and phone in `contact.html`
- Modify the hero claim on the home page

### Services
- Edit `services.html` to add or remove services
- Update the feature cards on the home page

### Content
- Keep paragraphs concise
- Use bullet points for easy reading
- Add real project examples when available

## Browser Compatibility

The website works on all modern browsers:
- Chrome, Firefox, Safari, Edge
- Mobile browsers (responsive design)

## Need Help?

The website uses standard HTML, CSS, and JavaScript. You can:
- Search online for HTML/CSS tutorials
- Use browser developer tools (F12) to inspect elements
- Ask for help with specific changes

Enjoy your new website!
