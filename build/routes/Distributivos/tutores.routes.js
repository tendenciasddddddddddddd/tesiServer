"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _tutores = _interopRequireDefault(require("../../controllers/Distributivos/tutores.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", [_middlewares.authJwt.verifyToken], _tutores.default.getListas);
router.get("/query", [_middlewares.authJwt.verifyToken], _tutores.default.query);
router.get("/rep/:id", [_middlewares.authJwt.verifyToken], _tutores.default.getByIdReportes);
router.get("/:id", [_middlewares.authJwt.verifyToken], _tutores.default.getById);
router.get("/", [_middlewares.authJwt.verifyToken], _tutores.default.get);
router.put("/:paramId", [_middlewares.verifySignup.checkDuplicateTutores, _middlewares.authJwt.verifyToken], _tutores.default.updateById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _tutores.default.deleteById);
router.post("/", [_middlewares.verifySignup.checkDuplicateTutores, _middlewares.authJwt.verifyToken], _tutores.default.create);
var _default = router;
exports.default = _default;