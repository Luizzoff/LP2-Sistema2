import Entidade_Produto from "../persistencia/Entidade_Produto.js";
import Categoria from "./Categoria.js";
import Fornecedor from "./Fornecedor.js";

export default class Produto {
    #codigo;
    #descricao;
    #precoCusto;
    #precoVenda;
    #qtdEstoque;
    #urlImagem;
    #dataValidade;
    #categoria;
    #fornecedor;
    
    constructor(codigo=0, descricao="", precoCusto=0, precoVenda=0, qtdEstoque=0, urlImagem="", dataValidade="", categoria={}, fornecedor={})
    {
        this.#codigo=codigo;
        this.#descricao=descricao;
        this.#precoCusto=precoCusto;
        this.#precoVenda=precoVenda;
        this.#qtdEstoque=qtdEstoque;
        this.#urlImagem=urlImagem;
        this.#dataValidade=dataValidade;
        this.#categoria=categoria;
        this.#fornecedor=fornecedor;
    }
    
    get codigo() {return this.#codigo;}
    get descricao() {return this.#descricao;}
    get precoCusto() {return this.#precoCusto;}
    get precoVenda() {return this.#precoVenda;}
    get qtdEstoque() {return this.#qtdEstoque;}
    get urlImagem() {return this.#urlImagem;}
    get dataValidade() {return this.#dataValidade;}
    get categoria() {return this.#categoria;}
    get fornecedor() {return this.#fornecedor;}

    set codigo(novoCodigo) { this.#codigo=novoCodigo; } 
    set descricao(novoDescricao) { this.#descricao = novoDescricao; }
    set precoCusto(novoPrecoCusto) { this.#precoCusto = novoPrecoCusto; }
    set precoVenda(novoPrecoVenda) { this.#precoVenda = novoPrecoVenda; }
    set qtdEstoque(novoQtdEstoque) { this.#qtdEstoque = novoQtdEstoque; }
    set urlImagem(novoUrlImagem) { this.#urlImagem=novoUrlImagem; }
    set dataValidade(novoDataValidade) { this.#dataValidade = novoDataValidade; }
    set categoria(novoCategoria) { if(novoCategoria instanceof Categoria) this.#categoria = novoCategoria; }
    set fornecedor(novoFornecedor) { if(novoFornecedor instanceof Fornecedor) this.#fornecedor = novoFornecedor; }

    async gravar() {
        const produtoEntidade = new Entidade_Produto();
        await produtoEntidade.gravar(this); 
    }

    async deletar() {
        const produtoEntidade = new Entidade_Produto();
        await produtoEntidade.deletar(this);
    }

    async atualizar() {
        const produtoEntidade = new Entidade_Produto();
        await produtoEntidade.atualizar(this);
    }

    async consultar(termo) {
        const produtoEntidade = new Entidade_Produto();
        return await produtoEntidade.consultar(termo);
    }
}