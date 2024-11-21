import TelaCadastroCliente from "./components/Telas/TelaCadastroCliente";
import TelaCadastroFornecedor from "./components/Telas/TelaCadastroFornecedor";
import TelaCadastroUsuario from "./components/Telas/TelaCadastroUsuario";
import TelaCadastroProduto from "./components/Telas/TelaCadastroProduto";
import TelaCadastroCategoria from "./components/Telas/TelaCadastroCategoria";
import TelaMenu from "./components/Telas/TelaMenu";
import Tela404 from "./components/Telas/Tela404";
import TelaLogin from "./components/Telas/TelaLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { consultar as getCategorias } from "./services/servicoCategoria.js";
import { consultar as getClientes } from "./services/servicoCliente";
import { consultar as getFornecedores } from "./services/servicoFornecedor";
import { consultar as getUsuarios } from "./services/servicoUsuario";

import { consultarProdutos } from "./redux/redux.produto.js";

export const ContextoUsuario = createContext();

function App() {
    const dispatch = useDispatch();
    const [usuario, setUsuario] = useState({
        "nome": "luiz",
        "perfil": "Admin",
        "logado": true
    });
    // const [usuario, setUsuario] = useState({
    //     "nome": "",
    //     "perfil": "",
    //     "logado": false
    // });

    useEffect(() => {
        const repositorio = async () => {
            try {
                getCategorias()
                    .then((resposta) => {
                        if (resposta)
                            dispatch({ type: "setarCat", payload: resposta });
                    });

                getClientes()
                    .then((resposta) => {
                        if (resposta)
                            dispatch({ type: "setarCli", payload: resposta });
                    });

                getFornecedores()
                    .then((resposta) => {
                        if (resposta)
                            dispatch({ type: "setarFor", payload: resposta });
                    });

                dispatch(consultarProdutos());

                getUsuarios()
                    .then((resposta) => {
                        if (resposta)
                            dispatch({ type: "setarUsu", payload: resposta });
                    });

            } catch (erro) {
                window.alert(erro.mensagem);
            }
        };

        repositorio();
    }, [dispatch]);

    return (
        <div className="App">
            <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
                {
                    !usuario.logado ?
                        <TelaLogin />
                        :
                        <BrowserRouter>
                            {/* A ordem das rotas é importante */}
                            <Routes>
                                <Route path="/" element={<TelaMenu />} />
                                <Route path="/LP2-Sistema2" element={<TelaMenu />} />
                                <Route path="/produto" element={<TelaCadastroProduto />} />
                                <Route path="/cliente" element={<TelaCadastroCliente />} />
                                <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
                                <Route path="/usuario" element={<TelaCadastroUsuario />} />
                                <Route path="/categoria" element={<TelaCadastroCategoria />} />
                                <Route path="*" element={<Tela404 />} />
                            </Routes>
                        </BrowserRouter>
                }
            </ContextoUsuario.Provider>
        </div>
    );
}
export default App;