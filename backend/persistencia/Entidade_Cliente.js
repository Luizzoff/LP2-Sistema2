import conectar from "./Conexao.js"
import Cliente from "../modelo/Cliente.js"
import { format } from 'date-fns';

export default class Entidade_Cliente {
    constructor(){
        this.iniciaDataBase();
    }
    async iniciaDataBase(){
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS cliente (
                    nome VARCHAR(100) NOT NULL,
                    cpf VARCHAR(14) NOT NULL,
                    genero VARCHAR(16) NOT NULL,
                    dataNascimento DATE NOT NULL,
                    telefone VARCHAR(14) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    endereco VARCHAR(200) NOT NULL,
                    CONSTRAINT pk_clientes PRIMARY KEY(cpf)
                )
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch(e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(cliente){
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `
                INSERT INTO cliente(nome, cpf, genero, dataNascimento, telefone, email, endereco)
                values(?,?,?,?,?,?,?)
            `;
            
            let parametros = [
                cliente.nome,
                cliente.cpf,
                cliente.genero,
                cliente.dataNascimento,
                cliente.telefone,
                cliente.email,
                cliente.endereco
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async excluir(cliente){
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE cpf = ?`;
            let parametros = [cliente.cpf];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async atualizar(cliente){
        if(cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `
                UPDATE cliente SET nome=?, genero=?, dataNascimento=?, telefone=?, email=?, endereco=?
                WHERE cpf = ?
            `;
            let parametros = [
                cliente.nome,
                cliente.genero,
                cliente.dataNascimento,
                cliente.telefone,
                cliente.email,
                cliente.endereco,
                cliente.cpf
            ];
            await conexao.execute(sql,parametros);
            await conexao.release();
        }
    }

    async consultar(termo){
        const conexao = await conectar();
        let sql = `SELECT * FROM cliente`;
        let parametros = [];
        if(termo){
            sql + "WHERE cpf = ?";
            parametros = [termo];
        }
        const [dataBase, campos] = await conexao.execute(sql,parametros);
        await conexao.release();

        let listaClientes = [];
        for (const linha of dataBase){
            const cliente = {
                nome: linha.nome,
                cpf: linha.cpf,
                genero: linha.genero,
                dataNascimento: format(linha.dataNascimento, 'yyyy-MM-dd'),
                telefone: linha.telefone,
                email: linha.email,
                endereco: linha.endereco,
            };

            listaClientes.push(cliente);
        }
        return listaClientes;
    }
}
