import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Aulas/foros.controller"
import { authJwt } from "../../middlewares";

router.put("/:id",[ authJwt.verifyToken], Ctrl.create);

router.put("/editar/:paramId",[authJwt.verifyToken], Ctrl.update);

//======================FOROS EN GENERAL =================

router.put("/publishOne/:paramId",[authJwt.verifyToken], Ctrl.publishOne); 

router.put("/publishTwo/:paramId",[authJwt.verifyToken], Ctrl.publishTwo); 

router.put("/clickLike/:paramId",[authJwt.verifyToken], Ctrl.clickLike); 

router.put("/clickNoLike/:paramId",[authJwt.verifyToken], Ctrl.clickNoLike); 

router.put("/removeLike/:paramId",[authJwt.verifyToken], Ctrl.removeLike); 

router.put("/removeNoLike/:paramId",[authJwt.verifyToken], Ctrl.removeNoLike);  

router.put("/removeForoOne/:paramId",[authJwt.verifyToken], Ctrl.removeForoOne);

router.put("/removeForoTwo/:paramId",[authJwt.verifyToken], Ctrl.removeForoTwo);

export default router;