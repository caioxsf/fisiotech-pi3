const PacienteModel = require("../models/PacienteModel");
const EstadoModel = require("../models/EstadoModel");
const SexoModel = require("../models/SexoModel");

class PacienteController {

    async pacienteView(req,res) {
        let listaEstados = new EstadoModel();
        listaEstados = await listaEstados.ListarEstados();

        let listaSexo = new SexoModel();
        listaSexo = await listaSexo.ListarSexo();

        res.render("paciente/paciente.ejs", {estados: listaEstados, sexo: listaSexo});
    }

    async pacienteCadastro (req,res) {
        let ok;
        if(req.body.nome && req.body.telefone && req.body.email && req.body.nascimento && req.body.cpf &&
            req.body.endereco && req.body.bairro && req.body.sexo && req.body.cidade && req.body.estado && req.body.cep) {
            let paciente = new PacienteModel();
            let verificarCpfCadastrado = await paciente.verificarCpfCadastrado(req.body.cpf);
            if(verificarCpfCadastrado == null) {
                paciente.nome = req.body.nome;
                paciente.telefone = req.body.telefone;
                paciente.email = req.body.email;
                paciente.nascimento = req.body.nascimento;
                paciente.cpf = req.body.cpf;
                paciente.endereco = req.body.endereco;
                paciente.bairro = req.body.bairro;
                paciente.sexo_id = req.body.sexo;
                paciente.cidade = req.body.cidade;
                paciente.estado_id = req.body.estado;
                paciente.cep = req.body.cep;

                let resultado = await paciente.cadastrarPaciente();
                if(resultado) {
                    res.send({ok: true, msg: 'Paciente cadastrado com sucesso!'});
                }
                else {
                    res.send({ok: false, msg: 'Erro ao cadastro de paciente'});
                }
            }
            else {
                res.send({ok: false, msg: 'Já existe um paciente cadastrado com esse CPF!'});
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
        
        let ok;
        if(req.body.nome && req.body.telefone && req.body.email && req.body.nascimento && req.body.cpf &&
            req.body.endereco && req.body.bairro && req.body.sexo && req.body.cidade && req.body.estado && req.body.cep) {
            let paciente = new PacienteModel();
            
            paciente.id = req.body.id;
            paciente.nome = req.body.nome;
            paciente.telefone = req.body.telefone;
            paciente.email = req.body.email;
            paciente.nascimento = req.body.nascimento;
            paciente.cpf = req.body.cpf;
            paciente.endereco = req.body.endereco;
            paciente.bairro = req.body.bairro;
            paciente.sexo_id = req.body.sexo;
            paciente.cidade = req.body.cidade;
            paciente.estado_id = req.body.estado;
            paciente.cep = req.body.cep;

            let resultado = await paciente.editar();

            if(resultado) {
                res.send({ok: true, msg: 'Paciente atualizado com sucesso!'});
               
            }
            else {
                res.send({ok: false, msg: 'Erro ao atualizar paciente'});
            }
        }
        else {
            res.send({ok: false, msg: 'Parametros incorretos'});
        }
    }

    
}

module.exports = PacienteController;