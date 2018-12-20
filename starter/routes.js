const express = require('express');
const genereRouter = require('../routes/genere');
const userRouter = require('../routes/user');
const authRoute = require('../routes/auth');
const errorMiddleWare = require('../middleware/error');

module.exports = function (app) {
  app.use(express.json({ extended: true }));
  app.use(express.static('./public'));
  app.use('/api/genere', genereRouter);
  app.use('/api/user', userRouter);
  app.use('/api/auth', authRoute);
  app.use(errorMiddleWare);
};
