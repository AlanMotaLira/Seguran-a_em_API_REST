const { postsControllers } = require('../controllers');
const  middlewaresAuthentication  = require('../middlewares/middlewaresAuthentication');

module.exports = (app) => {
  app
    .route('/post')
    .get(postsControllers.list)
    .post(middlewaresAuthentication.bearer, postsControllers.adds);
};
