const Redis = require('redis');

const redisClient = Redis.createClient({
    host: "127.0.0.1",
    port: 6379
});

redisClient.on("error", (err) => {
    console.log("error", err)
});
redisClient.on("connect", (err) => {
    console.log("connect");
});
redisClient.on("ready", (err) => {
    console.log("ready");
});
module.exports = redisClient;

