"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var Ctrl = _interopRequireWildcard(require("../../controllers/Registros/estudiantes.controller"));

var _middlewares = require("../../middlewares");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = (0, _express.Router)();
router.get("/lista", Ctrl.getListasEstudiantes);
router.get("/listaofaulas", Ctrl.getListEstudAulas);
router.get("/query", [_middlewares.authJwt.verifyToken], Ctrl.query);
router.get("/:id", [_middlewares.authJwt.verifyToken], Ctrl.getEstudianteById);
router.get("/", [_middlewares.authJwt.verifyToken], Ctrl.getEstudiantes);
router.put('/activate/:id', [_middlewares.authJwt.verifyToken], Ctrl.activate);
router.put("/representante/:usuariosId", [_middlewares.authJwt.verifyToken], Ctrl.updateRepresentante);
router.put("/:usuariosId", [_middlewares.authJwt.verifyToken], Ctrl.updateEstudianteById);
router.delete("/:id", [_middlewares.authJwt.verifyToken], Ctrl.deleteEstudianteById);
router.post("/alumnosMany", [_middlewares.authJwt.verifyToken], Ctrl.createEstudianteMany);
router.post("/", [_middlewares.verifySignup.checkDuplicateEstudiante, _middlewares.authJwt.verifyToken], Ctrl.createEstudiante);
var _default = router;
exports.default = _default;