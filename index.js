const debug = require('debug')('app:starter');
const mongoose = require('mongoose');
const express = require('express');
const genereRouter = require('./routes/genere');

mongoose.connect('mongodb://localhost:27017/retailBilling', { useNewUrlParser: true })
  .then(() => {
    debug('connected to database on port number');
  });

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json({ extended: true }));
app.use(express.static('./public'));
app.use('/api/genere', genereRouter);


app.listen(port, () => {
  debug(`Server started on ${port}`);
});
