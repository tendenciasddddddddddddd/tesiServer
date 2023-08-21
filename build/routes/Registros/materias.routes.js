"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _materias = _interopRequireDefault(require("../../controllers/Registros/materias.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", _materias.default.getListas);
router.get("/query", [_middlewares.authJwt.verifyToken], _materias.default.query);
router.get("/:id", [_middlewares.authJwt.verifyToken], _materias.default.getById);
router.get("/", [_middlewares.authJwt.verifyToken], _materias.default.get);
router.put("/:paramsId", [_middlewares.authJwt.verifyToken], _materias.default.updateById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _materias.default.deleteById);
router.post("/", [_middlewares.authJwt.verifyToken], _materias.default.create);
router.put('/activate/:id', [_middlewares.authJwt.verifyToken], _materias.default.activate);
var _default = router;
exports.default = _default;