"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _destrezas = _interopRequireDefault(require("../../controllers/Registros/destrezas.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/lista", _destrezas.default.getListas);
router.get("/query", [_middlewares.authJwt.verifyToken], _destrezas.default.query);
router.get("/:id", [_middlewares.authJwt.verifyToken], _destrezas.default.getById);
router.get("/", [_middlewares.authJwt.verifyToken], _destrezas.default.get);
router.put("/:paramsId", [_middlewares.authJwt.verifyToken], _destrezas.default.updateById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _destrezas.default.deleteById);
router.post("/", [_middlewares.authJwt.verifyToken], _destrezas.default.create); //router.put('/activate/:id',[authJwt.verifyToken],Ctrl.activate);

var _default = router;
exports.default = _default;