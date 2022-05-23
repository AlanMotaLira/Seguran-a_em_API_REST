const { createClient } = require("redis");
const manipulateList = require("./manipulateList");

const allowlist = createClient({
  url: "redis://redis:6379",
});
// allowlist.subscribe("OpaqueToken:");
(async () => {
  await allowlist.connect();
})();
module.exports = manipulateList(allowlist);
