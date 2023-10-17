"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _estadistica = _interopRequireDefault(require("../../controllers/Estadistica/estadistica.controlles"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/curso/:id", [_middlewares.authJwt.verifyToken], _estadistica.default.getByCurso);
var _default = router;
exports.default = _default;