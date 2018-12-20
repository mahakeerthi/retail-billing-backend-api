const express = require('express');

const app = express();
const debug = require('debug')('app:starter');
const config = require('config');
const logger = require('./middleware/logger')();

require('./starter/database')();
require('express-async-errors');
require('./starter/routes')(app);

const port = process.env.PORT || 3000;

if (!config.get('jwt.privateKey')) {
  debug(`jwt private key not defined ${config.get('jwt.privateKey')}`);
  logger.log('error', 'jwt private key not defined');
  process.exit(1);
}

app.listen(port, () => {
  debug(`Server started on ${port}`);
  logger.log('info', `Server started on ${port}`);
});
