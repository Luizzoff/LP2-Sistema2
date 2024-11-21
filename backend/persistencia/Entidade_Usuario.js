import conectar from "./Conexao.js"
import Usuario from "../modelo/Usuario.js"

export default class Entidade_Usuario{
    constructor(){
        this.iniciaDataBase();
    }
    async iniciaDataBase(){
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS usuarios (
                    nome VARCHAR(100) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    senha VARCHAR(50) NOT NULL,
                    senha_confirmacao VARCHAR(50) NOT NULL,
                    perfil VARCHAR(9) NOT NULL,
                    CONSTRAINT pk_usuarios PRIMARY KEY(nome, email),
                    CONSTRAINT uk_nome UNIQUE (nome),
                    CONSTRAINT uk_email UNIQUE (email)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `
                INSERT INTO usuarios(nome, email, senha, senha_confirmacao, perfil)
                values(?,?,?,?,?)
            `;
            let parametros = [
                usuario.nome,
                usuario.email,
                usuario.senha,
                usuario.senha_confirmacao,
                usuario.perfil
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `DELETE FROM usuarios WHERE nome = ?`;
            let parametros = [usuario.nome];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async atualizar(usuario){
        if(usuario instanceof Usuario){
            const conexao = await conectar();
            const sql = `UPDATE usuarios SET senha=?, senha_confirmacao=?, perfil=?
                WHERE nome = ?
            `;
            let parametros = [
                usuario.senha,
                usuario.senha_confirmacao,
                usuario.perfil,
                usuario.nome
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        let sql = "SELECT * FROM usuarios";
        let parametros = [];
        if(termo){
            sql = ` WHERE nome = ?`;
            parametros = [termo];
        }
        const [dataBase, campos] = await conexao.execute(sql,parametros);
        await conexao.release();
        return dataBase;
    }

    async login(termo){
        const conexao = await conectar();
        const sql = `SELECT senha, perfil FROM usuarios WHERE nome = ?`;
        const parametros = [termo];
        const [dataBase, campos] = await conexao.execute(sql,parametros);
        await conexao.release();
        return dataBase ? dataBase[0] : null;
    }
}
