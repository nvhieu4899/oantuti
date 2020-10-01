var user = require('./models/User')
var BONUS_POINT = 3;


var updateTurn = function (playerID) {
    user.findOne({
        where: {
            id: playerID
        }
    })
        .then(result => {
            if (result) {
                let currPoint = result.point;
                currPoint--;
                user.update({
                    point: currPoint
                }, {
                    where: {
                        id: playerID
                    }
                })
            }
        })

}

var updatePoint = function (playerID) {
    user.findOne({
        where: {
            id: playerID
        }
    })
        .then(result => {
            if (result) {
                let currTurn = result.numTurn;
                currTurn += BONUS_POINT;
                user.update({
                    numTurn: currTurn
                }, {
                    where: {
                        id: playerID
                    }
                })
            }
        })

}

module.exports =
    {
        updateTurn: updateTurn,
        updatePoint: updatePoint
    };
