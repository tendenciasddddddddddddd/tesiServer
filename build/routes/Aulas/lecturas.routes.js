"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _lecturas = _interopRequireDefault(require("../../controllers/Aulas/lecturas.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/:id", [_middlewares.authJwt.verifyToken], _lecturas.default.create);
router.put("/remover/:paramId", [_middlewares.authJwt.verifyToken], _lecturas.default.delete);
router.put("/editar/:paramId", [_middlewares.authJwt.verifyToken], _lecturas.default.update);
var _default = router;
exports.default = _default;