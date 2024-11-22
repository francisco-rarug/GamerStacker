//crear una variable para almacenar rutas

const express = require("express");

const router = express.Router();




const JuegoSequelize = require("../entity/juegos.entity");

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post("/", upload.single("imagen"), async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    const tipo = req.body.tipo;
    const activo = req.body.activo;

    const juego = {
        nombre,
        descripcion,
        precio,
        imagen,
        tipo,
        activo,
    };
    const resultado = await JuegoSequelize.create(juego);

    res.send(resultado);
})



router.get("/", async (req, res) => {
    const resultado = await JuegoSequelize.findAll();

    res.send(resultado);
});

router.delete("/:id", async (req, res) => {
    const resultado = await JuegoSequelize.update(
        { activo: false },
        {
            where: {
                id: req.params.id,
            },
        }
    );
    res.send(resultado);
});
router.put("/:id", upload.single("imagen"), async (req, res) => {
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const precio = req.body.precio;
    const imagen = req.file ? `/uploads/${req.file.filename}` : null;
    const tipo = req.body.tipo;
    const activo = req.body.activo

    const juego = {
        nombre,
        descripcion,
        precio,
        imagen,
        tipo,
        activo,
    };
    const resultado = await JuegoSequelize.update(

        juego,
        {
            where: {
                id: req.params.id
            },
        }
    );
    res.send(resultado);
});

router.put("/activar/:id", async (req, res) => {
    try {
        const resultado = await JuegoSequelize.update(
            { activo: true },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        res.send(resultado)

    } catch (error) {
        console.error("Error al activar el producto:", error);
    }
});

module.exports = router;