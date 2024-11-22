const sequelize = require("../db/sequelize");
const { DataTypes } = require('sequelize')
const AutoSequelize = sequelize.define(
    "productos",
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
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },
        precio: {
            type: DataTypes.FLOAT,
            allowNull: false, // NOT NULL
        },
        imagen: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },

    },
    {
        timestamps: true,
        createdAt: "creado_en",
    }
);
module.exports = AutoSequelize;
