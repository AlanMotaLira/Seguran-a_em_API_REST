const usuariosDao = require('../dao/userDao');
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

  async adiciona() {
    if (await Usuario.buscaPorEmail(this.email)) {
      throw new InvalidArgumentError('O usuário já existe!');
    }

    return usuariosDao.adiciona(this);
  }

  valida() {
    validations.fieldStringNotNull(this.nome, 'nome');
    validations.fieldStringNotNull(this.email, 'email');
    validations.fieldStringNotNull(this.senha, 'senha');
    validations.fieldSizeMinimum(this.senha, 'senha', 8);
    validations.fieldMaximumSize(this.senha, 'senha', 64);
  }

  async deleta() {
    return usuariosDao.deleta(this);
  }

  static async buscaPorId(id) {
    const usuario = await usuariosDao.buscaPorId(id);
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static async buscaPorEmail(email) {
    const usuario = await usuariosDao.buscaPorEmail(email);
    if (!usuario) {
      return null;
    }

    return new Usuario(usuario);
  }

  static lista() {
    return usuariosDao.lista();
  }
}

module.exports = Usuario;
