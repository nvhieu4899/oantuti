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
                currTurn-- ;
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
            if(result) {
                if(result.numTurn > 0)
                    return true;
            }
        })
    return false;
}



module.exports =
    {
        updateTurn: updateTurn,
        updatePoint: updatePoint,
        checkPlayable: checkPlayable
    };
