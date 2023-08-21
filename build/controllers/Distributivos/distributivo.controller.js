"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

var _LogsNotas = _interopRequireDefault(require("../../models/LogsNotas"));

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

function editarOrden(_x2, _x3, _x4) {
  return _editarOrden.apply(this, arguments);
}

function _editarOrden() {
  _editarOrden = _asyncToGenerator(function* (idcurso, paralelo, carga) {
    try {
      var reg = yield _Matriculas.default.findOne({
        fkcurso: idcurso,
        paralelo: paralelo
      });

      if (reg) {
        var element = reg.matriculas;

        for (var j = 0; j < element.length; j++) {
          var subElement = element[j].computo;

          var _loop = function* _loop(m) {
            var Inelement = subElement[m];
            var filtro = carga.filter(x => x.fkmaterias == Inelement.fkmateria);

            if (filtro.length > 0) {
              yield _Matriculas.default.updateOne({
                _id: reg._id
              }, {
                $set: {
                  "matriculas.$[perf].computo.$[est].orden": filtro[0].orden
                }
              }, {
                arrayFilters: [{
                  "perf._id": {
                    $eq: element[j]._id
                  }
                }, {
                  "est.fkmateria": {
                    $eq: filtro[0].fkmaterias
                  }
                }],
                new: true
              });
            }
          };

          for (var m = 0; m < subElement.length; m++) {
            yield* _loop(m);
          }
        }
      }
    } catch (error) {}
  });
  return _editarOrden.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      var {
        fkcurso,
        paralelo,
        carga,
        curso
      } = req.body;

      try {
        var newData = new _Distributivo.default({
          fkcurso,
          paralelo,
          carga,
          curso
        });
        var dataSaved = yield newData.save();
        res.status(201).json(dataSaved);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function create(_x5, _x6) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  get: function () {
    var _get = _asyncToGenerator(function* (req, res) {
      try {
        var limit = parseInt(req.query.take);
        var skip = parseInt(req.query.page);
        var total = yield _Distributivo.default.countDocuments();
        var paginas = Math.ceil(total / limit);
        var collections = yield _Distributivo.default.find().skip(limit * skip - limit).limit(limit);
        var coleccion = {
          collections: collections,
          pagina: skip,
          paginas: paginas,
          total: total
        };
        return res.json(coleccion);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function get(_x7, _x8) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Distributivo.default.find().lean().select();
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getListas(_x9, _x10) {
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
        var result = yield _Distributivo.default.findById(id);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getById(_x11, _x12) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  updateById: function () {
    var _updateById = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Distributivo.default.findByIdAndUpdate(req.params.paramId, req.body, {
          new: true
        }); // const carga = req.body.carga;
        // if (carga.length > 0) editarOrden(result.fkcurso, result.paralelo, carga)

        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateById(_x13, _x14) {
      return _updateById.apply(this, arguments);
    }

    return updateById;
  }(),
  //=============================EDITAMOS EL PROGRESO DE LAS NOTAS =============================
  updateProgressById: function () {
    var _updateProgressById = _asyncToGenerator(function* (req, res) {
      try {
        yield _Distributivo.default.updateOne({
          _id: req.params.paramId
        }, {
          $set: {
            "carga.$[perf].porsentajes": req.body.reg
          }
        }, {
          arrayFilters: [{
            "perf._id": {
              $eq: req.body.idCarga
            }
          }],
          new: true
        });
        res.status(200).json({});
        inyectAuditoria(req.body);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateProgressById(_x15, _x16) {
      return _updateProgressById.apply(this, arguments);
    }

    return updateProgressById;
  }(),
  deleteById: function () {
    var _deleteById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _Distributivo.default.deleteMany({
          _id: {
            $in: array
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteById(_x17, _x18) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }(),
  activate: function () {
    var _activate = _asyncToGenerator(function* (req, res, next) {
      try {
        var reg = yield _Distributivo.default.findByIdAndUpdate({
          _id: req.params.id
        }, {
          estado: req.query.state
        });
        res.status(200).json(reg);
      } catch (e) {
        res.status(500).send({
          message: "Ocurrió un error"
        });
        next(e);
      }
    });

    function activate(_x19, _x20, _x21) {
      return _activate.apply(this, arguments);
    }

    return activate;
  }(),
  query: function () {
    var _query = _asyncToGenerator(function* (req, res) {
      try {
        var querys = req.query.querys;
        var result = yield _Distributivo.default.find({
          'curso.nombre': {
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

    function query(_x22, _x23) {
      return _query.apply(this, arguments);
    }

    return query;
  }()
};
exports.default = _default;