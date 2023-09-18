"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _elemen = _interopRequireDefault(require("../../controllers/Notas/elemen.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/ajustar/:id", [_middlewares.authJwt.verifyToken], _elemen.default.ajustarPromedios);
router.put("/:id", [_middlewares.authJwt.verifyToken], _elemen.default.create);
router.put("/cuartos/:id", [_middlewares.authJwt.verifyToken], _elemen.default.createCuarto);
var _default = router;
exports.default = _default;