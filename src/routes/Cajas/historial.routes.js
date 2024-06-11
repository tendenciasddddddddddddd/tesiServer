import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Cajas/historial.controller.js";
import { verifyToken } from "../../middlewares/authJwt.js";

router.get('/',[verifyToken],Ctrl.list);
router.get('/:id',[verifyToken],Ctrl.getById);
router.delete('/:id',[verifyToken],Ctrl.remove);

export default router;