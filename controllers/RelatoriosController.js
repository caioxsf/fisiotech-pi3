const AtestadoModel = require('../models/AtestadoModel');
const UserModel = require('../models/UserModel');
const ServicosModel = require("../models/ServicosModel");
const PerfilModel = require("../models/PerfilModel");
const PontoModel = require('../models/PontoModel');

class RelatoriosController {

    async atestadoView (req,res) {
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
        let atestados = await atestadoModel.listaAtestadoSearch(req.body.texto, req.body.tipoBusca, req.body.inicio, req.body.fim)

        res.send({atestados: atestados})
    }

    async usuarioView (req,res) {
        let userModel = new UserModel();
        let usuarios = await userModel.listarUsers();
        
        res.render('relatorios/usuarios.ejs', {usuarios: usuarios});
    }

    async editarUsuarioView (req,res) {
        let id = req.params.id;
        let userModel = new UserModel();
        userModel = await userModel.obter(id);

        let perfilModel = new PerfilModel();
        perfilModel = await perfilModel.listar();

        let listaUsuarios = await userModel.listarUsers();

        let servicoModel = new ServicosModel();
        let listaServicos = await servicoModel.listarServicos();

        res.render('relatorios/usuarios.ejs', {admAlteracao: userModel, usuarios: listaUsuarios, perfis: perfilModel, servicos: listaServicos});
    }

    async editarUsuario (req,res) {
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

    async editarAtestadoView (req,res) {
        let id = req.params.id;
        let atestadoModel = new AtestadoModel();
        atestadoModel = await atestadoModel.obterAtestado(id);

        let servicoModel = new ServicosModel();
        let listaServicos = await servicoModel.listarServicos();

        res.render('relatorios/atestado.ejs', {atestadoAlteracao: atestadoModel, servicos: listaServicos})
    }

    async editarAtestado (req,res) {

        if (req.body.nome && req.body.especialidade) {

            let atestadoModel = new AtestadoModel();

            atestadoModel.nome_medico = req.body.nome;
            atestadoModel.especialidade_medica = req.body.especialidade;
            atestadoModel.data_inicio = req.body.dataI;
            atestadoModel.data_termino = req.body.dataT;
            atestadoModel.id = req.body.id;

            if(req.file != null) {
                atestadoModel.foto_atestado = req.file.filename;
                let resultado = atestadoModel.atualizar();

                if(resultado) {
                    res.send({ok: true, msg: 'Atestado médico atualizado com sucesso!'});

                }
                else {
                    res.send({ok: false, msg: 'Erro ao atualizar atestado médico!'});
                }
            }
            else {
                let resultado = atestadoModel.atualizarSemImagem();

                if(resultado) {
                    res.send({ok: true, msg: 'Atestado médico atualizado com sucesso!'});

                }
                else {
                    res.send({ok: false, msg: 'Erro ao atualizar atestado médico!'});
                }
            }
    
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

    async listaSearch (req,res) {

        let userModel = new UserModel();
        let user = await userModel.listaUsersSearch(req.body.texto, req.body.tipoBusca)

        res.send({user: user});
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

    async pontoRelatorioView (req,res) {
        let pontoModel = new PontoModel();
        let lista = await pontoModel.listar();

        res.render('relatorios/ponto.ejs', {ponto: lista});
    }

    async pontoSearch (req,res) {
        let pontoModel = new PontoModel();
        let ponto = await pontoModel.listarSearch(req.body.texto, req.body.tipoBusca, req.body.inicio, req.body.fim)

        res.send({ponto: ponto})
    }
   
}

module.exports = RelatoriosController;