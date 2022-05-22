const { userControllers } = require("../controllers");
const middlewaresAuthentication = require("../middlewares/middlewaresAuthentication");

module.exports = (app) => {
  app.route("/user").post(userControllers.adds).get(userControllers.list);

  app
    .route("/user/:id")
    .delete(middlewaresAuthentication.bearer, userControllers.remove);
  app
    .route("/user/login")
    .post(middlewaresAuthentication.local, userControllers.login);
  app
    .route("/user/logout")
    .get(middlewaresAuthentication.bearer, userControllers.logout);
};
