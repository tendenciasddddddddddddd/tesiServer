"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _estadistica = require("./services/estadistica.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  promByCurso
} = (0, _estadistica.estadistica)();
var _default = {
  getByCurso: function () {
    var _getByCurso = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Matriculas.default.find({
          fkcurso: {
            $in: [id]
          }
        }).lean();
        var prom = promByCurso(result);
        res.status(200).json(prom);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getByCurso(_x, _x2) {
      return _getByCurso.apply(this, arguments);
    }

    return getByCurso;
  }()
};
exports.default = _default;