"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _notificacion = _interopRequireDefault(require("../../controllers/Notifications/notificacion.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
//
router.post("/mensajesby/", [_middlewares.authJwt.verifyToken], _notificacion.default.sewMensajeByIds);
router.post("/mensajes/", [_middlewares.authJwt.verifyToken], _notificacion.default.sewMensaje);
router.put("/estudiante/:usuario", [_middlewares.authJwt.verifyToken], _notificacion.default.crearSubcripcionEstudiantes);
router.put("/:usuario", [_middlewares.authJwt.verifyToken], _notificacion.default.CrearSubcripcion);
var _default = router;
exports.default = _default;