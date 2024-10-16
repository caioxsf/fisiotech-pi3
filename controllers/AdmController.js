const PerfilModel = require("../models/PerfilModel");
const UserModel = require("../models/UserModel");

class AdmController {

    async admView (req,res) {
        let userModel = new UserModel();
        let listaUsuarios = await userModel.listarUsers();

        

        res.render('adm/adm.ejs', {usuarios: listaUsuarios});
    }

    async excluirUsuarioCadastrado (req,res) {
        let id = req.params.id;
        let admModel = new UserModel();
        let resultado = await admModel.excluirUsuario(id);
        let msg = '';
        if(resultado)
            msg = 'Conta excluída com sucesso!';
        else 
            msg = 'Erro ao excluir conta';

        res.send({ok: resultado, msg: msg});
    }

    async editarAdmView (req,res) {
        let id = req.params.id;
        let userModel = new UserModel();
        userModel = await userModel.obter(id);

        let perfilModel = new PerfilModel();
        perfilModel = await perfilModel.listar();

        let listaUsuarios = await userModel.listarUsers();

        res.render('adm/adm.ejs', {admAlteracao: userModel, usuarios: listaUsuarios, perfis: perfilModel});
    }

    async editarAdm (req,res) {
        let ok;
        if(req.body.login && req.body.senha ) {
            let userModel = new UserModel();
            userModel.login = req.body.usuario;
            userModel.senha = req.body.senha;
            let resultado = await userModel.editar();

            if(resultado) {
                res.send({ok: true, msg: 'Conta atualizada com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao atualizadar conta!'});
            }
           
        }
        else {
            res.send({ok: false, msg: 'O usuario e senha precisam ter mais de 5 caracteres!'});
        }
    }

}

module.exports = AdmController;