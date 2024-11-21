const ConsultaModel = require("../models/ConsultaModel");
const ServicosModel = require("../models/ServicosModel");
const PacienteModel = require("../models/PacienteModel");

class ConsultaController {

    async consultaView (req,res) {
        let listaServicos = new ServicosModel();
        listaServicos = await listaServicos.listarServicos();

        let pacienteModel = new PacienteModel();
        let listaPaciente = await pacienteModel.listarPaciente();

        res.render('consulta/consulta.ejs', {serv: listaServicos, lista_pacientes: listaPaciente})
    }

    async consultaCadastro(req,res) {
        let ok;
        
        if( req.body.telefone && req.body.email && req.body.servico && req.body.data && req.body.hora && req.body.obs) {
            let consulta = new ConsultaModel();

            let verificarDataHora = await consulta.verificarConsultaMesmoDiaMesmoHorario(req.body.data,req.body.hora);
            
            if(verificarDataHora == null) {
                consulta.nome_id = req.body.nome;
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
                res.send({ok: false, msg: 'Já existem consulta nesse horario marcado!'});
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

        let pacienteModel = new PacienteModel();
        let listaPaciente = await pacienteModel.listarPaciente();

        res.render('consulta/consulta.ejs', {serv: listaServicos, consultaAlteracao: consultaModel, lista_pacientes: listaPaciente});
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
    
    async listarConsultaSearch (req,res) {
        let consultaModel = new ConsultaModel();
        let consultas = await consultaModel.listarConsultaSearch(req.body.texto, req.body.tipoBusca)
        res.send({consultas: consultas});
    }
}

module.exports = ConsultaController;