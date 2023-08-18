import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notas/notas.controller";
import { authJwt } from "../../middlewares";

router.put("/iniciales/:id",[ authJwt.verifyToken],Ctrl.iniciales);

router.put("/cualitativo/:id",[ authJwt.verifyToken],Ctrl.createCualitativo);

router.put("/supletorios/:id",[ authJwt.verifyToken],Ctrl.supletorios);

router.put("/ajustar/:id",[ authJwt.verifyToken],Ctrl.ajustarPromedios);

router.put("/:id",[ authJwt.verifyToken],Ctrl.create);

export default router;