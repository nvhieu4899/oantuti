const { ENUM } = require("sequelize/types");
const User = require("../models/User");
const utils = require("../Utils");

var LIMIT_TIME = 10;



class Room {
    constructor() {
        this.round = [3,2];
        this.result = [];
        this.playerID_1 = null;
        this.playerID_2 = null;
    };

    setRound(round) {
        this.round = round;
    }

    setPlayers(player_1, player_2) {
        this.playerID_1 = player_1;
        this.playerID_2 = player_2;
    }

    calcResult() {
        let action_1 = this.round[0];
        let action_2 = this.round[1];
        if(action_1 == 0 || action_2 == 0)
            return;
        if(action_1 === action_2) {
            this.result.push(0);
            this.round = [0,0];
            return;
        }

        if(Math.abs(action_1 - action_2) === 1) {
            if(action_1 > action_2) {
                this.result.push(this.playerID_1);
            }
            else {
                this.result.push(this.playerID_2);
            }
        }
        else {
            if(action_1 < action_2) {
                this.result.push(this.playerID_1);
            }
            else {
                this.result.push(this.playerID_2);
            }
        }
        this.round = [0,0];
    
    };

    calcPoint() {
        if(this.result.length !== 3)
            return;
        let countForPlayer_1 = 0;
        let countForPlayer_2 = 0;
        for (let i = 0; i < this.result.length; i++) {
            if(this.result[i] == this.playerID_1) {
                countForPlayer_1++;
            }
            if(this.result[i] == this.playerID_2) {
                countForPlayer_2++;
            }           
        }

        if(countForPlayer_1 === countForPlayer_2) {
            return null;
        }
        if(countForPlayer_1 > countForPlayer_2) {
            // add 3 points for user 1
            //utils.updatePoint(this.playerID_1);
            return this.playerID_1;
            // respone
        }
        else {
            // add 3 points for user 2
            //utils.updatePoint(this.playerID_2);
            return this.playerID_2;
        }
        // utils.updateTurn(this.playerID_1);
        // utils.updateTurn(this.playerID_2);

    }

    






  }