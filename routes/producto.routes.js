//crear una variable para almacenar rutas

const express = require("express");

const router = express.Router();


//importa la clase auto
const Juego = require("../Scripts/juego.js")
const JuegoSequelize = require("../entity/juegos.entity");
//obtener datos del body por post, crea un objeto y lo muestra por postman
router.post("/", async (require, response) => {
    const nombre = require.body.nombre;
    const descripcion = require.body.descripcion;
    const precio = require.body.precio;
    const imagen = require.body.imagen;
    const tipo = require.body.tipo;

    const juego = new Juego();
    juego.nombre = nombre;
    juego.descripcion = descripcion;
    juego.precio = precio;
    juego.imagen = imagen;
    juego.tipo = tipo;

    const resultado = await JuegoSequelize.create({
        ...juego,
    });

    response.send(resultado);
})
router.get("/", async (req, res) => {
    const resultado = await JuegoSequelize.findAll();

    res.send(resultado);
});
router.delete("/:id", async (req, res) => {
    const resultado = JuegoSequelize.destroy({
        where: {
            id: req.params.id,
        },
    });
    res.send(resultado);
});
router.put("/:id", async (req, res) => {
    const resultado = await JuegoSequelize.update(
        {
            ...req.body,
        },
        {
            where: {
                id: req.params.id
            },
        }
    );
    res.send(resultado);
});


module.exports = router;