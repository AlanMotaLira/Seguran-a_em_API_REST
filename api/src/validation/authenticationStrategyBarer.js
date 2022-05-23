const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { UserModels } = require('../models');
const { access } = require('../token');

module.exports = passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      const payload = await access.verify(token);
      const user = await UserModels.searchByID(payload.id);
      done(null, user, { token });
    } catch (err) {
      done(err);
    }
  }),
);
