import { Router } from "express";
const router = Router();

import * as usuariosCtrl from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.get("/buscadorusuarioss", [verifyToken], usuariosCtrl.getBuscadorUsuarios);

router.get("/newrol", [verifyToken], usuariosCtrl.getRoles);

router.get("/query", [verifyToken], usuariosCtrl.query);

router.get("/:id", [verifyToken], usuariosCtrl.getUsuariosById);

router.get( "/",  [verifyToken], usuariosCtrl.getUsuarios);

router.put("/:usuariosId", [verifyToken], usuariosCtrl.updateUsuariosById);

router.delete("/:id", [verifyToken], usuariosCtrl.deleteUsuariosById);

router.put('/activate/:id',[verifyToken], usuariosCtrl.activate);

export default router;