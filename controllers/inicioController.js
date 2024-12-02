let ServicosModel = require('../models/ServicosModel');

class inicioController {

    async inicio(req,res) {
        let servicosModel = new ServicosModel()
        let lista = await servicosModel.listarServicos();

        res.render("index.ejs", {servicos: lista});
    }


    vlibras(req,res) {
        res.render("vlibras.ejs");
    }

    naoAutorizado (req,res) {
        res.render("nao-autorizado.ejs", {layout: false});
    }
}

module.exports = inicioController;