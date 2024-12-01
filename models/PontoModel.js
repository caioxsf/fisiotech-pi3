const Database = require('../utils/database');
const db = new Database();

class PontoModel {

    #id
    #id_profissional
    #hora_entrada
    #hora_saida
    #nome_profissional
    #data
    
    constructor (id, id_profissional, hora_entrada, hora_saida, nome_profissional, data) {
        this.#id = id;
        this.#id_profissional = id_profissional;
        this.#hora_entrada = hora_entrada;
        this.#hora_saida = hora_saida;
        this.#nome_profissional = nome_profissional;
        this.#data = data
    }

    get id () {return this.#id} set id (value) {this.#id = value};
    get id_profissional () {return this.#id_profissional} set id_profissional (value) {this.#id_profissional = value};
    get hora_entrada () {return this.#hora_entrada} set hora_entrada (value) {this.#hora_entrada = value};
    get hora_saida () {return this.#hora_saida} set hora_saida (value) {this.#hora_saida = value};
    get nome_profissional () {return this.#nome_profissional} set nome_profissional (value) {this.#nome_profissional = value};
    get data () {return this.#data} set data (value) {this.#data = value};

    async cadastrar () {
        let sql = `insert into ponto (pon_id_profissional, pon_hora_entrada, pon_hora_saida, pon_nome_profissional) values (?,?,?,?)`;
        let valores = [this.#id_profissional, this.#hora_entrada, this.#hora_saida, this.#nome_profissional];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async listar () {
        let sql = `select * from ponto`;
        let lista = [];

        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new PontoModel ( coluna['pon_id'],
                                        coluna['pon_id_profissional'],
                                        coluna['pon_hora_entrada'],
                                        coluna['pon_hora_saida'],
                                        coluna['pon_nome_profissional'],
                                        coluna['pon_data']
        ))
        }

        return lista;
    }

    async listarSearch (texto, tipoBusca, inicio, fim) {
        let whereFiltro = "";

        if(texto || inicio) {
            if(tipoBusca == 'nome') {
                whereFiltro = `where pon_nome_profissional like '%${texto}%' order by pon_nome_profissional asc`
            } else if (tipoBusca == 'hora') {
                whereFiltro = `where pon_hora_entrada between '${inicio}' and '12:00' and pon_hora_saida between '12:00' and '${fim}'`
            }
        }

        let sql = `select * from ponto ${whereFiltro}`;

        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new PontoModel ( coluna['pon_id'],
                                        coluna['pon_id_profissional'],
                                        coluna['pon_hora_entrada'],
                                        coluna['pon_hora_saida'],
                                        coluna['pon_nome_profissional'],
                                        coluna['pon_data']
        ))
        }

        return lista;

    }

    async 

    toJSON () {
        return {
            "id": this.#id,
            "id_profissional": this.#id_profissional,
            "hora_entrada": this.#hora_entrada,
            "hora_saida": this.#hora_saida,
            "nome_profissional": this.#nome_profissional,
            "data": this.#data
        }
    }
}


module.exports = PontoModel;