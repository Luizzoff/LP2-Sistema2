import { useContext, useEffect } from "react";
import { Alert, Button, Spinner, Table } from "react-bootstrap";
import { ContextoUsuario } from "../../../App";
import { useDispatch, useSelector } from "react-redux";
import { deletarUsuario, zerarMensagem } from "../../../redux/redux.usuario";
import ESTADO from "../../../redux/redux.estado";

export default function TabelaUsuarios(props) {
    const { usuario } = useContext(ContextoUsuario);
    let { estado, mensagem, listaUsuarios } = useSelector((state) => state.usuarios);
    const dispatch = useDispatch();

    useEffect(() => {
        if ((estado === ESTADO.OCIOSO || estado === ESTADO.ERRO) && mensagem) {
            window.alert(mensagem);
            dispatch(zerarMensagem());
        }
    }, [estado, mensagem, dispatch]);

    function atualizar(usuario) {
        if (window.confirm("Deseja realmente alterar o Usuario -> " + usuario.nome)) {
            props.setUsuarioSelecionado(usuario);
            props.setModoEdicao(true);
            props.setExibirUsuarios(false);
        }
    }

    function deletar(usuario) {
        if (window.confirm("Deseja realmente excluir o Usuario -> " + usuario.nome)) {
            dispatch(deletarUsuario(usuario));
        }
    }

    return (
        <>
            {
                estado === ESTADO.PENDENTE ? (
                    <Alert variant="primary" className="d-flex align-items-center gap-3">
                        <Spinner animation="border" role="status"></Spinner>
                        {mensagem}
                    </Alert>
                ) : (
                    <>
                        {usuario.logado && usuario.perfil === 'Admin' &&
                            <Button
                                className="mb-3"
                                variant="primary"
                                onClick={() => {
                                    props.setExibirUsuarios(false);
                                }}
                            >
                                Adicionar
                            </Button>
                        }
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Nome Usuario</th>
                                    <th>Perfil</th>
                                    <th>Email</th>
                                    {
                                        usuario.logado && usuario.perfil === 'Admin' &&
                                        <>
                                            <th>Senha</th>
                                            <th>Senha Confirmação</th>
                                            <th>Ações</th>
                                        </>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {listaUsuarios?.map((item) => {
                                    return (
                                        <tr key={item.nome}>
                                            <td>{item.nome}</td>
                                            <td>{item.perfil}</td>
                                            <td>{item.email}</td>
                                            {
                                                usuario.logado && usuario.perfil === 'Admin' &&
                                                <>
                                                    <td>{item.senha}</td>
                                                    <td>{item.senha_confirmacao}</td>
                                                    <td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                                                        <Button onClick={() => { atualizar(item); }} variant="warning" style={{ marginRight: '1em' }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                            </svg>
                                                        </Button>
                                                        <Button onClick={() => { deletar(item); }} variant="danger">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                            </svg>
                                                        </Button>
                                                    </td>
                                                </>
                                            }
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        <p>Quantidade de Usuarios cadastrados: {listaUsuarios?.length}</p>
                    </>
                )
            }
        </>
    );
}