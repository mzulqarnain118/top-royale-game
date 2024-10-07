// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  googleId: { type: String },
  name: { type: String, required: true },
  email: { type: String },
  isGuest: { type: Boolean, default: false },
});

module.exports = mongoose.model('users', UserSchema);
