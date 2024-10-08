const ConsultaModel = require("../models/ConsultaModel");
const ServicosModel = require("../models/ServicosModel");

class ConsultaController {

    async consultaView (req,res) {
        let listaServicos = new ServicosModel();
        listaServicos = await listaServicos.listarServicos();

        res.render('consulta/consulta.ejs', {serv: listaServicos})
    }

    async consultaCadastro(req,res) {
        let ok;

        if(req.body.nome && req.body.telefone && req.body.email && req.body.servico && req.body.data && req.body.hora && req.body.obs) {
            let consulta = new ConsultaModel();

            consulta.nome = req.body.nome;
            consulta.telefone = req.body.telefone;
            consulta.email = req.body.email;
            consulta.servico_id = req.body.servico;
            consulta.data = req.body.data;
            consulta.hora = req.body.hora;
            consulta.obs = req.body.obs;

            let resultado = await consulta.cadastrarConsulta();

            if(resultado) {
                res.send({ok: true, msg: 'Consulta cadastrada com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao cadastrar consulta'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

    async listaConsultaView(req,res) {
        let listaConsulta = new ConsultaModel();
        listaConsulta = await listaConsulta.listarConsulta();

        res.render('consulta/listaConsultas.ejs', {consultas: listaConsulta});
    }

    async excluirConsulta (req,res) {
        let id = req.params.id;
        let consultaModel = new ConsultaModel();
        let resultado = await consultaModel.excluirConsulta(id);
        let msg = '';
        if(resultado)
            msg = 'Consulta excluída com sucesso!';
        else 
            msg = 'Erro ao excluir usuário';

        res.send({ok: resultado, msg: msg});
    }


    async editarConsultaView (req,res) {
        let id = req.params.id;
        let listaServicos = new ServicosModel();
        listaServicos = await listaServicos.listarServicos();

        let consultaModel = new ConsultaModel();
        consultaModel = await consultaModel.obter(id);

        res.render('consulta/consulta.ejs', {serv: listaServicos, consultaAlteracao: consultaModel});
    }

    async editarConsulta (req,res) {
        let ok;
        if(req.body.nome && req.body.telefone && req.body.email && req.body.servico && req.body.data && req.body.hora && req.body.obs) {
            let consulta = new ConsultaModel();
            consulta.id = req.body.id;
            consulta.nome = req.body.nome;
            consulta.telefone = req.body.telefone;
            consulta.email = req.body.email;
            consulta.servico_id = req.body.servico;
            consulta.data = req.body.data;
            consulta.hora = req.body.hora;
            consulta.obs = req.body.obs;

            let resultado = await consulta.editarConsulta();

            if(resultado) {
                res.send({ok: true, msg: 'Consulta atualizada com sucesso!'});
            }
            else {
                res.send({ok: false, msg: 'Erro ao atualizar consulta'});
            }

        }
    }
    
}

module.exports = ConsultaController;