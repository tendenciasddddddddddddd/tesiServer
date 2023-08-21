"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var esquema = new _mongoose.Schema({
  numMatricula: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Secuencia", esquema);

exports.default = _default;