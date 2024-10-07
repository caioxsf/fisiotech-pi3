const PacienteModel = require("../models/PacienteModel");

class inicioController {

    inicio(req,res) {
        res.render("index.ejs");
    }



    vlibras(req,res) {
        res.render("vlibras.ejs");
    }
}

module.exports = inicioController;