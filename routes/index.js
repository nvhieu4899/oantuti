var express = require('express');
var bodyParser = require('body-parser')
var user = require('../models/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')


var router = express.Router();

var urlencodedParser = bodyParser.urlencoded({ extended: false })


/* GET home page. */
router.get('/', function(req, res, next) {

});


router.post('/signup', urlencodedParser, (req, res)=>{
    var id = req.body.id;
    var name = req.body.name;

    if((id && name)) {
        var hash = bcrypt.hashSync(id, 10);
        user.create({
            idUser: hash,
            name: name
        })    
    }
    else res.json({'message': 'Empty id or name'});

})


router.post('/login', urlencodedParser, (req, res)=>{
    var id = req.body.id;
    var name = req.body.name;

    if(!id || !name) {
        res.json({'message': 'Empty id or name'})
        return;
    }
    const hash = bcrypt.hashSync(id, 10);
    user.findOne({
        where:{
            name: name
        }
    }).then(result =>{
        if(result){
            if(bcrypt.compareSync(id, result.idUser)){
                var payload = { id: id}
                accessToken = jwt.sign(payload, 'secret')
                res.status(200).json({token : accessToken})
            }
            else 
                res.json({'message': 'password is incorrect'})
        }
        else{
            res.json({'message': 'email is incorrect'})
        }
    })
    .catch(err=> {
        console.log(err)
    })
})



module.exports = router;
