const mongoose = require('mongoose');
const Joi = require('joi');

const authSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    minlength: 0,
    maxlength: 255,
  },
  password: {
    required: true,
    type: String,
    minlength: 0,
    maxlength: 1024,
  },
});


function validate(value) {
  const schema = {

    email: Joi.string().email().min(0).max(255).required(),
    password: Joi.string().min(0).max(255).required(),
  };

  return Joi.validate(value, schema);
}

module.exports.validate = validate;
module.exports.Auth = authSchema;
