import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/Reportes/sales.reporte.js";
import { verifyToken } from "../middlewares/authJwt.js";
import  rCaj from "../controllers/Reportes/reCajas.reporte.js";

router.post("/",[ verifyToken], Ctrl.OrdenVenta);

router.post("/abonos",[ verifyToken], Ctrl.Abonos);

router.post("/guias/",[ verifyToken], Ctrl.GuiasRemision);

router.get("/cierrecaja/",[ verifyToken], rCaj.cajaAbierta);

router.post("/historial/",[ verifyToken], rCaj.cajaHistorial);

export default router;