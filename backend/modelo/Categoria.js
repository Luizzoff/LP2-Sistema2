import Entidade_Categoria from "../persistencia/Entidade_Categoria.js";

export default class Categoria{
    #codigo;
    #descricao;
    
    constructor(codigo=0,descricao=""){
        this.#codigo=codigo;
        this.#descricao=descricao;
    }
    
    get codigo() { return this.#codigo; }
    get descricao() { return this.#descricao; }
    set codigo(novoCodigo) { this.#codigo = novoCodigo; }
    set descricao(novoDescricao) { this.#descricao = novoDescricao; }

    async gravar(){
        const categoriaEntidade = new Entidade_Categoria();
        await categoriaEntidade.gravar(this);
    }
    
    async deletar(){
        const categoriaEntidade = new Entidade_Categoria();
        await categoriaEntidade.deletar(this);
    }
    
    async atualizar(){
        const categoriaEntidade = new Entidade_Categoria();
        await categoriaEntidade.atualizar(this);  
    }

    async consultar(termo){
        const categoriaEntidade = new Entidade_Categoria();
        return await categoriaEntidade.consultar(termo);
    }
}