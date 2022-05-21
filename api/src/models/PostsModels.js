const postsDao = require('../dao/postsDao');
const commonValidations = require('../validation/commonValidations');

class Post {
  constructor(post) {
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.valida();
  }

  adds() {
    return postsDao.adds(this);
  }

  valida() {
    commonValidations.fieldStringNotNull(this.titulo, 'título');
    commonValidations.fieldSizeMinimum(this.titulo, 'título', 5);

    commonValidations.fieldStringNotNull(this.conteudo, 'conteúdo');
    commonValidations.fieldMaximumSize(this.conteudo, 'conteúdo', 140);
  }

  static list() {
    return postsDao.list();
  }
}

module.exports = Post;
