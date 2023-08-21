"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _libros = _interopRequireDefault(require("../../controllers/Aulas/libros.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/:id", [_middlewares.authJwt.verifyToken], _libros.default.create);
router.put("/remover/:paramId", [_middlewares.authJwt.verifyToken], _libros.default.delete);
router.put("/editar/:paramId", [_middlewares.authJwt.verifyToken], _libros.default.update);
router.put("/removeFile/:paramsId", [_middlewares.authJwt.verifyToken], _libros.default.updateRemoveFile);
var _default = router;
exports.default = _default;