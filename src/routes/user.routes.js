import { Router } from "express";
const router = Router();

import * as usuariosCtrl from "../controllers/user.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken], usuariosCtrl.create);

router.get("/newrol", [authJwt.verifyToken], usuariosCtrl.getRoles);

router.get("/query", [authJwt.verifyToken], usuariosCtrl.query);

router.get("/:id", [authJwt.verifyToken], usuariosCtrl.getById);

router.get( "/",  [authJwt.verifyToken], usuariosCtrl.gets);

router.put("/:id", [authJwt.verifyToken], usuariosCtrl.update);

router.put("/perfil/:id", [authJwt.verifyToken], usuariosCtrl.updatePerfil);

router.delete("/:id", [authJwt.verifyToken], usuariosCtrl.deletes);

router.put('/activate/:id',[authJwt.verifyToken], usuariosCtrl.activate);

export default router;