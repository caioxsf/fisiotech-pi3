const Database = require('../utils/database');
const db = new Database();
const fs = require('fs');
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
        order by pac.pac_nome asc
        `;
        let resultado = await db.ExecutaComando(sql);
        let listaPaciente = [];

        if(resultado.length > 0)

        for(let i=0;i<resultado.length;i++) {

            var registro = resultado[i];

            let imagem = "/img/paciente/fotosemperfil.png";
            if(registro["pac_imagem"] != null && fs.existsSync(global.CAMINHO_IMG_REAL + global.CAMINHO_IMG_NAV_PACIENTE + registro["pac_imagem"])){
                imagem = global.CAMINHO_IMG_NAV_PACIENTE + registro["pac_imagem"]
            }

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
                registro['pac_cep'],
                imagem
            ));
        }
        return listaPaciente;
        
    }

    async listarPacienteSearch (texto,tipoBusca) {
        let whereFiltro = "";
        if(texto) {
            if(tipoBusca == 'nome') {
                whereFiltro = `where pac.pac_nome like '%${texto}%' order by  pac.pac_nome asc`
            } else if (tipoBusca == 'cpf') {
                whereFiltro = `where pac.pac_cpf ='${texto}'`
            }
                
        }

        let sql = `select * from paciente pac
        inner join sexo sex on pac.fk_sexo_id = sex.sexo_id
        inner join estado est on pac.fk_est_id = est.est_id
        ${whereFiltro}
        `;

        let resultado = await db.ExecutaComando(sql);
        let listaPaciente = [];
        if(resultado.length > 0)

        for(let i=0;i<resultado.length;i++) {

            var registro = resultado[i];

            let imagem = "/img/paciente/fotosemperfil.png";
            if(registro["pac_imagem"] != null && fs.existsSync(global.CAMINHO_IMG_REAL + global.CAMINHO_IMG_NAV_PACIENTE + registro["pac_imagem"])){
                imagem = global.CAMINHO_IMG_NAV_PACIENTE + registro["pac_imagem"]
            }

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
                registro['pac_cep'],
                imagem
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
        let resultado = await db.ExecutaComando(sql,valores);

        if(resultado.length > 0)

        for(let i=0;i<resultado.length;i++) {

            var registro = resultado[i];

            let imagem = "/img/paciente/fotosemperfil.png";
            if(registro["pac_imagem"] != null && fs.existsSync(global.CAMINHO_IMG_REAL + global.CAMINHO_IMG_NAV_PACIENTE + registro["pac_imagem"])){
                imagem = global.CAMINHO_IMG_NAV_PACIENTE + registro["pac_imagem"]
            }

            return new PacienteModel (
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
                registro['pac_cep'],
                imagem
            );
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
                                        pac_cep = ?,
                                        pac_imagem = ?

                                        where pac_id_paciente = ?`;
        let valores = [this.#nome, this.#telefone, this.#email, this.#nascimento, this.#cpf, this.#endereco, this.#bairro, this.#sexo_id, this.#cidade, this.#estado_id, this.#cep, this.#pacienteImagem, this.#id];

        let resultado = await db.ExecutaComandoNonQuery(sql,valores);

        return resultado;
    }

    async editarSemImagem () {
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

    toJSON() {
        return {
        "id": this.#id,
        "nome": this.#nome,
        "telefone": this.#telefone,
        "email": this.#email,
        "nascimento": this.#nascimento,
        "cpf": this.#cpf,
        "endereco": this.#endereco,
        "bairro": this.#bairro,
        "sexo_id": this.#sexo_id,
        "cidade": this.#cidade,
        "estado_id": this.#estado_id,
        "cep": this.#cep,
        "pacienteImagem": this.#pacienteImagem
        };
    }
    
    
}

module.exports = PacienteModel;