const Database = require('../utils/database');
const db = new Database();

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

}

module.exports = AtestadoModel;