import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/Archives/archivo.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.get('/list',[verifyToken],Ctrl.getListas);

router.get('/query',[verifyToken],Ctrl.query);

router.get("/final",[verifyToken], Ctrl.getAllFinalizado);

router.get("/entrega",[verifyToken], Ctrl.getAllEntregado);

router.get("/",[verifyToken], Ctrl.getAll);

router.get("/:id",[verifyToken], Ctrl.getById);

router.post("/file/",[verifyToken], Ctrl.createFile);

router.post("/",[verifyToken], Ctrl.create);

router.put("/carpeta/:id",[verifyToken], Ctrl.createCarpeta);

router.put("/archivo/:id",[verifyToken], Ctrl.createArchivos);

router.put("/subarchivo/:id",[verifyToken], Ctrl.createSubArchivos);

router.put("/eliminar/:id",[verifyToken], Ctrl.remove);

router.put("/abona/:id",[verifyToken], Ctrl.updateAbona);

router.put("/:id",[verifyToken], Ctrl.updateById);

router.delete("/:id", [verifyToken], Ctrl.remove);

router.delete("/eliminarPago/:id", [verifyToken], Ctrl.deleteAbonos);

router.delete("/carpeta/:id", [verifyToken], Ctrl.removeFolder);

router.delete("/archivo/:id", [verifyToken], Ctrl.removeArchivo);

router.put("/removeSubArchivo/:id",[verifyToken], Ctrl.removeSubArchivo);

export default router;