
class inicioController {

    inicio(req,res) {
        res.render("index.ejs");
    }


    vlibras(req,res) {
        res.render("vlibras.ejs");
    }

    naoAutorizado (req,res) {
        res.render("nao-autorizado.ejs", {layout: false});
    }
}

module.exports = inicioController;