const express = require("express");
const PacienteController = require("../controllers/pacienteController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const ctrl = new PacienteController();
let auth = new AuthMiddleware();
router.get("/", auth.validar,ctrl.pacienteView);
router.post("/", auth.validar,ctrl.pacienteCadastro);

router.get('/lista', auth.validar,ctrl.listaPacienteView);
router.get('/excluir/:id', auth.validar,ctrl.excluirPaciente);

router.get('/editar/:id', auth.validar,ctrl.editarView);
router.post('/editar', auth.validar,ctrl.editarPaciente)

module.exports = router;