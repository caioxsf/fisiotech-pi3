const express = require("express");
const AdmController = require("../controllers/AdmController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

let ctrl = new AdmController();
let auth = new AuthMiddleware();

router.get('/', auth.validarAdmin, ctrl.admView);
router.get('/editar/:id', auth.validarAdmin, ctrl.editarAdmView);

module.exports = router;
