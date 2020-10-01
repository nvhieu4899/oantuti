const io = require('socket.io')(3030);
const UUID = require('uuid');
const Room = require("./models/Room");


let rooms = {};

let queue = [];

/*
message
{
    id: String,
    name: String
}
 */
io.on('connection', (socket) => {
    socket.on('play_request', (id, message) => {
        if (queue.length === 0) {
            queue.push({
                userInfo: message,
                socketId: id
            })
        } else {
            //dequeue hang cho choi
            let opponent = queue.shift();

            let roomId = UUID.v5();
            rooms[roomId] = new Room(roomId);

            let playRoom = rooms[roomId];
            playRoom.setPlayers(opponent.userInfo.id, message.id);

            //Match found process at client
            socket.to(opponent.socketId).emit('match_found', rooms[roomId]);
            socket.to(id).emit('match_found', rooms[roomId]);
        }
    });

    socket.on('play_accept', (senderId, playerMessage) => {
        socket.join(playerMessage.roomId);
    });

    /*
        playMessage:
        {
            roomId: string,
            userId: string,
            round: Number,
            action: Number // keo hoac bua hoac bao
        }
     */
    socket.on('ra_nuoc_di', (senderId, playMessage) => {
        let roomId = playMessage.roomId;


        let room = rooms[roomId];

        if (playMessage.playerId === room.playerID_1 && room.round[0] === 0) {
            room.setActionForPlayer_1(playMessage.action);
        } else if (playMessage.playerId === room.playerID_2 && room.round[1] === 0) {
            room.setActionForPlayer_2(playMessage.action);
        }

        let result = room.calcResult();

        if (result === -1) {
            return
        }


    });


    /*
        room:
        {
        round,
        result,
        playerInfo1: {
        playerId, playerName
        }
        playerInfo1: {
        playerId, playerName
        }

     */

    socket.on('disconnect',)


});

module.exports = io;
