var express = require('express');
var bodyParser = require('body-parser')
var user = require('../models/User');

const UUID = require('uuid');


var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({extended: false})


/* GET home page. */
router.get('/', function (req, res, next) {

});


router.post('/signup', urlencodedParser, (req, res) => {
    let name = req.body.name;

    if (name) {
        let uuid = UUID.v4();
        let newUser = {
            idUser: uuid,
            name: name,
            numTurn: 20,
            point: 0
        }
        user.create(newUser);
        res.json(newUser);

    } else res.json({'message': 'Empty name'});

});

router.get('/api/top100', function(req, res, next) {
    user.findAll({
        offset : 0,
        limit : 100,
        order : [['point', 'DESC']],
    })
        .then(result => {
            if(result) {
                res.json(result);
            }
        })
});

router.get('/api/user/:userid',(req,res,next)=>
{

	let playerID = req.params['userid'];
	console.log(playerID)

	user.findOne({
		where: {
				idUser: playerID
		}
})
		.then(result => {
				res.json(result);
		});

})
module.exports = router;
