const { createClient } = require("redis");

const client = createClient();
async function runRedis () {
    await client.connect()
}
const claveOnPort = '5000'
runRedis()
module.exports = { client, claveOnPort }