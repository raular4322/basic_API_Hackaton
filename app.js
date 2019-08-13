const bodyParser = require('body-parser');
const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/user', userRoutes);

module.exports = app;
