const postsDao = require('../dao/postsDao');
const validations = require('../err/commonValidations');

class Post {
  constructor(post) {
    this.titulo = post.titulo;
    this.conteudo = post.conteudo;
    this.valida();
  }

  adiciona() {
    return postsDao.adiciona(this);
  }

  valida() {
    validations.fieldStringNotNull(this.titulo, 'título');
    validations.fieldSizeMinimum(this.titulo, 'título', 5);

    validations.fieldStringNotNull(this.conteudo, 'conteúdo');
    validations.fieldMaximumSize(this.conteudo, 'conteúdo', 140);
  }

  static lista() {
    return postsDao.lista();
  }
}

module.exports = Post;
