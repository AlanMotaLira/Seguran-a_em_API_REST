const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModels = require("../models");
const commonValidations = require('./commonValidations')

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    async (email, password, done) => {
      try {
        const user = await UserModels.searchByEmail(email);
        commonValidations.verifyUse(user)

      } catch (err) {
        done(err);
      }
    }
  )
);

