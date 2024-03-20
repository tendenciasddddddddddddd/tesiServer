import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Cajas/cajas.controller.js";
import { verifyToken } from "../../middlewares/authJwt.js";
//import { authJwt,verifySignup } from "../../middlewares.js";

router.post('/',[verifyToken], Ctrl.add);
router.get('/confirm',[verifyToken],Ctrl.getConfirm);
router.get('/',[verifyToken],Ctrl.list);
router.get('/:id',[verifyToken],Ctrl.getById);
router.put('/cerrar/:paramsId',[verifyToken],Ctrl.cerrarCaja);
router.put('/:paramsId',[verifyToken],Ctrl.update);
router.delete('/:id',[verifyToken],Ctrl.remove);

export default router;