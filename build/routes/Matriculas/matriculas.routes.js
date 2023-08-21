"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _matriculas = _interopRequireDefault(require("../../controllers/Matricula/matriculas.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/listaNotas", [_middlewares.authJwt.verifyToken], _matriculas.default.getListaCursoNotas);
router.get("/lista", [_middlewares.authJwt.verifyToken], _matriculas.default.getListaFilter);
router.get("/secuencia", _matriculas.default.getSecuencia);
router.get("/nomina", _matriculas.default.getNomina);
router.get("/mynota/:id", [_middlewares.authJwt.verifyToken], _matriculas.default.getByIdCalificaciones);
router.get("/:id", [_middlewares.authJwt.verifyToken], _matriculas.default.getById);
router.get("/respaldo/:id", [_middlewares.authJwt.verifyToken], _matriculas.default.getRespaldoById);
router.post("/deleteMatricula", [_middlewares.authJwt.verifyToken], _matriculas.default.deleteByIds);
router.post("/cambiarParalelo", [_middlewares.authJwt.verifyToken], _matriculas.default.cambiarParalelo);
router.post("/", [_middlewares.authJwt.verifyToken], _matriculas.default.create);
var _default = router;
exports.default = _default;