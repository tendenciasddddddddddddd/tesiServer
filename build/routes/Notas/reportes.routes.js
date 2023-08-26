"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _reportes = _interopRequireDefault(require("../../controllers/Notas/reportes.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post("/", [_middlewares.authJwt.verifyToken], _reportes.default.promocion);
router.post("/matricula/", [_middlewares.authJwt.verifyToken], _reportes.default.matricula);
router.post("/matriculaPdf/", [_middlewares.authJwt.verifyToken], _reportes.default.matriculaPdf);
router.post("/promocionPdf/", [_middlewares.authJwt.verifyToken], _reportes.default.promocionPdf);
router.post("/libretas/", [_middlewares.authJwt.verifyToken], _reportes.default.libretas);
router.post("/juntas/", [_middlewares.authJwt.verifyToken], _reportes.default.juntas);
router.post("/juntasIndividual/", [_middlewares.authJwt.verifyToken], _reportes.default.juntasIndividual);
router.post("/juntasFinal/", [_middlewares.authJwt.verifyToken], _reportes.default.juntasFinal);
router.post("/informe/", [_middlewares.authJwt.verifyToken], _reportes.default.informe);
router.post("/final/", [_middlewares.authJwt.verifyToken], _reportes.default.final);
router.post("/parcial/", [_middlewares.authJwt.verifyToken], _reportes.default.parcial);
router.post("/quimestral/", [_middlewares.authJwt.verifyToken], _reportes.default.quimestral);
router.post("/anual/", [_middlewares.authJwt.verifyToken], _reportes.default.anual);
router.get("/nomina", [_middlewares.authJwt.verifyToken], _reportes.default.getNomina);
router.get("/nominaDocentes", [_middlewares.authJwt.verifyToken], _reportes.default.getNominaDocente);
router.post("/ambitos", [_middlewares.authJwt.verifyToken], _reportes.default.Ambitos);
router.post("/destrezas", [_middlewares.authJwt.verifyToken], _reportes.default.Destrezas);
var _default = router;
exports.default = _default;