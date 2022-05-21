const db = require('../../database');
const { InternalServerError } = require('../err');

module.exports = {
  adds: (user) => new Promise((resolve, reject) => {
    db.run(
      `
          INSERT INTO users (
            name,
            email,
            password
          ) VALUES (?, ?, ?)
        `,
      [user.name, user.email, user.password],
      (erro) => {
        if (erro) {
          reject(new InternalServerError('Erro ao adicionar o usuário!'));
        }

        return resolve();
      },
    );
  }),

  searchByID: (id) => new Promise((resolve, reject) => {
    db.get(
      `
          SELECT *
          FROM users
          WHERE id = ?
        `,
      [id],
      (erro, user) => {
        if (erro) {
          return reject('Não foi possível encontrar o usuário!');
        }

        return resolve(user);
      },
    );
  }),

  searchByEmail: (email) => new Promise((resolve, reject) => {
    db.get(
      `
          SELECT *
          FROM users
          WHERE email = ?
        `,
      [email],
      (erro, user) => {
        if (erro) {
          return reject('Não foi possível encontrar o usuário!');
        }

        return resolve(user);
      },
    );
  }),

  list: () => new Promise((resolve, reject) => {
    db.all(
      `
          SELECT * FROM users
        `,
      (erro, users) => {
        if (erro) {
          return reject('Erro ao listar usuários');
        }
        return resolve(users);
      },
    );
  }),

  remove: (user) => new Promise((resolve, reject) => {
    db.run(
      `
          DELETE FROM users
          WHERE id = ?
        `,
      [user.id],
      (erro) => {
        if (erro) {
          return reject('Erro ao deletar o usuário');
        }
        return resolve();
      },
    );
  }),
};
