const { userControllers } = require('../controllers');

module.exports = (app) => {
  app
    .route('/user')
    .post(userControllers.adds)
    .get(userControllers.list);

  app.route('/user/:id').delete(userControllers.remove);
};
