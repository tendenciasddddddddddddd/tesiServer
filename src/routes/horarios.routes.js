import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/horarios.controller";
import { authJwt } from "../middlewares";

router.post("/",[ authJwt.verifyToken], Ctrl.create);

router.get("/lista",[authJwt.verifyToken], Ctrl.getListas);

router.delete("/:id",[authJwt.verifyToken], Ctrl.deleteById);


export default router;