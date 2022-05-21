const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { UserModels } = require('../models');
const commonValidations = require('./commonValidations');

module.exports = passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
        const user = await UserModels.searchByEmail(username);
        commonValidations.verifyUse(user.email);
        await commonValidations.validatePassword(password, user.password);
        done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ),
);
