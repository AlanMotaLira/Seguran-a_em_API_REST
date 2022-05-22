const { InternalServerError } = require('../../err');

const dataModel = [
  {
    id: 1,
    name: 'Ana Souza',
    email: 'ana@ana.com',
    password: '12345678',
  },
  {
    id: 2,
    name: 'Marcos Cintra',
    email: 'marcos@marcos.com',
    password: '12345678',
  },
  {
    id: 3,
    name: 'Felipe Cardoso',
    email: 'felipe@felipe.com',
    password: '12345678',
  },

];

module.exports = {
  adds: (user) => new Promise((resolve, reject) => {
    const err = true;
    if (user.name && user.email && user.password) {
      err = false;
    }
    if (err) {
      reject(new InternalServerError('Erro ao adicionar o usuário!'));
    }

    return resolve(true);
  }),

  searchByID: (id) => new Promise((resolve, reject) => {
    const user = dataModel[id];
    if (user) {
      return user;
    }
    if (err) {
      reject(
        new InternalServerError('Não foi possível encontrar o usuário!'),
      );
    }
  }),

  searchByEmail: (email) => new Promise((resolve, reject) => {
    const user = dataModel.filter((el) => el.email == email);
    if (user) {
      return user;
    }
    if (err) {
      reject(
        new InternalServerError('Não foi possível encontrar o usuário!'),
      );
    }
  }),

  list: () => new Promise((resolve, reject) => resolve(dataModel)),
};
