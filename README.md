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
├── css/
│   └── style.css       # All styles
├── js/
│   └── contact.js      # Contact form functionality
├── images/
│   └── logo.svg        # Company logo
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

## Contact Form

The contact form currently shows an alert message. To make it functional, you'll need to:

1. Set up a backend service (Node.js, PHP, etc.)
2. Or use a form service like:
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
