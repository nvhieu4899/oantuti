const sequelize = require('sequelize')

const db = new sequelize({
    database: "momo",
    username: "postgres",
    password: "nguyenvanhieu",
    host: process.env.POSTGRESQL_URL,
    port: 5432,
    dialect: "postgres"
})

//db.authenticate()
//.then(() => console.log('Connect database successfully'))
//.catch(err=> console.log(err))

module.exports = db;

