const Database = require('../utils/database');
const db = new Database();

class RegistroModel {

    #id
    #usuario
    #senha
    #perfil_id

    constructor (id,usuario,senha,perfil_id) {
        this.#id = id;
        this.#usuario = usuario;
        this.#senha = senha;
        this.#perfil_id = perfil_id;
    }

    get id () {return this.#id}
    set id (value) {this.#id = value}

    get usuario () {return this.#usuario}
    set usuario (value) {this.#usuario = value}

    get senha () {return this.#senha}
    set senha (value) {this.#senha = value}

    get perfil_id () {return this.#perfil_id}
    set perfil_id (value) {this.#perfil_id = value}

    async cadastrarRegistro () {
        let sql = `insert into user_admin (user_login,user_senha,per_id) values (?,?,?)`;
        let valores = [this.#usuario, this.#senha, 2];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async verificarRegistroIgual (login) {
        let sql = `select user_login from user_admin where user_login = ?`
        let valores = [login];
        let resultado = await db.ExecutaComando(sql,valores);
        if(resultado.length > 0) {
            return resultado[0];
        }
        else
            return null;
    }

}

module.exports = RegistroModel;