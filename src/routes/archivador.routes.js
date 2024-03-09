import { Router } from "express";
const router = Router();

import Ctrl from "../controllers/archivador.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.post("/", verifyToken, Ctrl.create);

//router.get("/query", verifyToken, Ctrl.query);

router.get("/:id", verifyToken, Ctrl.getById);

router.get( "/",  verifyToken, Ctrl.getAll);

router.put("/tramite/:id", verifyToken, Ctrl.createTramite);

router.put("/deletetramite/:id", verifyToken, Ctrl.deleteTramite);

router.put("/updatetramite/:id", verifyToken, Ctrl.updateTramite);

//router.delete("/:id", verifyToken, Ctrl.deletes);

//router.put('/activate/:id',verifyToken, Ctrl.activate);

export default router;