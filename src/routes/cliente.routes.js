import { Router } from "express";
const router = Router();

import * as usuariosCtrl from "../controllers/cliente.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { checkDuplicateClientes } from "../middlewares/verifySignup.js";

router.post("/", [verifyToken, checkDuplicateClientes], usuariosCtrl.create);

router.get("/query", verifyToken, usuariosCtrl.query);

router.get("/list", verifyToken, usuariosCtrl.list);

router.get("/:id", verifyToken, usuariosCtrl.getById);

router.get( "/",  verifyToken, usuariosCtrl.tracks);

router.put("/:id", verifyToken, usuariosCtrl.update);

router.delete("/:id", verifyToken, usuariosCtrl.deletes);

router.put('/activate/:id',verifyToken, usuariosCtrl.activate);

export default router;