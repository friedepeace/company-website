// Check what's in the database
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'database.db');
console.log('Database location:', dbPath);
console.log('');

try {
    const db = new Database(dbPath);

    // Check if users table exists
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Tables in database:', tables);
    console.log('');

    // Get all users
    const users = db.prepare('SELECT id, username, email, role, created_at FROM users').all();
    console.log('Users in database:');
    console.log('Total count:', users.length);
    console.log('');

    if (users.length > 0) {
        users.forEach(user => {
            console.log(`ID: ${user.id}`);
            console.log(`  Username: ${user.username}`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Role: ${user.role}`);
            console.log(`  Created: ${user.created_at}`);
            console.log('');
        });
    } else {
        console.log('⚠ No users found in database!');
        console.log('You need to create an admin user first.');
        console.log('Run: node createAdmin.js');
    }

    db.close();
} catch (error) {
    console.error('Error reading database:', error.message);
}
