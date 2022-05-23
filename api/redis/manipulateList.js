const { promisifyAll } = require('bluebird');

module.exports = (list) => {
  const listAsync = promisifyAll(list);
  return {
    async adds(key, value, dataEnd) {
      await listAsync.set(key, value);
      list.expire(key, dataEnd);
    },
    async fetchValue(key) {
      return listAsync.get(key);
    },

    async verifyKey(key) {
      const response = await listAsync.exists(key);
      return response === 1;
    },

    async delete(key) {
      await listAsync.del(key);
    },
  };
};
