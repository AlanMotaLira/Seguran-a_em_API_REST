const { promisify } = require("util");

module.exports = (list) => {
  const setAsync = promisify(list.set).bind(list);
  const getAsync = promisify(list.get).bind(list);
  const delAsync = promisify(list.del).bind(list);
  const existsAsync = promisify(list.exists).bind(list);
  return {
    async adds(key, value, dataEnd) {
      await setAsync(key, value);
      list.expireat(key, dataEnd);
    },
    async fetchValue(key) {
      return getAsync(key);
    },

    async verifyKey(key) {
      const response = await existsAsync(key);
      return response === 1;
    },

    async delete(key) {
      await delAsync(key);
    },
  };
};
