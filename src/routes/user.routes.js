import { Router } from "express";
const router = Router();

import * as usuariosCtrl from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";
import { checkUsernameCedula, checkUsernameEmail } from "../middlewares/verifySignup.js";


router.post("/", [verifyToken, checkUsernameCedula, checkUsernameEmail], usuariosCtrl.createUser);

router.get("/buscadorusuarioss", [verifyToken], usuariosCtrl.getBuscadorUsuarios);

router.get("/newrol", [verifyToken], usuariosCtrl.getRoles);

router.get("/list", [verifyToken], usuariosCtrl.getLista);

router.get("/query", [verifyToken], usuariosCtrl.query);

router.get("/:id", [verifyToken], usuariosCtrl.getUsuariosById);

router.put("/role/:usuariosId", [verifyToken], usuariosCtrl.updateRole);

router.put("/:usuariosId", [verifyToken], usuariosCtrl.updateUsuariosById);

router.delete("/:id", [verifyToken], usuariosCtrl.deleteUsuariosById);

router.put('/activate/:id',[verifyToken], usuariosCtrl.activate);

export default router;