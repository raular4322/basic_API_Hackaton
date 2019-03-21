const express = require('express');
const userController = require('../controllers/userController');

const api = express.Router();


api.post('/signup', userController.signUp);
api.post('/login', userController.login);
api.put('/update/:userId', userController.updateUser);
api.get('/all', userController.getUsers);
api.get('/:id', userController.getUser);

module.exports = api;
