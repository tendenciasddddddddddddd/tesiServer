import { Router } from "express";
const router = Router();

import * as Ctrl from "../../controllers/Registros/docentes.controller";
import { authJwt,verifySignup } from "../../middlewares";

router.get("/lista", Ctrl.getListasDocentes);

router.get("/query",[authJwt.verifyToken], Ctrl.query);

router.get("/:id",[authJwt.verifyToken], Ctrl.getDocenteById);

router.get("/", [authJwt.verifyToken ], Ctrl.getDocentes);

router.put("/perfil/:usuario",[authJwt.verifyToken], Ctrl.updatePerfil);

router.put('/activate/:id',[authJwt.verifyToken], Ctrl.activate);

router.put("/:usuariosId",[authJwt.verifyToken], Ctrl.updateDocenteById);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteDocenteById);

router.post("/docentesMany", [authJwt.verifyToken], Ctrl.createDocenteMany);

router.post("/",[verifySignup.checkDuplicateUsernameOrEmail, authJwt.verifyToken],Ctrl.createDocentes);

export default router;