const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const UserModels = require("../models");
const commonValidations = require('./commonValidations')

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "senha",
      session: false,
    },
    async (email, senha, done) => {
      try {
        const use = await UserModels.searchByEmail(email);
        commonValidations.verifyUse(use)

      } catch (err) {
        done(err);
      }
    }
  )
);

