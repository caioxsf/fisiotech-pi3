const Database = require("../utils/database");

const db = new Database();

class PerfilModel {

    #id;
    #descricao;

    get id() {
        return this.#id;
    }
    set id(value) {
        this.#id = value;
    }
    get descricao() {
        return this.#descricao
    }
    set descricao(value) {
        this.#descricao = value;
    }

    constructor(id, descricao) {
        this.#id = id;
        this.#descricao = descricao;
    }

    async listar() {
        let sql = "select * from perfil";

        let resultado = await db.ExecutaComando(sql);
        let lista = [];
        for(let registro of resultado) {
                lista.push(new PerfilModel(registro["per_id"], registro["per_desc"]));
        }
        return lista;
    }

}

module.exports = PerfilModel;