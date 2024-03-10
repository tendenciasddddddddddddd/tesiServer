import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/Reportes/sales.reporte.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.post("/",[ verifyToken], Ctrl.OrdenVenta);

router.post("/guias/",[ verifyToken], Ctrl.GuiasRemision);

export default router;