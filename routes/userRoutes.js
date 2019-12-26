const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Method and end of url needed to access each controller
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUser);
router.post('/', userController.createUser);
router.post('/find', userController.findUser);
router.post('/login', userController.login);
router.put('/:userId', userController.replaceUser);
router.patch('/:userId', userController.editUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;
