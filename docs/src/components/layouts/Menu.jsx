import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ContextoUsuario } from "../../App";
import { useContext } from "react";

export default function Menu(props) {
    const { setUsuario } = useContext(ContextoUsuario);

    const deslogar = () => {
        setUsuario({
            "nome": "",
            "perfil": "",
            "logado": false
        });
        localStorage.removeItem("token");
    };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Navbar.Brand as={Link} to="/">Menu</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Cadastros" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/categoria">Categoria</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/cliente">Cliente</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/fornecedor">Fornecedor</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/produto">Produto</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/usuario">Usuario</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Operações" id="basic-nav-dropdown">
                        <NavDropdown.Item>Compra</NavDropdown.Item>
                        <NavDropdown.Item>Venda</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Relatórios" id="basic-nav-dropdown">
                        <NavDropdown.Item>Clientes</NavDropdown.Item>
                        <NavDropdown.Item>Fornecedores</NavDropdown.Item>
                        <NavDropdown.Item>Estoque</NavDropdown.Item>
                        <NavDropdown.Item>Vendas</NavDropdown.Item>
                        <NavDropdown.Item>Compras</NavDropdown.Item>
                        <NavDropdown.Item>Categorias</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link>Sobre</Nav.Link>
                    <Nav.Link
                        as={Link} 
                        to="/"
                        onClick={deslogar}
                    >
                        Sair
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
