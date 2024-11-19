const Database = require('../utils/database');
const db = new Database();

class PacienteModel {

    #id
    #nome 
    #telefone
    #email
    #nascimento
    #cpf
    #endereco
    #bairro
    #sexo_id
    #cidade
    #estado_id
    #cep
    #pacienteImagem

    constructor (id, nome, telefone, email, nascimento, cpf, endereco, bairro, sexo_id, cidade, estado_id, cep, pacienteImagem) {
        this.#id = id;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
        this.#nascimento = nascimento;
        this.#cpf = cpf;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#sexo_id = sexo_id;
        this.#cidade = cidade;
        this.#estado_id = estado_id;
        this.#cep = cep;
        this.#pacienteImagem = pacienteImagem;
    }

    get id () {return this.#id;}
    set id (value) {this.#id = value;}

    get nome () {return this.#nome;}
    set nome (value) {this.#nome = value;}

    get telefone() { return this.#telefone; }
    set telefone(value) { this.#telefone = value; }

    get email() { return this.#email; }
    set email(value) { this.#email = value; }

    get nascimento() { return this.#nascimento; }
    set nascimento(value) { this.#nascimento = value; }

    get cpf() { return this.#cpf; }
    set cpf(value) { this.#cpf = value; }

    get endereco() { return this.#endereco; }
    set endereco(value) { this.#endereco = value; }

    get bairro() { return this.#bairro; }
    set bairro(value) { this.#bairro = value; }

    get sexo_id() { return this.#sexo_id; }
    set sexo_id(value) { this.#sexo_id = value; }

    get cidade() { return this.#cidade; }
    set cidade(value) { this.#cidade = value; }

    get estado_id() { return this.#estado_id; }
    set estado_id(value) { this.#estado_id = value; }

    get cep() { return this.#cep; }
    set cep(value) { this.#cep = value; }

    get pacienteImagem() { return this.#pacienteImagem; }
    set pacienteImagem(value) { this.#pacienteImagem = value; }

    async cadastrarPaciente () {
        let sql = `insert into paciente (pac_nome,pac_telefone,pac_email,pac_data_nascimento,pac_cpf,pac_endereco,pac_bairro,fk_sexo_id,pac_cidade,fk_est_id,pac_cep, pac_imagem) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
        let valores = [this.#nome, this.#telefone, this.#email, this.#nascimento, this.#cpf, this.#endereco, this.#bairro, this.#sexo_id, this.#cidade, this.#estado_id, this.#cep, this.#pacienteImagem];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async listarPaciente () {
        let sql = `select * from paciente pac
        inner join sexo sex on pac.fk_sexo_id = sex.sexo_id
        inner join estado est on pac.fk_est_id = est.est_id
        `;
        let resultado = await db.ExecutaComando(sql);
        let listaPaciente = [];
        for(let registro of resultado) {
            listaPaciente.push(new PacienteModel (
                registro['pac_id_paciente'],
                registro['pac_nome'],
                registro['pac_telefone'],
                registro['pac_email'],
                registro['pac_data_nascimento'],
                registro['pac_cpf'],
                registro['pac_endereco'],
                registro['pac_bairro'],
                registro['sexo_nome'],
                registro['pac_cidade'],
                registro['est_nome'],
                registro['pac_cep']
            ));
        }
        return listaPaciente;
        
    }
    
    async excluirPaciente (id) {
        let sql = `delete from paciente where pac_id_paciente = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async obter (id) {
        let sql = `select * from paciente where pac_id_paciente = ?`;
        let valores = [id];
        let row = await db.ExecutaComando(sql,valores);

        if(row.length > 0) {
            return new PacienteModel(
                row[0]['pac_id_paciente'],
                row[0]['pac_nome'],
                row[0]['pac_telefone'],
                row[0]['pac_email'],
                row[0]['pac_data_nascimento'],
                row[0]['pac_cpf'],
                row[0]['pac_endereco'],
                row[0]['pac_bairro'],
                row[0]['fk_sexo_id'],
                row[0]['pac_cidade'],
                row[0]['fk_est_id'],
                row[0]['pac_cep']
            )
        }
        return null;
    }

    async editar () {
        let sql = `update paciente set  pac_nome = ?,
                                        pac_telefone = ?,
                                        pac_email = ?,
                                        pac_data_nascimento = ?,
                                        pac_cpf = ?,
                                        pac_endereco = ?,
                                        pac_bairro = ?,
                                        fk_sexo_id = ?,
                                        pac_cidade = ?,
                                        fk_est_id = ?,
                                        pac_cep = ?
                                        where pac_id_paciente = ?`;
        let valores = [this.#nome, this.#telefone, this.#email, this.#nascimento, this.#cpf, this.#endereco, this.#bairro, this.#sexo_id, this.#cidade, this.#estado_id, this.#cep, this.#id];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);

        return resultado;
    }

    async puxarDados(id) {
        let sql = `SELECT pac_telefone, pac_email FROM paciente WHERE pac_id_paciente = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComando(sql, valores);
        return resultado;
    }

    async verificarCpfCadastrado (cpf) {
        let sql = `select pac_cpf from paciente where pac_cpf = ?`
        let valores = [cpf];
        let resultado = await db.ExecutaComando(sql,valores);
        if(resultado.length > 0)
            return resultado[0];
        else
            return null;
    }
    
}

module.exports = PacienteModel;