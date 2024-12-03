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
            servicoModel.desc = req.body.desc;
            
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
        
        let id = req.cookies.usuarioLogado
        let pontoModel = new PontoModel();

        let pontoExistente = await pontoModel.verificarPontoBatido(id);
        
        let pontoEntrada = await pontoModel.verificarEntrada(id);
        let pontoSaidaAlmoco = await pontoModel.verificarSaidaAlmoco(id);
        let pontoRetornoAlmoco = await pontoModel.verificarRetornoAlmoco(id);
        let pontoSaida = await pontoModel.verificarSaida(id);

        res.render('ponto/ponto.ejs', {pontoExistente: pontoExistente, pontoEntrada: pontoEntrada, pontoSaidaAlmoco: pontoSaidaAlmoco, pontoRetornoAlmoco: pontoRetornoAlmoco, pontoSaida: pontoSaida});
    }


    async ponto (req,res) {
        // if(req.body.nome && req.body.horaEntrada && req.body.horaSaida && req.body.saidaAlmoco && req.body.retornoAlmoco) {

        //     let pontoModel = new PontoModel();

        //     pontoModel.id_profissional = req.body.id;
        //     pontoModel.hora_entrada = req.body.horaEntrada;
        //     pontoModel.hora_saida = req.body.horaSaida;
        //     pontoModel.nome_profissional = req.body.nome;
        //     pontoModel.saida_almoco = req.body.saidaAlmoco;
        //     pontoModel.retorno_almoco = req.body.retornoAlmoco;

        //     let resultado = await pontoModel.cadastrar();

        //     if(resultado) {
        //         res.send({ok: true, msg: 'Ponto registrado!'})
        //     }
        //     else {
        //         res.send({ok: false, msg: 'Ocorreu um erro ao registrar seu ponto!'})
        //     }
        // }
        // else {
        //     res.send({ok: false, msg: 'Parametros incorretos!'});
        // }

        if(req.body.nome && req.body.horaEntrada != '' && req.body.saidaAlmoco == '' && req.body.retornoAlmoco == '' && req.body.horaSaida == '') {

            let pontoModel = new PontoModel();
            pontoModel.id_profissional = req.body.id;
            pontoModel.hora_entrada = req.body.horaEntrada;
            pontoModel.nome_profissional = req.body.nome;

            let resultado = await pontoModel.cadastrarEntrada();

            if(resultado) {
                res.send({ok: true, msg: 'Ponto registrado!'})
            }
            else {
                res.send({ok: false, msg: 'Ocorreu um erro ao registrar seu ponto!'})
            }
        }

        if(req.body.nome && req.body.horaEntrada != '' && req.body.saidaAlmoco != '' && req.body.retornoAlmoco == '' && req.body.horaSaida == '') {
            let pontoModel = new PontoModel();
            pontoModel.id_profissional = req.body.id;
            pontoModel.hora_entrada = req.body.horaEntrada;
            pontoModel.saida_almoco = req.body.saidaAlmoco;
            pontoModel.nome_profissional = req.body.nome;

            let resultado = await pontoModel.cadastrarSaidaAlmoco();

            if(resultado) {
                res.send({ok: true, msg: 'Ponto registrado!'})
            }
            else {
                res.send({ok: false, msg: 'Ocorreu um erro ao registrar seu ponto!'})
            }
        }

        if(req.body.nome && req.body.horaEntrada != '' && req.body.saidaAlmoco != '' && req.body.retornoAlmoco != '' && req.body.horaSaida == '') {
            let pontoModel = new PontoModel();
            pontoModel.id_profissional = req.body.id;
            pontoModel.hora_entrada = req.body.horaEntrada;
            pontoModel.saida_almoco = req.body.saidaAlmoco;
            pontoModel.retorno_almoco = req.body.retornoAlmoco;
            pontoModel.nome_profissional = req.body.nome;

            let resultado = await pontoModel.cadastrarRetornoAlmoco();

            if(resultado) {
                res.send({ok: true, msg: 'Ponto registrado!'})
            }
            else {
                res.send({ok: false, msg: 'Ocorreu um erro ao registrar seu ponto!'})
            }
        }

        if(req.body.nome && req.body.horaEntrada != '' && req.body.saidaAlmoco != '' && req.body.retornoAlmoco != '' && req.body.horaSaida != '') {
            let pontoModel = new PontoModel();
            pontoModel.id_profissional = req.body.id;
            pontoModel.hora_entrada = req.body.horaEntrada;
            pontoModel.saida_almoco = req.body.saidaAlmoco;
            pontoModel.retorno_almoco = req.body.retornoAlmoco;
            pontoModel.nome_profissional = req.body.nome;
            pontoModel.hora_saida = req.body.horaSaida;

            let resultado = await pontoModel.cadastrarSaida();

            if(resultado) {
                res.send({ok: true, msg: 'Ponto registrado!'})
            }
            else {
                res.send({ok: false, msg: 'Ocorreu um erro ao registrar seu ponto!'})
            }
        }
    
     }

    
}

module.exports = AdmController;