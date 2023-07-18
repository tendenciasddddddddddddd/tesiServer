import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Distributivos/distributivo.controller";
import { authJwt, verifySignup } from "../../middlewares";

router.get("/lista",[authJwt.verifyToken], Ctrl.getListas);

router.get("/query",[authJwt.verifyToken], Ctrl.query);

router.get("/:id",[authJwt.verifyToken], Ctrl.getById);

router.get("/",[authJwt.verifyToken], Ctrl.get);

router.put("/progreso/:paramId",[authJwt.verifyToken], Ctrl.updateProgressById);

router.put("/:paramId",[verifySignup.checkDuplicateDistributivo,authJwt.verifyToken], Ctrl.updateById);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteById);

router.post("/",[verifySignup.checkDuplicateDistributivo, authJwt.verifyToken], Ctrl.create);

router.put('/activate/:id',[authJwt.verifyToken],Ctrl.activate);

export default router;