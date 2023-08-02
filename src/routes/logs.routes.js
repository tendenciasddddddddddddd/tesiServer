import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/logs.controller";
import { authJwt } from "../middlewares";

router.get("/query",[authJwt.verifyToken], Ctrl.queryLogin);

router.get("/queryNota",[authJwt.verifyToken], Ctrl.queryNotas);

router.get("/",[authJwt.verifyToken], Ctrl.get);

router.get("/all/",[authJwt.verifyToken], Ctrl.getNotas);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteLoginById);

router.delete("/notas/:id",[authJwt.verifyToken], Ctrl.deleteNotasById);

export default router;