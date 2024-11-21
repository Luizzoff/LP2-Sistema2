import Categoria from "../modelo/Categoria.js";

export default class Controle_Categoria {
    gravar(req, res) 
    {
        res.type("application/json");
        if (req.method == 'POST' && req.is("application/json"))
        {
            const descricao  = req.body.descricao;

            if (descricao)
            {
                const categoria = new Categoria("",descricao);
                categoria.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Categoria adicionada com sucesso!",
                        "codigo": categoria.codigo
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao incluir categoria: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: informações invalidas!"
                });
            }
        } 
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é POST"
            });
        }
    }

    deletar(req, res)
    {
        res.type("application/json");
        if (req.method == 'DELETE')
        {
            const codigo = req.params.codigo;
            if (codigo && codigo > 0)
            {
                const categoria = new Categoria();
                categoria.codigo = codigo;
                categoria.deletar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Categoria excluído com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao excluir categoria: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: informações invalidas!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é DELETE"
            });
        }
    }

    atualizar(req, res)
    {
        res.type("application/json");
        if ((req.method == 'PUT' || req.method == 'PATCH') && req.is("application/json")){
            const descricao = req.body.descricao;
            const codigo = req.params.codigo;
            if (codigo && !isNaN(codigo) && codigo > 0 && descricao)
            {
                const categoria = new Categoria(codigo, descricao);
                categoria.atualizar()
                .then(()=>{
                    res.status(200).json({
                        "status":true,
                        "mensagem":"Categoria atualizada com sucesso!",
                    });
                })
                .catch((erro)=>{
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao atualizar o categoria: " + erro.message
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Erro: informações invalidas!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é PUT ou PATCH"
            });
        }    
    }

    consultar(req, res)
    {
        res.type("application/json");
        if (req.method=="GET")
        {
            let codigo = req.params.codigo;
            if (codigo==null || (!isNaN(codigo) && codigo > 0))
            {
                const categoria = new Categoria();
                categoria.consultar(codigo)
                .then((listaCategorias) =>{
                    res.status(200).json(listaCategorias);
                })
                .catch((erro) => {
                    res.status(500).json({
                        "status":false,
                        "mensagem":"Erro ao consultar categorias: " + erro.message    
                    });
                });
            }
            else {
                res.status(400).json({
                    "status":false,
                    "mensagem":"Consulta Invalida!, informe um codigo valido!"
                });
            }
        }
        else {
            res.status(400).json({
                "status":false,
                "mensagem":"Requisição inválida!, Metodo não é GET"
            });
        }    
    }
}