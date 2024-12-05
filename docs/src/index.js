import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useDispatch } from 'react-redux';
import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App';
import store from './redux/redux.store';
import { consultarCategorias } from './redux/redux.categoria';
import { consultarClientes } from './redux/redux.cliente';
import { consultarFornecedores } from './redux/redux.fornecedor';
import { consultarProdutos } from './redux/redux.produto';
import { consultarUsuarios } from './redux/redux.usuario';

const root = ReactDOM.createRoot(document.getElementById('root'));

const GetAll = () =>{
    try {
        const dispatch = useDispatch();
        dispatch(consultarCategorias());
        dispatch(consultarClientes());
        dispatch(consultarFornecedores());
        dispatch(consultarProdutos());
        dispatch(consultarUsuarios());
    }
    catch(erro) {
        window.alert(erro.mensagem);
    }
} 

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GetAll />
            <App />
        </Provider>
    </React.StrictMode>
);
