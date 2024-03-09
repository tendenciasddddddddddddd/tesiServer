import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/servicio.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.get("/list", Ctrl.getListas);

router.get("/query",verifyToken, Ctrl.query);

router.get("/:id",verifyToken, Ctrl.getById);

router.get("/",verifyToken, Ctrl.get);

router.put("/:paramsId",verifyToken, Ctrl.updateById);

router.delete("/:id",verifyToken, Ctrl.deleteById);

router.post("/",verifyToken, Ctrl.create);

router.put('/activate/:id',verifyToken,Ctrl.activate);

export default router;