const io = require('socket.io')(3030);
const UUID = require('uuid');
const Room = require("./models/Room");


let rooms = {};

let queue = [];

/*
message
{
    idUser: String,
    name: String
}
 */
io.on('connection', (socket) => {
    socket.on('play_request', (playRequest) => {

        console.log("SOCKET RECEIVED HEIUFLIAKDFAD", playRequest);
        if (queue.length === 0) {
            queue.push({
                userInfo: playRequest,
                socketId: socket.id
            });
        } else {
            //dequeue hang cho choi
            let opponent = queue.shift();
            let roomId = UUID.v4();
            rooms[roomId] = new Room(roomId);

            let playRoom = rooms[roomId];

            let player1 = {
                idUser: opponent.userInfo.idUser,
                name: opponent.userInfo.name
            }

            let player2 = {
                idUser: playRequest.idUser,
                name: playRequest.name
            }

            playRoom.setPlayers(player1, player2);
            console.log("ROOM", playRoom);

            //Match found process at client

            io.to(opponent.socketId).emit('match_found', rooms[roomId]);
            io.to(socket.id).emit('match_found', rooms[roomId]);


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
});

module.exports = io;
