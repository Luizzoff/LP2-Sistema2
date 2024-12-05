import conectar from "./Conexao.js"
import Produto from "../modelo/Produto.js"
import { format } from 'date-fns';

export default class Entidade_Produto {
    constructor() {
        this.init();
    }
    async init() {
        try {
            const conexao = await conectar();
            const sql = `
                CREATE TABLE IF NOT EXISTS produto (
                    pro_codigo INT NOT NULL AUTO_INCREMENT,
                    pro_descricao VARCHAR(200) NOT NULL,
                    pro_precoCusto DECIMAL(10,2) NOT NULL,
                    pro_precoVenda DECIMAL(10,2) NOT NULL,
                    pro_qtdEstoque INT NOT NULL DEFAULT 0,
                    pro_urlImagem VARCHAR(500) NOT NULL,
                    pro_dataValidade DATE NOT NULL,
                    cat_codigo INT NOT NULL,
                    for_cnpj VARCHAR(18) NOT NULL,
                    CONSTRAINT pk_produtos PRIMARY KEY (pro_codigo),
                    CONSTRAINT fk_produto_categoria FOREIGN KEY (cat_codigo) REFERENCES categoria (cat_codigo),
                    CONSTRAINT fk_produto_fornecedores FOREIGN KEY (for_cnpj) REFERENCES fornecedores (cnpj)
                );
            `;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }

    async gravar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `
                INSERT INTO produto (pro_descricao, pro_precoCusto, pro_precoVenda, pro_qtdEstoque, pro_urlImagem, pro_dataValidade, cat_codigo, for_cnpj)
                values(?,?,?,?,?,?,?,?)
            `;
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.categoria.codigo,
                produto.fornecedor.cnpj
            ];
            const resultado = await conexao.execute(sql, parametros);
            produto.codigo = resultado[0].insertId;
            await conexao.release();
        }
    }

    async deletar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `DELETE FROM produto WHERE pro_codigo = ?`;
            let parametros = [produto.codigo];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async atualizar(produto) {
        if (produto instanceof Produto) {
            const conexao = await conectar();
            const sql = `
                UPDATE produto SET pro_descricao=?, pro_precoCusto=?, pro_precoVenda=?, pro_qtdEstoque=?, pro_urlImagem=?, pro_dataValidade=?, cat_codigo=?, for_cnpj=? 
                WHERE pro_codigo = ?
            `;
            let parametros = [
                produto.descricao,
                produto.precoCusto,
                produto.precoVenda,
                produto.qtdEstoque,
                produto.urlImagem,
                produto.dataValidade,
                produto.categoria.codigo,
                produto.fornecedor.cnpj,
                produto.codigo
            ];
            await conexao.execute(sql, parametros);
            await conexao.release();
        }
    }

    async consultar(termo) {
        const conexao = await conectar();
        let sql = `
            SELECT * 
            FROM produto p 
            INNER JOIN categoria c ON p.cat_codigo = c.cat_codigo
            INNER JOIN fornecedores f ON p.for_cnpj = f.cnpj;
        `;
        let parametros = [];

        if (!isNaN(parseInt(termo))) {
            sql += " WHERE pro_codigo = ?";
            parametros = [termo];
        }

        const [dataBase, campos] = await conexao.execute(sql, parametros);
        await conexao.release();
        let listaProdutos = [];
        for (const linha of dataBase) {
            const produto = {
                codigo: linha.pro_codigo,
                descricao: linha.pro_descricao,
                precoCusto: linha.pro_precoCusto,
                precoVenda: linha.pro_precoVenda,
                qtdEstoque: linha.pro_qtdEstoque,
                urlImagem: linha.pro_urlImagem,
                dataValidade: format(linha.pro_dataValidade, 'yyyy-MM-dd'),
                categoria: {
                    codigo: linha.cat_codigo,
                    descricao: linha.cat_descricao
                },
                fornecedor: {
                    cnpj: linha.cnpj,
                    nome: linha.nome
                }
            };
            listaProdutos.push(produto);
        }
        return listaProdutos;
    }
}