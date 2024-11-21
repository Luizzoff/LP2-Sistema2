import Entidade_Fornecedor from "../persistencia/Entidade_Fornecedor.js"

export default class Fornecedor {
    #nome; #cnpj; #telefone; #email; #endereco;
    constructor(nome="", cnpj="", telefone="", email="", endereco="") {
        this.#nome = nome;
        this.#cnpj = cnpj;
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco
    }

    get nome() {return this.#nome;}
    get cnpj() {return this.#cnpj;}
    get telefone() {return this.#telefone;}
    get email() {return this.#email;}
    get endereco() {return this.#endereco;}

    set nome(novoNome) {this.#nome = novoNome;}
    set cnpj(novocnpj) {this.#cnpj = novocnpj;}
    set telefone(novoTelefone) {this.#telefone = novoTelefone;}
    set email(novoEmail) {this.#email = novoEmail;}
    set endereco(novoEndereco) {this.#endereco = novoEndereco;}

    async gravar() {
        const fornecedorEntidade = new Entidade_Fornecedor();
        await fornecedorEntidade.gravar(this); 
    }

    async excluir() {
        const fornecedorEntidade = new Entidade_Fornecedor();
        await fornecedorEntidade.excluir(this);
    }

    async atualizar() {
        const fornecedorEntidade = new Entidade_Fornecedor();
        await fornecedorEntidade.atualizar(this);
    }

    async consultar(termo) {
        const fornecedorEntidade = new Entidade_Fornecedor();
        return await fornecedorEntidade.consultar(termo);
    }
}