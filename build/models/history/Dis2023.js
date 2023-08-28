"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var distributivoSchema = new _mongoose.Schema({
  fkcurso: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Cursos"
  },
  curso: {},
  paralelo: String,
  carga: [{
    fkdocentes: String,
    docente: {},
    fkmaterias: String,
    materia: {},
    porsentajes: String,
    horas: String,
    order: String
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Dis2023", distributivoSchema);

exports.default = _default;