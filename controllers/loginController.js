const RegistroModel = require("../models/RegistroModel");
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

    registroView (req,res) {
        res.render('registro.ejs',{ layout: false });
    }

    async registro (req,res) {
        let ok;
        if(req.body.usuario && req.body.senha && req.body.usuario.length > 5 && req.body.senha > 5) {

            let registro = new RegistroModel();
            let resultadoContaIgual = await registro.verificarRegistroIgual(req.body.usuario);

            if(resultadoContaIgual === null) {

                registro.usuario = req.body.usuario;
                registro.senha = req.body.senha;
                let resultado = await registro.cadastrarRegistro();

                if(resultado) {
                    res.send({ok: true, msg: 'Conta criada com sucesso!'});
                }
                else {
                    res.send({ok: false, msg: 'Erro ao cadastrar conta!'});
                }
            }
            else {
                res.send({ok: false, msg: 'Esse usuario já existe!'});
            }
        }
        else {
            res.send({ok: false, msg: 'O usuario e senha precisam ter mais de 5 caracteres!'});
        }
    }

    logout (req,res) {
        res.clearCookie("usuarioLogado");
        
        res.redirect("/");
    }
}

module.exports = LoginController;