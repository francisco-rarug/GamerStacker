const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gamerStacker', 'root', process.env.CONTRA, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
});


module.exports = sequelize;