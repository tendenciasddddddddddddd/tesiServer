"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var horarioSchema = new _mongoose.Schema({
  fkUser: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  nombre: String,
  iP: String,
  tipo: String,
  navegador: String,
  fkcurso: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Cursos"
  },
  detalle: {}
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Auditoria", horarioSchema);

exports.default = _default;