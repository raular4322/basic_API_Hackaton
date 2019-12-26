/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const { token } = req.headers;

  jwt.verify(token, process.env.KEY, (err) => {
    if (err) return res.status(401).send({ err });
    next();
  });
}

function createToken(userID) {
  return jwt.sign({
    data: userID,
  }, process.env.KEY, { expiresIn: 60 * 60 });
}

module.exports = {
  verifyToken,
  createToken,
};
