import Entidade_Usuario from "../persistencia/Entidade_Usuario.js";

export default class Usuario {
    #nome; #email; #senha; #senha_confirmacao; #perfil;
    constructor(nome="",email="",senha="",senha_confirmacao="",perfil=""){
        this.#nome = nome;
        this.#email = email;
        this.#senha = senha;
        this.#senha_confirmacao = senha_confirmacao;
        this.#perfil = perfil;
    }

    get nome() {return this.#nome;}
    get email() {return this.#email;}
    get senha() {return this.#senha;}
    get senha_confirmacao() {return this.#senha;}
    get perfil() {return this.#perfil;}
    
    set nome(novoNome) {this.#nome = novoNome;}
    set email(novoEmail) {this.#email = novoEmail;}
    set senha(novaSenha) {this.#senha = novaSenha;}
    set senha_confirmacao(novaSenhaConfirmacao) {this.#senha_confirmacao = novaSenhaConfirmacao;}
    set perfil(novoPerfil) {this.#perfil = novoPerfil;}

    async gravar() {
        const usuarioEntidade = new Entidade_Usuario();
        await usuarioEntidade.gravar(this); 
    }

    async excluir() {
        const usuarioEntidade = new Entidade_Usuario();
        await usuarioEntidade.excluir(this);
    }

    async atualizar() {
        const usuarioEntidade = new Entidade_Usuario();
        await usuarioEntidade.atualizar(this);
    }

    async consultar(termo) {
        const usuarioEntidade = new Entidade_Usuario();
        return await usuarioEntidade.consultar(termo);
    }

    async login(termo) {
        const usuarioEntidade = new Entidade_Usuario();
        return await usuarioEntidade.login(termo);
    }
}