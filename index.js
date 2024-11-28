const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

let carritoGlobal = []; 

app.post('/guardar-carrito', (req, res) => {
    try {
        carritoGlobal = req.body.carrito; 
        res.sendStatus(200);
    } catch (error) {
        console.error("Error al guardar el carrito:", error);
        res.status(500).send("Error interno del servidor");
    }
});

app.get('/ticket', (req, res) => {
    if (!carritoGlobal || carritoGlobal.length === 0) {
        return res.status(400).send('El carrito está vacío');
    }
    const total = carritoGlobal.reduce((acc, item) => acc + item.precio, 0);
    res.render('ticket', { carrito: carritoGlobal, total });
});


const sequelize = require("./db/sequelize");
const juegoSequelize = require("./entity/juegos.entity");
const juegosRoutes = require("./routes/producto.routes");

const AdminSequelize = require("./entity/admin.entity");
const AdminRoutes = require("./routes/admin.routes");

const VentaSequelize = require("./entity/ventas.entity");
const VentaRoutes = require("./routes/ventas.routes");

// Rutas
app.use("/contrasenia", AdminRoutes);
app.use("/venta", VentaRoutes);
app.use("/juego", juegosRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

async function startServer() {
    try {
        await sequelize.authenticate();
        await AdminSequelize.sync();
        await juegoSequelize.sync();
        await VentaSequelize.sync();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

startServer();
