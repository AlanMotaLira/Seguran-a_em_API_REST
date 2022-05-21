const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
// eslint-disable-next-line no-unused-vars
const authenticationStrategy = require('./src/validation/authenticationStrategy');

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(passport.initialize());

module.exports = app;
