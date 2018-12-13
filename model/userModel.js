const mongoose = require('mongoose');

const Joi = require('joi');

//  const PasswordComplexity = require('joi-password-complexity');

//  required params name,email and password
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 0,
    maxlength: 255,
    required: true,
  },
  email: {
    type: String,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
});

const userModel = mongoose.model('user', userSchema);

function validate(value) {
  const schema = {
    name: Joi.string().min(0).max(255).required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(0).max(255).required(),
  };
  return Joi.validate(value, schema);
}

module.exports.User = userModel;
module.exports.validate = validate;
