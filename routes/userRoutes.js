const express = require('express');
const userController = require('../controllers/userController');

const api = express.Router();

// Method and end of url needed to access each controller
api.get('/', userController.getUsers);
api.get('/:userId', userController.getUser);
api.post('/', userController.createUser);
api.post('/:email', userController.login);
api.put('/:userId', userController.replaceUser);
api.patch('/:userId', userController.editUser);
api.delete('/:userId', userController.deleteUser);

module.exports = api;
