"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _copyDesacar = _interopRequireDefault(require("../../controllers/Aulas/copyDesacar.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post("/tareas/", [_middlewares.authJwt.verifyToken], _copyDesacar.default.tareas);
router.put("/actividad/:paramId", [_middlewares.authJwt.verifyToken], _copyDesacar.default.copyActividad);
var _default = router;
exports.default = _default;