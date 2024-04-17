const express = require("express");
const routes = express.Router();
const crudController = require("../controllers/general.controller");

routes.post("/create", crudController.createGeneral);
routes.get("/search/lista", crudController.search);
routes.put("/update/:name/:value", crudController.update);
routes.delete("/delete/:name/:value", crudController.delete);

module.exports = routes;
