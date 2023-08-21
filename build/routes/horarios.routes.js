"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _horarios = _interopRequireDefault(require("../controllers/horarios.controller"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post("/", [_middlewares.authJwt.verifyToken], _horarios.default.create);
router.get("/lista", [_middlewares.authJwt.verifyToken], _horarios.default.getListas);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _horarios.default.deleteById);
var _default = router;
exports.default = _default;