const jwd = require('jsonwebtoken');

function createTokenJWT(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwd.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
  return token;
}
module.exports = createTokenJWT;

/* comando no terminal para gerar uma senha secreta interna
 => node -e "console.log( require('crypto').randomBytes(256).toString('base64'))" */
