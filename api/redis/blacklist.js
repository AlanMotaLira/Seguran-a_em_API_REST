const { createClient } = require('redis');

const blacklist = createClient({
  url: 'redis://redis:6379',
  prefix: 'blacklist:',
});

(async () => {
  await blacklist.connect();
})();

blacklist.on('connect', () => console.log('Redis blacklist Connected'));
blacklist.on('error', (err) => console.log('Redis blacklist Error', err));

module.exports = blacklist;
