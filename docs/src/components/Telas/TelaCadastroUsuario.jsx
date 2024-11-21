import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormCadastroUsuario from "./Formularios/FormCadastroUsuario";
import TabelaUsuarios from "./Tabelas/TabelaUsuarios";

export default function TelaCadastroUsuario(props) {
    const [exibirUsuarios, setExibirUsuarios] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState({
        nome: "",
        email: "",
        perfil: "",
        senha: "",
        senha_confirmacao: ""
    });

    return (
        <Pagina>
            <Alert className="mt-02 mb-02 success text-center" variant="dark">
                <h2>
                    Cadastro de Usuário
                </h2>
            </Alert>
            {
                exibirUsuarios ?
                    <TabelaUsuarios
                        setExibirUsuarios={setExibirUsuarios}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                    :
                    <FormCadastroUsuario
                        setExibirUsuarios={setExibirUsuarios}
                        modoEdicao={modoEdicao}
                        setModoEdicao={setModoEdicao}
                        usuarioSelecionado={usuarioSelecionado}
                        setUsuarioSelecionado={setUsuarioSelecionado}
                    />
            }
        </Pagina>
    );
}