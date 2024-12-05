import Entidade_Cliente from "../persistencia/Entidade_Cliente.js";

export default class Cliente {
    #nome; #cpf; #genero; #dataNascimento; #telefone; #email; #endereco;
    constructor(nome="", cpf="", genero="", dataNascimento="", telefone="", email="", endereco="") {
        this.#nome = nome;
        this.#cpf = cpf;
        this.#genero = genero;
        this.#dataNascimento = dataNascimento; 
        this.#telefone = telefone;
        this.#email = email;
        this.#endereco = endereco
    }

    get nome() {return this.#nome;}
    get cpf() {return this.#cpf;}
    get genero() {return this.#genero;}
    get dataNascimento() {return this.#dataNascimento;}
    get telefone() {return this.#telefone;}
    get email() {return this.#email;}
    get endereco() {return this.#endereco;}

    set nome(novoNome) {this.#nome = novoNome;}
    set cpf(novoCpf) {this.#cpf = novoCpf;}
    set genero(novoGenero) {this.#genero = novoGenero;}
    set dataNascimento(novaDataNascimento) {this.#dataNascimento = novaDataNascimento;}
    set telefone(novoTelefone) {this.#telefone = novoTelefone;}
    set email(novoEmail) {this.#email = novoEmail;}
    set endereco(novoEndereco) {this.#endereco = novoEndereco;}

    async gravar() {
        const clienteEntidade = new Entidade_Cliente();
        await clienteEntidade.gravar(this); 
    }

    async excluir() {
        const clienteEntidade = new Entidade_Cliente();
        await clienteEntidade.excluir(this);
    }

    async atualizar() {
        const clienteEntidade = new Entidade_Cliente();
        await clienteEntidade.atualizar(this);
    }

    async consultar(termo) {
        const clienteEntidade = new Entidade_Cliente();
        return await clienteEntidade.consultar(termo);
    }
}