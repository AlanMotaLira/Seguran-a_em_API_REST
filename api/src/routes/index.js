const bodyParser = require('body-parser');
const posts = require('./postsRoutes');
const users = require('./userRoutes');

module.exports = (app) => (
  app.use(bodyParser.json()),
  posts(app),
  users(app)
);
