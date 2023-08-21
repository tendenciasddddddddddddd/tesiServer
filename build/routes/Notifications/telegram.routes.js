"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _telegram = _interopRequireDefault(require("../../controllers/Notifications/telegram.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
//
router.post("/mensajesby/", [_middlewares.authJwt.verifyToken], _telegram.default.sewMensajeByIds);
router.post("/", [_middlewares.authJwt.verifyToken], _telegram.default.sewMensajeAll);
var _default = router;
exports.default = _default;