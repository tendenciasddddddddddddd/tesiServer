import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Notas/reportes.controller";
import { authJwt } from "../../middlewares";

router.post("/",[ authJwt.verifyToken], Ctrl.promocion);

router.post("/matricula/",[ authJwt.verifyToken], Ctrl.matricula);

router.post("/libretas/",[ authJwt.verifyToken], Ctrl.libretas);

router.post("/juntas/",[ authJwt.verifyToken], Ctrl.juntas);

router.post("/juntasIndividual/",[ authJwt.verifyToken], Ctrl.juntasIndividual);

router.post("/juntasFinal/",[ authJwt.verifyToken], Ctrl.juntasFinal);

router.post("/informe/",[ authJwt.verifyToken], Ctrl.informe);

router.post("/final/",[ authJwt.verifyToken], Ctrl.final);

router.post("/parcial/",[ authJwt.verifyToken], Ctrl.parcial);

router.post("/quimestral/",[ authJwt.verifyToken], Ctrl.quimestral);

router.post("/anual/",[ authJwt.verifyToken], Ctrl.anual);

router.get("/nomina",[authJwt.verifyToken], Ctrl.getNomina);

router.get("/nominaDocentes",[authJwt.verifyToken], Ctrl.getNominaDocente);

router.post("/ambitos",[authJwt.verifyToken], Ctrl.Ambitos);

router.post("/destrezas",[authJwt.verifyToken], Ctrl.Destrezas);

export default router;