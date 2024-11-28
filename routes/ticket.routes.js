//crear una variable para almacenar rutas

const express = require("express");

const router = express.Router();


router.post("/ticket", (req, res) => {
    const productosCarrito = req.body; // recibes los productos del carrito
    // Procesa la solicitud (guardar en base de datos, generar ticket, etc.)
    res.render("ticket", { carrito: productosCarrito });
});





module.exports = router;