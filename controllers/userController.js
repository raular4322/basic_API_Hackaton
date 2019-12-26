/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const token = require('../middleware/auth');
const User = require('../models/user');

// Get user object
function getUsers(req, res) {
  // Finds all users in the database
  User.find({}, (error, users) => {
    if (error) return res.status(500).send({ error });

    return res.status(200).send(users);
  });
}

// Get user object by ID
function getUser(req, res) {
  const { userId } = req.params;

  // Finds the user with the id provided
  User.findById(userId, (error, user) => {
    if (error) return res.status(404).send({ message: 'No users found', error });

    return res.status(200).send(user);
  });
}

function findUser(req, res) {
  const param = req.body;

  User.find(param, (error, user) => {
    if (error) return res.status(404).send({ message: 'No user found', error });

    return res.status(200).send(user);
  });
}

// Create and save a new user
function createUser(req, res) {
  // Create a new user
  const user = new User(req.body);

  // Save the new user
  user.save((error, newUser) => {
    if (error) return res.status(400).send({ message: 'Error saving user', error });

    return res.status(200).send({ message: 'Saved user', newUser, token: token.createToken(user.id) });
  });
}

// Replace the user information
function replaceUser(req, res) {
  const { userId } = req.params;
  const { email } = req.body;
  const { password } = req.body;
  const { firstname } = req.body;
  const { surname } = req.body;

  if (!email || !firstname || !surname || !password) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Create the new user
  const userReplacement = req.body;

  User.findById(userId, (err, user) => {
    if (err) return res.status(404).send({ message: 'No user to replace found', err });

    // Replaces the user
    user.replaceOne(userReplacement, (error) => {
      if (error) return res.status(500).send({ error });

      return res.status(200).send({ message: 'User replaced' });
    });
  });
}

// Update the user information
function editUser(req, res) {
  const { userId } = req.params;

  // Update the user
  User.findByIdAndUpdate(userId, req.body, { new: true }, (error, user) => {
    if (error) return res.status(500).send({ error });

    return res.status(200).send({ message: 'User updated', user });
  });
}

// Deletes the user from the database
function deleteUser(req, res) {
  const { userId } = req.params;

  User.findByIdAndRemove(userId, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'User deleted', user });
  });
}

// Validate the information to log in
function login(req, res) {
  const { email } = req.body;
  const { password } = req.body;

  // Find the user and check if the password is correct
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ err });
    if (!user) return res.status(404).send({ message: 'No user found' });

    bcrypt.compare(password, user.password, (err2, isMatch) => {
      if (err2) return res.status(500).send({ err2 });
      if (isMatch) return res.status(200).send({ message: 'Correct password', token: token.createToken(user.id) });

      return res.status(401).send({ message: 'Incorrect password' });
    });
  });
}

module.exports = {
  getUser,
  getUsers,
  findUser,
  createUser,
  replaceUser,
  editUser,
  deleteUser,
  login,
};
