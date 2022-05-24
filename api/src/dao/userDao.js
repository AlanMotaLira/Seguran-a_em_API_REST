const { promisify } = require('util');
const db = require('../../database');
const { InternalServerError } = require('../err');

const dbRun = promisify(db.run).bind(db);
const dbGet = promisify(db.get).bind(db);
const dbAll = promisify(db.all).bind(db);
module.exports = {
  async adds(user) {
    try {
      await dbRun(
        `INSERT INTO users (name,email,password,emailVerified) 
        VALUES (?, ?, ?, ?)`,
        [user.name, user.email, user.password, user.emailVerified],
      );
    } catch (err) {
      throw new InternalServerError('Erro ao adicionar o usuário!');
    }
  },

  async emailValidity(user, emailVerified) {
    try {
      await dbRun('UPDATE users SET emailVerified = ? WHERE id = ?', [
        emailVerified,
        user.id,
      ]);
    } catch (err) {
      throw new InternalServerError('Erro ao validar o email!');
    }
  },

  async searchByID(id) {
    try {
      return await dbGet('SELECT * FROM users WHERE id = ? ', [id]);
    } catch (err) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },

  async searchByEmail(email) {
    try {
      return await dbGet('SELECT * FROM users WHERE email = ?', [email]);
    } catch (err) {
      throw new InternalServerError('Não foi possível encontrar o usuário!');
    }
  },
  async list() {
    try {
      return await dbAll('SELECT * FROM users');
    } catch (err) {
      throw new InternalServerError('Erro ao listar usuários');
    }
  },

  async remove(user) {
    try {
      await dbRun('DELETE FROM users WHERE id = ?', [user.id]);
    } catch (err) {
      throw new InternalServerError('Erro ao deletar o usuário');
    }
  },
};
