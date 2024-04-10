const db = require('./banco');
const { DataTypes } = require('sequelize');

const Clientes = db.sequelize.define("clientes", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    bairro: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cep: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cidade: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Clientes;

//Clientes.sync({force: true})
