import { Button, Table, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { consultarProdutos, deletarProduto } from "../../../redux/redux.produto";
import { useEffect, useState } from "react";
import ESTADO from "../../../redux/redux.estado";

export default function TabelaProdutos(props) {
    const { estado, mensagem, listaProdutos } = useSelector((state) => state.produtos);
    const dispatch = useDispatch();
    const [processando, setProcessando] = useState(false);

    useEffect(()=>{
        if(processando && estado === ESTADO.OCIOSO && mensagem && mensagem === "Produto excluído com sucesso!"){
            setProcessando(false);
            dispatch(consultarProdutos());
            window.alert(mensagem);
        }
        else if(processando && estado === ESTADO.ERRO && mensagem){
            setProcessando(false);
            window.alert(mensagem);
		}
    },[estado, mensagem, processando, dispatch]);

    const atualizar = (produto) => {
        if (window.confirm("Deseja realmente alterar o Produto -> " + produto.descricao)) {
            props.setProdutoSelecionado(produto);
            props.setModoEdicao(true);
            props.setExibirProdutos(false);
        }
    }

    const deletar = (produto) => {
        if (window.confirm("Deseja realmente excluir o produto -> " + produto.descricao)) {
            dispatch(deletarProduto(produto));
            setProcessando(true);
        }
    }

    return (
        <>
            <Button
                className="mb-3"
                variant="primary"
                onClick={() => {
                    props.setExibirProdutos(false);
                }}
            >
                Adicionar
            </Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descrição</th>
                        <th>Preço de Custo</th>
                        <th>Preço de Venda</th>
                        <th>Estoque</th>
                        <th>Imagem</th>
                        <th>Validade</th>
                        <th>Categoria</th>
                        <th>Fornecedor</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProdutos?.map((produto) => {
                        return (
                            <tr key={produto.codigo}>
                                <td>{produto.codigo}</td>
                                <td>{produto.descricao}</td>
                                <td>R$ {produto.precoCusto}</td>
                                <td>R$ {produto.precoVenda}</td>
                                <td>{produto.qtdEstoque}</td>
                                <td>
                                    <Image
                                        style={{ width: "64px", height: "64px" }}
                                        src={produto.urlImagem}
                                        thumbnail
                                        alt="foto"
                                    />
                                </td>
                                <td>{produto.dataValidade}</td>
                                <td>{produto.categoria.codigo} | {produto.categoria.descricao}</td>
                                <td>{produto.fornecedor.nome}</td>
                                <td style={{ whiteSpace: 'nowrap', width: '1%' }}>
                                    <Button onClick={() => { atualizar(produto); }} variant="warning" style={{ marginRight: '1em' }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </Button>
                                    <Button onClick={() => { deletar(produto); }} variant="danger">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <p>Quantidade de Produtos cadastrados: {listaProdutos?.length}</p>
        </>
    );
}