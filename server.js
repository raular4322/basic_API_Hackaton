const mongodb = process.env.MONGODB || 'mongodb://localhost:27017/training';
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(mongodb, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(`ERROR: connecting to Database. ${err}`);
  } else {
    console.log(`Connection to ${mongodb} was succesfull`);
    app.listen(port, () => {
      console.log(`Training RESTful API server started on: ${port}`);
    });
  }
});
