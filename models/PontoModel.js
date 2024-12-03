const Database = require('../utils/database');
const db = new Database();

class PontoModel {

    #id
    #id_profissional
    #hora_entrada
    #hora_saida
    #saida_almoco
    #retorno_almoco
    #nome_profissional
    #data
    #data_hoje
    
    constructor (id, id_profissional, hora_entrada, hora_saida, nome_profissional, data, saida_almoco, retorno_almoco, data_hoje) {
        this.#id = id;
        this.#id_profissional = id_profissional;
        this.#hora_entrada = hora_entrada;
        this.#hora_saida = hora_saida;
        this.#nome_profissional = nome_profissional;
        this.#data = data;
        this.#saida_almoco = saida_almoco;
        this.#retorno_almoco = retorno_almoco;
        this.#data_hoje = data_hoje;
    }

    get id () {return this.#id} set id (value) {this.#id = value};
    get id_profissional () {return this.#id_profissional} set id_profissional (value) {this.#id_profissional = value};
    get hora_entrada () {return this.#hora_entrada} set hora_entrada (value) {this.#hora_entrada = value};
    get hora_saida () {return this.#hora_saida} set hora_saida (value) {this.#hora_saida = value};
    get nome_profissional () {return this.#nome_profissional} set nome_profissional (value) {this.#nome_profissional = value};
    get data () {return this.#data} set data (value) {this.#data = value};
    get saida_almoco () {return this.#saida_almoco} set saida_almoco (value) {this.#saida_almoco = value};
    get retorno_almoco () {return this.#retorno_almoco} set retorno_almoco (value) {this.#retorno_almoco = value};
    get data_hoje () {return this.#data_hoje} set data_hoje (value) {this.#data_hoje = value};


    async cadastrar () {
        let sql = `insert into ponto (pon_id_profissional, pon_hora_entrada, pon_hora_saida, pon_nome_profissional, pon_saida_almoco, pon_retorno_almoco) values (?,?,?,?,?,?)`;
        let valores = [this.#id_profissional, this.#hora_entrada, this.#hora_saida, this.#nome_profissional, this.#saida_almoco, this.#retorno_almoco];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async verificarPontoBatido (id) {

        const data = new Date();
        const hoje = data.toISOString().split('T')[0];
        console.log(hoje)

        let where = `where pon_hora_entrada between '07:00' and '12:00' and pon_hora_saida between '12:00' and '18:00' and date (pon_data) = '${hoje}' and pon_id_profissional = '${id}'`;

        let sql = `select * from ponto ${where}`;

        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            return new PontoModel ( coluna['pon_id'],
                                        coluna['pon_id_profissional'],
                                        coluna['pon_hora_entrada'],
                                        coluna['pon_hora_saida'],
                                        coluna['pon_nome_profissional'],
                                        coluna['pon_data'],
                                        coluna['pon_saida_almoco'],
                                        coluna['pon_retorno_almoco']
        )
        }

        return null;

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
                                        coluna['pon_data'],
                                        coluna['pon_saida_almoco'],
                                        coluna['pon_retorno_almoco']
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
                                        coluna['pon_data'],
                                        coluna['pon_saida_almoco'],
                                        coluna['pon_retorno_almoco']
        ))
        }

        return lista;

    }

    async cadastrarEntrada () {
        let sql = `insert into ponto (pon_hora_entrada, pon_id_profissional, pon_nome_profissional) values (?,?,?)`;
        let valores = [this.#hora_entrada, this.#id_profissional, this.#nome_profissional];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async verificarEntrada (id) {
        const data = new Date();
        const hoje = data.toISOString().split('T')[0];

        let sql = `select pon_hora_entrada from ponto 
        where pon_hora_entrada between '07:00' and '12:00' 
        and date (pon_data) = '${hoje}' 
        and pon_id_profissional = ${id}`;

        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            return new PontoModel (     coluna['pon_id'],
                                        coluna['pon_id_profissional'],
                                        coluna['pon_hora_entrada'],
                                        coluna['pon_hora_saida'],
                                        coluna['pon_nome_profissional'],
                                        coluna['pon_data'],
                                        coluna['pon_saida_almoco'],
                                        coluna['pon_retorno_almoco']
        )
        }

        return null;
    }

    async cadastrarSaidaAlmoco () {
        let sql = ` update ponto set pon_id_profissional = ?,
                    pon_hora_entrada = ?,
                    pon_nome_profissional = ?,
                    pon_saida_almoco = ?
                    WHERE pon_id = (
                    SELECT sub.max_id
                    FROM (SELECT MAX(pon_id) AS max_id 
                    FROM ponto 
                    WHERE pon_id_profissional = ?) AS sub);
        `;

        let valores = [this.#id_profissional, this.#hora_entrada, this.#nome_profissional, this.#saida_almoco, this.#id_profissional];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async verificarSaidaAlmoco (id) {
        const data = new Date();
        const hoje = data.toISOString().split('T')[0];

        let sql = `select pon_saida_almoco from ponto 
        where pon_saida_almoco between '08:00' and '18:00' 
        and date (pon_data) = '${hoje}' 
        and pon_id_profissional = ${id}`;

        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            return new PontoModel (     coluna['pon_id'],
                                        coluna['pon_id_profissional'],
                                        coluna['pon_hora_entrada'],
                                        coluna['pon_hora_saida'],
                                        coluna['pon_nome_profissional'],
                                        coluna['pon_data'],
                                        coluna['pon_saida_almoco'],
                                        coluna['pon_retorno_almoco']
        )
        }

        return null;
        
    }

    async cadastrarRetornoAlmoco () {
        let sql = ` update ponto set pon_id_profissional = ?,
                    pon_hora_entrada = ?,
                    pon_nome_profissional = ?,
                    pon_saida_almoco = ?,
                    pon_retorno_almoco = ?
                    WHERE pon_id = (
                    SELECT sub.max_id
                    FROM (SELECT MAX(pon_id) AS max_id 
                    FROM ponto 
                    WHERE pon_id_profissional = ?) AS sub);
        `;

        let valores = [this.#id_profissional, this.#hora_entrada, this.#nome_profissional, this.#saida_almoco, this.#retorno_almoco ,this.#id_profissional];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async verificarRetornoAlmoco(id) {
        const data = new Date();
        const hoje = data.toISOString().split('T')[0];

        let sql = `select pon_retorno_almoco from ponto 
        where pon_retorno_almoco between '08:00' and '18:00' 
        and date (pon_data) = '${hoje}' 
        and pon_id_profissional = ${id}`;

        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            return new PontoModel (     coluna['pon_id'],
                                        coluna['pon_id_profissional'],
                                        coluna['pon_hora_entrada'],
                                        coluna['pon_hora_saida'],
                                        coluna['pon_nome_profissional'],
                                        coluna['pon_data'],
                                        coluna['pon_saida_almoco'],
                                        coluna['pon_retorno_almoco']
        )
        }

        return null;
    }

    async cadastrarSaida () {
        let sql = ` update ponto set pon_id_profissional = ?,
                    pon_hora_entrada = ?,
                    pon_nome_profissional = ?,
                    pon_saida_almoco = ?,
                    pon_retorno_almoco = ?,
                    pon_hora_saida = ?
                    WHERE pon_id = (
                    SELECT sub.max_id
                    FROM (SELECT MAX(pon_id) AS max_id 
                    FROM ponto 
                    WHERE pon_id_profissional = ?) AS sub);
        `;

        let valores = [this.#id_profissional, this.#hora_entrada, this.#nome_profissional, this.#saida_almoco, this.#retorno_almoco, this.#hora_saida, this.#id_profissional];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async verificarSaida(id) {
        const data = new Date();
        const hoje = data.toISOString().split('T')[0];

        let sql = `select pon_hora_saida from ponto 
        where pon_hora_saida between '08:00' and '18:00' 
        and date (pon_data) = '${hoje}' 
        and pon_id_profissional = ${id}`;

        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            return new PontoModel (     coluna['pon_id'],
                                        coluna['pon_id_profissional'],
                                        coluna['pon_hora_entrada'],
                                        coluna['pon_hora_saida'],
                                        coluna['pon_nome_profissional'],
                                        coluna['pon_data'],
                                        coluna['pon_saida_almoco'],
                                        coluna['pon_retorno_almoco']
        )
        }

        return null;
    }

    toJSON () {
        return {
            "id": this.#id,
            "id_profissional": this.#id_profissional,
            "hora_entrada": this.#hora_entrada,
            "hora_saida": this.#hora_saida,
            "nome_profissional": this.#nome_profissional,
            "data": this.#data,
            "saida_almoco": this.#saida_almoco,
            "retorno_almoco": this.#retorno_almoco
        }
    }
}


module.exports = PontoModel;