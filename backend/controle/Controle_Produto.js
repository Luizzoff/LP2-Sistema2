import Categoria from "../modelo/Categoria.js";
import Fornecedor from "../modelo/Fornecedor.js";
import Produto from "../modelo/Produto.js";

export default class Controle_Produto {
    gravar(req, res) {
        res.type("application/json");
        if (req.method == 'POST' && req.is("application/json")) {
            const descricao = req.body.descricao;
            const precoCusto = req.body.precoCusto;
            const precoVenda = req.body.precoVenda;
            const qtdEstoque = req.body.qtdEstoque;
            const urlImagem = req.body.urlImagem;
            const dataValidade = req.body.dataValidade;
            const categoria = new Categoria(req.body.categoria.codigo, req.body.categoria.descricao);
            const fornecedor = new Fornecedor(req.body.fornecedor.nome, req.body.fornecedor.cnpj);
            categoria.consultar(categoria.codigo)
                .then((categ) => {
                    if (categ === "") {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "A categoria não existe" + erro.message
                        });
                    }
                    else {
                        fornecedor.consultar(fornecedor.cnpj)
                            .then((forn) => {
                                if (forn === "") {
                                    res.status(500).json({
                                        "status": false,
                                        "mensagem": "O fornecedor não existe" + erro.message
                                    });
                                }
                                else {
                                    if (descricao &&
                                        precoCusto && !isNaN(parseInt(precoCusto)) && precoCusto > 0 &&
                                        precoVenda && !isNaN(parseInt(precoVenda)) && precoVenda > 0 &&
                                        qtdEstoque && !isNaN(parseInt(qtdEstoque)) && qtdEstoque > 0 &&
                                        urlImagem &&
                                        dataValidade) {
                                        const produto = new Produto(0, descricao, precoCusto, precoVenda, qtdEstoque, urlImagem, dataValidade, categoria, fornecedor);
                                        produto.gravar()
                                            .then(() => {
                                                res.status(200).json({
                                                    "status": true,
                                                    "mensagem": "Produto adicionado com sucesso!",
                                                    "codigo": produto.codigo
                                                });
                                            })
                                            .catch((erro) => {
                                                res.status(500).json({
                                                    "status": false,
                                                    "mensagem": "Erro ao incluir produto: " + erro.message
                                                });
                                            });
                                    }
                                    else {
                                        res.status(400).json({
                                            "status": false,
                                            "mensagem": "Erro: informações invalidas!"
                                        });
                                    }
                                }
                            })
                            .catch((erro) => {
                                res.status(500).json({
                                    "status": false,
                                    "mensagem": "Erro ao buscar fornecedor: " + erro.message
                                });
                            });
                    }
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao buscar categoria: " + erro.message
                    });
                });
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!, Metodo não é POST"
            });
        }
    }

    deletar(req, res) {
        res.type("application/json");
        if (req.method == 'DELETE') {
            const codigo = req.params.codigo;
            if (codigo && codigo > 0) {
                const produto = new Produto();
                produto.codigo = codigo;
                produto.deletar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Produto excluído com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir produto: " + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Erro: informações invalidas!"
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!, Metodo não é DELETE"
            });
        }
    }

    atualizar(req, res) {
        res.type("application/json");
        if ((req.method == 'PUT' || req.method == 'PATCH') && req.is("application/json")) {
            const codigo = req.params.codigo;
            const descricao = req.body.descricao;
            const precoCusto = req.body.precoCusto;
            const precoVenda = req.body.precoVenda;
            const qtdEstoque = req.body.qtdEstoque;
            const urlImagem = req.body.urlImagem;
            const dataValidade = req.body.dataValidade;
            const categoria = new Categoria(req.body.categoria.codigo);
            const fornecedor = new Fornecedor("", req.body.fornecedor.cnpj);
            if (codigo && !isNaN(parseInt(codigo)) && codigo > 0 &&
                descricao &&
                precoCusto && !isNaN(parseInt(precoCusto)) && precoCusto > 0 &&
                precoVenda && !isNaN(parseInt(precoVenda)) && precoVenda > 0 &&
                qtdEstoque && !isNaN(parseInt(qtdEstoque)) && qtdEstoque > 0 &&
                urlImagem &&
                dataValidade) {
                const produto = new Produto(codigo, descricao, precoCusto, precoVenda, qtdEstoque, urlImagem, dataValidade, categoria, fornecedor);
                produto.atualizar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Produto atualizado com sucesso!",
                        });
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o produto: " + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Erro: informações invalidas!"
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!, Metodo não é PUT ou PATCH"
            });
        }
    }

    consultar(req, res) {
        res.type("application/json");
        if (req.method == "GET") {
            const codigo = req.params.codigo;
            if (codigo == null || (!isNaN(codigo) && codigo > 0)) {
                const produto = new Produto();
                produto.consultar(codigo)
                    .then((listaProdutos) => {
                        res.status(200).json(listaProdutos);
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao consultar produtos: " + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Consulta Invalida!, informe um codigo valido!"
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!, Metodo não é GET"
            });
        }
    }
}