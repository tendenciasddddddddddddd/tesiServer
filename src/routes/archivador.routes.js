import { Router } from "express";
const router = Router();

import Ctrl from "../controllers/archivador.controller";
import { authJwt } from "../middlewares";

router.post("/", [authJwt.verifyToken], Ctrl.create);

//router.get("/query", [authJwt.verifyToken], Ctrl.query);

router.get("/:id", [authJwt.verifyToken], Ctrl.getById);

router.get( "/",  [authJwt.verifyToken], Ctrl.getAll);

router.put("/tramite/:id", [authJwt.verifyToken], Ctrl.createTramite);

router.put("/deletetramite/:id", [authJwt.verifyToken], Ctrl.deleteTramite);

router.put("/updatetramite/:id", [authJwt.verifyToken], Ctrl.updateTramite);

//router.delete("/:id", [authJwt.verifyToken], Ctrl.deletes);

//router.put('/activate/:id',[authJwt.verifyToken], Ctrl.activate);

export default router;