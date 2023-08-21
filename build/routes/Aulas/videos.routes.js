"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _videos = _interopRequireDefault(require("../../controllers/Aulas/videos.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.put("/:id", [_middlewares.authJwt.verifyToken], _videos.default.create);
router.put("/remover/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.delete);
router.put("/editar/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.update);
router.put("/foro/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.updateForo);
router.put("/subforo/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.updateSubForo);
router.put("/like/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.updateLike);
router.put("/removelike/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.removeLikeForo);
router.put("/removeNolike/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.removeNoLikeForo);
router.put("/nolike/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.updateNoLike);
router.put("/removeforo/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.removeForo);
router.put("/removesubforo/:paramId", [_middlewares.authJwt.verifyToken], _videos.default.removeSubForo);
router.put("/removeFile/:paramsId", [_middlewares.authJwt.verifyToken], _videos.default.updateRemoveFile);
var _default = router;
exports.default = _default;