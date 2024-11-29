const express = require("express");
const multer = require('multer');
const AdmController = require("../controllers/AdmController");
const RelatoriosController = require("../controllers/RelatoriosController");
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
let rela = new RelatoriosController();
let auth = new AuthMiddleware();

router.get('/', auth.validarAdmin, ctrl.admView);
router.post('/', auth.validarAdmin, ctrl.cadastrarServico);

router.get('/servicos/editar/:id', auth.validarAdmin, ctrl.editarServicoView);
router.post('/servicos/editar', auth.validarAdmin, ctrl.editarServico);

router.post('/atestado', upload.single("imagem"), ctrl.cadastrarAtestado)

router.get('/servico/excluir/:id', auth.validarAdmin, ctrl.excluirServico)

router.get('/relatorio/atestado', auth.validarAdmin, rela.atestadoView);
router.get('/relatorio/atestado/excluir/:id', auth.validarAdmin, rela.excluirAtestado);

router.get('/relatorio/atestado/editar/:id', auth.validarAdmin, rela.editarAtestadoView);
router.post('/relatorio/atestado/editar', upload.single("imagem"), rela.editarAtestado);
router.post('/relatorio/atestado/lista', rela.listaAtestadoSearch)

router.get('/relatorio/usuarios', auth.validarAdmin, rela.usuarioView);
router.get('/relatorio/usuarios/editar/:id', auth.validarAdmin, rela.editarUsuarioView)
router.post('/relatorio/usuarios/editar', auth.validarAdmin, rela.editarUsuario)
router.get('/relatorio/usuarios/excluir/:id', auth.validarAdmin, rela.excluirUsuarioCadastrado);
router.post('/relatorio/usuarios', rela.listaSearch);

module.exports = router;
