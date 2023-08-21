"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var resSchema = new _mongoose.Schema({
  nombre: {
    type: String,
    unique: true
  },
  fkperiodo: String,
  periodo: {},
  inicio: String,
  fin: String,
  entregas: [{
    fkdocente: String,
    docente: {},
    repositorio: [{
      link: String,
      tipo: String,
      size: String,
      name: String,
      formato: String,
      created_at: String
    }]
  }]
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Repositorio", resSchema);

exports.default = _default;