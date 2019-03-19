'use strict'

const express = require('express')
const api = express.Router()
const userController = require('../controllers/userController')

api.post('/signup', userController.signUp)
api.post('/login', userController.login)
api.put('/update', userController.updateUser)
api.get('/all', userController.getUsers)
api.get('/:id', userController.getUser)

module.exports = api
