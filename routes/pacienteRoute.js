const express = require("express");
const PacienteController = require("../controllers/pacienteController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const ctrl = new PacienteController();
let auth = new AuthMiddleware();
router.get("/", auth.validarAdmin,ctrl.pacienteView);
router.post("/", auth.validarAdmin,ctrl.pacienteCadastro);
router.get('/dados/:id', auth.validarAdmin, ctrl.pacientePuxarDados)

router.get('/lista', auth.validarAdmin,ctrl.listaPacienteView);
router.get('/excluir/:id', auth.validarAdmin,ctrl.excluirPaciente);

router.get('/editar/:id', auth.validarAdmin,ctrl.editarView);
router.post('/editar', auth.validarAdmin,ctrl.editarPaciente)

module.exports = router;