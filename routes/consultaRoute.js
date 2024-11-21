const express = require("express");
const ConsultaController = require("../controllers/ConsultaController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const ctrl = new ConsultaController();
let auth = new AuthMiddleware();
router.get("/", auth.validarAdmin,ctrl.consultaView);
router.post('/', auth.validarAdmin,ctrl.consultaCadastro);


router.get('/lista', auth.validarAdmin,ctrl.listaConsultaView);
router.post('/lista', ctrl.listarConsultaSearch)

router.get('/excluir/:id', auth.validarAdmin,ctrl.excluirConsulta);

router.get('/editar/:id', auth.validarAdmin,ctrl.editarConsultaView);
router.post('/editar', auth.validarAdmin,ctrl.editarConsulta);

module.exports = router;