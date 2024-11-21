import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormCadastroProduto from "./Formularios/FormCadastroProduto";
import TabelaProdutos from "./Tabelas/TabelaProdutos";


export default function TelaCadastroProduto(props) {
    const [exibirProdutos, setExibirProdutos] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState({
        codigo: "",
        dataValidade: "",
        descricao: "",
        precoCusto: "",
        precoVenda: "",
        qtdEstoque: "",
        urlImagem: "",
		categoria: {
			codigo: "",
			descricao: ""
		},
		fornecedor: {
			cnpj: "",
			nome: ""
		}
    });

    return (
        <Pagina>
            <Alert className="mt-02 mb-02 success text-center" variant="dark">
                <h2>
                    Cadastro de Produto
                </h2>
            </Alert>
            {
                exibirProdutos ?
                    <TabelaProdutos
                        setExibirProdutos={setExibirProdutos}
                        setProdutoSelecionado={setProdutoSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                    :
                    <FormCadastroProduto
                        setExibirProdutos={setExibirProdutos}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        produtoSelecionado={produtoSelecionado}
                        setProdutoSelecionado={setProdutoSelecionado}
                    />
            }
        </Pagina>
    );
}