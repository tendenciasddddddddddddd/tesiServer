"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Aulasvirtuales = _interopRequireDefault(require("../../models/Aulasvirtuales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.create(req.body);
        res.status(201).json({});
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  //======================EDITAR CAMBIOS DE CURSO =================================
  getLista: function () {
    var _getLista = _asyncToGenerator(function* (req, res) {
      try {
        var idDocente = req.query.id;
        var result = yield _Aulasvirtuales.default.find({
          fkdocente: idDocente
        }).lean().select({
          fkdocente: 1,
          nombre: 1,
          materia: 1,
          paralelo: 1,
          docente: 1
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getLista(_x3, _x4) {
      return _getLista.apply(this, arguments);
    }

    return getLista;
  }(),
  //======================MUESTRA LISTA DE CURSOS PARA ESTUDIANTES =================================
  getAll: function () {
    var _getAll = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Aulasvirtuales.default.find().lean().select({
          fkdocente: 1,
          nombre: 1,
          materia: 1,
          paralelo: 1,
          docente: 1,
          estudiantes: 1,
          updatedAt: 1
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getAll(_x5, _x6) {
      return _getAll.apply(this, arguments);
    }

    return getAll;
  }(),
  //======================GET PARA HOME DOCENTE =================================
  getById: function () {
    var _getById = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Aulasvirtuales.default.findById(id);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getById(_x7, _x8) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  //======================GET PARA CONFIGURAR CURSO =================================
  getByConfigCourse: function () {
    var _getByConfigCourse = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Aulasvirtuales.default.findById(id).select({
          fkdocente: 1,
          nombre: 1,
          materia: 1,
          paralelo: 1,
          docente: 1,
          codigo: 1
        });
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getByConfigCourse(_x9, _x10) {
      return _getByConfigCourse.apply(this, arguments);
    }

    return getByConfigCourse;
  }(),
  //======================GET PARA CONFIGURAR CURSO =================================
  getByListEstudiantes: function () {
    var _getByListEstudiantes = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Aulasvirtuales.default.findById(id).select({
          estudiantes: 1
        });
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getByListEstudiantes(_x11, _x12) {
      return _getByListEstudiantes.apply(this, arguments);
    }

    return getByListEstudiantes;
  }(),
  //======================GET PARA CALENDARIO =================================
  getByListCalendario: function () {
    var _getByListCalendario = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Aulasvirtuales.default.findById(id).select({
          'tareas.title': 1,
          'tareas.start': 1,
          'tareas.tipo': 1,
          'evaluacion.title': 1,
          'evaluacion.start': 1,
          'evaluacion.tipo': 1,
          'foros.title': 1,
          'foros.start': 1,
          'foros.tipo': 1
        });
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getByListCalendario(_x13, _x14) {
      return _getByListCalendario.apply(this, arguments);
    }

    return getByListCalendario;
  }(),
  //======================GET PARA CALIFICACIONES AULAS =================================
  getByListNotas: function () {
    var _getByListNotas = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Aulasvirtuales.default.findById(id).select({
          'tareas.title': 1,
          'tareas.entrega': 1,
          'evaluacion.title': 1,
          'evaluacion.answers': 1,
          'foros.title': 1,
          'foros.start': 1,
          'foros.tipo': 1,
          estudiantes: 1
        });
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getByListNotas(_x15, _x16) {
      return _getByListNotas.apply(this, arguments);
    }

    return getByListNotas;
  }(),
  //======================GET PARA HOME DOCENTE =================================
  update: function () {
    var _update = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var updatedUsuarios = yield _Aulasvirtuales.default.findByIdAndUpdate(id, req.body, {
          new: true
        });
        res.status(200).json(updatedUsuarios);
      } catch (err) {
        return res.status(500).json(err);
      }
    });

    function update(_x17, _x18) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  insertEstudiantes: function () {
    var _insertEstudiantes = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.findByIdAndUpdate(req.params.id, {
          $push: {
            estudiantes: req.body
          }
        }, {
          new: true
        });
        res.status(200).json(req.params.id);
      } catch (e) {
        res.status(500).json("error del servidor");
      }
    });

    function insertEstudiantes(_x19, _x20) {
      return _insertEstudiantes.apply(this, arguments);
    }

    return insertEstudiantes;
  }(),
  deleteEstudiante: function () {
    var _deleteEstudiante = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id,
          foranea
        } = req.body;
        yield clearDataStudiantes(req.params.paramId, foranea);
        yield _Aulasvirtuales.default.updateOne({
          _id: req.params.paramId
        }, {
          $pull: {
            estudiantes: {
              _id: id
            }
          }
        }, {
          new: true
        });
        res.status(200).json({});
      } catch (e) {
        res.status(500).json({
          message: "No mat found"
        });
      }
    });

    function deleteEstudiante(_x21, _x22) {
      return _deleteEstudiante.apply(this, arguments);
    }

    return deleteEstudiante;
  }(),
  deleteById: function () {
    var _deleteById = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.deleteMany({
          _id: {
            $in: req.params.id
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteById(_x23, _x24) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }(),
  updateSeccion: function () {
    var _updateSeccion = _asyncToGenerator(function* (req, res) {
      try {
        console.log(req.body);
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");
        yield _Aulasvirtuales.default.updateOne({
          _id: array[0]
        }, {
          $set: {
            "seccion.$[perf].nombre": req.body.nombre,
            "seccion.$[perf].estado": req.body.estado
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: array[1]
            }
          }],
          new: true
        });
        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function updateSeccion(_x25, _x26) {
      return _updateSeccion.apply(this, arguments);
    }

    return updateSeccion;
  }()
};
exports.default = _default;

function clearDataStudiantes(_x27, _x28) {
  return _clearDataStudiantes.apply(this, arguments);
}

function _clearDataStudiantes() {
  _clearDataStudiantes = _asyncToGenerator(function* (idKey, id) {
    try {
      var _result$tareas, _result$evaluacion, _result$foros;

      var result = yield _Aulasvirtuales.default.findById(idKey);
      if (!result) return;
      result === null || result === void 0 ? void 0 : (_result$tareas = result.tareas) === null || _result$tareas === void 0 ? void 0 : _result$tareas.forEach(res => {
        var _res$entrega;

        res === null || res === void 0 ? void 0 : (_res$entrega = res.entrega) === null || _res$entrega === void 0 ? void 0 : _res$entrega.forEach((ent, index) => {
          if (ent.fkestudiante == id) {
            var _res$entrega2;

            res === null || res === void 0 ? void 0 : (_res$entrega2 = res.entrega) === null || _res$entrega2 === void 0 ? void 0 : _res$entrega2.splice(index, 1);
          }
        });
        var foros = [];

        for (var i = 0; i < (res === null || res === void 0 ? void 0 : (_res$foro = res.foro) === null || _res$foro === void 0 ? void 0 : _res$foro.length); i++) {
          var _res$foro;

          var element = res.foro[i];
          if (element.fkestudiante != id) foros.push(element);
        }

        res.foro = foros;
      });
      result === null || result === void 0 ? void 0 : (_result$evaluacion = result.evaluacion) === null || _result$evaluacion === void 0 ? void 0 : _result$evaluacion.forEach(res => {
        var respuestas = [];

        for (var i = 0; i < (res === null || res === void 0 ? void 0 : (_res$answers = res.answers) === null || _res$answers === void 0 ? void 0 : _res$answers.length); i++) {
          var _res$answers;

          var element = res.answers[i];
          if (element.fkestudiante != id) respuestas.push(element);
        }

        res.answers = respuestas;
      });
      result === null || result === void 0 ? void 0 : (_result$foros = result.foros) === null || _result$foros === void 0 ? void 0 : _result$foros.forEach(res => {
        var _res$participacion;

        var foro = [];

        for (var i = 0; i < (res === null || res === void 0 ? void 0 : (_res$foro2 = res.foro) === null || _res$foro2 === void 0 ? void 0 : _res$foro2.length); i++) {
          var _res$foro2;

          var element = res.foro[i];

          if (element.fkestudiante != id) {
            var _element$subForo;

            var subForo = element === null || element === void 0 ? void 0 : (_element$subForo = element.subForo) === null || _element$subForo === void 0 ? void 0 : _element$subForo.filter(x => x.fkestudiante != id);
            if (subForo.length > 0) element.subForo = subForo;
            foro.push(element);
          }
        }

        res.foro = foro;
        var filter = res === null || res === void 0 ? void 0 : (_res$participacion = res.participacion) === null || _res$participacion === void 0 ? void 0 : _res$participacion.filter(x => x.fkestudiante != id);
        if (filter.length > 0) res.participacion = filter;
      });
      yield _Aulasvirtuales.default.findByIdAndUpdate(idKey, result);
    } catch (error) {
      console.log(error);
    }
  });
  return _clearDataStudiantes.apply(this, arguments);
}