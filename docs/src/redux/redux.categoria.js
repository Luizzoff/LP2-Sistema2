const estadoInicialCategoria = [];

const categoriaReducer = (state = estadoInicialCategoria, action) => {
    switch (action.type) {
        case 'setarCat':
            return action.payload;
            
        case 'gravarCat':
            return [...state, ...action.payload];

        case 'atualizarCat':
            return state.map(categoria =>
                categoria.codigo === action.payload.codigo ? { ...categoria, ...action.payload } : categoria
            );
        
        case 'deletarCat':
            return state.filter(categoria => categoria.codigo !== action.payload.codigo);
        
        default:
            return state;
    }
};


export default categoriaReducer;
