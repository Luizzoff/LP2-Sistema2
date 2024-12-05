import { configureStore } from "@reduxjs/toolkit";
import reduxProduto from "./redux.produto";
import reduxCategoria from "./redux.categoria";
import reduxCliente from './redux.cliente';
import reduxFornecedor from "./redux.fornecedor";
import reduxUsuarios from "./redux.usuario";

// Configuração da Store
const store = configureStore({
    reducer: {
        categorias: reduxCategoria,
        clientes: reduxCliente,
        fornecedores: reduxFornecedor,
        usuarios: reduxUsuarios,
        produtos: reduxProduto
    }
});

export default store;
