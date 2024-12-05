import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../services/servicoCliente";
import ESTADO from "./redux.estado";

// Consultar clientes
export const consultarClientes = createAsyncThunk('consultarClientes', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta)) {
            return {
                status: true,
                listaClientes: resposta
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

// Gravar cliente
export const gravarCliente = createAsyncThunk('gravarCliente', async (cliente) => {
    try {
        const resposta = await gravar(cliente);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                cliente
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

// Deletar cliente
export const deletarCliente = createAsyncThunk('deletarCliente', async (cliente) => {
    try {
        const resposta = await deletar(cliente);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                cliente
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

// Atualizar cliente
export const atualizarCliente = createAsyncThunk('atualizarCliente', async (cliente) => {
    try {
        const resposta = await atualizar(cliente);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                cliente
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

const clienteReducer = createSlice({
    name: 'cliente',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaClientes: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = ""; // Limpa a mensagem no estado
        }
    },
    extraReducers: (builder) => {
        builder
            //#################### Consultar #########################//
            .addCase(consultarClientes.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarClientes.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaClientes = action.payload.listaClientes;
            })
            .addCase(consultarClientes.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //########################################################//


            //#################### Gravar #########################//
            .addCase(gravarCliente.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes.push(action.payload.cliente);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //#####################################################//


            //#################### Deletar #########################//
            .addCase(deletarCliente.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição deletar...";
            })
            .addCase(deletarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaClientes = state.listaClientes.filter((cliente) => cliente.cpf !== action.payload.cliente.cpf);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //######################################################//


            //#################### Atualizar #########################//
            .addCase(atualizarCliente.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição de atualizar...";
            })
            .addCase(atualizarCliente.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaClientes.findIndex((cliente) => cliente.cpf === action.payload.cliente.cpf);
                    if (indice !== -1) {
                        state.listaClientes[indice] = action.payload.cliente;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarCliente.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
            //########################################################//
        }
});

export const { zerarMensagem } = clienteReducer.actions;
export default clienteReducer.reducer;
