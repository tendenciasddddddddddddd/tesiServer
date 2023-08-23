"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _Secuencia = _interopRequireDefault(require("../../models/Secuencia"));

var _Respaldo = _interopRequireDefault(require("../../models/Respaldo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function verificarCursoMatricula(_x, _x2) {
  return _verificarCursoMatricula.apply(this, arguments);
}

function _verificarCursoMatricula() {
  _verificarCursoMatricula = _asyncToGenerator(function* (idcurso, paralelo) {
    var result = yield _Matriculas.default.findOne({
      fkcurso: idcurso,
      paralelo: paralelo
    });
    return result;
  });
  return _verificarCursoMatricula.apply(this, arguments);
}

function actualizarSecuencia(_x3, _x4) {
  return _actualizarSecuencia.apply(this, arguments);
}

function _actualizarSecuencia() {
  _actualizarSecuencia = _asyncToGenerator(function* (idsecuencia, numero) {
    var model = {
      numMatricula: numero
    };
    yield _Secuencia.default.findByIdAndUpdate(idsecuencia, model, {
      new: true
    });
  });
  return _actualizarSecuencia.apply(this, arguments);
}

function eliminarMatricula(_x5) {
  return _eliminarMatricula.apply(this, arguments);
}

function _eliminarMatricula() {
  _eliminarMatricula = _asyncToGenerator(function* (array) {
    try {
      yield _Matriculas.default.updateMany({}, {
        $pull: {
          matriculas: {
            _id: array
          }
        }
      });
    } catch (error) {}
  });
  return _eliminarMatricula.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        var grupMatricula = yield verificarCursoMatricula(req.body.fkcurso, req.body.paralelo);

        if (grupMatricula) {
          yield _Matriculas.default.findByIdAndUpdate(grupMatricula._id, {
            $push: {
              'matriculas': req.body.matriculas
            }
          }, {
            new: true
          });
        } else {
          yield _Matriculas.default.create(req.body);
        }

        yield actualizarSecuencia(req.body.idsecuencia, req.body.aux);
        return res.status(200).json({});
      } catch (error) {
        return res.status(500).json({
          message: "Problem"
        });
      }
    });

    function create(_x6, _x7) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  //======================EDITAR CAMBIOS DE CURSO =================================
  cambiarParalelo: function () {
    var _cambiarParalelo = _asyncToGenerator(function* (req, res) {
      try {
        var matricula = req.body.matriculas;

        if (matricula.length > 0) {
          var arrarMatriculas = [];

          for (var i = 0; i < matricula.length; i++) {
            var element = matricula[i].idmatricula;
            arrarMatriculas.push(element);
          }

          yield eliminarMatricula(arrarMatriculas);
          var grupMatricula = yield verificarCursoMatricula(req.body.fkcurso, req.body.paralelo);

          if (grupMatricula) {
            yield _Matriculas.default.findByIdAndUpdate(grupMatricula._id, {
              $push: {
                'matriculas': req.body.matriculas
              }
            }, {
              new: true
            });
          } else {
            yield _Matriculas.default.create(req.body);
          }
        }

        res.status(200).json({});
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function cambiarParalelo(_x8, _x9) {
      return _cambiarParalelo.apply(this, arguments);
    }

    return cambiarParalelo;
  }(),
  //======================ELIMINAR MATRICULAS =================================
  deleteByIds: function () {
    var _deleteByIds = _asyncToGenerator(function* (req, res) {
      try {
        var matricula = req.body;

        if (matricula.length > 0) {
          var arrarMatriculas = [];

          for (var i = 0; i < matricula.length; i++) {
            var element = matricula[i];
            arrarMatriculas.push(element);
          }

          yield eliminarMatricula(arrarMatriculas);
        }

        res.status(200).json({});
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function deleteByIds(_x10, _x11) {
      return _deleteByIds.apply(this, arguments);
    }

    return deleteByIds;
  }(),
  //======================PARA NO DUPLICAR MATRICULAS =================================
  getListaFilter: function () {
    var _getListaFilter = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Matriculas.default.find().lean().select({
          curso: 1,
          paralelo: 1,
          "matriculas.estudiante": 1,
          'matriculas._id': 1
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getListaFilter(_x12, _x13) {
      return _getListaFilter.apply(this, arguments);
    }

    return getListaFilter;
  }(),
  //======================PARA LISTA DE ESTUDIANTES DOCENTES =================================
  getListaCursoNotas: function () {
    var _getListaCursoNotas = _asyncToGenerator(function* (req, res) {
      try {
        var curso = req.query.curso;
        var paralelo = req.query.paralelo;
        var result = yield _Matriculas.default.findOne({
          fkcurso: curso,
          paralelo: paralelo
        }).lean();
        return res.json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getListaCursoNotas(_x14, _x15) {
      return _getListaCursoNotas.apply(this, arguments);
    }

    return getListaCursoNotas;
  }(),
  //======================LISTAR SECUENCIA =================================
  getSecuencia: function () {
    var _getSecuencia = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Secuencia.default.find().lean().select({
          numMatricula: 1
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getSecuencia(_x16, _x17) {
      return _getSecuencia.apply(this, arguments);
    }

    return getSecuencia;
  }(),
  //======================LISTAR PARA REPORTE DE NOMINAR =================================
  getNomina: function () {
    var _getNomina = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Matriculas.default.find().lean().select({
          curso: 1,
          periodo: 1,
          paralelo: 1,
          'matriculas.estudiante': 1,
          'matriculas.nmatricula': 1
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getNomina(_x18, _x19) {
      return _getNomina.apply(this, arguments);
    }

    return getNomina;
  }(),
  //======================LISTAR MATRICULAS PARA LOS REPORTES =================================
  getById: function () {
    var _getById = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Matriculas.default.find({
          fkcurso: {
            $in: [id]
          }
        }).lean();
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getById(_x20, _x21) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  //======================LISTAR MATRICULAS PARA LOS REPORTES =================================
  getByIdReportes: function () {
    var _getByIdReportes = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Matriculas.default.find({
          fkcurso: {
            $in: [id]
          }
        }).lean().select({
          curso: 1,
          fkcurso: 1,
          fkperiodo: 1,
          paralelo: 1,
          "matriculas.estudiante": 1,
          "matriculas.fkestudiante": 1,
          'matriculas._id': 1
        });
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getByIdReportes(_x22, _x23) {
      return _getByIdReportes.apply(this, arguments);
    }

    return getByIdReportes;
  }(),
  //======================LISTAR MATRICULAS POR ID PARA PERIODOS fkperiodo  =================================
  getRespaldoById: function () {
    var _getRespaldoById = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Respaldo.default.find({
          fkcurso: {
            $in: [id]
          }
        }).lean();
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getRespaldoById(_x24, _x25) {
      return _getRespaldoById.apply(this, arguments);
    }

    return getRespaldoById;
  }(),
  //======================PARA LISTA PARA ESTUDIANTES VER NOTAS =================================
  getByIdCalificaciones: function () {
    var _getByIdCalificaciones = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Matriculas.default.findOne({
          'matriculas.fkestudiante': id
        }).lean();
        return res.json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getByIdCalificaciones(_x26, _x27) {
      return _getByIdCalificaciones.apply(this, arguments);
    }

    return getByIdCalificaciones;
  }()
};
exports.default = _default;