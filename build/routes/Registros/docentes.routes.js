"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var Ctrl = _interopRequireWildcard(require("../../controllers/Registros/docentes.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.get("/lista", Ctrl.getListasDocentes);
router.get("/query", [_middlewares.authJwt.verifyToken], Ctrl.query);
router.get("/:id", [_middlewares.authJwt.verifyToken], Ctrl.getDocenteById);
router.get("/", [_middlewares.authJwt.verifyToken], Ctrl.getDocentes);
router.put("/perfil/:usuario", [_middlewares.authJwt.verifyToken], Ctrl.updatePerfil);
router.put('/activate/:id', [_middlewares.authJwt.verifyToken], Ctrl.activate);
router.put("/:usuariosId", [_middlewares.authJwt.verifyToken], Ctrl.updateDocenteById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], Ctrl.deleteDocenteById);
router.post("/docentesMany", [_middlewares.authJwt.verifyToken], Ctrl.createDocenteMany);
router.post("/", [_middlewares.verifySignup.checkDuplicateUsernameOrEmail, _middlewares.authJwt.verifyToken], Ctrl.createDocentes);
var _default = router;
exports.default = _default;