import { Router } from "express";
const router = Router();

import  Ctrl from "../controllers/drive.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.get("/:id",[verifyToken], Ctrl.getList);

router.post("/file/",[verifyToken], Ctrl.createFile);

router.post("/",[verifyToken], Ctrl.create);

router.put("/removeFolder/:id",[verifyToken], Ctrl.removeFolder);

router.put("/removeFile/:id",[verifyToken], Ctrl.removeFile);

router.put("/:id",[verifyToken], Ctrl.updateById);

router.delete("/:id", [verifyToken], Ctrl.remove);

export default router;