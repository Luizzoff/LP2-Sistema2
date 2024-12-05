import { Router } from "express";
import Controle_Usuario from "../controle/Controle_Usuario.js";

const usuarioCtrl = new Controle_Usuario();
const rota = Router();

rota
.get("/", usuarioCtrl.consultar)
.get("/:termo", usuarioCtrl.consultar)
.post("/login", usuarioCtrl.login)
.post("/", usuarioCtrl.gravar)
.put("/", usuarioCtrl.atualizar)
.patch("/", usuarioCtrl.atualizar)
.delete("/", usuarioCtrl.excluir);

export default rota;