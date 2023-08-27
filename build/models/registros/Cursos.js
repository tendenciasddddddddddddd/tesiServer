"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var nivelSchema = new _mongoose.Schema({
  num: {
    type: String,
    unique: true
  },
  nombre: {
    type: String,
    unique: true
  },
  subnivel: String,
  estado: {
    type: String,
    default: 1
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Cursos", nivelSchema);

exports.default = _default;