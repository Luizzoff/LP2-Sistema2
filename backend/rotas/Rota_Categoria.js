import { Router } from 'express';
import Controle_Categoria from '../controle/Controle_Categoria.js';

const categoriaCtrl = new Controle_Categoria();
const rota = Router();

rota
.get("/", categoriaCtrl.consultar)
.get("/:codigo", categoriaCtrl.consultar)
.post("/", categoriaCtrl.gravar)
.put("/:codigo", categoriaCtrl.atualizar)
.patch("/:codigo", categoriaCtrl.atualizar)
.delete("/:codigo", categoriaCtrl.deletar);

export default rota;