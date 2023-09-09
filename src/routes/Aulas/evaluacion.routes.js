import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Aulas/evaluacion.controller"
import { authJwt } from "../../middlewares";

router.put("/:id",[ authJwt.verifyToken], Ctrl.create);

router.put("/editar/:paramId",[authJwt.verifyToken], Ctrl.update); 

router.put("/createPreguntas/:paramId",[authJwt.verifyToken], Ctrl.createPreguntas); 

router.put("/updatePreguntas/:paramId",[authJwt.verifyToken], Ctrl.updatePreguntas);

router.put("/resolver/:paramId",[authJwt.verifyToken], Ctrl.resolver);

export default router;