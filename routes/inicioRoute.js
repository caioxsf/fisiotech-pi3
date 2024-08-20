const express = require("express");
const InicioController = require("../controllers/inicioController");
const router = express.Router();

const ctrl = new InicioController();
router.get("/", ctrl.inicio);
router.get("/consulta", ctrl.consulta);
router.get("/paciente", ctrl.paciente);

module.exports = router;