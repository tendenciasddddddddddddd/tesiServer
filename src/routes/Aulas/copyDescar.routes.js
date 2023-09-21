import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Aulas/copyDesacar.controller";
import { authJwt } from "../../middlewares";

router.post("/tareas/",[ authJwt.verifyToken], Ctrl.tareas);

router.put("/actividad/:paramId",[authJwt.verifyToken], Ctrl.copyActividad); 

export default router;