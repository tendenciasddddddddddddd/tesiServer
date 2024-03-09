import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/repositorio.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.get("/lista", Ctrl.getListas);

router.get("/:id",verifyToken, Ctrl.getById);

router.put("/normal/:paramsId",verifyToken, Ctrl.updateNormalById);

router.put("/removes/:paramsId",verifyToken, Ctrl.updateRemoveById);

router.put("/:paramsId",verifyToken, Ctrl.updateById);

router.delete("/:id",verifyToken, Ctrl.deleteById);

router.post("/",verifyToken, Ctrl.create);

export default router;