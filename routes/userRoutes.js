const express = require('express');
const userController = require('../controllers/userController');

const api = express.Router();

api.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

api.post('/signup', userController.signUp);
api.post('/login', userController.login);
api.put('/update/:userId', userController.updateUser);
api.get('/all', userController.getUsers);
api.get('/:userId', userController.getUser);


module.exports = api;
