"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Respaldo = _interopRequireDefault(require("../../models/Respaldo"));

var _Temporal = _interopRequireDefault(require("../../models/Temporal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  //======================LISTAR MATRICULAS POR ID PARA PERIODOS =================================
  getRespaldoById: function () {
    var _getRespaldoById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        var result = yield _Respaldo.default.find({
          fkcurso: array[0],
          fkperiodo: array[1]
        }).lean();
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getRespaldoById(_x, _x2) {
      return _getRespaldoById.apply(this, arguments);
    }

    return getRespaldoById;
  }(),
  //======================LISTA PARA CAMBIO DE  AÑO =================
  getById: function () {
    var _getById = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Temporal.default.find({
          fkcurso: {
            $in: [id]
          }
        }).lean();
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getById(_x3, _x4) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }()
};
exports.default = _default;