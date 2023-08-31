import { Router } from "express";
const router = Router();

import * as Ctrl from "../../controllers/Registros/estudiantes.controller";
import { authJwt,verifySignup } from "../../middlewares";

router.get("/lista", Ctrl.getListasEstudiantes);

router.get("/listaofaulas", Ctrl.getListEstudAulas);

router.get("/query", [authJwt.verifyToken], Ctrl.query);

router.get("/:id", [authJwt.verifyToken], Ctrl.getEstudianteById);

router.get("/",  [authJwt.verifyToken ], Ctrl.getEstudiantes);

router.put('/activate/:id',[authJwt.verifyToken], Ctrl.activate);

router.put("/representante/:usuariosId", [authJwt.verifyToken], Ctrl.updateRepresentante);

router.put("/:usuariosId", [authJwt.verifyToken], Ctrl.updateEstudianteById);

router.delete("/:id", [authJwt.verifyToken], Ctrl.deleteEstudianteById);

router.post("/alumnosMany", [authJwt.verifyToken], Ctrl.createEstudianteMany);

router.post("/actualizar", [authJwt.verifyToken], Ctrl.updateEstudianteMany);

router.post("/",[verifySignup.checkDuplicateEstudiante, authJwt.verifyToken], Ctrl.createEstudiante);


export default router;