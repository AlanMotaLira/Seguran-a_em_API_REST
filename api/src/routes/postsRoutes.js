const {postsControllers} = require('../controllers');

module.exports = (app) => {
  app
    .route('/post')
    .get(postsControllers.list)
    .post(postsControllers.adds);
};
