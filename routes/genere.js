const express = require('express');
const debug = require('debug')('app:genereRouter');
const { Model, validate } = require('../model/genereModel');

const genereRouter = express.Router();

genereRouter.get('/', async (req, res) => {
  try {
    const result = await Model.find();
    res.json(result);
  } catch (e) {
    debug(e.message);
  }
});
genereRouter.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);
  let genere = new Model({ name: req.body.name });
  genere = await genere.save();
  return res.send(genere);
});

genereRouter.put('/:id', async (req, res) => {
  const { id } = req.params;

  const result = await Model.updateOne({ _id: id }, {
    $set: {
      name: req.body.name,
    },
  });
  if (!result) return res.status(404).send('Req id doesn\'t exist');
  return res.send(result);
});

genereRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const find = await Model.findByIdAndRemove({ _id: id });
  if (!find) return res.status(404).send("req id doesn't exist");
  return res.send(find);
});

module.exports = genereRouter;
