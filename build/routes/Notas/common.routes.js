"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _common = _interopRequireDefault(require("../../controllers/Notas/common.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/supletorios/:id", [_middlewares.authJwt.verifyToken], _common.default.supletorios);
router.put("/proyecto/:id", [_middlewares.authJwt.verifyToken], _common.default.proyecto);
router.put("/ajustar/:id", [_middlewares.authJwt.verifyToken], _common.default.ajustarPromedios);
router.put("/:id", [_middlewares.authJwt.verifyToken], _common.default.create);
var _default = router;
exports.default = _default;