import { useEffect, useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { atualizarUsuario, gravarUsuario, zerarMensagem } from "../../../redux/redux.usuario";
import ESTADO from "../../../redux/redux.estado";

export default function FormCadastroCliente(props) {
    const dispatch = useDispatch();
    let { estado, mensagem } = useSelector((state) => state.usuarios);
    const [carregando, setCarregando] = useState(false); //spinner

    const [formValidado, setFormValidado] = useState(false);
    const [usuarioReseta] = useState({
        nome: "",
        email: "",
        perfil: "",
        senha: "",
        senha_confirmacao: ""
    });

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(zerarMensagem());
            props.setUsuarioSelecionado(usuarioReseta);
            props.setModoEdicao(false);
            props.setExibirUsuarios(true);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(zerarMensagem());
        }

    }, [estado, mensagem, props, usuarioReseta, dispatch]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            if (props.usuarioSelecionado.senha === props.usuarioSelecionado.senha_confirmacao) {
                setCarregando(true);
                if (!props.modoEdicao)
                    dispatch(gravarUsuario(props.usuarioSelecionado));
                else
                    dispatch(atualizarUsuario(props.usuarioSelecionado));
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
                    <Button  disabled={carregando} type="submit" variant={props.modoEdicao ? "warning" : "success"}>
                        {carregando ? (
                            <>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    className="me-2"
                                />
                                Processando...
                            </>
                        ) : (
                            props.modoEdicao ? "Alterar" : "Confirmar"
                        )}
                    </Button>{" "}
                </Col>
                <Col>
                    <Button  disabled={carregando}
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
