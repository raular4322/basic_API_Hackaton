# trainingAPI
Basic REST service, for training purposes only.

It has a simple and non-secure User Model and Controller.

Structure is defined as follows:

/controllers --> Directory for controllers implementation.
/models --> Models built over mongoose Schema architecture are saved here.
/routes --> Different files for different controllers define every available route for that controller.

To run this REST service locally, you need to follow this steps:

1. Clone this repository.
2. Get MongoDB.
3. Run a MongoDB instance. Make sure to modify the /data/db path, or grant write access to MongoDB to root directory (not recommended).
4. Run 'npm install' inside your API folder.
5. Run 'npm start'
6. You got it! You API is running locally on http://localhost:3000/api

