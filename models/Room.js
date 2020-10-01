const User = require("../models/User");
const utils = require("../Utils");

var LIMIT_TIME = 10;
var NUM_ROUND = 3;


class Room {
    constructor(id) {
        this.id = id;
        this.round = [0, 0];
        this.result = [];
        this.playerID_1 = null;
        this.playerID_2 = null;
    };

    setPlayers(player_1, player_2) {
        this.playerID_1 = player_1;
        this.playerID_2 = player_2;
    }

    setActionForPlayer_1(action_1) {
        this.round[0] = action_1;
    }

    setActionForPlayer_2(action_2) {
        this.round[1] = action_2;
    }

    calcResult() {
        let action_1 = this.round[0];
        let action_2 = this.round[1];
        if (action_1 === 0 || action_2 === 0)
            return -1;
        if (action_1 === action_2) {
            this.result.push(0);
            const res = this.round;
            this.round = [0, 0];
            return res;
        }

        if (Math.abs(action_1 - action_2) === 1) {
            if (action_1 > action_2) {
                this.result.push(this.playerID_1.idUser);
            } else {
                this.result.push(this.playerID_2.idUser);
            }
        } else {
            if (action_1 < action_2) {
                this.result.push(this.playerID_1.idUser);
            } else {
                this.result.push(this.playerID_2.idUser);
            }
        }
        const res = this.round;
        this.round = [0, 0];
        return res;
    };


    // -1: chua xg tran
    //  0: hoa
    // id_1: player 1 win
    // id_2: player 2 win
    calcPoint() {
        let res = null;
        if (this.result.length < NUM_ROUND)
            return -1;
        let countForPlayer_1 = 0;
        let countForPlayer_2 = 0;
        for (let i = 0; i < this.result.length; i++) {
            if (this.result[i] == this.playerID_1.idUser) {
                countForPlayer_1++;
            }
            if (this.result[i] == this.playerID_2.idUser) {
                countForPlayer_2++;
            }
        }

        if (countForPlayer_1 === countForPlayer_2) {
            res = 0;
        } else if (countForPlayer_1 > countForPlayer_2) {
            // add 3 points for user 1
            //utils.updatePoint(this.playerID_1);
            res = 1;
            // respone
        } else {
            // add 3 points for user 2
            //utils.updatePoint(this.playerID_2);
            res = 2;
        }

        return {res: res, ti_so: {player_1: countForPlayer_1, player_2: countForPlayer_2}};
        // utils.updateTurn(this.playerID_1);
        // utils.updateTurn(this.playerID_2);

    }


}

module.exports = Room;




