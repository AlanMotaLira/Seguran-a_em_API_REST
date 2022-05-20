const { InvalidArgumentError } = require('../err');

module.exports = {
  fieldStringNotNull: (valor, nome) => {
    if (typeof valor !== 'string' || valor === 0) throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
  },

  fieldSizeMinimum: (valor, nome, minimo) => {
    if (valor.length < minimo) {
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${minimo} caracteres!`,
      );
    }
  },

  fieldMaximumSize: (valor, nome, maximo) => {
    if (valor.length > maximo) {
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser menor que ${maximo} caracteres!`,
      );
    }
  },
};
