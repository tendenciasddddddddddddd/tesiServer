"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _aulas = _interopRequireDefault(require("../../controllers/Aulas/aulas.controller"));

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.post("/", [_middlewares.authJwt.verifyToken], _aulas.default.create);
router.put("/estudiantes/:id", [_middlewares.authJwt.verifyToken], _aulas.default.insertEstudiantes);
router.get("/lista", [_middlewares.authJwt.verifyToken], _aulas.default.getLista);
router.get("/calendario/:id", [_middlewares.authJwt.verifyToken], _aulas.default.getByListCalendario);
router.get("/aulasNotas/:id", [_middlewares.authJwt.verifyToken], _aulas.default.getByListNotas);
router.get("/:id", [_middlewares.authJwt.verifyToken], _aulas.default.getById);
router.get("/conf/:id", [_middlewares.authJwt.verifyToken], _aulas.default.getByConfigCourse);
router.get("/listaestudiantes/:id", [_middlewares.authJwt.verifyToken], _aulas.default.getByListEstudiantes);
router.get("/", [_middlewares.authJwt.verifyToken], _aulas.default.getAll);
router.put("/removestudiante/:paramId", [_middlewares.authJwt.verifyToken], _aulas.default.deleteEstudiante); //EDITARMOS DATOS DE LA TAREA

router.put("/:id", [_middlewares.authJwt.verifyToken], _aulas.default.update);
router.delete("/:id", [_middlewares.authJwt.verifyToken], _aulas.default.deleteById);
var _default = router;
exports.default = _default;