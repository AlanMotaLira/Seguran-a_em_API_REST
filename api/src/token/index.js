const jwd = require("jsonwebtoken");


function createTokenJWT(user) {
    const payload = {
      id: user.id,
      email:user.email
    };
  
    const token = jwd.sign(payload, "senha-secreta");
    return token;
  }

  module.exports = createTokenJWT