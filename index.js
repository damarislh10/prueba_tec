const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const conn = require("express-myconnection");
const { connection } = require("./config.db.js");
const routesGeneral = require("./src/routes/crud.routes.js");



const app = express();


app.use(express.json());

app.use(conn(mysql, connection, "pool"));
app.use(cors());


app.use("/", routesGeneral);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(500).send("Error interno del servidor");
});


app.listen(process.env.PORT || 4000, () => {
    console.log("server running on port", process.env.PORT, "🚀");
})

module.exports = app;