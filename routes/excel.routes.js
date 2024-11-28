const express = require("express");
const XLSX = require("xlsx");
const router = express.Router();

router.get("/", async (req, res) => {
    console.log("Solicitando descarga de Excel");

    const data = [
        { nombre: "Agus", apellido: "F", edad: 58 },
        { nombre: "Otro", apellido: "otro", edad: 2 },
        { nombre: "Uno más", apellido: "Otro", altura: 99 },
    ];

    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(libro, hoja, "Ventas");

    const buffer = XLSX.write(libro, { type: "buffer", bookType: 'xlsx' });

    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.attachment('Ventas.xlsx');

    res.send(buffer);
});

module.exports = router;
