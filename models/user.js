const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  avatarImage: { type: String },
  phone: { type: Number },
  signUpDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);
