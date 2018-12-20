const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/retailBilling' }),
    ],
  });
  return logger;
};
