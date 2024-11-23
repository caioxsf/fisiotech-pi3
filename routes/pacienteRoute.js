const express = require("express");
const multer = require("multer");
const PacienteController = require("../controllers/PacienteController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const storage = multer.diskStorage( {
    destination (req,file,cb) {
        cb(null,'public/img/paciente')
    },
    filename(req,file,cb) {
        let ext = file.originalname.split(".").pop();
        let novoNome = Date.now().toString() + "." + ext;
        cb(null,novoNome);
    }
})

const ctrl = new PacienteController();
let upload = multer({storage});

let auth = new AuthMiddleware();
router.get("/", auth.validarAdmin,ctrl.pacienteView);
router.post("/", upload.single("imagem"), ctrl.pacienteCadastro);

router.get('/dados/:id', auth.validarAdmin, ctrl.pacientePuxarDados)

router.get('/lista', auth.validarAdmin,ctrl.listaPacienteView);
router.post('/lista', ctrl.listarPacienteSearch)

router.get('/excluir/:id', auth.validarAdmin,ctrl.excluirPaciente);

router.get('/editar/:id', auth.validarAdmin,ctrl.editarView);
router.post('/editar', upload.single("imagem"), auth.validarAdmin, ctrl.editarPaciente)



module.exports = router;