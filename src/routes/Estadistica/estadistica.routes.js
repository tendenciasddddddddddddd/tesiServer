import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Estadistica/estadistica.controlles";
import { authJwt } from "../../middlewares";

router.get("/curso/:id",[authJwt.verifyToken], Ctrl.getByCurso);


export default router;