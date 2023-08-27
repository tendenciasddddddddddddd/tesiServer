"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var roleSchema = new _mongoose.Schema({
  inicio: String,
  fin: String,
  parcial1: String,
  parcial2: String,
  parcial3: String,
  parcial4: String,
  parcial5: String,
  parcial6: String,
  examen1: String,
  examen2: String,
  examen3: String,
  proyecto: String,
  supletorios: String
}, {
  versionKey: false
});

var _default = (0, _mongoose.model)("AperturaNotas", roleSchema);

exports.default = _default;