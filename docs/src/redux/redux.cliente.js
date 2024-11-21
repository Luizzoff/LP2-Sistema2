const estadoInicialCliente = [];

const clienteReducer = (state = estadoInicialCliente, action) => {
    switch (action.type) {
        case 'setarCli':
            return action.payload;
            
        case 'gravarCli':
            return [...state, ...action.payload];
        
        case 'atualizarCli':
            return state.map(cliente =>
                cliente.cpf === action.payload.cpf ? { ...cliente, ...action.payload } : cliente
            );
        
        case 'deletarCli':
            return state.filter(cliente => cliente.cpf !== action.payload.cpf);
        
        default:
            return state;
    }
};

export default clienteReducer;
