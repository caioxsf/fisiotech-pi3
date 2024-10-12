const UserModel = require("../models/UserModel");

class AdmController {

    async admView (req,res) {
        let userModel = new UserModel();
        let listaUsuarios = await userModel.listarUsers();

        res.render('adm/adm.ejs', {usuario: listaUsuarios});
    }

}

module.exports = AdmController;