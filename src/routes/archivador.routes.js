import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/Archives/archivo.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.get('/query',[verifyToken],Ctrl.query);

router.get("/",[verifyToken], Ctrl.getAll);

router.get("/:id",[verifyToken], Ctrl.getById);

router.post("/file/",[verifyToken], Ctrl.createFile);

router.post("/",[verifyToken], Ctrl.create);

router.put("/eliminar/:id",[verifyToken], Ctrl.remove);

router.put("/abona/:id",[verifyToken], Ctrl.updateAbona);

router.put("/:id",[verifyToken], Ctrl.updateById);

router.delete("/:id", [verifyToken], Ctrl.remove);

router.delete("/eliminarPago/:id", [verifyToken], Ctrl.deleteAbonos);

export default router;