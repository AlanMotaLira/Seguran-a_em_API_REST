const { promisify } = require('util');
const db = require('../../database');
const { InternalServerError } = require('../err');

const dbRun = promisify(db.run).bind(db);
const dbAll = promisify(db.all).bind(db);

module.exports = {
  async adds(post) {
    try {
      await dbRun(
        'INSERT INTO posts (title,content) VALUES (?, ?)',
        [post.title, post.content],
      );
    } catch (err) {
      throw new InternalServerError('Erro ao adicionar o post!');
    }
  },

  async list() {
    try {
      return await dbAll('SELECT * FROM posts');
    } catch (err) {
      throw new InternalServerError('Erro ao buscar posts!');
    }
  },
};
