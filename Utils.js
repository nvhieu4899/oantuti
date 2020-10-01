var user = require('./models/User')
var BONUS_POINT = 3;


var updateTurn = function (playerID) {
    user.findOne({
        where: {
            idUser: playerID
        }
    })
        .then(result => {
            if (result) {
                let currTurn = result.numTurn;
                currTurn--;
                user.update({
                    numTurn: currTurn
                }, {
                    where: {
                        idUser: playerID
                    }
                })
            }
        });
}

var updatePoint = function (playerID) {
    user.findOne({
        where: {
            idUser: playerID
        }
    })
        .then(result => {
            if (result) {
                let currPoint = result.point;
                currPoint += BONUS_POINT;
                user.update({
                    point: currPoint
                }, {
                    where: {
                        idUser: playerID
                    }
                })
            }
        })

}

var checkPlayable = function (playerID) {
    user.findOne({
        where: {
            idUser: playerID
        }
    })
        .then(result => {
            if (result) {
                if (result.numTurn > 0)
                    return true;
            }
        })
    return false;
}

//0: hoa
//1: 1 thang
//2: 2 thang
var checkWinner = (action_1, action_2) => {
    if (action_1 === action_2)
        return 0;
    if (Math.abs(action_1 - action_2) === 1) {
        if (action_1 > action_2) {
            return 1;
        } else {
            return 2;
        }
    } else {
        if (action_1 < action_2) {
            return 1;
        } else {
            return 2;
        }
    }
}

var countResult = (listRes) => {
    let res = [];
    for(let i=0; i < listRes.length; i++) {
        if(res[listRes[i]] == null)
            res[listRes[i]] = 1;
        else
            res[listRes[i]]++;
    }
    console.log("test", res);
    return res;
}

module.exports = {updateTurn, updatePoint, checkPlayable, checkWinner, countResult};
