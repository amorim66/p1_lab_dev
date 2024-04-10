const Sequelize = require("sequelize")
const sequelize = new Sequelize("banco_prova","root","",{
    host: "localhost",
    port: 3307,
    dialect: "mysql"
})

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}