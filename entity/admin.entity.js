const sequelize = require("../db/sequelize");
const { DataTypes } = require('sequelize')
const AdminSequelize = sequelize.define(
    "admins",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },
        contrasenia: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },

    },
    {
        timestamps: true,
        createdAt: "creado_en",
    }
);
module.exports = AdminSequelize;
