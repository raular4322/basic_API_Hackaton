const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String },
  avatarImage: { type: String },
  password: { type: String, required: true },
  signUpDate: { type: Date, default: Date.now() },
});


module.exports = mongoose.model('User', userSchema);
