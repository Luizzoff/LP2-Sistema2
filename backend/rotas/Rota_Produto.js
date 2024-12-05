import { Router } from 'express';
import Controle_Produto from "../controle/Controle_Produto.js";

const produtoCtrl = new Controle_Produto();
const rota = Router();

rota
.get("/", produtoCtrl.consultar)
.get("/:codigo", produtoCtrl.consultar)
.post("/", produtoCtrl.gravar)
.put("/:codigo", produtoCtrl.atualizar)
.patch("/:codigo", produtoCtrl.atualizar)
.delete("/:codigo", produtoCtrl.deletar);

export default rota;