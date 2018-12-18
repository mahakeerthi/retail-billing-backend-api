const _ = require('lodash');
const debug = require('debug')('app:auth');
const bcrypt = require('bcrypt');
const express = require('express');
const authRoute = express.Router();
const { Auth, validate } = require('../model/authModel');
const { User } = require('../model/userModel');
const auth = require('../middleware/auth');

authRoute.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(401).send(error);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send('Invalid email or password');

  const isValidPasword = await bcrypt.compareSync(req.body.password, user.password);
  if (!isValidPasword) return res.status(404).send('Invalid email or password');

  const token = await user.generateAuthToken();
  return res.send(token);
});

authRoute.get('/me', auth, async (req, res) => {
  const id = req.user._id;
  const user = await User.findById({ _id: id });
  return res.send(_.pick(user, ['email', '_id', 'name']));
});

module.exports = authRoute;
