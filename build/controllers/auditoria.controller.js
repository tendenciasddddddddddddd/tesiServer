"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Periodo = _interopRequireDefault(require("../../models/registros/Periodo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Periodo.default.find().lean();
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getListas(_x, _x2) {
      return _getListas.apply(this, arguments);
    }

    return getListas;
  }(),
  getById: function () {
    var _getById = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Periodo.default.findById(id);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getById(_x3, _x4) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  deleteById: function () {
    var _deleteById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _Periodo.default.deleteMany({
          _id: {
            $in: array
          }
        });
        eliminarMatricula(array);
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteById(_x5, _x6) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }(),
  query: function () {
    var _query = _asyncToGenerator(function* (req, res) {
      try {
        var querys = req.query.querys;
        var result = yield _Periodo.default.find({
          nombre: {
            '$regex': querys,
            "$options": "i"
          }
        });
        res.status(200).json(result);
      } catch (error) {
        res.status(500).send({
          message: "Ocurrió un error"
        });
      }
    });

    function query(_x7, _x8) {
      return _query.apply(this, arguments);
    }

    return query;
  }()
};
exports.default = _default;