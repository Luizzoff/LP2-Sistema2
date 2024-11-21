import { Alert } from "react-bootstrap";
import { useState } from "react";
import Pagina from "../layouts/Pagina";
import FormCadastroCategoria from "./Formularios/FormCadastroCategoria";
import TabelaCategorias from "./Tabelas/TabelaCategorias";

export default function TelaCadastroCategoria(props) {
  const [exibirCategorias, setExibirCategorias] = useState(true);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [categoriaSelecionado, setCategoriaSelecionado] = useState({
    codigo: "",
    descricao: ""
  });

  return (
    <Pagina>
      <Alert className="mt-02 mb-02 success text-center" variant="dark">
        <h2>Cadastro de Categoria</h2>
      </Alert>
      {exibirCategorias ?
        <TabelaCategorias
          setExibirCategorias={setExibirCategorias}
          setCategoriaSelecionado={setCategoriaSelecionado}
          setModoEdicao={setModoEdicao}
        />
        :
        <FormCadastroCategoria
          setExibirCategorias={setExibirCategorias}
          modoEdicao={modoEdicao}
          setModoEdicao={setModoEdicao}
          categoriaSelecionado={categoriaSelecionado}
          setCategoriaSelecionado={setCategoriaSelecionado}
        />
      }
    </Pagina>
  );
}
