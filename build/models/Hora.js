"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var horarioSchema = new _mongoose.Schema({
  num: {
    type: String,
    unique: true
  },
  nombre: String
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Hora", horarioSchema);

exports.default = _default;