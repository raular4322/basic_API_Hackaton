const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Method and end of url needed to access each controller
router.get('/', auth.verifyToken, (req, res) => res.status(200).send({ message: 'correct' }));

module.exports = router;
