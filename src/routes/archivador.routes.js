import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/Archives/archivo.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.get('/list',[verifyToken],Ctrl.getListas);

router.get('/listFin',[verifyToken],Ctrl.getListasFinalizados);

router.get("/:id",[verifyToken], Ctrl.getById);

router.post("/",[verifyToken], Ctrl.create);

router.put("/requerimiento/:id",[verifyToken], Ctrl.createRequerimiento);

router.put("/updateRequerimiento/:id",[verifyToken], Ctrl.updateRequerimiento);

router.put("/eliminar/:id",[verifyToken], Ctrl.remove);

router.put("/abona/:id",[verifyToken], Ctrl.updateAbona);

router.put("/:id",[verifyToken], Ctrl.updateById);

router.delete("/:id", [verifyToken], Ctrl.remove);

router.put("/removeRequerimiento/:id",[verifyToken], Ctrl.removeRequerimiento);

router.put("/removePagos/:id",[verifyToken], Ctrl.deleteAbonos);

export default router;