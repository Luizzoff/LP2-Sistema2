import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { consultar, deletar, gravar, atualizar } from "../services/servicoProduto";
import ESTADO from "./redux.estado";

export const consultarProdutos = createAsyncThunk('consultarProdutos', async () => {
    try {
        const resultado = await consultar();
        if (Array.isArray(resultado)) {
            return {
                status: true,
                mensagem: "Produtos recuperados com sucesso",
                listaProdutos: resultado
            };
        } else {
            return {
                status: false,
                mensagem: "Erro ao recuperar os produtos",
                listaProdutos: []
            };
        }
    } catch (erro) {
        return {
            status: false,
            mensagem: erro.mensagem,
            listaProdutos: []
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
export const deletarProduto = createAsyncThunk('deletarProduto', async (codigo) => {
    try {
        const resposta = await deletar(codigo);
        if (resposta.status) {
            return {
                status: true,
                mensagem: resposta.mensagem,
                codigo
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            //#################### Consultar #########################//
            .addCase(consultarProdutos.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando requisição...";
            })
            .addCase(consultarProdutos.fulfilled, (state, action) => {
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaProdutos = action.payload.listaProdutos;
            })
            .addCase(consultarProdutos.rejected, (state) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = "Erro ao recuperar produtos.";
                state.listaProdutos = [];
            })
            //########################################################//


            //#################### Gravar #########################//
            .addCase(gravarProduto.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição...";
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
            .addCase(gravarProduto.rejected, (state) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = "Erro ao gravar produto.";
            })
            //#####################################################//


            //#################### Deletar #########################//
            .addCase(deletarProduto.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição...";
            })
            .addCase(deletarProduto.fulfilled, (state, action) => {
                if (action.payload.status) {
                    state.estado = ESTADO.OCIOSO;
                    state.mensagem = action.payload.mensagem;
                    state.listaProdutos = state.listaProdutos.filter((produto) => produto.codigo !== action.payload.codigo);
                } else {
                    state.estado = ESTADO.ERRO;
                    state.mensagem = action.payload.mensagem;
                }
            })
            .addCase(deletarProduto.rejected, (state) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = "Erro ao deletar produto.";
            })
            //######################################################//


            //#################### Atualizar #########################//
            .addCase(atualizarProduto.pending, (state) => {
                state.estado = ESTADO.PENDENTE;
                state.mensagem = "Processando a requisição...";
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
            .addCase(atualizarProduto.rejected, (state) => {
                state.estado = ESTADO.ERRO;
                state.mensagem = "Erro ao atualizar produto.";
            });
            //########################################################//
        }
});

export default produtoReducer.reducer;
