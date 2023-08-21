"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LogsLogin = _interopRequireDefault(require("../models/LogsLogin"));

var _LogsNotas = _interopRequireDefault(require("../models/LogsNotas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  get: function () {
    var _get = _asyncToGenerator(function* (req, res) {
      try {
        var limit = parseInt(req.query.take);
        var skip = parseInt(req.query.page);
        var total = yield _LogsLogin.default.countDocuments();
        var paginas = Math.ceil(total / limit);
        var collections = yield _LogsLogin.default.find().skip(limit * skip - limit).limit(limit).sort({
          createdAt: -1
        });
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

    function get(_x, _x2) {
      return _get.apply(this, arguments);
    }

    return get;
  }(),
  deleteLoginById: function () {
    var _deleteLoginById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _LogsLogin.default.deleteMany({
          _id: {
            $in: array
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteLoginById(_x3, _x4) {
      return _deleteLoginById.apply(this, arguments);
    }

    return deleteLoginById;
  }(),
  queryLogin: function () {
    var _queryLogin = _asyncToGenerator(function* (req, res) {
      try {
        var querys = req.query.querys;
        var result = yield _LogsLogin.default.find({
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

    function queryLogin(_x5, _x6) {
      return _queryLogin.apply(this, arguments);
    }

    return queryLogin;
  }(),
  //===============LOGS OF NOTAS =================================
  getNotas: function () {
    var _getNotas = _asyncToGenerator(function* (req, res) {
      try {
        var limit = parseInt(req.query.take);
        var skip = parseInt(req.query.page);
        var total = yield _LogsNotas.default.countDocuments();
        var paginas = Math.ceil(total / limit);
        var collections = yield _LogsNotas.default.find().skip(limit * skip - limit).limit(limit).sort({
          createdAt: -1
        });
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

    function getNotas(_x7, _x8) {
      return _getNotas.apply(this, arguments);
    }

    return getNotas;
  }(),
  deleteNotasById: function () {
    var _deleteNotasById = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.id;
        var array = cadenaId.split(",");
        yield _LogsNotas.default.deleteMany({
          _id: {
            $in: array
          }
        });
        res.status(200).json();
      } catch (e) {
        return res.status(500).json();
      }
    });

    function deleteNotasById(_x9, _x10) {
      return _deleteNotasById.apply(this, arguments);
    }

    return deleteNotasById;
  }(),
  queryNotas: function () {
    var _queryNotas = _asyncToGenerator(function* (req, res) {
      try {
        var querys = req.query.querys;
        var result = yield _LogsNotas.default.find({
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

    function queryNotas(_x11, _x12) {
      return _queryNotas.apply(this, arguments);
    }

    return queryNotas;
  }()
};
exports.default = _default;