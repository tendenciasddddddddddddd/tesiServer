"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _repositorio = _interopRequireDefault(require("../controllers/repositorio.controller"));

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", _repositorio.default.getListas);
router.get("/:id", [_middlewares.authJwt.verifyToken], _repositorio.default.getById);
router.put("/normal/:paramsId", [_middlewares.authJwt.verifyToken], _repositorio.default.updateNormalById);
router.put("/removes/:paramsId", [_middlewares.authJwt.verifyToken], _repositorio.default.updateRemoveById);
router.put("/:paramsId", [_middlewares.authJwt.verifyToken], _repositorio.default.updateById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _repositorio.default.deleteById);
router.post("/", [_middlewares.authJwt.verifyToken], _repositorio.default.create);
var _default = router;
exports.default = _default;