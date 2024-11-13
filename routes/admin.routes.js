//crear una variable para almacenar rutas

const express = require("express");

const router = express.Router();




const AdminSequelize = require("../entity/admin.entity");

router.post("/", async (req, res) => {
    const nombre = req.body.nombre;
    const contrasenia = req.body.contrasenia;


    const administrador = {
        nombre,
        contrasenia,
    };
    const resultado = await AdminSequelize.create(administrador);

    res.send(resultado);
})


router.get("/", async (req, res) => {
    const resultado = await AdminSequelize.findAll();

    res.send(resultado);
});


module.exports = router;