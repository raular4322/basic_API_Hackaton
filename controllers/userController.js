'use strict'

const User = require('../models/user')

function signUp(req, res){
  var email = req.body.email
  var firstname = req.body.firstname
  var surname = req.body.surname
  var avatarImage = req.body.avatarImage
  var password = req.body.password
  var phone = req.body.phone

  User.findOne({email: email})
  .exec((err, userExist) => {
    if (err) return res.sendStatus(500)
    if (userExist) return res.sendStatus(409)

    const user = new User({
      email: email,
      firstname:firstname,
      surname: surname,
      avatarImage: avatarImage,
      password: password,
      phone: phone,
    })
    console.log(user)

    user.save((err, user) => {
      if (err) return res.sendStatus(500)
      if (!user) return res.sendStatus(500)
      return res.status(200).send({"message": "OK"})
    })
  })
}

function login(req, res){
  var email = req.body.email
  var password = req.body.password

  User.findOne({email: email})
  .exec((err, user) => {
    if (err) return res.sendStatus(500)
    if (!user) return res.sendStatus(404)

    if(password == user.password)
      return res.sendStatus(200)
    })
}

function updateUser(req, res){
  var email = req.body.email
  var firstname = req.body.firstname
  var surname = req.body.surname
  var avatarImage = req.body.avatarImage
  var password = req.body.password
  var phone = req.body.phone
  var updatedFields = {}

  if(email) updatedFields.email = req.body.email
  if(firstname) updatedFields.firstname = req.body.firstname
  if(surname) updatedFields.surname = req.body.surname
  if(avatarImage) updatedFields.avatarImage = req.body.avatarImage
  if(password) updatedFields.password = req.body.password
  if(phone) updatedFields.phone = req.body.phone

  User.findById(req.user, (err, user) => {
      if (err) return res.sendStatus(500)
      if (!user) return res.sendStatus(404)
      user.set(updatedFields)
      user.save((err) => {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200)
      })
    })
}

function getUsers(req, res){
  User.find({}, (err, users) => {
      if(err) return res.status(500).send({message: `Error on request: ${err}` })
      if(!users) return res.status(404).send({message: `No users found: ${err}` })

      return res.status(200).send(users)
  })
}

function getUser(req, res){
  User.findOne({_id: req.params.id})
  .exec((err, user) => {
      if(err) return res.status(500).send({message: `Error on request: ${err}` })
      if(!user) return res.status(404).send({message: `No users found: ${err}` })

      return res.status(200).send(user)
  })
}

module.exports = {
  signUp,
  login,
  updateUser,
  getUsers,
  getUser
}
