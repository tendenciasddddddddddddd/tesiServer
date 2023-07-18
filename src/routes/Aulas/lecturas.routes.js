import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Aulas/lecturas.controller"
import { authJwt } from "../../middlewares";

router.put("/:id",[ authJwt.verifyToken], Ctrl.create);

router.put("/remover/:paramId",[authJwt.verifyToken], Ctrl.delete); 

router.put("/editar/:paramId",[authJwt.verifyToken], Ctrl.update); 

export default router;