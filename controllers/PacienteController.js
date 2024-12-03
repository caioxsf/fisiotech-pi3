const PacienteModel = require("../models/PacienteModel");
const EstadoModel = require("../models/EstadoModel");
const SexoModel = require("../models/SexoModel");

class PacienteController {

    async pacienteView(req,res) {
        let listaEstados = new EstadoModel();
        listaEstados = await listaEstados.ListarEstados();

        let listaSexo = new SexoModel();
        listaSexo = await listaSexo.ListarSexo();

        let pacienteModel = new PacienteModel();
        let imagem = await pacienteModel.listarPaciente();

        res.render("paciente/paciente.ejs", {estados: listaEstados, sexo: listaSexo, imagem: imagem});
    }

    async pacienteCadastro (req,res) {
        
        if (req.body.nome && req.body.telefone && req.body.email && req.body.nascimento && req.body.cpf && req.body.endereco && req.body.bairro && req.body.sexo  && req.body.cidade  && req.body.estado !="Selecione uma opção" &&  req.body.cep) {
            let pacienteModel = new PacienteModel();

            let cpfIgual = await pacienteModel.verificarCpfCadastrado(req.body.cpf);

            if(cpfIgual == null)
            {
                pacienteModel.nome = req.body.nome;
                pacienteModel.telefone = req.body.telefone;
                pacienteModel.email = req.body.email;
                pacienteModel.nascimento = req.body.nascimento;
                pacienteModel.cpf = req.body.cpf;
                pacienteModel.endereco = req.body.endereco;
                pacienteModel.bairro = req.body.bairro;
                pacienteModel.sexo_id = req.body.sexo;
                pacienteModel.cidade = req.body.cidade;
                pacienteModel.estado_id = req.body.estado;
                pacienteModel.cep = req.body.cep;
                pacienteModel.pacienteImagem = req.file.filename;


                let resultado = pacienteModel.cadastrarPaciente();

                if(resultado) {
                    res.send({ok: true, msg: 'Paciente cadastrado com sucesso!'});

                }
                else {
                    res.send({ok: false, msg: 'Erro ao cadastrar paciente!'});
                }
            }
            else {
                res.send({ok: false, msg: 'Já existem pacientes com esse CPF!'})
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    
    }

    async listaPacienteView (req,res) {
        let listaPaciente = new PacienteModel();
        listaPaciente = await listaPaciente.listarPaciente();

        res.render('paciente/listaPacientes.ejs', {pacientes: listaPaciente});
    }
    
    async pacientePuxarDados(req, res) {
        let id = req.params.id;
    
        let pacienteModel = new PacienteModel();
        let dados = await pacienteModel.puxarDados(id);
        
        if (dados) {
            res.json({ telefone: dados[0].pac_telefone, email: dados[0].pac_email });
        } 
    }
    
    async excluirPaciente (req,res) {
        let id = req.params.id;
        let pacienteModel = new PacienteModel();
        let resultado = await pacienteModel.excluirPaciente(id);
        let msg = '';
        if(resultado)
            msg = 'Paciente excluído com sucesso!';
        else 
            msg = 'Erro ao excluir paciente';

        res.send({ok: resultado, msg: msg});
    }
    
    async editarView (req,res) {
        let id = req.params.id;
        let pacienteModel = new PacienteModel();
        pacienteModel = await pacienteModel.obter(id);

        let sexoModel = new SexoModel();
        sexoModel = await sexoModel.ListarSexo();

        let estadoModel = new EstadoModel();
        estadoModel = await estadoModel.ListarEstados();

        res.render('paciente/paciente.ejs', {estados: estadoModel, sexo: sexoModel, pacienteAlteracao: pacienteModel});
    }

    async editarPaciente (req,res) {
        
        if (req.body.nome && req.body.telefone && req.body.email && req.body.nascimento && req.body.cpf && req.body.endereco && req.body.bairro && req.body.sexo  && req.body.cidade  && req.body.estado &&  req.body.cep) {
            let pacienteModel = new PacienteModel();

            pacienteModel.id = req.body.id;
            pacienteModel.nome = req.body.nome;
            pacienteModel.telefone = req.body.telefone;
            pacienteModel.email = req.body.email;
            pacienteModel.nascimento = req.body.nascimento;
            pacienteModel.cpf = req.body.cpf;
            pacienteModel.endereco = req.body.endereco;
            pacienteModel.bairro = req.body.bairro;
            pacienteModel.sexo_id = req.body.sexo;
            pacienteModel.cidade = req.body.cidade;
            pacienteModel.estado_id = req.body.estado;
            pacienteModel.cep = req.body.cep;
            if(req.file != null)
            {
                pacienteModel.pacienteImagem = req.file.filename;
                let resultado = pacienteModel.editar();
                if(resultado) {
                    res.send({ok: true, msg: 'Paciente atualizado com sucesso!'});
    
                }
                else {
                    res.send({ok: false, msg: 'Erro ao atualizar paciente!'});
                }
            }
            else {
                let resultado = pacienteModel.editarSemImagem();
                if(resultado) {
                    res.send({ok: true, msg: 'Paciente atualizado com sucesso!'});
    
                }
                else {
                    res.send({ok: false, msg: 'Erro ao atualizar paciente!'});
                }
            }

            
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

    async listarPacienteSearch (req,res) {
        let pacienteModel = new PacienteModel();
        let pacientes = await pacienteModel.listarPacienteSearch(req.body.texto, req.body.tipoBusca)
        res.send({pacientes: pacientes});
    }

}

module.exports = PacienteController;