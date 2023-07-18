import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Registros/autoriades.controller";
import { authJwt } from "../../middlewares";

router.get("/lista",[authJwt.verifyToken], Ctrl.getListas);

router.put("/:paramId",[authJwt.verifyToken], Ctrl.updateById);

export default router;