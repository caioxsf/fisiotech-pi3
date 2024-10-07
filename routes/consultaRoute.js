const express = require("express");
const ConsultaController = require("../controllers/ConsultaController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const ctrl = new ConsultaController();
let auth = new AuthMiddleware();
router.get("/", auth.validar,ctrl.consultaView);
router.post('/', auth.validar,ctrl.consultaCadastro);

router.get('/lista', auth.validar,ctrl.listaConsultaView);
router.get('/excluir/:id', auth.validar,ctrl.excluirConsulta);

router.get('/editar/:id', auth.validar,ctrl.editarConsultaView);
router.post('/editar', auth.validar,ctrl.editarConsulta);

module.exports = router;