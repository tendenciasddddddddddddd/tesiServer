import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Aulas/tareas.controller"
import { authJwt } from "../../middlewares";

router.put("/:id",[ authJwt.verifyToken], Ctrl.create);

router.put("/remover/:paramId",[authJwt.verifyToken], Ctrl.delete); 

router.put("/editar/:paramId",[authJwt.verifyToken], Ctrl.update); 

router.put("/calificar/:paramId",[authJwt.verifyToken], Ctrl.calificar); 

router.put("/show/:paramId",[authJwt.verifyToken], Ctrl.showHidens); 

router.put("/orderAct/:paramId",[authJwt.verifyToken], Ctrl.orderActividad); 

router.put("/removeFile/:paramsId",[authJwt.verifyToken], Ctrl.updateRemoveFile);


export default router;