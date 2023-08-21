"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var horarioSchema = new _mongoose.Schema({
  fkcurso: String,
  curso: String,
  distri: [{
    fkdocente: String,
    docente: {},
    fkmateria: String,
    materia: {},
    color: String,
    posicion: String
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Horario", horarioSchema);

exports.default = _default;