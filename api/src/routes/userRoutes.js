const passport = require('passport');
const { userControllers } = require('../controllers');
const middlewaresAuthentication = require('../middlewares/middlewaresAuthentication');

module.exports = (app) => {
  app.route('/user').post(userControllers.adds).get(userControllers.list);

  app.route('/user/:id').delete(passport.authenticate('bearer', { session: false }), userControllers.remove);
  app
    .route('/user/login')
    .post(
      middlewaresAuthentication.local,
      userControllers.login,
    );
};
