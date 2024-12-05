import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../services/servicoProduto";
import ESTADO from "./redux.estado";

export const consultarProdutos = createAsyncThunk('consultarProdutos', async () => {
    try {
        const resposta = await consultar();
        if (Array.isArray(resposta)) {
            return {
                status: true,
                listaProdutos: resposta
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
export const gravarProduto = createAsyncThunk('gravarProduto', async (produto) => {
    try {
        const resposta = await gravar(produto);
        if (resposta.status) {
            produto.codigo = resposta.codigo;
            return {
                status: true,
                mensagem: resposta.mensagem,
                produto
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
export const deletarProduto = createAsyncThunk('deletarProduto', async (produto) => {
    try {
        const resposta = await deletar(produto);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                produto
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
export const atualizarProduto = createAsyncThunk('atualizarProduto', async (produto) => {
    try {
        const resposta = await atualizar(produto);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                produto
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

const produtoReducer = createSlice({
    name: 'produto',
    initialState: {
        estado: ESTADO.OCIOSO,
        mensagem: "",
        listaProdutos: []
    },
    reducers: {
        zerarMensagem: (state) => {
            state.mensagem = ""; // Limpa a mensagem no estado
        }
    },
    extraReducers: (builder) => {
        builder
            //#################### Consultar #########################//
            .addCase(consultarProdutos.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarProdutos.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = "";
                state.listaProdutos = action.payload.listaProdutos;
            })
            .addCase(consultarProdutos.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //########################################################//


            //#################### Gravar #########################//
            .addCase(gravarProduto.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "";
            })
            .addCase(gravarProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaProdutos.push(action.payload.produto);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(gravarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //#####################################################//


            //#################### Deletar #########################//
            .addCase(deletarProduto.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição deletar...";
            })
            .addCase(deletarProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaProdutos = state.listaProdutos.filter((produto) => produto.codigo !== action.payload.produto.codigo);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;
            })
            //######################################################//


            //#################### Atualizar #########################//
            .addCase(atualizarProduto.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição de atualizar...";
            })
            .addCase(atualizarProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    const indice = state.listaProdutos.findIndex((produto) => produto.codigo === action.payload.produto.codigo);
                    if (indice !== -1) {
                        state.listaProdutos[indice] = action.payload.produto;
                    }
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(atualizarProduto.rejected, (state, action) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = action.payload.mensagem;;
            });
            //########################################################//
        }
});

export const { zerarMensagem } = produtoReducer.actions;
export default produtoReducer.reducer;
