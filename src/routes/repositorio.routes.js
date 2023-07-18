import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/repositorio.controller";
import { authJwt } from "../middlewares";

router.get("/lista", Ctrl.getListas);

router.get("/:id",[authJwt.verifyToken], Ctrl.getById);

router.put("/normal/:paramsId",[authJwt.verifyToken], Ctrl.updateNormalById);

router.put("/removes/:paramsId",[authJwt.verifyToken], Ctrl.updateRemoveById);

router.put("/:paramsId",[authJwt.verifyToken], Ctrl.updateById);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteById);

router.post("/",[authJwt.verifyToken], Ctrl.create);

export default router;