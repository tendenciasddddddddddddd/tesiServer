import { Router } from "express";
const router = Router();

import  Ctrl from "../../controllers/Registros/agencia.controller.js";
import { verifyToken } from "../../middlewares/authJwt.js";

router.get('/',[verifyToken],Ctrl.list);
router.put('/:id',[verifyToken],Ctrl.update);

export default router;