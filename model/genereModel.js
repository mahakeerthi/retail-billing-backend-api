const mongoose = require('mongoose');
const Joi = require('joi');
// define schema

const genereSchema = mongoose.Schema({
  name: String,
  date: { type: Date, defaults: Date.now },
});

const genereModel = mongoose.model('genere', genereSchema);

function validate(value) {
  const schema = {
    name: Joi.string().min(5).required(),
  };
  return Joi.validate(value, schema);
}
module.exports.Model = genereModel;
module.exports.validate = validate;
