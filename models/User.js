const db = require('../db')
const sequelize = require('sequelize')


const User = db.define("User", {
    idUser: sequelize.INTEGER,
    name: sequelize.STRING,
    numTurn: sequelize.INTEGER,
    point: sequelize.INTEGER
})

// db.sync()
// .then(()=>{
//     console.log("Create User successfully...")
// })

module.exports = User