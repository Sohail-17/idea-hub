// ---------------------------
// server.js - Phase 2.5 IdeaHub
// ---------------------------

const express = require('express');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

// ---------- Middleware ----------
app.use(express.urlencoded({ extended: true })); // HTML form POST
app.use(express.json()); // JSON requests
app.use(express.static(path.join(__dirname, '../frontend'))); // serve frontend files

// Session setup
app.use(session({
  secret: 'super-secret-key', // change for prod
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30*60*1000 } // 30 min
}));

// ---------- JSON Helpers ----------
function readData() {
  return JSON.parse(fs.readFileSync('./backend/data.json', 'utf8'));
}

function writeData(data) {
  fs.writeFileSync('./backend/data.json', JSON.stringify(data, null, 2));
}

// ---------- Incremental ID Helper ----------
function generateUserId() {
  const users = readData().users;
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id)) + 1;
}

// ---------- Rate Limiter for Login ----------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 5,
  message: 'Too many login attempts! Try again later.'
});

// ---------- POST Routes ----------

// Signup
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send('Email and password required.');

  const data = readData();
  if (data.users.find(u => u.email === email)) return res.send('User already exists.');

  const newUser = {
    id: generateUserId(),
    email,
    password: bcrypt.hashSync(password, 12)
  };

  data.users.push(newUser);
  writeData(data);

  res.send(`Signup successful! Your user ID is ${newUser.id}`);
});

// Login
app.post('/login', loginLimiter, (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.send('Email and password required.');

  const data = readData();
  const user = data.users.find(u => u.email === email);
  if (!user) return res.send('User not found.');

  const passwordMatches = bcrypt.compareSync(password, user.password);
  if (!passwordMatches) return res.send('Incorrect password.');

  // store user info in session
  req.session.userId = user.id;
  req.session.email = user.email;

  res.send(`Login successful! Welcome, ${email}`);
});

// Submit Idea
app.post('/submit', (req, res) => {
  if (!req.session.userId) return res.send('You must log in first.');

  const { title, description } = req.body;
  if (!title || !description) return res.send('All fields are required.');

  const data = readData();
  const newIdea = {
    id: data.ideas.length + 1,
    userId: req.session.userId,
    title,
    description,
    timestamp: new Date().toISOString()
  };

  data.ideas.push(newIdea);
  writeData(data);

  res.send('Idea submitted successfully!');
});

// ---------- GET Routes for HTML ----------
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../frontend/index.html')));
app.get('/login.html', (req, res) => res.sendFile(path.join(__dirname, '../frontend/login.html')));
app.get('/signup.html', (req, res) => res.sendFile(path.join(__dirname, '../frontend/signup.html')));
app.get('/submit.html', (req, res) => {
  if (!req.session.userId) return res.send('You must log in first to submit an idea.');
  res.sendFile(path.join(__dirname, '../frontend/submit.html'));
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`Phase 2 server running at http://localhost:${PORT}`);
});