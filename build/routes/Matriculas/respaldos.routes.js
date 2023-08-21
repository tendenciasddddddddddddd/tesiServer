"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _respaldos = _interopRequireDefault(require("../../controllers/Matricula/respaldos.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/:id", [_middlewares.authJwt.verifyToken], _respaldos.default.getRespaldoById);
router.get("/cambio/:id", [_middlewares.authJwt.verifyToken], _respaldos.default.getById);
var _default = router;
exports.default = _default;