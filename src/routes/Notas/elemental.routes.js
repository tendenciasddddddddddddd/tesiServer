import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notas/elemen.controller";
import { authJwt } from "../../middlewares";

router.put("/ajustar/:id",[ authJwt.verifyToken],Ctrl.ajustarPromedios);

router.put("/:id",[ authJwt.verifyToken],Ctrl.create);

export default router;