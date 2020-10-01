const io = require('socket.io')(3030);
const UUID = require('uuid');
const Room = require("./models/Room");

const Utils = require('./Utils');

let rooms = {};
const TOTAL_TURN = 3;

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

        if (!Utils.checkPlayable(playRequest.idUser)) {
            socket.emit('error', 'Khong con luot choi');
            return;
        }

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


    /*
        playMessage:
        {
            roomId: string,
            userId: string,
            round: Number,
            action: Number // keo hoac bua hoac bao
        }
     */
    socket.on('ra_nuoc_di', (playMessage) => {
        console.log(playMessage);
        let roomId = playMessage.roomId;
        let room = rooms[roomId];

        let socketIdInRoom = [];
        io.of('/').in(roomId).clients((error, clients) => {
            if (error) console.log(error);
            else
                console.log("LIST ALL CLIENT", clients); // => [Anw2LatarvGVVXEIAAAD]
        });

        console.log("IN ROOM ", roomId, socketIdInRoom);
        console.log("SOCKETID: ", socket.id);
        if (!socketIdInRoom.filter(item => {
            item === socket.id
        }).length > 0) {
            socket.join(roomId);
        }
        console.log("IN ROOM ", roomId, socketIdInRoom);
        console.log("SOCKETID: ", socket.id);

        if (playMessage.playerId === room.playerID_1.idUser && room.round[0] === 0) {
            room.setActionForPlayer_1(playMessage.action);
        } else if (playMessage.playerId === room.playerID_2.idUser && room.round[1] === 0) {
            room.setActionForPlayer_2(playMessage.action);
        }
        let roundResult = room.calcResult();
        if (roundResult === -1) return;

        console.log("ROUND_RESULT", roundResult);

        if (room.result.length < TOTAL_TURN) {
            io.in(roomId).emit('round_result',
                {
                    roundResult:
                        {
                            player1_action: roundResult[0],
                            player2_action: roundResult[1]
                        }
                }
            );
        } else {
            io.in(roomId).emit('round_result',
                {
                    roundResult:
                        {
                            player1_action: roundResult[0],
                            player2_action: roundResult[1]
                        }
                }
            );
            let result = room.calcPoint();
            console.log(result);

            io.in(roomId).emit('match_result',
                result);
            if (result.res === 1) {
                Utils.updatePoint(room.playerID_1.idUser);
            } else if (result.res === 2) {
                Utils.updatePoint(room.playerID_2.idUser);

            }
            Utils.updateTurn(room.playerID_1.idUser);
            Utils.updateTurn(room.playerID_2.idUser);
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
