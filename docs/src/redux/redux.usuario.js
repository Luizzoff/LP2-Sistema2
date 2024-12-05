import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../services/servicoUsuario";
import ESTADO from "./redux.estado";

// Consultar usuários
export const consultarUsuarios = createAsyncThunk('consultarUsuarios', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta)) {
            return {
                status: true,
                listaUsuarios: resposta
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem,
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem,
        };
    }
});

// Gravar usuário
export const gravarUsuario = createAsyncThunk('gravarUsuario', async (usuario) => {
    try {
        const resposta = await gravar(usuario);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});

// Deletar usuário
export const deletarUsuario = createAsyncThunk('deletarUsuario', async (usuario) => {
    try {
        const resposta = await deletar(usuario);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});

// Atualizar usuário
export const atualizarUsuario = createAsyncThunk('atualizarUsuario', async (usuario) => {
    try {
        const resposta = await atualizar(usuario);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                usuario
            };
        } else {
            return {
                status: false,
                mensagem: resposta.mensagem
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem
        };
    }
});

const usuarioReducer = createSlice({
    name: 'usuario',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaUsuarios: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = ""; // Limpa a mensagem no estado
        }
    },
    extraReducers: (builder) => {
        builder
            //#################### Consultar #########################//
            .addCase(consultarUsuarios.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarUsuarios.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaUsuarios = action.payload.listaUsuarios;
            })
            .addCase(consultarUsuarios.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //########################################################//


            //#################### Gravar #########################//
            .addCase(gravarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios.push(action.payload.usuario);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //#####################################################//


            //#################### Deletar #########################//
            .addCase(deletarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição deletar...";
            })
            .addCase(deletarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaUsuarios = state.listaUsuarios.filter((usuario) => usuario.nome !== action.payload.usuario.nome);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //######################################################//


            //#################### Atualizar #########################//
            .addCase(atualizarUsuario.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição de atualizar...";
            })
            .addCase(atualizarUsuario.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaUsuarios.findIndex((usuario) => usuario.nome === action.payload.usuario.nome);
                    if (indice !== -1) {
                        state.listaUsuarios[indice] = action.payload.usuario;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarUsuario.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
            //########################################################//
        }
});

export const { zerarMensagem } = usuarioReducer.actions;
export default usuarioReducer.reducer;
