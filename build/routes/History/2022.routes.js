"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ = _interopRequireDefault(require("../../controllers/History/2022.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.get("/:id", [_middlewares.authJwt.verifyToken], _.default.getById);
router.post("/", [_middlewares.authJwt.verifyToken], _.default.promocion);
router.post("/matricula/", [_middlewares.authJwt.verifyToken], _.default.matricula);
router.post("/libretas/", [_middlewares.authJwt.verifyToken], _.default.libretas);
router.post("/juntas/", [_middlewares.authJwt.verifyToken], _.default.juntas);
var _default = router;
exports.default = _default;