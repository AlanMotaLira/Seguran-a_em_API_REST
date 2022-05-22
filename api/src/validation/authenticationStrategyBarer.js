const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const jwt = require('jsonwebtoken');
const { UserModels } = require('../models');

module.exports = passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      const user = await UserModels.searchByID(payload.id);
      done(null, user,{token:token});
    } catch (err) {
      done(err);
    }
  }),
);
