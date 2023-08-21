"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var nivelSchema = new _mongoose.Schema({
  fkcurso: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Cursos"
  },
  curso: {},
  ambitos: [{
    amb: String,
    des: String
  }],
  estado: {
    type: String,
    default: 1
  }
}, {
  timestamps: true,
  versionKey: false
});

var _default = (0, _mongoose.model)("Destrezas", nivelSchema);

exports.default = _default;