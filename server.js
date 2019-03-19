'use strict'

var mongodb = process.env.MONGODB || 'mongodb://localhost:27017/training'
var port = process.env.PORT || 3000
var mongoose = require('mongoose')
const app = require('./app')

mongoose.connect(mongodb, (err, res) => {
  mongoose.Promise = global.Promise;
  if (err) {
    console.log('ERROR: connecting to Database. ' + err);
  } else {
    console.log("Connection to " + mongodb + " was succesfull")
    app.listen(port, () => {
      console.log('Training RESTful API server started on: ' + port);
    });
  }
});
