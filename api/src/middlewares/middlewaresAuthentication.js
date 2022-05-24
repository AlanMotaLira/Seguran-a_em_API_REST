const passport = require("passport");
const { UserModels } = require("../models");
const { refresh, checkEmail } = require("../token");

module.exports = {
  local(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err && err.name === "InvalidArgumentError") {
        return res.status(401).json({ erro: err.message });
      }
      if (err) {
        return res.status(500).json({ erro: err.message });
      }
      if (!user) {
        return res.status(401).json();
      }
      req.user = user;
      return next();
    })(req, res, next);
  },
  bearer(req, res, next) {
    passport.authenticate("bearer", { session: false }, (err, user, info) => {
      if (err && err.name === "JsonWebTokenError") {
        return res.status(401).json({ erro: err.message });
      }
      if (err && err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ err: err.message, expirado: err.expiredAt });
      }
      if (err) {
        return res.status(500).json({ erro: err.message });
      }
      if (!user) {
        return res.status(401).json();
      }
      req.token = info.token;
      req.user = user;
      return next();
    })(req, res, next);
  },
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const id = await refresh.verify(refreshToken);
      await refresh.invalid(refreshToken);
      req.user = await UserModels.searchByID(id);
      return next();
    } catch (err) {
      if (err.name === "InvalidArgumentError") {
        return res.status(401).json(err.message);
      }
      return res.status(500).json(err.message);
    }
  },
  async email(req, res, next) {
    try {
      const { token } = req.params;
      const payload = await checkEmail.verify(token);
      req.user = await UserModels.searchByID(payload.id);
      return next();
    } catch (err) {
      if (
        err.name === "InvalidArgumentError" ||
        err.name === "JsonWebTokenError"
      ) {
        return res.status(401).json(err.message);
      }
      return res.status(500).json(err.message);
    }
  },
};
