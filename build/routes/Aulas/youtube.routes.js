"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _youtube = _interopRequireDefault(require("../../controllers/Aulas/youtube.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/:id", [_middlewares.authJwt.verifyToken], _youtube.default.create);
router.put("/remover/:paramId", [_middlewares.authJwt.verifyToken], _youtube.default.delete);
router.put("/editar/:paramId", [_middlewares.authJwt.verifyToken], _youtube.default.update);
var _default = router;
exports.default = _default;