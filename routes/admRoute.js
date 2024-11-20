const express = require("express");
const multer = require('multer');
const AdmController = require("../controllers/AdmController");
const AuthMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        //faz a chamada para salvar no diretório específicado
        cb(null, 'public/img/atestado');
    },
    filename(req, file, cb) {
        //última posição do array (extensão);
        let ext = file.originalname.split(".").pop();
        //novo nome do nosso arquivo
        let novoNome = Date.now().toString() + "."  + ext;
        cb(null, novoNome);
    }
})
let upload = multer({storage});

let ctrl = new AdmController();
let auth = new AuthMiddleware();

router.get('/', auth.validarAdmin, ctrl.admView);
router.post('/', auth.validarAdmin, ctrl.cadastrarServico);
router.post('/atestado', upload.single("imagem"), ctrl.cadastrarAtestado)

router.get('/editar/:id', auth.validarAdmin, ctrl.editarAdmView);
router.post('/editar', auth.validarAdmin, ctrl.editarAdm);
router.get('/servico/excluir/:id', auth.validarAdmin, ctrl.excluirServico)
router.get('/excluir/:id', auth.validarAdmin, ctrl.excluirUsuarioCadastrado);

module.exports = router;
