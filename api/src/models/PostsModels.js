const postsDao = require('../dao/postsDao');
const commonValidations = require('../validation/commonValidations');

class Post {
  constructor(post) {
    this.title = post.title;
    this.content = post.content;
    this.valida();
  }

  adds() {
    return postsDao.adds(this);
  }

  valida() {
    commonValidations.fieldStringNotNull(this.title, 'título');
    commonValidations.fieldSizeMinimum(this.title, 'título', 5);

    commonValidations.fieldStringNotNull(this.content, 'conteúdo');
    commonValidations.fieldMaximumSize(this.content, 'conteúdo', 140);
  }

  static list() {
    return postsDao.list();
  }
}

module.exports = Post;
