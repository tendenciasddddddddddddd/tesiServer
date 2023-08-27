"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _cualitativo = _interopRequireDefault(require("../../controllers/Notas/cualitativo.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/ajustar/:id", [_middlewares.authJwt.verifyToken], _cualitativo.default.ajustarPromedios);
router.put("/:id", [_middlewares.authJwt.verifyToken], _cualitativo.default.createCualitativo);
var _default = router;
exports.default = _default;