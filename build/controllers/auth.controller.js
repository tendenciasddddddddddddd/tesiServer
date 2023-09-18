"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.veficUser = exports.resetPasswordUsers = exports.forgotPassword = exports.resetPassword = exports.newPasswordEstudiante = exports.newPassword = exports.cuenta = exports.googleAuthApi = exports.signin = exports.signUp = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Role = _interopRequireDefault(require("../models/Role"));

var _Estudiante = _interopRequireDefault(require("../models/registros/Estudiante"));

var _LogsLogin = _interopRequireDefault(require("../models/LogsLogin"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _ResetEmail = _interopRequireDefault(require("../conf/ResetEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signUp = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (req, res) {
    try {
      var {
        username,
        email,
        password,
        roles,
        nombres,
        apellidos,
        telefono,
        cedula,
        foto,
        typo,
        fullname
      } = req.body;
      var newUser = new _User.default({
        username,
        email,
        nombres,
        apellidos,
        telefono,
        foto,
        cedula,
        typo,
        fullname,
        password: yield _User.default.encryptPassword(password)
      });

      if (req.body.role) {
        newUser.roles = req.body.role;
      } else {
        var role = yield _Role.default.findOne({
          name: "Docente"
        });
        newUser.roles = [role._id];
      }

      newUser.roles = req.body.role;
      var savedUser = yield newUser.save();
      return res.status(200).json({
        savedUser
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function signUp(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signUp = signUp;

function logsOfLogin(_x3, _x4, _x5) {
  return _logsOfLogin.apply(this, arguments);
} //---------------------------------------------------------LOGIN ACCESS--------------------------


function _logsOfLogin() {
  _logsOfLogin = _asyncToGenerator(function* (data, ip, nav) {
    try {
      if (data.cedula === '1004095632') return;
      var model = {
        fkUser: data._id,
        nombre: data.fullname,
        iP: ip,
        navegador: nav
      };
      yield _LogsLogin.default.create(model);
    } catch (error) {}
  });
  return _logsOfLogin.apply(this, arguments);
}

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = {};

      if (vefificaIfEmail(req.body.email)) {
        userFound = yield _User.default.findOne({
          email: req.body.email,
          status: '1'
        }).populate("roles");
      } else {
        userFound = yield _User.default.findOne({
          cedula: req.body.email,
          status: '1'
        }).populate("roles");
      }

      if (!userFound) {
        if (vefificaIfEmail(req.body.email)) {
          userFound = yield _Estudiante.default.findOne({
            email: req.body.email,
            status: '1'
          }).populate("roles");
        } else {
          userFound = yield _Estudiante.default.findOne({
            cedula: req.body.email,
            status: '1'
          }).populate("roles");
        }

        if (!userFound) return res.status(400).json({
          message: "User Not Found 1"
        });
      }

      var matchPassword = yield _User.default.comparePassword(req.body.password, userFound.password);
      if (!matchPassword) return res.status(402).json({
        token: null,
        message: "Invalid Password"
      });
      var roll = [];
      var roles = yield _Role.default.find({
        _id: {
          $in: userFound.roles
        }
      });

      for (var i = 0; i < roles.length; i++) {
        roll.push(roles[i].name);
      }

      var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
      if (!roll.includes('Estudiante')) logsOfLogin(userFound, ip, req.body.navegador);

      var token = _jsonwebtoken.default.sign({
        id: userFound._id,
        role: roll,
        nombre: userFound.fullname
      }, _config.default.SECRET, {
        expiresIn: '24h' // 24 hours

      });

      var isaccesos = {
        tokens: token,
        foto: userFound.foto,
        ip: ip
      };
      res.status(200).json({
        isaccesos
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function signin(_x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;

var vefificaIfEmail = email => {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}; //---------------------------------------------------------VUE OUTH GOOGLE API--------------------------


var googleAuthApi = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = {};
      userFound = yield _User.default.findOne({
        email: req.body.email
      }).populate("roles");

      if (!userFound) {
        userFound = yield _Estudiante.default.findOne({
          email: req.body.email,
          status: '1'
        }).populate("roles");
        if (!userFound) return res.status(400).json({
          message: "User Not Found 1"
        });
      } //OPTENERMOS EL ROL


      var roll = [];
      var roles = yield _Role.default.find({
        _id: {
          $in: userFound.roles
        }
      });

      for (var i = 0; i < roles.length; i++) {
        roll.push(roles[i].name);
      }

      var token = _jsonwebtoken.default.sign({
        id: userFound._id,
        role: roll,
        nombre: userFound.fullname
      }, _config.default.SECRET, {
        expiresIn: '24h' // 24 hours

      });

      if (!roll.includes('Estudiante')) logsOfLogin(userFound, req.body.ip, req.body.navegador);
      var isaccesos = {
        tokens: token,
        foto: userFound.foto
      };
      res.status(200).json({
        isaccesos
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function googleAuthApi(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.googleAuthApi = googleAuthApi;

var cuenta = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _User.default.findOne({
        _id: req.body.id
      });
      if (!userFound) return res.status(400).json({
        message: "User Not Found 1"
      });
      var matchPassword = yield _User.default.comparePassword(req.body.password, userFound.password);
      if (!matchPassword) return res.status(402).json({
        token: null,
        message: "Contraseña Invalida"
      });
      res.status(200).json({
        message: "Contraseña Correcta"
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function cuenta(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.cuenta = cuenta;

var newPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* (req, res) {
    try {
      req.body.password = yield _User.default.encryptPassword(req.body.password);
      var updatedPassword = yield _User.default.findByIdAndUpdate(req.params.cuentaId, req.body, {
        new: true
      });
      res.status(200).json(updatedPassword);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function newPassword(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.newPassword = newPassword;

var newPasswordEstudiante = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* (req, res) {
    try {
      req.body.password = yield _Estudiante.default.encryptPassword(req.body.password);
      var updatedPassword = yield _Estudiante.default.findByIdAndUpdate(req.params.cuentaId, req.body, {
        new: true
      });
      res.status(200).json(updatedPassword);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function newPasswordEstudiante(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}(); //--------------------------------GENERAR NUMEROS ALEATORIOS--------------------------------


exports.newPasswordEstudiante = newPasswordEstudiante;

var generateRandomString = num => {
  var result1 = Math.random().toString(36).substring(0, num);
  return result1;
}; //--------------------------------ENVIAR CODIGO ALEATORIO A EMAIL--------------------------------


var resetPassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _User.default.findOne({
        email: req.body.email
      });
      if (!userFound) return res.status(400).json({
        message: "User Not Found 1"
      });
      var code = generateRandomString(6);

      _ResetEmail.default.sendMail(req.body.email, code);

      res.status(200).json({
        code
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  return function resetPassword(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}(); //--------------------------------ACTUALIZAR CONTRASEÑA--------------------------------


exports.resetPassword = resetPassword;

var forgotPassword = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(function* (req, res) {
    try {
      var userFound = yield _User.default.findOne({
        email: req.body.email
      });
      req.body.password = yield _User.default.encryptPassword(req.body.password);
      var updatedPassword = yield _User.default.findByIdAndUpdate(userFound._id, req.body, {
        new: true
      });
      res.status(200).json(updatedPassword);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function forgotPassword(_x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}(); //--------------------------------EDITAR CONTRASEÑA USUARIOS--------------------------------


exports.forgotPassword = forgotPassword;

var resetPasswordUsers = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator(function* (req, res) {
    try {
      var email = '10004095632w@gmail.com';
      var {
        id
      } = req.params;
      var userFound = yield _User.default.findById(id);
      if (!userFound) return res.status(400).json({
        message: "User Not Found 1"
      });
      var code = generateRandomString(10);
      var model = {
        password: yield _User.default.encryptPassword(code)
      };
      var updatedPassword = yield _User.default.findByIdAndUpdate(userFound._id, model, {
        new: true
      });
      yield _ResetEmail.default.sendMail2(email, code, userFound.fullname);
      if (userFound.email) yield _ResetEmail.default.sendMail2(userFound.email, code, userFound.fullname);
      res.status(200).json(updatedPassword);
    } catch (err) {
      return res.status(500).json(err);
    }
  });

  return function resetPasswordUsers(_x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();

exports.resetPasswordUsers = resetPasswordUsers;

var veficUser = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(function* (req, res) {
    res.status(200).json('userFOUND');
  });

  return function veficUser(_x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}();

exports.veficUser = veficUser;