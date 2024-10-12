const UserModel = require("../models/UserModel");


class AuthMiddleware {

    // funcao com arrow function pra this da funcao criarUsuarioLogado funcionar
    validar = async (req, res, next) => {
        
        if(req.cookies.usuarioLogado) {
            let idUsuario = req.cookies.usuarioLogado;
            let usuario = new UserModel();
            usuario  = await usuario.obter(idUsuario);
            if(usuario) {
                req.usuario = usuario;
                res.locals.usuario = usuario;
                next();
            }
            else{
                res.redirect("/login");
            }
        } else {
            await this.criarUsuarioLogado(req, res);
            next();
        }
    }

    // funcao para criar um usuario logado padrao, para poder acessar as rotas raizes
    async criarUsuarioLogado(req, res) {
        const usuarioPadrao = {
            id: '3',
            nome: 'Usuário Padrão',
            perfil_id: 3
        };

        res.cookie('usuarioLogadoPadrao', usuarioPadrao.id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60 * 24
        });

        req.usuario = usuarioPadrao;
        res.locals.usuario = usuarioPadrao;
    }

    async validarAdmin(req, res, next) {
        if(req.cookies.usuarioLogado) {
            let idUsuario = req.cookies.usuarioLogado;
            let usuario = new UserModel();
            usuario  = await usuario.obter(idUsuario);
            if(usuario && usuario.perfil_id == 1) {
                //informação é disponibilizada para a controladora
                req.usuario = usuario;
                //informação disponível na renderização das páginas
                res.locals.usuario = usuario;
                //é valido, pode prosseguir
                next();
            }
            else{
                //não é valido
                res.redirect("/nao-autorizado");
            }
        }
        else{
            res.redirect("/login");
        }
    }

    
    
}

module.exports = AuthMiddleware