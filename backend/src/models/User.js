const { db } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static create(username, email, password, role = 'user') {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const stmt = db.prepare(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)'
    );
    const result = stmt.run(username, email, hashedPassword, role);
    return result.lastInsertRowid;
  }

  static findById(id) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id);
  }

  static findByUsername(username) {
    const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
    return stmt.get(username);
  }

  static findByEmail(email) {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email);
  }

  static findAll() {
    const stmt = db.prepare('SELECT id, username, email, role, created_at FROM users');
    return stmt.all();
  }

  static update(id, updates) {
    const fields = [];
    const values = [];

    if (updates.username) {
      fields.push('username = ?');
      values.push(updates.username);
    }
    if (updates.email) {
      fields.push('email = ?');
      values.push(updates.email);
    }
    if (updates.password) {
      fields.push('password = ?');
      values.push(bcrypt.hashSync(updates.password, 10));
    }
    if (updates.role) {
      fields.push('role = ?');
      values.push(updates.role);
    }

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const stmt = db.prepare(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`
    );
    return stmt.run(...values);
  }

  static delete(id) {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    return stmt.run(id);
  }

  static verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }
}

module.exports = User;
