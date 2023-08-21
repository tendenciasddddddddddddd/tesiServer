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
router.post("/informe/", [_middlewares.authJwt.verifyToken], _reportes.default.informe);
var _default = router;
exports.default = _default;