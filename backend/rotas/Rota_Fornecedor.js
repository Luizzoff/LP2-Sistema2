import { Router } from "express";
import Controle_Fornecedor from "../controle/Controle_Fornecedor.js";

const fornecedorCtrl = new Controle_Fornecedor();
const rota = Router();

rota.get("/",fornecedorCtrl.consultar)
.get("/:cnpj", fornecedorCtrl.consultar)
.post("/", fornecedorCtrl.gravar)
.put("/", fornecedorCtrl.atualizar)
.patch("/", fornecedorCtrl.atualizar)
.delete("/", fornecedorCtrl.excluir);

export default rota;