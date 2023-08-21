"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Repositorio = _interopRequireDefault(require("../models/Repositorio.js"));

var _Periodo = _interopRequireDefault(require("../models/registros/Periodo.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function insetFiles(_x, _x2) {
  return _insetFiles.apply(this, arguments);
}

function _insetFiles() {
  _insetFiles = _asyncToGenerator(function* (id, model) {
    try {
      var docente = yield _User.default.findById(model.usuario);
      var modelo = {
        fkdocente: docente._id,
        docente: docente,
        repositorio: model.mod
      };
      yield _Repositorio.default.findByIdAndUpdate(id, {
        $push: {
          'entregas': modelo
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
  return _insetFiles.apply(this, arguments);
}

function updateFiles(_x3) {
  return _updateFiles.apply(this, arguments);
}

function _updateFiles() {
  _updateFiles = _asyncToGenerator(function* (modelo) {
    try {
      yield _Repositorio.default.updateOne({
        "entregas._id": modelo.keyEntrega
      }, {
        $push: {
          "entregas.$.repositorio": modelo.mod
        }
      }, {
        new: true
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  return _updateFiles.apply(this, arguments);
}

function removeFiles(_x4, _x5) {
  return _removeFiles.apply(this, arguments);
}

function _removeFiles() {
  _removeFiles = _asyncToGenerator(function* (ids, modelo) {
    try {
      yield _Repositorio.default.updateOne({
        _id: ids
      }, {
        $pull: {
          "entregas.$[].repositorio": {
            "_id": modelo.mod
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  });
  return _removeFiles.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      var {
        nombre,
        inicio,
        fin
      } = req.body;

      try {
        var periodo = yield _Periodo.default.findOne({
          estado: '1'
        });

        if (periodo) {
          var model = {
            nombre: nombre,
            inicio: inicio,
            fin: fin,
            fkperiodo: periodo._id,
            periodo: periodo
          };
          var reg = yield _Repositorio.default.create(model);
          res.status(201).json(reg);
        } else {
          res.status(201).json(null);
        }
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function create(_x6, _x7) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  getListas: function () {
    var _getListas = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Repositorio.default.find().lean().select({
          nombre: 1,
          inicio: 1,
          fin: 1
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
        var result = yield _Repositorio.default.findById(id);
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
        console.log(req.body);

        if (!req.body.confirma) {
          yield insetFiles(req.params.paramsId, req.body);
        } else {
          yield updateFiles(req.body);
        }

        res.status(200).json();
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateById(_x12, _x13) {
      return _updateById.apply(this, arguments);
    }

    return updateById;
  }(),
  updateRemoveById: function () {
    var _updateRemoveById = _asyncToGenerator(function* (req, res) {
      try {
        yield removeFiles(req.params.paramsId, req.body);
        res.status(200).json();
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateRemoveById(_x14, _x15) {
      return _updateRemoveById.apply(this, arguments);
    }

    return updateRemoveById;
  }(),
  updateNormalById: function () {
    var _updateNormalById = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Repositorio.default.findByIdAndUpdate(req.params.paramsId, req.body, {
          new: true
        });
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateNormalById(_x16, _x17) {
      return _updateNormalById.apply(this, arguments);
    }

    return updateNormalById;
  }(),
  deleteById: function () {
    var _deleteById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _Repositorio.default.deleteMany({
          _id: {
            $in: array
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteById(_x18, _x19) {
      return _deleteById.apply(this, arguments);
    }

    return deleteById;
  }()
};
exports.default = _default;