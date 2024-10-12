const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();
let ctrl = new LoginController();
router.get("/", ctrl.loginView);
router.get ('/logout', ctrl.logout);
router.post("/", ctrl.login);
router.get('/registro', ctrl.registroView);
router.post('/registro', ctrl.registro);

module.exports = router;