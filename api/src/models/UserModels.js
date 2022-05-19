const userDao = require('../dao/userDao');
const { InvalidArgumentError } = require('../err/err');
const validations = require('../err/commonValidations');

class Usuario {
  constructor(usuario) {
    this.id = usuario.id;
    this.nome = usuario.nome;
    this.email = usuario.email;
    this.senha = usuario.senha;

    this.valida();
  }

  async adds() {
    if (await Usuario.searchByEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return userDao.adds(this);
  }

  valida() {
    validations.fieldStringNotNull(this.nome, 'nome');
    validations.fieldStringNotNull(this.email, 'email');
    validations.fieldStringNotNull(this.senha, 'senha');
    validations.fieldSizeMinimum(this.senha, 'senha', 8);
    validations.fieldMaximumSize(this.senha, 'senha', 64);
  }

  async remove() {
    return userDao.remove(this);
  }

  static async searchByID(id) {
    const usuario = await userDao.searchByID(id);
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static async searchByEmail(email) {
    const usuario = await userDao.searchByEmail(email);
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static list() {
    return userDao.list();
  }
}

module.exports = Usuario;
