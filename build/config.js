"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)(); //mongodb://127.0.0.1/sistema-symtech
//mongodb+srv://steban:Medid100.@pcei-tulcan.2xf8enw.mongodb.net/sistema-mons-tulcan?retryWrites=true&w=majority

var _default = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://steban:Medid100.@pcei-tulcan.2xf8enw.mongodb.net/sistema-mons-tulcan?retryWrites=true&w=majority",
  PORT: process.env.PORT || 5000,
  SECRET: 'system-unidad-educativa-leonidas-proaño.'
};
exports.default = _default;