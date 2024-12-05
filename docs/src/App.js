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
import { jwtDecode } from "jwt-decode";

export const ContextoUsuario = createContext();

function App() {
    const [processando, setProcessando] = useState(true);
    const [usuario, setUsuario] = useState({
        nome: "",
        perfil: "",
        logado: false,
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const tokenData = jwtDecode(token); // Decodifica o token
                const tokenExpiracao = tokenData.exp * 1000; // Converte a expiração para ms
                const tempoAtual = Date.now();

                if (tokenExpiracao > tempoAtual) {
                    setUsuario({
                        nome: tokenData.nome,
                        perfil: tokenData.perfil,
                        logado: true,
                    });
                } else {
                    localStorage.removeItem("token");
                }
            } catch (error) {
                console.error("Erro ao decodificar o token:", error);
                localStorage.removeItem("token");
            }
        }
        setProcessando(false);
    }, []);

    return (
        <div className="App">
            <ContextoUsuario.Provider value={{ usuario, setUsuario }}>
                <BrowserRouter basename="/LP2-Sistema2">
                    <Routes>
                        {
                            !processando ? (
                                <>
                                    {!usuario.logado ? (
                                        <Route path="/" element={<TelaLogin />} />
                                    ) : (
                                        <>
                                            <Route path="/" element={<TelaMenu />} />
                                            <Route path="/produto" element={<TelaCadastroProduto />} />
                                            <Route path="/cliente" element={<TelaCadastroCliente />} />
                                            <Route path="/fornecedor" element={<TelaCadastroFornecedor />} />
                                            <Route path="/usuario" element={<TelaCadastroUsuario />} />
                                            <Route path="/categoria" element={<TelaCadastroCategoria />} />
                                        </>
                                    )}
                                    <Route path="*" element={<Tela404 />} />
                                </>
                            ) : (
                                null
                            )
                        }
                    </Routes>
                </BrowserRouter>
            </ContextoUsuario.Provider>
        </div>
    );
}

export default App;
