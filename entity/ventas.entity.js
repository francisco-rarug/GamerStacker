const sequelize = require("../db/sequelize");
const { DataTypes } = require('sequelize')
const VentasSequelize = sequelize.define(
    "ventas",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_venta: {
            type: DataTypes.INTEGER,
            allowNull: false, // NOT NULL
        },
        nombre_usuario: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },
        nombre_producto: {
            type: DataTypes.STRING,
            allowNull: false, // NOT NULL
        },
        cantidad_producto: {
            type: DataTypes.INTEGER,
            allowNull: false, // NOT NULL
        },
        precio_producto: {
            type: DataTypes.INTEGER,
            allowNull: false, // NOT NULL
        },
        total_producto: {
            type: DataTypes.INTEGER,
            allowNull: false, // NOT NULL
        },
        total_venta: {
            type: DataTypes.INTEGER,
            allowNull: false, // NOT NULL
        },

    },
    {
        timestamps: true,
        createdAt: "creado_en",
    }
);
module.exports = VentasSequelize;
