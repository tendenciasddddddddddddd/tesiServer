import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Distributivos/tutores.controller";
import { authJwt, verifySignup } from "../../middlewares";

router.get("/lista",[authJwt.verifyToken], Ctrl.getListas);

router.get("/query",[authJwt.verifyToken], Ctrl.query);

router.get("/rep/:id",[authJwt.verifyToken], Ctrl.getByIdReportes);

router.get("/:id",[authJwt.verifyToken], Ctrl.getById);

router.get("/",[authJwt.verifyToken], Ctrl.get);

router.put("/:paramId",[verifySignup.checkDuplicateTutores,authJwt.verifyToken], Ctrl.updateById);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteById);

router.post("/",[verifySignup.checkDuplicateTutores, authJwt.verifyToken], Ctrl.create);

export default router;