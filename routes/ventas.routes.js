//crear una variable para almacenar rutas

const express = require("express");

const router = express.Router();




const VentaSequelize = require("../entity/ventas.entity");

router.post("/", async (req, res) => {
    const id_venta = req.body.id_venta;
    const nombre_usuario = req.body.nombre_usuario;
    const nombre = req.body.nombre;
    const cantidad = req.body.cantidad;
    const precioUnitario = req.body.precioUnitario;
    const totalProducto = req.body.totalProducto;
    const total = req.body.totalVenta;


    const venta = {
        id_venta: id_venta,
        nombre_usuario: nombre_usuario,
        nombre_producto: nombre,
        cantidad_producto: cantidad,
        precio_producto: precioUnitario,
        total_producto: totalProducto,
        total_venta: total,
    };
    const resultado = await VentaSequelize.create(venta);

    res.send(resultado);
})

router.get("/", async (req, res) => {
    const resultado = await VentaSequelize.findAll();

    res.send(resultado);
});




module.exports = router;