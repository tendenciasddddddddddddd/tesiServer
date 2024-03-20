import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Cajas/historial.controller.js";
import { verifyToken } from "../../middlewares/authJwt.js";

router.get('/query',[verifyToken],Ctrl.query);
router.get('/',[verifyToken],Ctrl.list);
router.get('/:id',[verifyToken],Ctrl.getById);
router.put('/:paramsId',[verifyToken],Ctrl.update);
router.delete('/:id',[verifyToken],Ctrl.remove);

export default router;