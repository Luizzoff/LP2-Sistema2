import conectar from "./Conexao.js"
import Fornecedor from "../modelo/Fornecedor.js"

export default class Entidade_Fornecedor {
    constructor(){
        this.iniciaDataBase();
    }
    async iniciaDataBase(){
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS fornecedores (
                    nome VARCHAR(100) NOT NULL,
                    cnpj VARCHAR(18) NOT NULL,
                    telefone VARCHAR(13) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    endereco VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_fornecedores PRIMARY KEY(cnpj)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `
                INSERT INTO fornecedores(nome, cnpj, telefone, email, endereco)
                values(?,?,?,?,?)
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.cnpj,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.endereco
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async excluir(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `DELETE FROM fornecedores WHERE cnpj = ?`;
            let parametros = [fornecedor.cnpj];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async atualizar(fornecedor){
        if(fornecedor instanceof Fornecedor){
            const conexao = await conectar();
            const sql = `
                UPDATE fornecedores SET nome=?, telefone=?, email=?, endereco=?
                WHERE cnpj = ?
            `;
            let parametros = [
                fornecedor.nome,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.endereco,
                fornecedor.cnpj
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        let sql = "SELECT * FROM fornecedores";
        let parametros = [];
        if(termo){
            sql += " WHERE cnpj = ?";
            parametros = [termo];
        }
        const [dataBase, campos] = await conexao.execute(sql, parametros);
        await conexao.release();

        let listaFornecedores = [];
        for (const linha of dataBase){
            const fornecedor = {
                nome: linha.nome,
                cnpj: linha.cnpj,
                telefone: linha.telefone,
                email: linha.email,
                endereco: linha.endereco
            };

            listaFornecedores.push(fornecedor);
        }
        return listaFornecedores;
    }
}
