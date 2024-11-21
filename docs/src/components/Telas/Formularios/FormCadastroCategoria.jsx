import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { gravar, atualizar } from "../../../services/servicoCategoria"
import { useDispatch } from "react-redux";

export default function FormCadastroCategoria(props) {
    const dispatch = useDispatch();
	
	const [formValidado, setFormValidado] = useState(false);
	const [categoriaReseta] = useState({
		codigo: "",
		descricao: ""
	});

	useEffect(() => { // só pq o codigo vem do banco vira isso
		if (props.categoriaSelecionado.codigo !== "" && !props.modoEdicao) {
			dispatch({ type: 'gravarCat', payload: [props.categoriaSelecionado] });
			props.setCategoriaSelecionado(categoriaReseta);
			props.setExibirCategorias(true);
		}
	}, [props.categoriaSelecionado, props, categoriaReseta, dispatch]);

	function manipularSubmissao(evento) {
		const form = evento.currentTarget;
		if (form.checkValidity()) {
			setFormValidado(false);
			if (!props.modoEdicao) {
				gravar(props.categoriaSelecionado)
				.then((res)=>{
					if(res.status){
						props.setCategoriaSelecionado({ ...props.categoriaSelecionado, codigo: res.codigo });
					}
					window.alert(res.mensagem);
				})
				.catch((erro)=>{
					window.alert(erro.mensagem);
				})
			} 
			else {
				atualizar(props.categoriaSelecionado)
				.then((res)=>{
					if(res.status){
						dispatch({ type: 'atualizarCat', payload: props.categoriaSelecionado });
						props.setCategoriaSelecionado(categoriaReseta);
						props.setModoEdicao(false);
						props.setExibirCategorias(true);
					}
					window.alert(res.mensagem);
				});
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
		props.setCategoriaSelecionado({
			...props.categoriaSelecionado,
			[elemento]: valor,
		});
	}

	return (
		<Form noValidate validated={formValidado} onSubmit={manipularSubmissao}>
			{/* ########## Codigo ########## */}
			<Form.Group className="mb-3" style={{ display: !props.modoEdicao ? "none" : "block" }}>
				<Form.Label>Código</Form.Label>
				<Form.Control
					disabled={props.modoEdicao}
					id="codigo"
					name="codigo"
					value={props.categoriaSelecionado.codigo}
					type="text"
					placeholder="Código"
				/>
			</Form.Group>
			{/* ########## Descricao ########## */}
			<Form.Group className="mb-3">
				<Form.Label>Descrição</Form.Label>
				<Form.Control
					required
					id="descricao"
					name="descricao"
					value={props.categoriaSelecionado.descricao}
					onChange={manipularMudanca}
					type="text"
					placeholder="Descrição"
				/>
				<Form.Control.Feedback type="invalid">
					Por favor, informe a descrição.
				</Form.Control.Feedback>
			</Form.Group>
			<Row className="mt-2 mb-2">
				<Col md={2}>
					<Button type="submit" variant={props.modoEdicao ? "warning" : "success"}>
						{props.modoEdicao ? "Alterar" : "Confirmar"}
					</Button>
				</Col>
				<Col>
					<Button
						onClick={() => {
							props.setCategoriaSelecionado(categoriaReseta);
							props.setModoEdicao(false);
							props.setExibirCategorias(true);
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
