"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _distributivo = _interopRequireDefault(require("../../controllers/Distributivos/distributivo.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", [_middlewares.authJwt.verifyToken], _distributivo.default.getListas);
router.get("/query", [_middlewares.authJwt.verifyToken], _distributivo.default.query);
router.get("/:id", [_middlewares.authJwt.verifyToken], _distributivo.default.getById);
router.get("/", [_middlewares.authJwt.verifyToken], _distributivo.default.get);
router.put("/progreso/:paramId", [_middlewares.authJwt.verifyToken], _distributivo.default.updateProgressById);
router.put("/:paramId", [_middlewares.verifySignup.checkDuplicateDistributivo, _middlewares.authJwt.verifyToken], _distributivo.default.updateById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _distributivo.default.deleteById);
router.post("/", [_middlewares.verifySignup.checkDuplicateDistributivo, _middlewares.authJwt.verifyToken], _distributivo.default.create);
router.put('/activate/:id', [_middlewares.authJwt.verifyToken], _distributivo.default.activate);
var _default = router;
exports.default = _default;