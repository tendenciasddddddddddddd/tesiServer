"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Cursos = _interopRequireDefault(require("../../models/registros/Cursos"));

var _Tutores = _interopRequireDefault(require("../../models/distributivos/Tutores"));

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _rediss = require("../../middlewares/rediss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function editarTutores(_x, _x2) {
  return _editarTutores.apply(this, arguments);
}

function _editarTutores() {
  _editarTutores = _asyncToGenerator(function* (iddocente, modelo) {
    var curso = {
      _id: modelo._id,
      nombre: modelo.nombre,
      num: modelo.num,
      subnivel: modelo.subnivel
    };
    yield _Tutores.default.updateMany({
      fkcurso: iddocente
    }, {
      $set: {
        curso: curso
      }
    });
  });
  return _editarTutores.apply(this, arguments);
}

function editarDistributivo(_x3, _x4) {
  return _editarDistributivo.apply(this, arguments);
}

function _editarDistributivo() {
  _editarDistributivo = _asyncToGenerator(function* (iddocente, modelo) {
    var curso = {
      _id: modelo._id,
      nombre: modelo.nombre,
      num: modelo.num,
      subnivel: modelo.subnivel
    };
    yield _Distributivo.default.updateMany({
      fkcurso: iddocente
    }, {
      $set: {
        curso: curso
      }
    });
  });
  return _editarDistributivo.apply(this, arguments);
}

function editarMatricula(_x5, _x6) {
  return _editarMatricula.apply(this, arguments);
}

function _editarMatricula() {
  _editarMatricula = _asyncToGenerator(function* (iddocente, modelo) {
    var curso = {
      _id: modelo._id,
      nombre: modelo.nombre,
      num: modelo.num,
      subnivel: modelo.subnivel
    };
    yield _Matriculas.default.updateMany({
      fkcurso: iddocente
    }, {
      $set: {
        curso: curso
      }
    });
  });
  return _editarMatricula.apply(this, arguments);
}

function eliminarTutores(_x7) {
  return _eliminarTutores.apply(this, arguments);
}

function _eliminarTutores() {
  _eliminarTutores = _asyncToGenerator(function* (array) {
    yield _Tutores.default.deleteMany({
      fkcurso: {
        $in: array
      }
    });
  });
  return _eliminarTutores.apply(this, arguments);
}

function eliminarDistributivo(_x8) {
  return _eliminarDistributivo.apply(this, arguments);
}

function _eliminarDistributivo() {
  _eliminarDistributivo = _asyncToGenerator(function* (array) {
    yield _Distributivo.default.deleteMany({
      fkcurso: {
        $in: array
      }
    });
  });
  return _eliminarDistributivo.apply(this, arguments);
}

function eliminarMatricula(_x9) {
  return _eliminarMatricula.apply(this, arguments);
}

function _eliminarMatricula() {
  _eliminarMatricula = _asyncToGenerator(function* (array) {
    yield _Matriculas.default.deleteMany({
      fkcurso: {
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
        nombre,
        num,
        subnivel
      } = req.body;

      try {
        var newData = new _Cursos.default({
          nombre,
          num,
          subnivel
        });

        _rediss.client.del("".concat(_rediss.claveOnPort, "cursos"));

        var dataSaved = yield newData.save();
        res.status(201).json(dataSaved);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function create(_x10, _x11) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  get: function () {
    var _get = _asyncToGenerator(function* (req, res) {
      try {
        var limit = parseInt(req.query.take);
        var skip = parseInt(req.query.page);
        var total = yield _Cursos.default.countDocuments();
        var paginas = Math.ceil(total / limit);
        var collections = yield _Cursos.default.find().skip(limit * skip - limit).limit(limit).lean();
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

    function get(_x12, _x13) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var reply = yield _rediss.client.get("".concat(_rediss.claveOnPort, "cursos"));
        if (reply) return res.json(JSON.parse(reply));
        var result = yield _Cursos.default.find().lean().select({
          nombre: 1,
          num: 1,
          subnivel: 1
        });
        yield _rediss.client.set("".concat(_rediss.claveOnPort, "cursos"), JSON.stringify(result), {
          EX: 36000
        });
        return res.json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getListas(_x14, _x15) {
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
        var result = yield _Cursos.default.findById(id);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function getById(_x16, _x17) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  updateById: function () {
    var _updateById = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Cursos.default.findByIdAndUpdate(req.params.paramsId, req.body, {
          new: true
        });
        editarTutores(req.params.paramsId, req.body);
        editarDistributivo(req.params.paramsId, req.body);
        editarMatricula(req.params.paramsId, req.body);

        _rediss.client.del("".concat(_rediss.claveOnPort, "cursos"));

        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateById(_x18, _x19) {
      return _updateById.apply(this, arguments);
    }

    return updateById;
  }(),
  deleteById: function () {
    var _deleteById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _Cursos.default.deleteMany({
          _id: {
            $in: array
          }
        });
        eliminarTutores(array);
        eliminarDistributivo(array);
        eliminarMatricula(array);

        _rediss.client.del("".concat(_rediss.claveOnPort, "cursos"));

        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteById(_x20, _x21) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }(),
  activate: function () {
    var _activate = _asyncToGenerator(function* (req, res, next) {
      try {
        var reg = yield _Cursos.default.findByIdAndUpdate({
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

    function activate(_x22, _x23, _x24) {
      return _activate.apply(this, arguments);
    }

    return activate;
  }(),
  query: function () {
    var _query = _asyncToGenerator(function* (req, res) {
      try {
        var querys = req.query.querys;
        var result = yield _Cursos.default.find({
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

    function query(_x25, _x26) {
      return _query.apply(this, arguments);
    }

    return query;
  }()
};
exports.default = _default;