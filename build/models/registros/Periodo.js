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
  estado: {
    type: String,
    default: 0
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Periodo", resSchema);

exports.default = _default;