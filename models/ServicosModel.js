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

    async cadastrarServico () {
        let sql = `insert into servico_consulta (serv_nome) values (?)`;
        let valores = [this.#nome];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async atualizarServico () {
        let sql = `update servico_consulta set serv_nome = ? where serv_id = ?`;
        let valores = [ this.#nome, this.#id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async excluirServicos (id) {
        let sql = `delete from servico_consulta where serv_id = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async obter(id) {
        let sql = `select * from servico_consulta where serv_id = ?`;
        let valores = [id];
        let colunas = await db.ExecutaComando(sql, valores);

        if(colunas.length > 0) {

            return new ServicosModel(   colunas[0]['serv_id'], 
                                        colunas[0]['serv_nome']
            )
            
        }
        return null;
    }

}

module.exports = ServicosModel;