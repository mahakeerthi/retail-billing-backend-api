const mongoose = require('mongoose');
const logger = require('../middleware/logger')();


module.exports = function () {
  mongoose.connect('mongodb://localhost:27017/retailBilling', { useNewUrlParser: true })
    .then(() => {
      logger.log('info', 'Connected  to database');
    });
};
