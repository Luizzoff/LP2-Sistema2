import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../services/servicoFornecedor";
import ESTADO from "./redux.estado";
import { consultarProdutos } from "./redux.produto";

// Consultar fornecedores
export const consultarFornecedores = createAsyncThunk('consultarFornecedores', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta)) {
            return {
                status: true,
                listaFornecedores: resposta
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

// Gravar fornecedor
export const gravarFornecedor = createAsyncThunk('gravarFornecedor', async (fornecedor) => {
    try {
        const resposta = await gravar(fornecedor);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                fornecedor
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

// Deletar fornecedor
export const deletarFornecedor = createAsyncThunk('deletarFornecedor', async (fornecedor) => {
    try {
        const resposta = await deletar(fornecedor);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                fornecedor
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

// Atualizar fornecedor
export const atualizarFornecedor = createAsyncThunk('atualizarFornecedor', async (fornecedor, { dispatch }) => {
    try {
        const resposta = await atualizar(fornecedor);
        if (resposta.status) {
            dispatch(consultarProdutos());
            return {
                status: true,
                mensagem: resposta.mensagem,
                fornecedor
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

const fornecedorReducer = createSlice({
    name: 'fornecedor',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaFornecedores: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = ""; // Limpa a mensagem no estado
        }
    },
    extraReducers: (builder) => {
        builder
            //#################### Consultar #########################//
            .addCase(consultarFornecedores.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarFornecedores.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaFornecedores = action.payload.listaFornecedores;
            })
            .addCase(consultarFornecedores.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //########################################################//


            //#################### Gravar #########################//
            .addCase(gravarFornecedor.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores.push(action.payload.fornecedor);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //#####################################################//


            //#################### Deletar #########################//
            .addCase(deletarFornecedor.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição deletar...";
            })
            .addCase(deletarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaFornecedores = state.listaFornecedores.filter((fornecedor) => fornecedor.cnpj !== action.payload.fornecedor.cnpj);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //######################################################//


            //#################### Atualizar #########################//
            .addCase(atualizarFornecedor.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição de atualizar...";
            })
            .addCase(atualizarFornecedor.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaFornecedores.findIndex((fornecedor) => fornecedor.cnpj === action.payload.fornecedor.cnpj);
                    if (indice !== -1) {
                        state.listaFornecedores[indice] = action.payload.fornecedor;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarFornecedor.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            });
            //########################################################//
        }
});

export const { zerarMensagem } = fornecedorReducer.actions;
export default fornecedorReducer.reducer;
