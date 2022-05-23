const jwd = require('jsonwebtoken');
const crypto = require('crypto')
const moment = require('moment')

module.exports = {
  createTokenJWT(user) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = jwd.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
    return token;
  },
  createOpaqueToken(user){
    const opaqueToken = crypto.randomBytes(24).toString('hex')
    const dataEnd = moment().add(3,'d').unix()
    return opaqueToken
  }
}

/* comando no terminal para gerar uma senha secreta interna
 => node -e "console.log( require('crypto').randomBytes(256).toString('base64'))" */
