require('dotenv').config();
const { initializeDatabase } = require('./src/config/database');
const User = require('./src/models/User');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createAdmin() {
  console.log('=== Create Admin User ===\n');

  // Initialize database
  initializeDatabase();

  try {
    const username = await question('Enter admin username: ');
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');

    // Validate input
    if (!username || username.length < 3) {
      console.error('Error: Username must be at least 3 characters');
      rl.close();
      return;
    }

    if (!email || !email.includes('@')) {
      console.error('Error: Invalid email address');
      rl.close();
      return;
    }

    if (!password || password.length < 6) {
      console.error('Error: Password must be at least 6 characters');
      rl.close();
      return;
    }

    // Check if user already exists
    if (User.findByUsername(username)) {
      console.error(`Error: Username "${username}" already exists`);
      rl.close();
      return;
    }

    if (User.findByEmail(email)) {
      console.error(`Error: Email "${email}" already exists`);
      rl.close();
      return;
    }

    // Create admin user
    const userId = User.create(username, email, password, 'admin');
    console.log(`\n✓ Admin user created successfully!`);
    console.log(`  ID: ${userId}`);
    console.log(`  Username: ${username}`);
    console.log(`  Email: ${email}`);
    console.log(`  Role: admin`);
    console.log(`\nYou can now login at http://localhost:3000/login.html`);

  } catch (error) {
    console.error('Error creating admin user:', error.message);
  }

  rl.close();
}

createAdmin();
