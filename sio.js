const WS = require('ws');
const SUBSCRIBER = require('./config/redis').SUBSCRIBER;

const WS_SERVER = new WS.Server(
    {
        port: 3030
    }
);
WS_SERVER.on('connection', (ws) => {
    ws.on('play', (data) => {

    })
});

module.exports = WS_SERVER;
