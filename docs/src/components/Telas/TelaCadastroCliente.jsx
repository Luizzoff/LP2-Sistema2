import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormCadastroCliente from "./Formularios/FormCadastroCliente";
import TabelaClientes from "./Tabelas/TabelaClientes";

export default function TelaCadastroCliente(props) {
    const [exibirClientes, setExibirClientes] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [clienteSelecionado, setClienteSelecionado] = useState({
        nome: "",
        cpf: "",
        genero: "",
        dataNascimento: "",
        telefone: "",
        email: "",
        endereco: ""
    });
    return (
        <Pagina>
            <Alert className="mt-02 mb-02 success text-center" variant="dark">
                <h2>
                    Cadastro de Cliente
                </h2>
            </Alert>
            {
                exibirClientes ?
                    <TabelaClientes
                        setExibirClientes={setExibirClientes}
                        setClienteSelecionado={setClienteSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                    :
                    <FormCadastroCliente
                        setExibirClientes={setExibirClientes}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        clienteSelecionado={clienteSelecionado}
                        setClienteSelecionado={setClienteSelecionado}
                    />
            }
        </Pagina>
    );
}