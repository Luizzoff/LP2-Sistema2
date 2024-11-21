import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContextoUsuario } from "../../App";
import { useContext } from "react";

export default function Menu(props) {
    const { setUsuario } = useContext(ContextoUsuario);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand href="#" as={Link} to="/">Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#" as={Link} to="/categoria">Categoria</NavDropdown.Item>
                        <NavDropdown.Item href="#" as={Link} to="/cliente">Cliente</NavDropdown.Item>
                        <NavDropdown.Item href="#" as={Link} to="/fornecedor">Fornecedor</NavDropdown.Item>
                        <NavDropdown.Item href="#" as={Link} to="/produto">Produto</NavDropdown.Item>
                        <NavDropdown.Item href="#" as={Link} to="/usuario">Usuario</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Operações" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Compra</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Venda</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Clientes</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Fornecedores</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Estoque</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Vendas</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Compras</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">Categorias</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#home">Sobre</Nav.Link>
                    <Nav.Link href="#" as={Link} to="/"
                        onClick={() => {
                            setUsuario({
                                "nome": "",
                                "perfil": "",
                                "logado": false
                            })
                        }
                        }
                    >
                        Sair
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}