import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Aulas/videos.controller"
import { authJwt } from "../../middlewares";

router.put("/:id",[ authJwt.verifyToken], Ctrl.create);

router.put("/remover/:paramId",[authJwt.verifyToken], Ctrl.delete); 

router.put("/editar/:paramId",[authJwt.verifyToken], Ctrl.update); 

router.put("/foro/:paramId",[authJwt.verifyToken], Ctrl.updateForo); 

router.put("/subforo/:paramId",[authJwt.verifyToken], Ctrl.updateSubForo); 

router.put("/like/:paramId",[authJwt.verifyToken], Ctrl.updateLike); 

router.put("/removelike/:paramId",[authJwt.verifyToken], Ctrl.removeLikeForo); 


router.put("/removeNolike/:paramId",[authJwt.verifyToken], Ctrl.removeNoLikeForo); 

router.put("/nolike/:paramId",[authJwt.verifyToken], Ctrl.updateNoLike); 

router.put("/removeforo/:paramId",[authJwt.verifyToken], Ctrl.removeForo);

router.put("/removesubforo/:paramId",[authJwt.verifyToken], Ctrl.removeSubForo);

router.put("/removeFile/:paramsId",[authJwt.verifyToken], Ctrl.updateRemoveFile);

export default router;