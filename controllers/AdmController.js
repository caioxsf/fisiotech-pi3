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
            msg = 'Usuário excluído com sucesso!';
        else 
            msg = 'Erro ao excluir usuário';

        res.send({ok: resultado, msg: msg});
    }

    async editarAdmView (req,res) {
        let id = req.params.id;
        let userModel = new UserModel();
        userModel = await userModel.obter(id);

        let listaUsuarios = await userModel.listarUsers();

        res.render('adm/adm.ejs', {admAlteracao: userModel, usuarios: listaUsuarios});
    }

}

module.exports = AdmController;