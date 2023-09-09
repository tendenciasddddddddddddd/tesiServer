"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _evaluacion = _interopRequireDefault(require("../../controllers/Aulas/evaluacion.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/:id", [_middlewares.authJwt.verifyToken], _evaluacion.default.create);
router.put("/editar/:paramId", [_middlewares.authJwt.verifyToken], _evaluacion.default.update);
router.put("/createPreguntas/:paramId", [_middlewares.authJwt.verifyToken], _evaluacion.default.createPreguntas);
router.put("/updatePreguntas/:paramId", [_middlewares.authJwt.verifyToken], _evaluacion.default.updatePreguntas);
router.put("/resolver/:paramId", [_middlewares.authJwt.verifyToken], _evaluacion.default.resolver);
var _default = router;
exports.default = _default;