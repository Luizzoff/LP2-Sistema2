import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { atualizarFornecedor, gravarFornecedor, zerarMensagem } from "../../../redux/redux.fornecedor";
import ESTADO from "../../../redux/redux.estado";

export default function FormCadastroFornecedor(props) {
    const dispatch = useDispatch();
    let { estado, mensagem } = useSelector((state) => state.fornecedores);
    const [carregando, setCarregando] = useState(false); //spinner

    const [formValidado, setFormValidado] = useState(false);
    const [fornecedorReseta] = useState({
        nome: "",
        cnpj: "",
        email: "",
        telefone: "",
        endereco: ""
    });

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(zerarMensagem());
            props.setFornecedorSelecionado(fornecedorReseta);
            props.setModoEdicao(false);
            props.setExibirFornecedores(true);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(zerarMensagem());
        }

    }, [estado, mensagem, props, fornecedorReseta, dispatch]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            setCarregando(true);
            if (!props.modoEdicao)
                dispatch(gravarFornecedor(props.fornecedorSelecionado));
            else
                dispatch(atualizarFornecedor(props.fornecedorSelecionado, dispatch));
        }
        else
            setFormValidado(true);
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        props.setFornecedorSelecionado({
            ...props.fornecedorSelecionado,
            [elemento]: valor,
        });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            <Row>
                <Col>
                    {/* ########## Nome ########## */}
                    <Form.Group className="mb-3">
                        <Form.Label>Descrição da Empresa (Nome)*</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="nome"
                            name="nome"
                            value={props.fornecedorSelecionado.nome}
                            onChange={manipularMudanca}
                            placeholder="Descrição da Empresa (Nome)*"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe o seu nome/da sua empresa!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    {/* ########## CNPJ ########## */}
                    <Form.Group className="mb-3">
                        <Form.Label>CNPJ</Form.Label>
                        <Form.Control
                            required
                            disabled={props.modoEdicao}
                            type="text"
                            id="cnpj"
                            name="cnpj"
                            value={props.fornecedorSelecionado.cnpj}
                            onChange={manipularMudanca}
                            placeholder="CNPJ"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe seu cnpj!, __.___.___.____-__.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* ########## Email ########## */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            id="email"
                            name="email"
                            value={props.fornecedorSelecionado.email}
                            onChange={manipularMudanca}
                            placeholder="Email"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe seu email: nome@exemplo.com.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    {/* ########## Telefone ########## */}
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={props.fornecedorSelecionado.telefone}
                            onChange={manipularMudanca}
                            placeholder="Telefone"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe seu telefone!, ( )_____-____.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            {/* ########## Endereço ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                    required
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={props.fornecedorSelecionado.endereco}
                    onChange={manipularMudanca}
                    placeholder="Endereço"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe seu endereço!, EX: Rua Te Achei N420 Barretos
                    14783-252 SP.
                </Form.Control.Feedback>
            </Form.Group>
            <Row className="mt-2 mb-2">
                <Col md={2}>
                    <Button disabled={carregando} type="submit" variant={props.modoEdicao ? "warning" : "success"}>
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
                    <Button disabled={carregando}
                        onClick={() => {
                            props.setModoEdicao(false);
                            props.setFornecedorSelecionado(fornecedorReseta);
                            props.setExibirFornecedores(true);
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
