const { v4: uuidv4 } = require('uuid');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const WebSocket = require('ws');
const connectDB = require('./db');
const User = require('./models/User');
require('./auth');

const app = express();
const server = require('http').createServer(app);
const wss = new WebSocket.Server({ server });

// Connect to MongoDB
connectDB();

// Express session
app.use(session({ secret: 'ABZJqEayh2e3Djop', resave: false, saveUninitialized: false }));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // On success, redirect to WebSocket connection page or send a success message.
    res.redirect('/');
  }
);

app.get('/guest', (req, res) => {
  const guestUser = new User({ name: `Guest_${uuidv4()}`, isGuest: true });
  guestUser.save().then(user => {
    req.login(user, err => {
      if (err) return res.status(500).send(err);
      res.redirect('/');
    });
  });
});

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  if (req.user) {
    ws.send(JSON.stringify({ message: `Welcome ${req.user.name}` }));
  } else {
    ws.send(JSON.stringify({ message: 'Authentication required' }));
    ws.close();
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
