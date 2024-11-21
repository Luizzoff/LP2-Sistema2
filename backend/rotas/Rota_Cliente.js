import { Router } from "express";
import Controle_Cliente from "../controle/Controle_Cliente.js";

const clienteCtrl = new Controle_Cliente();
const rota = Router();

rota.get("/",clienteCtrl.consultar)
.get("/:cpf", clienteCtrl.consultar)
.post("/", clienteCtrl.gravar)
.put("/", clienteCtrl.atualizar)
.patch("/", clienteCtrl.atualizar)
.delete("/", clienteCtrl.excluir);

export default rota;