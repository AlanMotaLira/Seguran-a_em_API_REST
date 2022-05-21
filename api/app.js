const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const {
  authenticationStrategyLocal,
  authenticationStrategyBarer,
} = require('./src/validation');

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(passport.initialize());

module.exports = app;
