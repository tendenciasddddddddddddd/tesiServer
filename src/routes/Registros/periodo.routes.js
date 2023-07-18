import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Registros/periodo.controller";
import { authJwt } from "../../middlewares";

router.get("/lista", Ctrl.getListas);

router.get("/query",[authJwt.verifyToken], Ctrl.query);

router.get("/:id",[authJwt.verifyToken], Ctrl.getById);

router.get("/",[authJwt.verifyToken], Ctrl.get);

router.put("/:paramsId",[authJwt.verifyToken], Ctrl.updateById);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteById);

router.post("/",[authJwt.verifyToken], Ctrl.create);

router.put('/activate/:id',[authJwt.verifyToken],Ctrl.activate);

export default router;