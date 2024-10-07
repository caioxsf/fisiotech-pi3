const UserModel = require("../models/UserModel");


class AuthMiddleware {

    async validar(req, res, next) {
        console.log(req);
        if(req.cookies.usuarioLogado) {
            let idUsuario = req.cookies.usuarioLogado;
            let usuario = new UserModel();
            usuario  = await usuario.obter(idUsuario);
            if(usuario) {
                //é valido, pode prosseguir
                next();
            }
            else{
                //não é valido
                res.redirect("/login");
            }
        }
        else{
            res.redirect("/login");
        }
    }
}

module.exports = AuthMiddleware