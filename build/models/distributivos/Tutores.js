"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var cantonesSchema = new _mongoose.Schema({
  fkcurso: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Cursos"
  },
  curso: {},
  fkdocente: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  docente: {},
  paralelo: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Tutor", cantonesSchema);

exports.default = _default;