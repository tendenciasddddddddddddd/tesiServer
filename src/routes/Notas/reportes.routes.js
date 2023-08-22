import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notas/reportes.controller";
import { authJwt } from "../../middlewares";

router.post("/",[ authJwt.verifyToken], Ctrl.promocion);

router.post("/matricula/",[ authJwt.verifyToken], Ctrl.matricula);

router.post("/matriculaPdf/",[ authJwt.verifyToken], Ctrl.matriculaPdf);

router.post("/promocionPdf/",[ authJwt.verifyToken], Ctrl.promocionPdf);

router.post("/libretas/",[ authJwt.verifyToken], Ctrl.libretas);

router.post("/juntas/",[ authJwt.verifyToken], Ctrl.juntas);

router.post("/informe/",[ authJwt.verifyToken], Ctrl.informe);

router.post("/final/",[ authJwt.verifyToken], Ctrl.final);

router.post("/parcial/",[ authJwt.verifyToken], Ctrl.parcial);

router.post("/quimestral/",[ authJwt.verifyToken], Ctrl.quimestral);

router.post("/anual/",[ authJwt.verifyToken], Ctrl.anual);

export default router;