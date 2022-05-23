const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

const {
  /* eslint-disable no-unused-vars */
  authenticationStrategyLocal,
  authenticationStrategyBarer,
} = require('./src/validation');
/* eslint-disable no-unused-vars */
app.use(bodyParser.json());
app.use(passport.initialize());

module.exports = app;
