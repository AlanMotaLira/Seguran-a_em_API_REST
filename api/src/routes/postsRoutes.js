const passport = require('passport');
const { postsControllers } = require('../controllers');

module.exports = (app) => {
  app
    .route('/post')
    .get(postsControllers.list)
    .post(passport.authenticate('bearer', { session: false }), postsControllers.adds);
};
