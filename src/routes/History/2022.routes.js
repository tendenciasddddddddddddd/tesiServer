import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/History/2022.controller";
import { authJwt } from "../../middlewares";

router.get("/:id",[authJwt.verifyToken], Ctrl.getById);

router.post("/",[ authJwt.verifyToken], Ctrl.promocion);

router.post("/matricula/",[ authJwt.verifyToken], Ctrl.matricula);

router.post("/libretas/",[ authJwt.verifyToken], Ctrl.libretas);

router.post("/juntas/",[ authJwt.verifyToken], Ctrl.juntas);

router.post("/consolidado/",[ authJwt.verifyToken], Ctrl.finConsolidado);

export default router;