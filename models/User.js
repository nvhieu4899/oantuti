const db = require('../db')
const sequelize = require('sequelize')


const User = db.define("User", {
    idUser: sequelize.STRING,
    name: sequelize.STRING,
    numTurn: sequelize.INTEGER,
    point: sequelize.INTEGER
});

//db.sync().then(() => console.log("create user"));

module.exports = User;
