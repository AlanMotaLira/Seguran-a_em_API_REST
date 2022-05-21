const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport')
const authenticationStrategy = require('./src/validation/authenticationStrategy')

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(passport.initialize());

module.exports = app;
