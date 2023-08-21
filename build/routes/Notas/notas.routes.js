"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _notas = _interopRequireDefault(require("../../controllers/Notas/notas.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/iniciales/:id", [_middlewares.authJwt.verifyToken], _notas.default.iniciales);
router.put("/cualitativo/:id", [_middlewares.authJwt.verifyToken], _notas.default.createCualitativo);
router.put("/supletorios/:id", [_middlewares.authJwt.verifyToken], _notas.default.supletorios);
router.put("/ajustar/:id", [_middlewares.authJwt.verifyToken], _notas.default.ajustarPromedios);
router.put("/:id", [_middlewares.authJwt.verifyToken], _notas.default.create);
var _default = router;
exports.default = _default;