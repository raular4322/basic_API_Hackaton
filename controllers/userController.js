const User = require('../models/user');

function signUp(req, res) {
  const { email } = req.body;
  const { firstname } = req.body;
  const { surname } = req.body;
  const { avatarImage } = req.body;
  const { password } = req.body;
  const { phone } = req.body;

  User.findOne({ email }, (err, userExist) => {
    if (err) return res.status(500).send({ message: `Error finding user ${err}` });
    if (userExist) return res.status(409).send({ message: 'User already exist' });

    const user = new User({
      email,
      firstname,
      surname,
      avatarImage,
      password,
      phone,
    });

    user.save((error, newUser) => {
      if (error) return res.status(500).send({ message: `Error saving user ${error}` });
      if (!newUser) return res.status(500).send({ message: 'No user to save' });

      return res.status(200).send({ message: 'Saved' });
    });

    return res.status(200).send({ message: 'No previous user' });
  });
}

function login(req, res) {
  const { email } = req.body;
  const { password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error finding the user ${err}` });
    if (!user) return res.status(404).send({ message: 'No user found' });

    if (password === user.password) return res.status(200).send({ message: 'Correct password' });
    return res.status(200).send({ message: 'Incorrect password' });
  });
}

function updateUser(req, res) {
  const { email } = req.body;
  const { firstname } = req.body;
  const { surname } = req.body;
  const { avatarImage } = req.body;
  const { password } = req.body;
  const { phone } = req.body;
  const updatedFields = {};

  if (email) updatedFields.email = req.body.email;
  if (firstname) updatedFields.firstname = req.body.firstname;
  if (surname) updatedFields.surname = req.body.surname;
  if (avatarImage) updatedFields.avatarImage = req.body.avatarImage;
  if (password) updatedFields.password = req.body.password;
  if (phone) updatedFields.phone = req.body.phone;

  User.findByIdAndUpdate(req.params.userId, updatedFields, (err, user) => {
    if (err) return res.status(500).send({ message: `Error finding user ${err}` });
    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ message: 'user updated' });
  });
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err) return res.status(500).send({ message: `Error on request: ${err}` });
    if (!users) return res.status(404).send({ message: `No users found: ${err}` });

    return res.status(200).send(users);
  });
}

function getUser(req, res) {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) return res.status(500).send({ message: `Error on request: ${err}` });
    if (!user) return res.status(404).send({ message: `No users found: ${err}` });

    return res.status(200).send(user);
  });
}

module.exports = {
  signUp,
  login,
  updateUser,
  getUsers,
  getUser,
};
