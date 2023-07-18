import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notifications/telegram.controller";
import { authJwt } from "../../middlewares";
//
router.post("/mensajesby/",[authJwt.verifyToken], Ctrl.sewMensajeByIds);

router.post("/",[authJwt.verifyToken], Ctrl.sewMensajeAll);

export default router;