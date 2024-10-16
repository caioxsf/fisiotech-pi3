const express = require("express");
const AdmController = require("../controllers/AdmController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

let ctrl = new AdmController();
let auth = new AuthMiddleware();

router.get('/', auth.validarAdmin, ctrl.admView);
router.post('/', auth.validarAdmin, ctrl.cadastrarServico);
router.get('/editar/:id', auth.validarAdmin, ctrl.editarAdmView);
router.post('/editar', auth.validarAdmin, ctrl.editarAdm);
router.get('/servico/excluir/:id', auth.validarAdmin, ctrl.excluirServico)
router.get('/excluir/:id', auth.validarAdmin, ctrl.excluirUsuarioCadastrado);

module.exports = router;
