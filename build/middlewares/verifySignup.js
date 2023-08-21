"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDuplicateTutores = exports.checkDuplicateDistributivo = exports.checkDuplicateEstudiante = exports.checkRolesExisted = exports.checkDuplicateUsernameOrEmail = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Estudiante = _interopRequireDefault(require("../models/registros/Estudiante"));

var _Distributivo = _interopRequireDefault(require("../models/distributivos/Distributivo"));

var _Tutores = _interopRequireDefault(require("../models/distributivos/Tutores"));

var _Role = require("../models/Role");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkDuplicateUsernameOrEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res, next) {
    try {
      var user = yield _User.default.findOne({
        cedula: req.body.cedula
      });
      if (user) return res.status(400).json({
        message: "El numero de cédula ya existe"
      });
      next();
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  });

  return function checkDuplicateUsernameOrEmail(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail;

var checkDuplicateDistributivo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res, next) {
    try {
      var result = yield _Distributivo.default.findOne({
        fkcurso: req.body.fkcurso,
        paralelo: req.body.paralelo
      });
      if (result) return res.status(400).json({
        message: "Distributivo duplicado"
      });
      next();
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  });

  return function checkDuplicateDistributivo(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.checkDuplicateDistributivo = checkDuplicateDistributivo;

var checkDuplicateTutores = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res, next) {
    try {
      var result = yield _Tutores.default.findOne({
        fkcurso: req.body.fkcurso,
        paralelo: req.body.paralelo,
        fkdocente: req.body.fkdocente
      });
      if (result) return res.status(400).json({
        message: "Distributivo duplicado"
      });
      next();
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  });

  return function checkDuplicateTutores(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.checkDuplicateTutores = checkDuplicateTutores;

var checkDuplicateEstudiante = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res, next) {
    try {
      var user = yield _Estudiante.default.findOne({
        cedula: req.body.cedula
      });
      if (user) return res.status(400).json({
        message: "El numero de cédula ya existe"
      });
      next();
    } catch (error) {
      res.status(500).json({
        message: error
      });
    }
  });

  return function checkDuplicateEstudiante(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.checkDuplicateEstudiante = checkDuplicateEstudiante;

var checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (var i = 0; i < req.body.roles.length; i++) {
      if (!_Role.ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          message: "Role ".concat(req.body.roles[i], " does not exist")
        });
      }
    }
  }

  next();
};

exports.checkRolesExisted = checkRolesExisted;