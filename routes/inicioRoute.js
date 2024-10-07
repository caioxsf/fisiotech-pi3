const express = require("express");
const InicioController = require("../controllers/inicioController");

const router = express.Router();

const ctrl = new InicioController();

router.get("/", ctrl.inicio);
router.get("/v-libras", ctrl.vlibras);

module.exports = router;