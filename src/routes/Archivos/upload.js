import { Router } from "express";
const router = Router();
import * as filesCtrl from "../../controllers/Archivos/upload.controller";

router.post( '/videos', filesCtrl.upload2, filesCtrl.submitVideos)

router.post( '/aulas', filesCtrl.upload, filesCtrl.submitFilesAulas)

router.post( '/planificacion', filesCtrl.upload, filesCtrl.submitFilesPlanificacion)

router.post( '/tareas', filesCtrl.upload, filesCtrl.resizeImages2)

router.post( `/`, filesCtrl.upload, filesCtrl.resizeImages)

router.delete("/", filesCtrl.eliminar);


export default router;