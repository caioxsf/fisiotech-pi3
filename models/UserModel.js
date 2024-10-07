const Database = require('../utils/database.js');

const db = new Database();

class UserModel {

    #id
    #login
    #senha

    constructor (id,login,senha) {
        this.#id=  id;
        this.#login = login;
        this.#senha = senha;
    }

    get id () {return this.#id}
    set id (value) {this.#id = value}

    get login () {return this.#login}
    set login (value) {this.#login = value}

    get senha () {return this.#senha}
    set senha (value) {this.#senha = value}


    async obter(id) {
        let sql = "select * from user_admin where user_id = ?";
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new UserModel(row[0]["user_id"],
                                    row[0]["user_login"],
                                    row[0]["user_senha"]
            )
        }

        return null;

    }
    async validarUsuario(login, senha) {
        let sql = "select * from user_admin where user_login = ? and user_senha = ?";
        let valores = [login, senha];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new UserModel(row[0]["user_id"],
                                    row[0]["user_login"],
                                    row[0]["user_senha"]
            )
        }

        return null;

    }
}

module.exports = UserModel