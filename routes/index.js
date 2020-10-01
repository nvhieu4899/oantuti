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

module.exports = router;
