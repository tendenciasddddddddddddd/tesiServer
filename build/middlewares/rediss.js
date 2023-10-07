"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  createClient
} = require("redis");

var client = createClient();

function runRedis() {
  return _runRedis.apply(this, arguments);
}

function _runRedis() {
  _runRedis = _asyncToGenerator(function* () {
    yield client.connect();
  });
  return _runRedis.apply(this, arguments);
}

var claveOnPort = '5000';
runRedis();
module.exports = {
  client,
  claveOnPort
};