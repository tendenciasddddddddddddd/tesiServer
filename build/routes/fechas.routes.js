"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _fechas = _interopRequireDefault(require("../controllers/fechas.controller"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", _fechas.default.getListas);
router.put("/:paramsId", [_middlewares.authJwt.verifyToken], _fechas.default.updateById);
var _default = router;
exports.default = _default;