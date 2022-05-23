const { promisifyAll } = require('bluebird');
const jwt = require('jsonwebtoken');
const { createHash } = require('crypto');
const blacklist = require('./blacklist');
const { InternalServerError } = require('../src/err');

const newtokenHash = (token) => createHash('sha256').update(token).digest('hex');
const blacklistPromise = promisifyAll(blacklist);
module.exports = {
  adds: async (token) => {
    try {
      const dataEnd = jwt.decode(token).exp;
      const tokenHash = newtokenHash(token);
      await blacklistPromise.set(tokenHash, '');
      blacklist.expire(tokenHash, dataEnd);
      return true;
    } catch (err) {
      return new InternalServerError('Erro ao adicionar o token!');
    }
  },
  InvalidToken: async (token) => {
    const tokenHash = newtokenHash(token);
    const response = await blacklistPromise.exists(tokenHash);
    return response === 1;
  },
};
