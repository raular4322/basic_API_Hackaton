/* eslint-disable consistent-return */

const User = require('../models/user');

// Get user object
function getUsers(req, res) {
  // Finds all users in the database
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: `Error on request: ${err}` });
    if (!users) return res.status(404).send({ message: 'No users found' });

    return res.status(200).send(users);
  });
}

// Get user object by ID
function getUser(req, res) {
  const { userId } = req.params;

  if (!userId) return res.status(400).send({ message: 'Missing params' });

  // Finds the user with the id provided
  User.findById({ _id: userId }, (err, user) => {
    if (err) return res.status(404).send({ message: `No users found: ${err}` });

    return res.status(200).send(user);
  });
}

// Create and save a new user
function createUser(req, res) {
  const { email } = req.body;
  const { password } = req.body;
  const { firstname } = req.body;
  const { surname } = req.body;
  const { avatarImage } = req.body;
  const { phone } = req.body;
  const { signUpDate } = req.body;

  if (!email || !password || !firstname || !surname) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Checks if the user already exist
  User.findOne({ email }, (err1, userExist) => {
    if (err1) return res.status(500).send({ message: `Error finding user ${err1}` });
    if (userExist) return res.status(409).send({ message: 'User already exist' });

    // Create a new user
    const user = new User({
      email,
      password,
      firstname,
      surname,
      avatarImage,
      phone,
      signUpDate,
    });

    // Save the new user
    user.save((err2, newUser) => {
      if (err2) return res.status(500).send({ message: `Error saving user ${err2}` });
      if (!newUser) return res.status(500).send({ message: 'No user to save' });

      return res.status(200).send({ message: 'User saved', newUser });
    });
  });
}

// Replace the user information
function replaceUser(req, res) {
  const { userId } = req.params;
  const { email } = req.body;
  const { password } = req.body;
  const { firstname } = req.body;
  const { surname } = req.body;
  const { avatarImage } = req.body;
  const { phone } = req.body;
  const { signUpDate } = req.body;

  if (!email || !firstname || !surname || !password) {
    return res.status(400).send({ message: 'Missing params' });
  }

  // Create the new user
  const userReplace = {
    email,
    password,
    firstname,
    surname,
    avatarImage,
    phone,
    signUpDate,
  };

  User.findById(userId, (err1, user) => {
    if (err1) return res.status(404).send({ message: `No user found: ${err1}` });

    // Replaces the user
    user.replaceOne(userReplace, (err2) => {
      if (err2) return res.status(500).send({ message: `Error replacing user ${err2}` });

      return res.status(200).send({ message: 'User replaced' });
    });
  });
}

// Update the user information
function editUser(req, res) {
  const updatedFields = {};

  const { userId } = req.params;
  const { email } = req.body;
  const { firstname } = req.body;
  const { surname } = req.body;
  const { avatarImage } = req.body;
  const { password } = req.body;
  const { phone } = req.body;
  const { signUpDate } = req.body;

  // Get the new information
  if (email) updatedFields.email = req.body.email;
  if (password) updatedFields.password = req.body.password;
  if (firstname) updatedFields.firstname = req.body.firstname;
  if (surname) updatedFields.surname = req.body.surname;
  if (avatarImage) updatedFields.avatarImage = req.body.avatarImage;
  if (phone) updatedFields.phone = req.body.phone;
  if (signUpDate) updatedFields.signUpDate = req.body.signUpDate;

  // Update the user
  User.findByIdAndUpdate(userId, updatedFields, (err) => {
    if (err) return res.status(500).send({ message: `Error finding user ${err}` });

    return res.status(200).send({ message: 'User updated' });
  });
}

// Deletes the user from the database
function deleteUser(req, res) {
  const { userId } = req.params;

  if (!userId) return res.status(400).send({ message: 'Missing params' });

  User.findByIdAndRemove(userId, (err, user) => {
    if (err) return res.status(500).send({ message: `Error erasing user ${err}` });
    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'User deleted' });
  });
}

// Validate the information to log in
function login(req, res) {
  const { email } = req.params;
  const { password } = req.body;

  // Find the user and check if the password is correct
  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error finding the user ${err}` });
    if (!user) return res.status(404).send({ message: 'No user found' });

    if (password === user.password) return res.status(200).send({ message: 'Correct password' });
    return res.status(200).send({ message: 'Incorrect password' });
  });
}


module.exports = {
  getUser,
  getUsers,
  createUser,
  replaceUser,
  editUser,
  deleteUser,
  login,
};
