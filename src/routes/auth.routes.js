import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/authJwt.js";

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", [verifyToken], authCtrl.veficUser);


router.post("/signin", authCtrl.signin);

router.post("/cuenta", authCtrl.cuenta);

router.post("/resetPassword", authCtrl.resetPassword);

router.post("/forgotPassword", authCtrl.forgotPassword);

router.post("/GoogleAuthApis", authCtrl.googleAuthApi);

router.put("/newPassUser/:cuentaId", authCtrl.newPassword);


export default router;