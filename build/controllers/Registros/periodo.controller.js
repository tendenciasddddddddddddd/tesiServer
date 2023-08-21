"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Periodo = _interopRequireDefault(require("../../models/registros/Periodo"));

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function editarMatricula(_x, _x2) {
  return _editarMatricula.apply(this, arguments);
}

function _editarMatricula() {
  _editarMatricula = _asyncToGenerator(function* (idperiodo, modelo) {
    var periodo = {
      _id: modelo._id,
      nombre: modelo.nombre
    };
    yield _Matriculas.default.updateMany({
      fkperiodo: idperiodo
    }, {
      $set: {
        periodo: periodo
      }
    });
  });
  return _editarMatricula.apply(this, arguments);
}

function eliminarMatricula(_x3) {
  return _eliminarMatricula.apply(this, arguments);
}

function _eliminarMatricula() {
  _eliminarMatricula = _asyncToGenerator(function* (array) {
    yield _Matriculas.default.deleteMany({
      fkperiodo: {
        $in: array
      }
    });
  });
  return _eliminarMatricula.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      var {
        nombre
      } = req.body;

      try {
        var newData = new _Periodo.default({
          nombre
        });
        var dataSaved = yield newData.save();
        res.status(201).json(dataSaved);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function create(_x4, _x5) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  get: function () {
    var _get = _asyncToGenerator(function* (req, res) {
      try {
        var limit = parseInt(req.query.take);
        var skip = parseInt(req.query.page);
        var total = yield _Periodo.default.countDocuments();
        var paginas = Math.ceil(total / limit);
        var collections = yield _Periodo.default.find().skip(limit * skip - limit).limit(limit).lean();
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

    function get(_x6, _x7) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Periodo.default.find().lean().select({
          nombre: 1,
          estado: 1
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getListas(_x8, _x9) {
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

    function getById(_x10, _x11) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  updateById: function () {
    var _updateById = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Periodo.default.findByIdAndUpdate(req.params.paramsId, req.body, {
          new: true
        });
        editarMatricula(req.params.paramsId, req.body);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateById(_x12, _x13) {
      return _updateById.apply(this, arguments);
    }

    return updateById;
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

    function deleteById(_x14, _x15) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }(),
  activate: function () {
    var _activate = _asyncToGenerator(function* (req, res, next) {
      try {
        // await Periodo.updateMany({}, { $set: { estado: 0 } })
        var reg = yield _Periodo.default.findByIdAndUpdate({
          _id: req.params.id
        }, {
          estado: req.body.estado
        });
        res.status(200).json(reg);
      } catch (e) {
        return res.status(500).json();
      }
    });

    function activate(_x16, _x17, _x18) {
      return _activate.apply(this, arguments);
    }

    return activate;
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

    function query(_x19, _x20) {
      return _query.apply(this, arguments);
    }

    return query;
  }()
};
exports.default = _default;