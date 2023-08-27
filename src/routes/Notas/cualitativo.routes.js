import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notas/cualitativo.controller";
import { authJwt } from "../../middlewares";

router.put("/ajustar/:id",[ authJwt.verifyToken],Ctrl.ajustarPromedios);

router.put("/:id",[ authJwt.verifyToken],Ctrl.createCualitativo);

export default router;