"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _autoriades = _interopRequireDefault(require("../../controllers/Registros/autoriades.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", [_middlewares.authJwt.verifyToken], _autoriades.default.getListas);
router.put("/:paramId", [_middlewares.authJwt.verifyToken], _autoriades.default.updateById);
var _default = router;
exports.default = _default;