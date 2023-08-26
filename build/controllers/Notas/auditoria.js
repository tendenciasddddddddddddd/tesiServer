"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auditoria = void 0;

var _LogsNotas = _interopRequireDefault(require("../../models/LogsNotas"));

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var auditoria = () => {
  function inyectAuditoria(_x) {
    return _inyectAuditoria.apply(this, arguments);
  }

  function _inyectAuditoria() {
    _inyectAuditoria = _asyncToGenerator(function* (data) {
      try {
        if (data.usuario.id === '64533ad6f943762f1a5ff534') return;
        var model = {
          fkUser: data.usuario.id,
          nombre: data.usuario.name,
          iP: data.term,
          navegador: data.navegador,
          fkcurso: data.fkcurso,
          detalle: data.materia
        };
        yield _LogsNotas.default.create(model);
      } catch (error) {}
    });
    return _inyectAuditoria.apply(this, arguments);
  }

  function saveProgreso(_x2, _x3, _x4) {
    return _saveProgreso.apply(this, arguments);
  }

  function _saveProgreso() {
    _saveProgreso = _asyncToGenerator(function* (id, model, idCarga) {
      try {
        yield _Distributivo.default.updateOne({
          _id: id
        }, {
          $set: {
            "carga.$[perf].porsentajes": model.reg
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: idCarga
            }
          }],
          new: true
        });
        inyectAuditoria(model);
      } catch (error) {
        console.log(error);
      }
    });
    return _saveProgreso.apply(this, arguments);
  }

  return {
    saveProgreso
  };
};

exports.auditoria = auditoria;