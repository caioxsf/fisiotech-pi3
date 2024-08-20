class inicioController {

    inicio(req,res) {
        res.render("index.ejs");
    }

    consulta(req,res) {
        res.render("consulta.ejs");
    }

    paciente(req,res) {
        res.render("paciente.ejs");
    }

    vlibras(req,res) {
        res.render("vlibras.ejs");
    }
}

module.exports = inicioController;