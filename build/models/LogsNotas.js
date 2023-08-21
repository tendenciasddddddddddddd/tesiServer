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

var _default = (0, _mongoose.model)("LogsNotas", horarioSchema);

exports.default = _default;