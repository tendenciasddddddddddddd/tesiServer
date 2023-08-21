"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Horarios = _interopRequireDefault(require("../models/Horarios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function verificarCursoMatricula(_x) {
  return _verificarCursoMatricula.apply(this, arguments);
}

function _verificarCursoMatricula() {
  _verificarCursoMatricula = _asyncToGenerator(function* (idcurso) {
    var result = yield _Horarios.default.findOne({
      fkcurso: idcurso
    });
    return result;
  });
  return _verificarCursoMatricula.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        var grupMatricula = yield verificarCursoMatricula(req.body.fkcurso);

        if (grupMatricula) {
          yield _Horarios.default.findByIdAndUpdate(grupMatricula._id, {
            $set: {
              'distri': req.body.distri
            }
          }, {
            new: true
          });
        } else {
          console.log('nuevo');
          yield _Horarios.default.create(req.body);
        }

        return res.status(200).json({});
      } catch (error) {
        return res.status(500).json({
          message: "Problem"
        });
      }
    });

    function create(_x2, _x3) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Horarios.default.find().lean().select();
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getListas(_x4, _x5) {
      return _getListas.apply(this, arguments);
    }

    return getListas;
  }(),
  deleteById: function () {
    var _deleteById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _Horarios.default.deleteMany({
          _id: {
            $in: array
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteById(_x6, _x7) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }()
};
exports.default = _default;