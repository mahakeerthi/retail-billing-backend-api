const log = require('../middleware/logger')();

module.exports = function (err, req, res, next) {
  log.log('error', err.message, err);
  res.status(500).send('Something failed, Please contact Support team');
  next();
};
