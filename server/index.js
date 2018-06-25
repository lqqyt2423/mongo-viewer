'use strict';

const express = require('express');
const morgan = require('morgan');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', api);

// handle error 参数next不能省略
// eslint-disable-next-line
app.use((error, req, res, next) => {
  if (!res.finished) {
    res.status(500).send(error.message);
  }

  // eslint-disable-next-line
  console.log(error);
});

app.listen(2424);
