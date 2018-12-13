const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const { User, validate } = require('../model/userModel');

const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const isEmailAvailable = await User.findOne(_.pick(req.body, ['email']));
  if (isEmailAvailable) return res.status(400).send('user already exists');
  
  const pick = _.pick(req.body, ['name', 'email', 'password']);
  let user = new User(pick);

  const salt = await bcrypt.genSaltSync(10);
  user.password = await bcrypt.hashSync(user.password, salt);
  user = await user.save();
  return res.send(_.pick(user, ['name', 'email']));
});

module.exports = router;
