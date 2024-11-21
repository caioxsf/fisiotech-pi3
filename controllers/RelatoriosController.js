const AtestadoModel = require('../models/AtestadoModel');
const UserModel = require('../models/UserModel');

class RelatoriosController {

    async  atestadoView (req,res) {
        let atestadoModel = new AtestadoModel();
        let lista = await atestadoModel.listarAtestados();

        res.render('relatorios/atestado.ejs', {atestado: lista})
    }

    async excluirAtestado (req,res) {
        let id = req.params.id;
        let atestadoModel = new AtestadoModel();
        let resultado = await atestadoModel.excluirAtestado(id);
        let msg = '';
        if(resultado)
            msg = 'Atestado excluído com sucesso!';
        else 
            msg = 'Erro ao excluir atestado';

        res.send({ok: resultado, msg: msg});
    }

    async listaAtestadoSearch (req,res) {
        let atestadoModel = new AtestadoModel();
        let atestados = await atestadoModel.listaAtestadoSearch(req.body.texto, req.body.tipoBusca)

        res.send({atestados: atestados})
    }

    async usuarioView (req,res) {
        let userModel = new UserModel();
        let usuarios = await userModel.listarUsers();

        res.render('relatorios/usuarios.ejs', {usuarios: usuarios});
    }
}

module.exports = RelatoriosController;