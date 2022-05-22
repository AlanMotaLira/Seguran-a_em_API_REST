const blacklist = require("./blacklist");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const { createHash } = require("crypto");

const newtokenHash = (token) => {
  return createHash("sha256").update(token).digest("hex");
};

const existsAsync = promisify(blacklist.exists).bind(blacklist);
const setAsync = promisify(blacklist.set).bind(blacklist);

module.exports = {
  adds: async (token) => {
    const dataExp = jwt.decode(token).exp;
    const tokenHash = newtokenHash(token)
    await setAsync(tokenHash, "");
    blacklist.expireat(tokenHash, dataExp);
  },
  InvalidToken: async (token) => {
    const tokenHash = newtokenHash(token)
    const response = await existsAsync(tokenHash);
    return response === 1;
  },
};
