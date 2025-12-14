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

async function makeUserAdmin() {
  console.log('=== Make User Admin ===\n');

  // Initialize database
  initializeDatabase();

  try {
    const username = await question('Enter username to make admin: ');

    const user = User.findByUsername(username);

    if (!user) {
      console.error(`Error: User "${username}" not found`);
      rl.close();
      return;
    }

    if (user.role === 'admin') {
      console.log(`✓ User "${username}" is already an admin!`);
      rl.close();
      return;
    }

    // Update to admin
    User.update(user.id, { role: 'admin' });

    console.log(`\n✓ User "${username}" is now an admin!`);
    console.log(`  ID: ${user.id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  New Role: admin`);
    console.log(`\nYou can now login at your website with this user.`);

  } catch (error) {
    console.error('Error:', error.message);
  }

  rl.close();
}

makeUserAdmin();
