import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Aulas/aulas.controller"
import { authJwt } from "../../middlewares";

router.post("/",[ authJwt.verifyToken], Ctrl.create);

router.put("/estudiantes/:id",[ authJwt.verifyToken], Ctrl.insertEstudiantes);

router.get("/lista",[authJwt.verifyToken], Ctrl.getLista);

router.get("/calendario/:id",[authJwt.verifyToken], Ctrl.getByListCalendario);

router.get("/aulasNotas/:id",[authJwt.verifyToken], Ctrl.getByListNotas);

router.get("/:id",[authJwt.verifyToken], Ctrl.getById);

router.get("/conf/:id",[authJwt.verifyToken], Ctrl.getByConfigCourse);

router.get("/listaestudiantes/:id",[authJwt.verifyToken], Ctrl.getByListEstudiantes);

router.get("/",[authJwt.verifyToken], Ctrl.getAll);

router.put("/removestudiante/:paramId",[authJwt.verifyToken], Ctrl.deleteEstudiante); //EDITARMOS DATOS DE LA TAREA

router.put("/:id",[authJwt.verifyToken], Ctrl.update);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteById);


export default router;