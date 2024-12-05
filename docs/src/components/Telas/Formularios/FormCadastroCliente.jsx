import { useEffect, useState } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { atualizarCliente, gravarCliente, zerarMensagem } from "../../../redux/redux.cliente";
import ESTADO from "../../../redux/redux.estado";

export default function FormCadastroCliente(props) {
    const dispatch = useDispatch();
    let { estado, mensagem } = useSelector((state) => state.clientes);
    const [carregando, setCarregando] = useState(false); //spinner

    const [formValidado, setFormValidado] = useState(false);
    const [clienteReseta] = useState({
        nome: "",
        cpf: "",
        genero: "",
        dataNascimento: "",
        telefone: "",
        email: "",
        endereco: ""
    });

    useEffect(() => {
        if (estado === ESTADO.OCIOSO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(zerarMensagem());
            props.setClienteSelecionado(clienteReseta);
            props.setModoEdicao(false);
            props.setExibirClientes(true);
        }
        else if (estado === ESTADO.ERRO && mensagem) {
            setCarregando(false);
            window.alert(mensagem);
            dispatch(zerarMensagem());
        }

    }, [estado, mensagem, props, clienteReseta, dispatch]);

    function manipularSubmissao(evento) {
        const form = evento.currentTarget;
        if (form.checkValidity()) {
            setFormValidado(false);
            setCarregando(true);
            if (!props.modoEdicao)
                dispatch(gravarCliente(props.clienteSelecionado));
            else
                dispatch(atualizarCliente(props.clienteSelecionado));
        }
        else
            setFormValidado(true);
        evento.preventDefault();
        evento.stopPropagation();
    }

    function manipularMudanca(evento) {
        const elemento = evento.target.name;
        const valor = evento.target.value;
        props.setClienteSelecionado({
            ...props.clienteSelecionado,
            [elemento]: valor,
        });
    }

    return (
        <Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
            {/* ########## Nome ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    required
                    id="nome"
                    name="nome"
                    value={props.clienteSelecionado.nome}
                    onChange={manipularMudanca}
                    type="text"
                    placeholder="Nome"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe seu nome completo
                </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Col>
                    {/* ########## CPF ########## */}
                    <Form.Group className="mb-3">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control
                            required
                            disabled={props.modoEdicao}
                            id="cpf"
                            name="cpf"
                            value={props.clienteSelecionado.cpf}
                            onChange={manipularMudanca}
                            type="text"
                            placeholder="CPF"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe seu cpf!, ___.___.___-__.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    {/* ########## Genero ########## */}
                    <Form.Group>
                        <Form.Label>Genero</Form.Label>
                        <Form.Select
                            required
                            id="genero"
                            name="genero"
                            value={props.clienteSelecionado.genero}
                            onChange={manipularMudanca}
                            aria-label="Genero"
                        >
                            <option value="">Nenhum</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outros">Outros</option>
                            <option value="Não Especificado">Não Especificado</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            Por favor, selecione um genero!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* ########## Data Nascimento ########## */}
                    <Form.Group className="mb-3">
                        <Form.Label>Data de Nascimento</Form.Label>
                        <Form.Control
                            required
                            id="dataNascimento"
                            name="dataNascimento"
                            value={props.clienteSelecionado.dataNascimento}
                            onChange={manipularMudanca}
                            type="date"
                            placeholder="Data de Nascimento"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe sua data de nascimento!
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    {/* ########## Telefone ########## */}
                    <Form.Group className="mb-3">
                        <Form.Label>Telefone</Form.Label>
                        <Form.Control
                            required
                            id="telefone"
                            name="telefone"
                            value={props.clienteSelecionado.telefone}
                            onChange={manipularMudanca}
                            type="text"
                            placeholder="Telefone"
                        />
                        <Form.Control.Feedback type="invalid">
                            Por favor, informe seu telefone!, ( )_____-____.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            {/* ########## Email ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    id="email"
                    name="email"
                    value={props.clienteSelecionado.email}
                    onChange={manipularMudanca}
                    type="email"
                    placeholder="Email"
                />
                <Form.Control.Feedback type="invalid">
                    Por favor, informe seu email: nome@exemplo.com.
                </Form.Control.Feedback>
            </Form.Group>
            {/* ########## Endereço ########## */}
            <Form.Group className="mb-3">
                <Form.Label>Endereço</Form.Label>
                <Form.Control
                    required
                    id="endereco"
                    name="endereco"
                    value={props.clienteSelecionado.endereco}
                    onChange={manipularMudanca}
                    type="text"
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
                            props.setClienteSelecionado(clienteReseta);
                            props.setExibirClientes(true);
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
