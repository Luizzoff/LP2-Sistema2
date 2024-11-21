import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { gravar, atualizar } from "../../../services/servicoUsuario";
import { useDispatch } from "react-redux";

export default function FormCadastroCliente(props) {
    const dispatch = useDispatch();

    const [formValidado, setFormValidado] = useState(false);
    const usuarioReseta = {
        nome: "",
        email: "",
        perfil: "",
        senha: "",
        senha_confirmacao: ""
    };

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            if (props.usuarioSelecionado.senha === props.usuarioSelecionado.senha_confirmacao) {
                if (!props.modoEdicao) {
                    gravar(props.usuarioSelecionado)
                        .then((res) => {
                            if (res.status) {
                                dispatch({ type: 'gravarUsu', payload: [props.usuarioSelecionado] });
                                props.setUsuarioSelecionado(usuarioReseta);
                                props.setModoEdicao(false);
                                props.setExibirUsuarios(true);
                            }
                            window.alert(res.mensagem);
                        })
                        .catch((erro) => {
                            window.alert(erro.mensagem);
                        })
                }
                else {
                    atualizar(props.usuarioSelecionado)
                        .then((res) => {
                            if (res.status) {
                                dispatch({ type: 'atualizarUsu', payload: props.usuarioSelecionado });
                                props.setUsuarioSelecionado(usuarioReseta);
                                props.setModoEdicao(false);
                                props.setExibirUsuarios(true);
                            }
                            window.alert(res.mensagem);
                        });
                }
            }
            else {
                window.alert("Senhas se Diferem !");
            }
        }
        else {
            setFormValidado(true);
        }
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        props.setUsuarioSelecionado({
            ...props.usuarioSelecionado,
            [elemento]: valor,
        });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            {/* ########## Nome Usuario ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Nome de Usuário</Form.Label>
                <Form.Control
                    required
                    disabled={props.modoEdicao}
                    id="nome"
                    name="nome"
                    value={props.usuarioSelecionado.nome}
                    onChange={manipularMudanca}
                    type="text"
                    placeholder="Nome de Usuário"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe seu nome de usuário!
                </Form.Control.Feedback>
            </Form.Group>
            {/* ########## Email ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    disabled={props.modoEdicao}
                    id="email"
                    name="email"
                    value={props.usuarioSelecionado.email}
                    onChange={manipularMudanca}
                    type="email"
                    placeholder="Email"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe seu email: nome@exemplo.com.
                </Form.Control.Feedback>
            </Form.Group>
            {/* ########## Perfil ########## */}
            <Form.Group>
                <Form.Label>Perfil</Form.Label>
                <Form.Select
                    required
                    id="perfil"
                    name="perfil"
                    value={props.usuarioSelecionado.perfil}
                    onChange={manipularMudanca}
                    aria-label="Perfil"
                >
                    <option value="">Nenhum</option>
                    <option value="Admin">Admin</option>
                    <option value="Gerente">Gerente</option>
                    <option value="Normal">Normal</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Por favor, selecione um tipo de perfil!.
                </Form.Control.Feedback>
            </Form.Group>
            {/* ########## Senha ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                    required
                    id="senha"
                    name="senha"
                    value={props.usuarioSelecionado.senha}
                    onChange={manipularMudanca}
                    type="password"
                    placeholder="Senha"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe sua senha!
                </Form.Control.Feedback>
            </Form.Group>
            {/* ########## Senha Confirmação ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Senha de Confirmação</Form.Label>
                <Form.Control
                    required
                    id="senha_confirmacao"
                    name="senha_confirmacao"
                    value={props.usuarioSelecionado.senha_confirmacao}
                    onChange={manipularMudanca}
                    type="password"
                    placeholder="Senha de Confirmação"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe a confirmação de senha!
                </Form.Control.Feedback>
            </Form.Group>
            <Row className="mt-2 mb-2">
                <Col md={2}>
                    <Button type="submit" variant={props.modoEdicao ? "warning" : "success"}>
                        {props.modoEdicao ? "Alterar" : "Confirmar"}
                    </Button>{" "}
                </Col>
                <Col>
                    <Button
                        onClick={() => {
                            props.setModoEdicao(false);
                            props.setUsuarioSelecionado(usuarioReseta);
                            props.setExibirUsuarios(true);
                        }}
                        type="button"
                        variant={props.modoEdicao ? "warning" : "success"}
                    >
                        Voltar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
