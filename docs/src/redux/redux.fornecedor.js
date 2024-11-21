const estadoInicialFornecedor = [];

const fornecedorReducer = (state = estadoInicialFornecedor, action) => {
    switch (action.type) {
        case 'setarFor':
            return action.payload;
            
        case 'gravarFor':
            return [...state, ...action.payload];
        
        case 'atualizarFor':
            return state.map(fornecedor =>
                fornecedor.cnpj === action.payload.cnpj ? { ...fornecedor, ...action.payload } : fornecedor
            );
        
        case 'deletarFor':
            return state.filter(fornecedor => fornecedor.cnpj !== action.payload.cnpj);
        
        default:
            return state;
    }
};

export default fornecedorReducer;
