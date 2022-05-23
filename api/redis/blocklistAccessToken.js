const { createClient } = require('redis');
const manipulateList = require("./manipulateList");

const blocklist = createClient({
  url: 'redis://redis:6379'
});

(async () => {
  await blocklist.connect();
})();
module.exports = manipulateList(blocklist)
