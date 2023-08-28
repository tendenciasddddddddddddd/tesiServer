"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ = _interopRequireDefault(require("../../controllers/History/2023.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/:id", [_middlewares.authJwt.verifyToken], _.default.getById);
router.post("/", [_middlewares.authJwt.verifyToken], _.default.promocion);
router.post("/matricula/", [_middlewares.authJwt.verifyToken], _.default.matricula);
router.post("/libretas/", [_middlewares.authJwt.verifyToken], _.default.libretas);
router.post("/juntas/", [_middlewares.authJwt.verifyToken], _.default.juntas);
router.post("/juntasIndividual/", [_middlewares.authJwt.verifyToken], _.default.juntasIndividual);
router.post("/juntasFinal/", [_middlewares.authJwt.verifyToken], _.default.juntasFinal);
router.post("/informe/", [_middlewares.authJwt.verifyToken], _.default.informe);
router.post("/final/", [_middlewares.authJwt.verifyToken], _.default.final);
router.post("/parcial/", [_middlewares.authJwt.verifyToken], _.default.parcial);
router.post("/quimestral/", [_middlewares.authJwt.verifyToken], _.default.quimestral);
router.post("/anual/", [_middlewares.authJwt.verifyToken], _.default.anual);
router.post("/ambitos", [_middlewares.authJwt.verifyToken], _.default.Ambitos);
router.post("/destrezas", [_middlewares.authJwt.verifyToken], _.default.Destrezas);
var _default = router;
exports.default = _default;