const express = require("express");
const InicioController = require("../controllers/inicioController");
const AuthMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

let ctrl = new InicioController();
let auth = new AuthMiddleware();

router.get("/",auth.validar,ctrl.inicio);
router.get("/nao-autorizado", ctrl.naoAutorizado);
router.get("/v-libras",auth.validar, ctrl.vlibras);

module.exports = router;