import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rotaCliente from './rotas/Rota_Cliente.js';
import rotaFornecedor from './rotas/Rota_Fornecedor.js';
import rotaProduto from './rotas/Rota_Produto.js';
import rotaCategoria from './rotas/Rota_Categoria.js';
import rotaUsuario from './rotas/Rota_Usuario.js';

dotenv.config();

const host = "0.0.0.0";
const porta = 5000;
const app = express();

//########## MIDDLEWARE e CORS ##########//
app.use(express.json());
app.use(cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*"
}));

// Middleware de autorização
function autenticarRequisicao(req, res, next) {
    const tokenRecebido = req.headers.authorization; // Token enviado no cabeçalho
    if (!tokenRecebido)
        return res.status(401).json({ mensagem: " Autorização Necessária ! " });
    if (tokenRecebido !== process.env.AUTORIZACAO)
        return res.status(403).json({ mensagem: " Token Inválido ! " });
    next(); // Continua para a próxima middleware ou rota
}

//########## ROTAS ##########//
// Aplicando o middleware nas rotas protegidas
app.use('/clientes', autenticarRequisicao, rotaCliente);
app.use('/fornecedores', autenticarRequisicao, rotaFornecedor);
app.use('/produtos', autenticarRequisicao, rotaProduto);
app.use('/categorias', autenticarRequisicao, rotaCategoria);
app.use('/usuarios', autenticarRequisicao, rotaUsuario);

// Rota livre
app.use('/', (req, res) => {
    res.send("Servidor Escutando !!!");
});
    
//########## SERVIDOR ##########//
app.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
});
