"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _hora = _interopRequireDefault(require("../controllers/hora.controller"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", _hora.default.getListas);
router.get("/query", [_middlewares.authJwt.verifyToken], _hora.default.query);
router.get("/:id", [_middlewares.authJwt.verifyToken], _hora.default.getById);
router.get("/", [_middlewares.authJwt.verifyToken], _hora.default.get);
router.put("/:paramsId", [_middlewares.authJwt.verifyToken], _hora.default.updateById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _hora.default.deleteById);
router.post("/", [_middlewares.authJwt.verifyToken], _hora.default.create);
var _default = router;
exports.default = _default;