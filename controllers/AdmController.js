const AtestadoModel = require("../models/AtestadoModel");
const PerfilModel = require("../models/PerfilModel");
const ServicosModel = require("../models/ServicosModel");
const UserModel = require("../models/UserModel");
const PontoModel = require("../models/PontoModel");

class AdmController {

    async admView (req,res) {
        let userModel = new UserModel();
        let listaUsuarios = await userModel.listarUsers();

        let servicoModel = new ServicosModel();
        let listaServicos = await servicoModel.listarServicos();
        

        res.render('adm/adm.ejs', {usuarios: listaUsuarios, servicos: listaServicos});
    }

    async atestadoView (req,res) {
        let servicoModel = new ServicosModel();
        let listaServicos = await servicoModel.listarServicos();

        res.render('atestado/atestado.ejs', {servicos: listaServicos})
    }

    async cadastrarAtestado (req,res) {

        if (req.body.nome && req.body.especialidade && req.file != null) {
            let atestadoModel = new AtestadoModel();

            atestadoModel.nome_medico = req.body.nome;
            atestadoModel.especialidade_medica = req.body.especialidade;
            atestadoModel.data_inicio = req.body.dataI;
            atestadoModel.data_termino = req.body.dataT;
            atestadoModel.foto_atestado = req.file.filename;

            let resultado = atestadoModel.cadastrar();

            if(resultado) {
                res.send({ok: true, msg: 'Atestado médico cadastrado com sucesso!'});

            }
            else {
                res.send({ok: false, msg: 'Erro ao cadastrar atestado médico!'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
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

    async editarServicoView (req,res) {
        let id = req.params.id;
        let servicosModel = new ServicosModel();
        servicosModel = await servicosModel.obter(id);

        let listaServicos = await servicosModel.listarServicos();

        res.render('adm/adm.ejs', {admAlteracao: servicosModel, servicos: listaServicos})
    }

    async editarServico (req,res) {
        let ok;
        if(req.body.servico) {
            
            let servicoModel = new ServicosModel();

            servicoModel.id = req.body.id;
            servicoModel.nome = req.body.servico;

            let resultado = await servicoModel.atualizarServico();

            if(resultado) {
                res.send({ok: true, msg: 'Serviço atualizado com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao atualizar serviço'});
            }
        }
        else {
            res.send({ok: false, msg: 'Erro ao atualizar serviço'});
        }
    }

    async pontoView(req,res) {
        res.render('ponto/ponto.ejs');
    }

    async ponto (req,res) {

        if(req.body.nome && req.body.horaEntrada && req.body.horaSaida) {
            let pontoModel = new PontoModel();

            pontoModel.id_profissional = req.body.id;
            pontoModel.hora_entrada = req.body.horaEntrada;
            pontoModel.hora_saida = req.body.horaSaida;
            pontoModel.nome_profissional = req.body.nome;

            let resultado = await pontoModel.cadastrar();

            if(resultado) {
                res.send({ok: true, msg: 'Ponto registrado!'})
            }
            else {
                res.send({ok: false, msg: 'Ocorreu um erro ao registrar seu ponto!'})
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos!'});
        }
    }

    
}

module.exports = AdmController;