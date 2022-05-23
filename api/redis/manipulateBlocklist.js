const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");
const blocklistAccessToken = require("./blocklistAccessToken");
const { InternalServerError } = require("../src/err");
const newtokenHash = (token) =>
  createHash("sha256").update(token).digest("hex");

module.exports = {
  adds: async (token) => {
    try {
      const dataEnd = jwt.decode(token).exp;
      const tokenHash = newtokenHash(token);
      await blocklistAccessToken.adds(tokenHash, "", dataEnd);
      return true;
    } catch (err) {
      return new InternalServerError("Erro ao adicionar o token!");
    }
  },
  InvalidToken: async (token) => {
    const tokenHash = newtokenHash(token);
    return await blocklistAccessToken.verifyKey(tokenHash);
  },
};
