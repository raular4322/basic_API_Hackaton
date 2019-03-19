'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  firstname: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String },
  avatarImage: String,
  password: { type: String, select: false, required: true },
  signUpDate: { type:Date, default: Date.now() },
})


module.exports = mongoose.model('User', userSchema);
