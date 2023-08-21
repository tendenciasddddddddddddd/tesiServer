"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var resSchema = new _mongoose.Schema({
  area: {
    type: String
  },
  nombre: {
    type: String,
    unique: true
  },
  estado: {
    type: String,
    default: 1
  },
  computo: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Materias", resSchema);

exports.default = _default;