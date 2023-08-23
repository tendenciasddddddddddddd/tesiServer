import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Matricula/matriculas.controller";
import { authJwt } from "../../middlewares";

router.get("/listaNotas",[authJwt.verifyToken], Ctrl.getListaCursoNotas);

router.get("/lista",[authJwt.verifyToken], Ctrl.getListaFilter);

router.get("/secuencia", Ctrl.getSecuencia);

router.get("/nomina", Ctrl.getNomina);

router.get("/mynota/:id",[authJwt.verifyToken], Ctrl.getByIdCalificaciones);

router.get("/:id",[authJwt.verifyToken], Ctrl.getById);

router.get("/reportes/:id",[authJwt.verifyToken], Ctrl.getByIdReportes);

router.get("/respaldo/:id",[authJwt.verifyToken], Ctrl.getRespaldoById);

router.post("/deleteMatricula",[ authJwt.verifyToken], Ctrl.deleteByIds);

router.post("/cambiarParalelo",[ authJwt.verifyToken], Ctrl.cambiarParalelo);

router.post("/",[ authJwt.verifyToken], Ctrl.create);


export default router;