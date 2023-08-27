import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notas/subnivel.controller";
import { authJwt } from "../../middlewares";

router.put("/supletorios/:id",[ authJwt.verifyToken],Ctrl.supletorios);

router.put("/proyecto/:id",[ authJwt.verifyToken],Ctrl.proyecto);

router.put("/ajustar/:id",[ authJwt.verifyToken],Ctrl.ajustarPromedios);

router.put("/:id",[ authJwt.verifyToken],Ctrl.create);

export default router;