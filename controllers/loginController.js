const UserModel = require("../models/UserModel");

class LoginController {

    loginView(req, res) {
        res.render("login.ejs", { layout: false });
    }

    async login(req, res) {
        let msg = "";
        if(req.body.usuario && req.body.senha) {

            let usuario = new UserModel();
            usuario = await usuario.validarUsuario(req.body.usuario, req.body.senha);
            if(usuario) {
                res.cookie("usuarioLogado", usuario.id);
                res.redirect("/");
            }
            else{
                msg = "Erro ao realizar autenticação! Confira as credenciais enviadas."
                res.render("login.ejs", {retorno: msg, layout: false});
            }

        }
        else{
            msg = "Erro ao realizar autenticação! Confira as credenciais enviadas."
            res.render("login.ejs", {retorno: msg, layout: false});
        }

        
    }
}

module.exports = LoginController;