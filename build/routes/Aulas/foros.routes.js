"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _foros = _interopRequireDefault(require("../../controllers/Aulas/foros.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/:id", [_middlewares.authJwt.verifyToken], _foros.default.create);
router.put("/editar/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.update); //======================FOROS EN GENERAL =================

router.put("/publishOne/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.publishOne);
router.put("/publishTwo/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.publishTwo);
router.put("/clickLike/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.clickLike);
router.put("/clickNoLike/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.clickNoLike);
router.put("/removeLike/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.removeLike);
router.put("/removeNoLike/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.removeNoLike);
router.put("/removeForoOne/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.removeForoOne);
router.put("/removeForoTwo/:paramId", [_middlewares.authJwt.verifyToken], _foros.default.removeForoTwo);
var _default = router;
exports.default = _default;