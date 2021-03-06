const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(401).send('Access denied, No token provided');
  try {
    const decoded = jwt.verify(token, config.get('jwt.privateKey'));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send('Invalid token');
  }
}

module.exports = auth;
