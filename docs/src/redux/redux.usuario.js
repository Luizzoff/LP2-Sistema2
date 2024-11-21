const estadoInicialUsuario = [];

const usuarioReducer = (state = estadoInicialUsuario, action) => {
    switch (action.type) {
        case 'setarUsu':
            return action.payload;
            
        case 'gravarUsu':
            return [...state, ...action.payload];

        case 'atualizarUsu':
            return state.map(usuario =>
                usuario.nome === action.payload.nome ? { ...usuario, ...action.payload } : usuario
            );

        case 'deletarUsu':
            return state.filter(usuario => usuario.nome !== action.payload.nome);

        default:
            return state;
    }
};

export default usuarioReducer;
