const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { InvalidArgumentError } = require('../err');
const blocklist = require('../../redis/manipulateBlocklist');

module.exports = {
  fieldStringNotNull: (valor, name) => {
    if (typeof valor !== 'string' || valor === 0) throw new InvalidArgumentError(`É necessário preencher o campo ${name}!`);
  },

  fieldSizeMinimum: (valor, name, minimo) => {
    if (valor.length < minimo) {
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser maior que ${minimo} caracteres!`,
      );
    }
  },

  fieldMaximumSize: (valor, name, maximo) => {
    if (valor.length > maximo) {
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser menor que ${maximo} caracteres!`,
      );
    }
  },
  verifyUse(user) {
    if (!user) {
      throw new InvalidArgumentError(
        'Não existe usuário com o email informado',
      );
    }
  },
  async validatePassword(password, passwordHash) {
    const verif = await bcrypt.compare(password, passwordHash);
    if (!verif) {
      throw new InvalidArgumentError(
        'Email ou senha inválido',
      );
    }
  },
  async verifyToken(token) {
    const verifToken = await blocklist.InvalidToken(token);
    if (verifToken) {
      throw new jwt.JsonWebTokenError('token inválido por logout');
    }
  },
};
