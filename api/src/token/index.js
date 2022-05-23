const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const allowlistRefreshToken = require('../../redis/allowlistRefreshToken');
const manipulateBlocklist = require('../../redis/manipulateBlocklist');
const { InvalidArgumentError } = require('../err');

function createTokenJWT(user, [time, measurement]) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: time + measurement,
  });
  return token;
}

async function verifyTokenJwt(token, blocklist) {
  const verifToken = await blocklist.InvalidToken(token);
  if (verifToken) {
    throw new jwt.JsonWebTokenError('token inválido por logout');
  }
  return jwt.verify(token, process.env.SECRET_KEY);
}

async function createOpaqueToken(user, [time, measurement], allowlist) {
  const opaqueToken = crypto.randomBytes(24).toString('hex');
  const dataEnd = moment().add(time, measurement).unix();
  await allowlist.adds(opaqueToken, user.id, dataEnd);
  return opaqueToken;
}

async function checkOpaqueToken(token, allowlist, name) {
  if (!token) {
    throw new InvalidArgumentError(`${name} não enviado!`);
  }
  const id = await allowlist.fetchValue(token);
  if (!id) {
    throw new InvalidArgumentError(`${name} Token inválido!`);
  }
  return id;
}

async function invalidOpaqueToken(token, allowlist) {
  await allowlist.delete(token);
}

module.exports = {
  access: {
    expiration: [15, 'm'],
    list: manipulateBlocklist,
    create(user) {
      return createTokenJWT(user, this.expiration);
    },
    verify(token) {
      return verifyTokenJwt(token, this.list);
    },
  },
  refresh: {
    expiration: [3, 'd'],
    list: allowlistRefreshToken,
    name: 'Refresh Token',
    create(user) {
      return createOpaqueToken(user, this.expiration, this.list);
    },
    verify(token) {
      return checkOpaqueToken(token, this.list, this.name);
    },
    invalid(token) {
      return invalidOpaqueToken(token, this.list);
    },
  },
};
