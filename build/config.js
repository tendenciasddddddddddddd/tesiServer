"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); //mongodb://127.0.0.1/sistema-integrado2
//mongodb+srv://steban:Medid100.@face-2.gkdmqm9.mongodb.net/sistema-uel?retryWrites=true&w=majority

var _default = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1/sistema-integrado2",
  PORT: process.env.PORT || 3000,
  SECRET: 'system-integrado-unidad-edu-libertad'
};
exports.default = _default;