const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const commonValidations = require("./commonValidations");
const jwt = require("jsonwebtoken");
const { UserModels } = require("../models");

module.exports = passport.use(
  new BearerStrategy(async (token, done) => {
    try {
      await commonValidations.verifyToken(token);
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      const user = await UserModels.searchByID(payload.id);
      done(null, user, { token });
    } catch (err) {
      done(err);
    }
  })
);
