import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/fechas.controller";
import { authJwt } from "../middlewares";

router.get("/lista", Ctrl.getListas);

router.put("/:paramsId",[authJwt.verifyToken], Ctrl.updateById);

export default router;