"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _tareas = _interopRequireDefault(require("../../controllers/Aulas/tareas.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/:id", [_middlewares.authJwt.verifyToken], _tareas.default.create);
router.put("/remover/:paramId", [_middlewares.authJwt.verifyToken], _tareas.default.delete);
router.put("/editar/:paramId", [_middlewares.authJwt.verifyToken], _tareas.default.update);
router.put("/calificar/:paramId", [_middlewares.authJwt.verifyToken], _tareas.default.calificar);
router.put("/show/:paramId", [_middlewares.authJwt.verifyToken], _tareas.default.showHidens);
router.put("/orderAct/:paramId", [_middlewares.authJwt.verifyToken], _tareas.default.orderActividad);
router.put("/removeFile/:paramsId", [_middlewares.authJwt.verifyToken], _tareas.default.updateRemoveFile);
var _default = router;
exports.default = _default;