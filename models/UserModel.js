const Database = require('../utils/database.js');

const db = new Database();

class UserModel {

    #id
    #login
    #senha
    #perfil_id
    #perfil_desc

    constructor (id,login,senha,perfil_id,perfil_desc) {
        this.#id=  id;
        this.#login = login;
        this.#senha = senha;
        this.#perfil_id = perfil_id
        this.#perfil_desc = perfil_desc
    }

    get id () {return this.#id}
    set id (value) {this.#id = value}

    get login () {return this.#login}
    set login (value) {this.#login = value}

    get senha () {return this.#senha}
    set senha (value) {this.#senha = value}

    get perfil_id () {return this.#perfil_id}
    set perfil_id (value) {this.#perfil_id = value}

    get perfil_desc () {return this.#perfil_desc}
    set perfil_desc (value) {this.#perfil_desc = value}


    async obter(id) {
        let sql = `select * from user_admin user 
        inner join perfil per on 
        user.per_id = per.per_id
        where user_id = ?`;
        let valores = [id];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new UserModel(   row[0]["user_id"],
                                    row[0]["user_login"],
                                    row[0]["user_senha"],
                                    row[0]['per_id'],
                                    row[0]['per_desc']
            )
        }

        return null;

    }

    async obterPorPerfil(perfilId) {
        const sql = "SELECT * FROM perfil WHERE per_id = ?";
        const [results] = await db.ExecutaComando(sql, [perfilId]);
        return results[0];
    }

    async validarUsuario(login, senha) {
        let sql = "select * from user_admin where user_login = ? and user_senha = ?";
        let valores = [login, senha];

        let row = await db.ExecutaComando(sql, valores);

        if(row.length > 0) {
            return new UserModel(row[0]["user_id"],
                                    row[0]["user_login"],
                                    row[0]["user_senha"],
                                    row[0]["per_id"]
            )
        }

        return null;

    }

    async listarUsers () {
        let sql = `select * from user_admin user
        inner join perfil per on user.per_id = per.per_id
        `;
        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new UserModel(coluna['user_id'],coluna['user_login'],coluna['user_senha'],coluna['per_desc']));
        }
        return lista;
    }

    async listaUsersSearch (texto, tipoBusca) {
        let whereFiltro = "";

        if(texto == 'Visitante' || texto == 'visitante')
            texto = 2;
        if(texto == 'Administrador' || texto == 'administrador')
            texto == 1;
        if(texto == 'Sistema' || texto == 'sistema')
            texto == 1;

        if(texto != "" || texto == 1 || texto == 2 || texto == 3) {
            if(tipoBusca == 'user') {
                whereFiltro = `where user_login like '%${texto}%'`
            }
            if (tipoBusca == 'perfilUser') {
                whereFiltro = `where per_desc = '${texto}'`
            }
        }

        if(texto == 1 || texto == 2 || texto == 3) {
            let sql = `select * from user_admin us
            inner join perfil p on p.per_id = us.per_id ${whereFiltro}`
            let lista = [];
            let colunas = await db.ExecutaComando(sql);
            for(let i=0;i<colunas.length;i++) {
                let coluna = colunas[i];
                lista.push(new UserModel(coluna['user_id'],coluna['user_login'],coluna['user_senha'],coluna['per_desc']));
            }
            return lista;
        }
        else {
            let sql = `select * from user_admin user
            inner join perfil per on user.per_id = per.per_id ${whereFiltro}`
            let lista = [];
            let colunas = await db.ExecutaComando(sql);
            for(let i=0;i<colunas.length;i++) {
                let coluna = colunas[i];
                lista.push(new UserModel(coluna['user_id'],coluna['user_login'],coluna['user_senha'],coluna['per_desc']));
            }
            return lista;
        }    
    }

    async ListarSexo () {
        let sql = `select * from sexo`;
        let lista = [];
        let colunas = await db.ExecutaComando(sql);
        for(let i=0;i<colunas.length;i++) {
            let coluna = colunas[i];
            lista.push(new SexoModel(coluna['sexo_id'],coluna['sexo_nome']));
        }
        return lista;
    }

    async excluirUsuario (id) {
        let sql = `delete from user_admin where user_id = ?`;
        let valores = [id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    async editar() {
        let sql = `update user_admin set    user_login = ?,
                                            user_senha = ?,
                                            per_id = ?
                                            where user_id = ? `;
        let valores = [this.#login, this.#senha, this.#perfil_id, this.#id];
        let resultado = await db.ExecutaComandoNonQuery(sql,valores);
        return resultado;
    }

    toJSON () {
        return {
            "id": this.id,
            "login": this.login,
            "senha": this.senha,
            "perfil_id": this.perfil_id,
            "perfil_desc": this.perfil_desc
        }
    }

}

module.exports = UserModel