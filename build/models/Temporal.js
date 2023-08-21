"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var esquema = new _mongoose.Schema({
  fkcurso: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Cursos"
  },
  curso: {},
  fkperiodo: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Periodo"
  },
  periodo: {},
  paralelo: String,
  matriculas: [{
    fecha: String,
    fkestudiante: String,
    estudiante: {},
    nmatricula: String,
    folio: String,
    computo: [{
      fkdocente: String,
      docente: {},
      fkmateria: String,
      materia: {},
      resultados: {},
      notas: {},
      cualitativo: {},
      orden: String
    }],
    destrezas: [{
      fkdocente: String,
      docente: {},
      fkmateria: String,
      materia: {},
      notas: [{}]
    }]
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Temporal", esquema);

exports.default = _default;