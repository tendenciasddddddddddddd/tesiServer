import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notas/reportes.controller";
import { authJwt } from "../../middlewares";

router.post("/",[ authJwt.verifyToken], Ctrl.promocion);

router.post("/matricula/",[ authJwt.verifyToken], Ctrl.matricula);

router.post("/matriculaPdf/",[ authJwt.verifyToken], Ctrl.matriculaPdf);

router.post("/promocionPdf/",[ authJwt.verifyToken], Ctrl.promocionPdf);

router.post("/libretas/",[ authJwt.verifyToken], Ctrl.libretas);

export default router;