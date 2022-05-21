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
      (err) => {
        if (err) {
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
      (err, user) => {
        if (err) {
          return reject(new InternalServerError('Não foi possível encontrar o usuário!'));
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
      (err, user) => {
        if (err) {
          return reject(new InternalServerError('Não foi possível encontrar o usuário!'));
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
      (err, users) => {
        if (err) {
          return reject(new InternalServerError('Erro ao listar usuários'));
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
      (err) => {
        if (err) {
          return reject(new InternalServerError('Erro ao deletar o usuário'));
        }
        return resolve();
      },
    );
  }),
};
