const Database = require('../utils/database');
const db = new Database();
const fs = require('fs');
class AtestadoModel {

    #id
    #nome_medico
    #especialidade_medica
    #data_inicio
    #data_termino
    #foto_atestado

    constructor (id,nome_medico,especialidade_medica,data_inicio,data_termino,foto_atestado) {
        this.#id = id;
        this.#nome_medico = nome_medico;
        this.#especialidade_medica = especialidade_medica;
        this.#data_inicio = data_inicio;
        this.#data_termino = data_termino;
        this.#foto_atestado = foto_atestado;
    }

    get id () {return this.#id} set id (value) {return this.#id = value}
    get nome_medico () {return this.#nome_medico} set nome_medico (value) {return this.#nome_medico = value}
    get especialidade_medica () {return this.#especialidade_medica} set especialidade_medica (value) {return this.#especialidade_medica = value}
    get data_inicio () {return this.#data_inicio} set data_inicio (value) {return this.#data_inicio = value}
    get data_termino () {return this.#data_termino} set data_termino (value) {return this.#data_termino = value}
    get foto_atestado () {return this.#foto_atestado} set foto_atestado (value) {return this.#foto_atestado = value}

    async cadastrar () {
        let sql = `insert into atestado (ate_nome_medico, ate_esp_medica, ate_data_inicio, ate_data_termino, ate_foto_atestado) values (?,?,?,?,?)`;
        let valores = [this.#nome_medico, this.#especialidade_medica, this.#data_inicio, this.#data_termino, this.#foto_atestado];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);

        return resultado;
    }

    async atualizar () {
        let sql = `update atestado set ate_nome_medico = ?, ate_esp_medica = ?, ate_data_inicio = ?, ate_data_termino = ?, ate_foto_atestado = ? where ate_id = ?`;
        let valores = [this.#nome_medico, this.#especialidade_medica, this.#data_inicio, this.#data_termino, this.#foto_atestado, this.#id];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);

        return resultado;
    }

    async atualizarSemImagem () {
        let sql = `update atestado set ate_nome_medico = ?, ate_esp_medica = ?, ate_data_inicio = ?, ate_data_termino = ? where ate_id = ?`;
        let valores = [this.#nome_medico, this.#especialidade_medica, this.#data_inicio, this.#data_termino, this.#id];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);

        return resultado;
    }

    async listarAtestados () {
        let sql = `select * from atestado ate
        inner join servico_consulta sc on ate.ate_esp_medica = sc.serv_id
        `

        let resultado = await db.ExecutaComando(sql);
        let listaAtestado = [];

        if(resultado.length > 0) {
            for (let i=0;i<resultado.length;i++) {

                var registro = resultado[i];

                let imagem = "/img/paciente/fotosemperfil.png";
                if(registro["ate_foto_atestado"] != null && fs.existsSync(global.CAMINHO_IMG_REAL + global.CAMINHO_IMG_NAV_ATESTADO + registro["ate_foto_atestado"])){
                    imagem = global.CAMINHO_IMG_NAV_ATESTADO + registro["ate_foto_atestado"]
                }

                listaAtestado.push(new AtestadoModel (
                    registro['ate_id'],
                    registro['ate_nome_medico'],
                    registro['serv_nome'],
                    registro['ate_data_inicio'],
                    registro['ate_data_termino'],
                    imagem
                ));
            }
        }

        return listaAtestado;
    }

    async listaAtestadoSearch (texto, tipoBusca, inicio, fim) {
        let whereFiltro = "";
        if(texto || inicio) {
            if(tipoBusca == 'nome') {
                whereFiltro = `where ate.ate_nome_medico like '%${texto}%' order by ate.ate_nome_medico asc`
            } else if (tipoBusca == 'data') {
                whereFiltro = `where ate.ate_data_inicio between '${inicio}' and '${fim}' order by ate.ate_data_inicio asc`
            }
                
        }


        let sql = `select * from atestado ate
        inner join servico_consulta sc on ate.ate_esp_medica = sc.serv_id
        ${whereFiltro}
        `

        let resultado = await db.ExecutaComando(sql);
        let listaAtestado = [];

        if(resultado.length > 0) {
            for (let i=0;i<resultado.length;i++) {

                var registro = resultado[i];

                let imagem = "/img/paciente/fotosemperfil.png";
                if(registro["ate_foto_atestado"] != null && fs.existsSync(global.CAMINHO_IMG_REAL + global.CAMINHO_IMG_NAV_ATESTADO + registro["ate_foto_atestado"])){
                    imagem = global.CAMINHO_IMG_NAV_ATESTADO + registro["ate_foto_atestado"]
                }

                listaAtestado.push(new AtestadoModel (
                    registro['ate_id'],
                    registro['ate_nome_medico'],
                    registro['serv_nome'],
                    registro['ate_data_inicio'],
                    registro['ate_data_termino'],
                    imagem
                ));
            }
        }

        return listaAtestado;
    }

    async excluirAtestado (id) {
        let sql = `delete from atestado where ate_id = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async obterAtestado (id) {
        let sql = `select * from atestado ate
        inner join servico_consulta sc on ate.ate_esp_medica = sc.serv_id where ate_id = ?
        `
        let valores = [id]

        let resultado = await db.ExecutaComando(sql,valores);
        if(resultado.length > 0) {
            for (let i=0;i<resultado.length;i++) {

                var registro = resultado[i];

                let imagem = "/img/paciente/fotosemperfil.png";
                if(registro["ate_foto_atestado"] != null && fs.existsSync(global.CAMINHO_IMG_REAL + global.CAMINHO_IMG_NAV_ATESTADO + registro["ate_foto_atestado"])){
                    imagem = global.CAMINHO_IMG_NAV_ATESTADO + registro["ate_foto_atestado"]
                }

                return new AtestadoModel (
                    registro['ate_id'],
                    registro['ate_nome_medico'],
                    registro['serv_nome'],
                    registro['ate_data_inicio'],
                    registro['ate_data_termino'],
                    imagem
                );
            }
        }

        return null;
    }

    toJSON() {
        return {
            "id": this.id,
            "nome_medico": this.nome_medico,
            "especialidade_medica": this.especialidade_medica,
            "data_inicio": this.data_inicio,
            "data_termino": this.data_termino,
            "foto_atestado": this.foto_atestado
        };
    }

}

module.exports = AtestadoModel;