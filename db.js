const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'chapel-clash.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    trophies INTEGER DEFAULT 0,
    gold INTEGER DEFAULT 1000,
    gems INTEGER DEFAULT 50,
    level INTEGER DEFAULT 1,
    wins INTEGER DEFAULT 0,
    losses INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    player1_id INTEGER NOT NULL,
    player2_id INTEGER NOT NULL,
    winner_id INTEGER,
    p1_crowns INTEGER,
    p2_crowns INTEGER,
    played_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

module.exports = {
  createUser(username, hash) {
    const stmt = db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)');
    const result = stmt.run(username, hash);
    return { id: result.lastInsertRowid, username, trophies: 0, gold: 1000, gems: 50, level: 1 };
  },
  getUserByUsername(username) {
    return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  },
  getUserById(id) {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },
  createSession(token, userId) {
    db.prepare('INSERT INTO sessions (token, user_id) VALUES (?, ?)').run(token, userId);
  },
  getSession(token) {
    return db.prepare('SELECT * FROM sessions WHERE token = ?').get(token);
  },
  deleteSession(token) {
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  },
  recordGame(p1Id, p2Id, winnerId, p1Crowns, p2Crowns) {
    db.prepare('INSERT INTO games (player1_id, player2_id, winner_id, p1_crowns, p2_crowns) VALUES (?,?,?,?,?)').run(p1Id, p2Id, winnerId, p1Crowns, p2Crowns);
    if (winnerId === p1Id) {
      db.prepare('UPDATE users SET wins = wins + 1 WHERE id = ?').run(p1Id);
      db.prepare('UPDATE users SET losses = losses + 1 WHERE id = ?').run(p2Id);
    } else {
      db.prepare('UPDATE users SET wins = wins + 1 WHERE id = ?').run(p2Id);
      db.prepare('UPDATE users SET losses = losses + 1 WHERE id = ?').run(p1Id);
    }
  },
  updateTrophies(userId, delta) {
    db.prepare('UPDATE users SET trophies = MAX(0, trophies + ?) WHERE id = ?').run(delta, userId);
  },
};
