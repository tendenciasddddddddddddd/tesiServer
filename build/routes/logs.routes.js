"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _logs = _interopRequireDefault(require("../controllers/logs.controller"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/query", [_middlewares.authJwt.verifyToken], _logs.default.queryLogin);
router.get("/queryNota", [_middlewares.authJwt.verifyToken], _logs.default.queryNotas);
router.get("/", [_middlewares.authJwt.verifyToken], _logs.default.get);
router.get("/all/", [_middlewares.authJwt.verifyToken], _logs.default.getNotas);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _logs.default.deleteLoginById);
router.delete("/notas/:id", [_middlewares.authJwt.verifyToken], _logs.default.deleteNotasById);
var _default = router;
exports.default = _default;