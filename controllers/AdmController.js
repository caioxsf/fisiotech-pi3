const PerfilModel = require("../models/PerfilModel");
const ServicosModel = require("../models/ServicosModel");
const UserModel = require("../models/UserModel");

class AdmController {

    async admView (req,res) {
        let userModel = new UserModel();
        let listaUsuarios = await userModel.listarUsers();

        let servicoModel = new ServicosModel();
        let listaServicos = await servicoModel.listarServicos();
        

        res.render('adm/adm.ejs', {usuarios: listaUsuarios, servicos: listaServicos});
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

        let servicoModel = new ServicosModel();
        let listaServicos = await servicoModel.listarServicos();

        res.render('adm/adm.ejs', {admAlteracao: userModel, usuarios: listaUsuarios, perfis: perfilModel, servicos: listaServicos});
    }

    async editarAdm (req,res) {
        let ok;
        if(req.body.usuario && req.body.senha) {
            let userModel = new UserModel();
            userModel.id = req.body.id;
            userModel.login = req.body.usuario;
            userModel.senha = req.body.senha;
            userModel.perfil_id = req.body.perfil;
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

    async cadastrarServico (req,res) {
        let ok;
        if(req.body.servico) {
            let servicoModel = new ServicosModel();
            servicoModel.nome = req.body.servico;
            let resultado = await servicoModel.cadastrarServico();
            if(resultado) {
                res.send({ok: true, msg: 'Serviço cadastrado com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao cadastrar serviço'});
            }
        }
        else {
            res.send({ok: false, msg: 'Erro ao cadastrar serviço'});
        }
    }

    async excluirServico (req,res) {
        let id = req.params.id;
        let servicoModel = new ServicosModel();
        let resultado = await servicoModel.excluirServicos(id);
        let msg = '';
        if(resultado)
            msg = 'Serviço excluido com sucesso!';
        else 
            msg = 'Erro ao excluir serviço';

        res.send({ok: resultado, msg: msg});
    }

}

module.exports = AdmController;