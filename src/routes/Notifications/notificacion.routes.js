import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notifications/notificacion.controller";
import { authJwt } from "../../middlewares";
//
router.post("/mensajesby/",[authJwt.verifyToken], Ctrl.sewMensajeByIds);

router.post("/mensajes/",[authJwt.verifyToken], Ctrl.sewMensaje);

router.put("/estudiante/:usuario",[authJwt.verifyToken], Ctrl.crearSubcripcionEstudiantes);

router.put("/:usuario",[authJwt.verifyToken], Ctrl.CrearSubcripcion);

export default router;