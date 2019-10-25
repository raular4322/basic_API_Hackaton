const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, required: [true, 'email requiered'] },
  password: { type: String, required: [true, 'password requiered'] },
  firstname: { type: String, required: [true, 'firstname requiered'] },
  surname: { type: String, required: [true, 'surname requiered'] },
  avatarImage: { type: String },
  phone: { type: String, minlength: 9, maxlength: 9 },
  signUpDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('User', userSchema);
