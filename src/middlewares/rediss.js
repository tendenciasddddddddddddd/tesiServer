const { createClient } = require("redis");

const client = createClient();
async function runRedis () {
    await client.connect()
}
runRedis()
module.exports = { client }