import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Matricula/respaldos.controller";
import { authJwt } from "../../middlewares";

router.get("/:id",[authJwt.verifyToken], Ctrl.getRespaldoById);

router.get("/cambio/:id",[authJwt.verifyToken], Ctrl.getById);

export default router;