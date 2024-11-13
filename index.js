const express = require("express");
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();
})
process.loadEnvFile();
require("dotenv").config();


const bodyParser = require("body-parser");

app.use(bodyParser.json());

const sequelize = require("./db/sequelize");
const juegoSequelize = require("./entity/juegos.entity");
const juegosRoutes = require("./routes/producto.routes");

const AdminSequelize = require("./entity/admin.entity");
const AdminRoutes = require("./routes/admin.routes");

app.use("/contrasenia", AdminRoutes)

app.use("/juego", juegosRoutes);

const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
async function startServer() {
    try {
        await sequelize.authenticate();
        await AdminSequelize.sync();
        await juegoSequelize.sync();
        console.log("Connection has been established successfully.");


    } catch (error) {
        console.error("Unable to connect to the database:", error);

    }
}
app.listen(process.env.PORT, () => {
    console.log("Se levanto correctamente")
})
startServer();


