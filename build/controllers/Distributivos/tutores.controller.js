"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Tutores = _interopRequireDefault(require("../../models/distributivos/Tutores"));

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      var {
        fkcurso,
        paralelo,
        fkdocente,
        curso,
        docente
      } = req.body;

      try {
        var newData = new _Tutores.default({
          fkcurso,
          paralelo,
          fkdocente,
          curso,
          docente
        });
        var dataSaved = yield newData.save();
        res.status(201).json(dataSaved);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function create(_x, _x2) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  get: function () {
    var _get = _asyncToGenerator(function* (req, res) {
      try {
        var limit = parseInt(req.query.take);
        var skip = parseInt(req.query.page);
        var total = yield _Tutores.default.countDocuments();
        var paginas = Math.ceil(total / limit);
        var collections = yield _Tutores.default.find().skip(limit * skip - limit).limit(limit).lean();
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

    function get(_x3, _x4) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Tutores.default.find().lean().select({
          fkcurso: 1,
          paralelo: 1,
          curso: 1
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getListas(_x5, _x6) {
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
        var result = yield _Tutores.default.find({
          fkdocente: id
        });
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
  //=======================GET LISTA DE MATRICULAS Y DISTRIBUTIVO =================
  getByIdReportes: function () {
    var _getByIdReportes = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        var rowM = yield _Matriculas.default.findOne({
          fkcurso: array[0],
          paralelo: array[1]
        });
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: array[0],
          paralelo: array[1]
        });
        res.status(200).json({
          matricula: rowM,
          distributivo: rowD
        });
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getByIdReportes(_x9, _x10) {
      return _getByIdReportes.apply(this, arguments);
    }

    return getByIdReportes;
  }(),
  updateById: function () {
    var _updateById = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Tutores.default.findByIdAndUpdate(req.params.paramId, req.body, {
          new: true
        });
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function updateById(_x11, _x12) {
      return _updateById.apply(this, arguments);
    }

    return updateById;
  }(),
  deleteById: function () {
    var _deleteById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _Tutores.default.deleteMany({
          _id: {
            $in: array
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteById(_x13, _x14) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }(),
  query: function () {
    var _query = _asyncToGenerator(function* (req, res) {
      try {
        var querys = req.query.querys;
        var result = yield _Tutores.default.find({
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

    function query(_x15, _x16) {
      return _query.apply(this, arguments);
    }

    return query;
  }()
};
exports.default = _default;