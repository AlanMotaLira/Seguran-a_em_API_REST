const jwd = require('jsonwebtoken');
const crypto = require('crypto')
const moment = require('moment')
const allowlist = require('../../redis/allowlistRefreshToken')

function createTokenJWT(user,[time,measurement]) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwd.sign(payload, process.env.SECRET_KEY, { expiresIn: time+measurement });
  return token;
}

async function createOpaqueToken(user,[time,measurement],allowlist){
  const opaqueToken = crypto.randomBytes(24).toString('hex')
  const dataEnd = moment().add(time,measurement).unix()
  await allowlist.adds(opaqueToken,user.id,dataEnd)
  return opaqueToken
}


module.exports = {
  access:{
    expiration:[15,'m'],
    create(user){
      return createTokenJWT(user,this.expiration)
    }
  },
  refresh:{
    expiration:[3,'d'],
    list:allowlist,
    create(user){
      return createOpaqueToken(user,this.expiration,this.list)
    }
  }
}

/* comando no terminal para gerar uma senha secreta interna
 => node -e "console.log( require('crypto').randomBytes(256).toString('base64'))" */
