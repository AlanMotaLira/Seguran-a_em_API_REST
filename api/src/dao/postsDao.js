const db = require('../../database');
const { InternalServerError } = require('../err');

module.exports = {
  adds: (post) => new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO posts (
          titulo, 
          conteudo
        ) VALUES (?, ?)
      `,
      [post.titulo, post.conteudo],
      (err) => {
        if (err) {
          return reject(new InternalServerError('Erro ao adicionar o post!'));
        }

        return resolve();
      },
    );
  }),

  list: () => new Promise((resolve, reject) => {
    db.all('SELECT * FROM posts', (err, resultados) => {
      if (err) {
        return reject(new InternalServerError('Erro ao adicionar o post!'));
      }

      return resolve(resultados);
    });
  }),
};
