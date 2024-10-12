const Database = require('../utils/database');
const db = new Database();

class ConsultaModel {

    #id
    #nome_id
    #telefone
    #email
    #servico_id
    #data
    #hora
    #obs

    constructor(id,nome_id,telefone,email,servico_id,data,hora,obs) {
        this.#id = id;
        this.#nome_id = nome_id;
        this.#telefone = telefone;
        this.#email = email;
        this.#servico_id = servico_id;
        this.#data = data;
        this.#hora = hora;
        this.#obs = obs;
    }

    get id () {
        return this.#id;
    }
    set id (value) {
        this.#id = value;
    }

    get nome_id() {
        return this.#nome_id;
    }
    set nome_id(value) {
        this.#nome_id = value;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(value) {
        this.#telefone = value;
    }

    get email() {
        return this.#email;
    }
    set email(value) {
        this.#email = value;
    }

    get servico_id() {
        return this.#servico_id;
    }
    set servico_id(value) {
        this.#servico_id = value;
    }

    get data() {
        return this.#data;
    }
    set data(value) {
        this.#data = value;
    }

    get hora() {
        return this.#hora;
    }
    set hora(value) {
        this.#hora = value;
    }

    get obs() {
        return this.#obs;
    }
    set obs(value) {
        this.#obs = value;
    }

    async cadastrarConsulta () {
        let sql = `insert into consulta (fk_pac_id_paciente,con_telefone,con_email,fk_serv_id,con_data,con_hora,con_obs) values (?,?,?,?,?,?,?)`;
        let valores = [this.#nome_id, this.#telefone, this.#email, this.#servico_id, this.#data, this.#hora, this.#obs];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async listarConsulta () {
        let sql = `select *  from consulta con
        inner join servico_consulta sv on con.fk_serv_id = sv.serv_id
        inner join paciente pac on con.fk_pac_id_paciente = pac.pac_id_paciente
        `;

        let resultado = await db.ExecutaComando(sql);
        let listaConsulta = [];
        for(let registro of resultado) {
            listaConsulta.push(new ConsultaModel (
                registro['con_id'],
                registro['pac_nome'],
                registro['con_telefone'],
                registro['con_email'],
                registro['serv_nome'],
                registro['con_data'],
                registro['con_hora'],
                registro['con_obs']
            ));
        }
        return listaConsulta;
    }

    async verificarConsultaMesmoDiaMesmoHorario (data,hora) {
        let sql = ` select con_data, con_hora from consulta
                    where con_data = ? and con_hora = ?`;

        let valores = [data,hora];
        let resultado = await db.ExecutaComando(sql,valores);
        if(resultado.length > 0) {
            return resultado[0];
        }
        else
            return null;
    }

    async excluirConsulta (id) {
        let sql = `delete from consulta where con_id = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async obter (id) {
        let sql = `select * from consulta where con_id = ?`;
        let valores = [id];
        let row = await db.ExecutaComando(sql,valores);

        if(row.length > 0) {
            return new ConsultaModel(
                row[0]['con_id'],
                row[0]['nome_id'],
                row[0]['con_telefone'],
                row[0]['con_email'],
                row[0]['fk_serv_id'],
                row[0]['con_data'],
                row[0]['con_hora'],
                row[0]['con_obs']
            )
        }
        return null;
    }

    async editarConsulta () {
        let sql = `update consulta set  fk_pac_id_paciente = ?,
                                        con_telefone = ?,
                                        con_email = ?,
                                        fk_serv_id = ?,
                                        con_data = ?,
                                        con_hora = ?,
                                        con_obs = ?
                                        where con_id = ? `;
        let valores = [this.#nome_id, this.#telefone, this.#email, this.#servico_id, this.#data, this.#hora, this.#obs, this.#id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

}

module.exports = ConsultaModel;