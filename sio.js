const WS = require('ws');
const redisClient = require('./config/redis');
const QUEUE_CHANNEL = require("./QUEUE_CHANNEL");

const WS_SERVER = new WS.Server(
    {
        port: 3030
    }
);
WS_SERVER.on('connection', (ws) => {
    ws.on('message', (data) => {
        redisClient.lpop([QUEUE_CHANNEL], (err, reply) => {
            if (err) {
                let queueNode = {
                    playerId: data.playerid
                }

                redisClient.rpush([QUEUE_CHANNEL, queueNode], (err, reply) => {

                });
            } else {
                redisClient.lpop([QUEUE_CHANNEL], (err, reply) => {
                    ws.emit('match_found')
                });
            }
        });
    });
});

module.exports = WS_SERVER;
