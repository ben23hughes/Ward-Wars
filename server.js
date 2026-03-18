const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── Auth middleware ──────────────────────────────────────────────────────────
function requireAuth(req, res, next) {
  const token = (req.headers['authorization'] || '').replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Not logged in' });
  const session = db.getSession(token);
  if (!session) return res.status(401).json({ error: 'Invalid session' });
  req.userId = session.user_id;
  next();
}

// ── REST API ─────────────────────────────────────────────────────────────────
app.post('/api/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
  if (username.length < 3 || username.length > 20) return res.status(400).json({ error: 'Username must be 3–20 characters' });
  if (!/^[A-Za-z0-9_]+$/.test(username)) return res.status(400).json({ error: 'Username: letters, numbers, underscores only' });
  if (password.length < 4) return res.status(400).json({ error: 'Password must be at least 4 characters' });
  try {
    const hash = bcrypt.hashSync(password, 10);
    const user = db.createUser(username, hash);
    const token = crypto.randomBytes(32).toString('hex');
    db.createSession(token, user.id);
    res.json({ token, user: publicUser(user) });
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(400).json({ error: 'Username already taken' });
    console.error(e);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body || {};
  const user = db.getUserByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  const token = crypto.randomBytes(32).toString('hex');
  db.createSession(token, user.id);
  res.json({ token, user: publicUser(user) });
});

app.get('/api/me', requireAuth, (req, res) => {
  const user = db.getUserById(req.userId);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(publicUser(user));
});

app.post('/api/logout', requireAuth, (req, res) => {
  const token = (req.headers['authorization'] || '').replace('Bearer ', '');
  db.deleteSession(token);
  res.json({ ok: true });
});

function publicUser(u) {
  return { id: u.id, username: u.username, trophies: u.trophies, gold: u.gold, gems: u.gems, level: u.level, wins: u.wins, losses: u.losses };
}

// ── WebSocket Multiplayer ────────────────────────────────────────────────────
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const queue = [];          // [{ws, userId, username}]
const rooms = new Map();   // roomId → {p1, p2, reported: Set}

wss.on('connection', (ws) => {
  ws.userId = null;
  ws.username = null;
  ws.roomId = null;

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    if (msg.type === 'auth') {
      const session = db.getSession(msg.token);
      if (!session) { ws.send(JSON.stringify({ type: 'auth_fail' })); return; }
      const user = db.getUserById(session.user_id);
      ws.userId = user.id;
      ws.username = user.username;
      ws.send(JSON.stringify({ type: 'auth_ok' }));
    }

    else if (msg.type === 'queue') {
      if (!ws.userId) return;
      // remove if already queued
      const i = queue.findIndex(e => e.ws === ws);
      if (i >= 0) queue.splice(i, 1);
      queue.push({ ws, userId: ws.userId, username: ws.username });
      ws.send(JSON.stringify({ type: 'queued' }));

      if (queue.length >= 2) {
        const p1 = queue.shift();
        const p2 = queue.shift();
        const roomId = crypto.randomBytes(8).toString('hex');
        p1.ws.roomId = p2.ws.roomId = roomId;
        rooms.set(roomId, { p1, p2, reported: new Set() });
        p1.ws.send(JSON.stringify({ type: 'matched', roomId, opponentName: p2.username }));
        p2.ws.send(JSON.stringify({ type: 'matched', roomId, opponentName: p1.username }));
      }
    }

    else if (msg.type === 'play') {
      if (!ws.roomId) return;
      const room = rooms.get(ws.roomId);
      if (!room) return;
      const opp = room.p1.ws === ws ? room.p2.ws : room.p1.ws;
      if (opp.readyState === 1) {
        opp.send(JSON.stringify({ type: 'opp_play', cardId: msg.cardId, pct_x: msg.pct_x, pct_y: msg.pct_y }));
      }
    }

    else if (msg.type === 'game_over') {
      if (!ws.roomId) return;
      const room = rooms.get(ws.roomId);
      if (!room || room.reported.has(ws.userId)) return;
      room.reported.add(ws.userId);

      const isP1 = room.p1.ws === ws;
      const player = isP1 ? room.p1 : room.p2;
      const opp    = isP1 ? room.p2 : room.p1;
      const won = msg.crowns > msg.opp_crowns || (msg.crowns === msg.opp_crowns && msg.crowns === 0);

      db.recordGame(player.userId, opp.userId, won ? player.userId : opp.userId, msg.crowns, msg.opp_crowns);
      const delta = won ? 30 : -20;
      db.updateTrophies(player.userId, delta);

      ws.send(JSON.stringify({ type: 'result', won, trophyDelta: delta }));

      if (room.reported.size === 2) rooms.delete(ws.roomId);
    }
  });

  ws.on('close', () => {
    const qi = queue.findIndex(e => e.ws === ws);
    if (qi >= 0) queue.splice(qi, 1);

    if (ws.roomId) {
      const room = rooms.get(ws.roomId);
      if (room) {
        const opp = room.p1.ws === ws ? room.p2.ws : room.p1.ws;
        if (opp.readyState === 1) opp.send(JSON.stringify({ type: 'opp_left' }));
        rooms.delete(ws.roomId);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`⛪ Chapel Clash running at http://localhost:${PORT}`));
