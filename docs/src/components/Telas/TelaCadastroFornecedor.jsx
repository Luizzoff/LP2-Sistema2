import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormCadastroFornecedor from "./Formularios/FormCadastroFornecedor";
import TabelaFornecedores from "./Tabelas/TabelaFornecedores";

export default function TelaCadastroFornecedor(props) {
    const [exibirFornecedores, setExibirFornecedores] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [fornecedorSelecionado, setFornecedorSelecionado] = useState({
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
        endereco: ""
    });

    return (
        <Pagina>
            <Alert className="mt-02 mb-02 success text-center" variant="dark">
                <h2>
                    Cadastro de Fornecedor
                </h2>
            </Alert>
            {
                exibirFornecedores ?
                    <TabelaFornecedores
                        setExibirFornecedores={setExibirFornecedores}
                        setFornecedorSelecionado={setFornecedorSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                    :
                    <FormCadastroFornecedor
                        setExibirFornecedores={setExibirFornecedores}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        fornecedorSelecionado={fornecedorSelecionado}
                        setFornecedorSelecionado={setFornecedorSelecionado}
                    />
            }
        </Pagina>
    );
}