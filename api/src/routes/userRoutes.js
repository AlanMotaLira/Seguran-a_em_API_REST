const passport = require('passport');
const { userControllers } = require('../controllers');

module.exports = (app) => {
  app.route('/user').post(userControllers.adds).get(userControllers.list);

  app.route('/user/:id').get(userControllers.pegaId).delete(passport.authenticate('bearer', { session: false }), userControllers.remove);
  app
    .route('/user/login')
    .post(
      passport.authenticate('local', { session: false }),
      userControllers.login,
    );
};
