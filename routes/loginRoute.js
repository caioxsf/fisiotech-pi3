const express = require('express');
const LoginController = require('../controllers/loginController');

const router = express.Router();
let ctrl = new LoginController();
router.get("/", ctrl.loginView);
router.post("/", ctrl.login);

module.exports = router;