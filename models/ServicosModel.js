const Database = require('../utils/database');
const db = new Database();

class ServicosModel {

    #id
    #nome

    constructor(id,nome) {
        this.#id = id;
        this.#nome = nome;
    }

    get id () {return this.#id}
    set id (value) {this.#id = value}

    get nome () {return this.#nome}
    set nome (value) {this.#nome = value}

    async listarServicos () {
        let sql = `select * from servico_consulta`;
        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new ServicosModel(coluna['serv_id'],coluna['serv_nome']));
        }
        return lista;
    }

}

module.exports = ServicosModel;