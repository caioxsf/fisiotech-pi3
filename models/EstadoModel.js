const Database = require('../utils/database');
const db = new Database();

class EstadoModel {
    #id
    #nome 

    constructor (id,nome) {
        this.#id = id;
        this.#nome = nome;
    }

    get id () {return this.#id};
    set id (value) {this.#id = value};

    get nome () {return this.#nome};
    set nome (value) {this.#nome = value};

    async ListarEstados () {
        let sql = `select * from estado`;
        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new EstadoModel(coluna['est_id'],coluna['est_nome']));
        }
        return lista;
    }
}

module.exports = EstadoModel;