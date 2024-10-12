const express = require("express");
const AdmController = require("../controllers/AdmController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const ctrl = new AdmController();
let auth = new AuthMiddleware();

router.get('/', auth.validarAdmin, ctrl.admView);

module.exports = router;