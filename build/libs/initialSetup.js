"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCache = exports.iniciarSecuencia = exports.apertura = exports.aplicaciones = exports.config = exports.createAdmin = exports.createRoles = void 0;

var _Role = _interopRequireDefault(require("../models/Role"));

var _User = _interopRequireDefault(require("../models/User"));

var _Configure = _interopRequireDefault(require("../models/Configure"));

var _Apps = _interopRequireDefault(require("../models/Apps"));

var _AperturaNotas = _interopRequireDefault(require("../models/AperturaNotas"));

var _Secuencia = _interopRequireDefault(require("../models/Secuencia"));

var _rediss = require("../middlewares/rediss");

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createRoles = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      var count = yield _Role.default.estimatedDocumentCount();
      if (count > 0) return;
      var values = yield Promise.all([new _Role.default({
        name: "Estudiante"
      }).save(), new _Role.default({
        name: "Docente"
      }).save(), new _Role.default({
        name: "Admin"
      }).save(), new _Role.default({
        name: "Vicerrector"
      }).save(), new _Role.default({
        name: "Inspector"
      }).save(), new _Role.default({
        name: "Secretario"
      }).save()]);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  });

  return function createRoles() {
    return _ref.apply(this, arguments);
  };
}();

exports.createRoles = createRoles;

var createAdmin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    var user = yield _User.default.findOne({
      email: "10004095632w@gmailcom"
    });
    var roles = yield _Role.default.find({
      name: {
        $in: ["Admin"]
      }
    });

    if (!user) {
      yield _User.default.create({
        email: "10004095632w@gmail.com",
        password: yield _bcryptjs.default.hash("Medid100.*", 4),
        roles: roles.map(role => role._id),
        //****APARTIR DE A1QUI LOS NUEVOS DATOS
        fullname: "MARTINEZ MARTINEZ ESTEBAN WLADIMIR",
        cedula: "1004095632",
        foto: "https://res.cloudinary.com/dvpp07pji/image/upload/v1678812180/avatar_def_qkmwey.webp",
        status: "1",
        telefono: "0995283857"
      });
      console.log('Admin User Created!');
    }
  });

  return function createAdmin() {
    return _ref2.apply(this, arguments);
  };
}();

exports.createAdmin = createAdmin;

var config = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    yield _Configure.default.deleteMany();
    yield _Configure.default.create({
      logo: 'https://res.cloudinary.com/dvpp07pji/image/upload/v1678812136/logo_ic1ksc.png',
      logoMinisterio: 'https://res.cloudinary.com/dvpp07pji/image/upload/v1678812136/logo_ic1ksc.png',
      unidadeducativa: 'xxxx xxxx xxxx xxxx',
      ubicacion: 'xxxx xxxx xxxx xxxx',
      telefono: 'xxxx xxxx xxxx xxxx',
      direccion: 'xxxx xxxx xxxx xxxx',
      rector: 'xxxx xxxx xxxx xxxx',
      vicerector: 'xxxx xxxx xxxx xxxx',
      secretario: 'xxxx xxxx xxxx xxxx',
      inspector: 'xxxx xxxx xxxx xxxx'
    });
    console.log('config create');
  });

  return function config() {
    return _ref3.apply(this, arguments);
  };
}();

exports.config = config;

var aplicaciones = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(function* () {
    yield _Apps.default.deleteMany();
    yield _Apps.default.create({
      web: 'xxxx xxxx xxxx xxxx',
      movil: 'xxxx xxxx xxxx xxxx'
    });
    console.log('config create');
  });

  return function aplicaciones() {
    return _ref4.apply(this, arguments);
  };
}();

exports.aplicaciones = aplicaciones;

var apertura = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(function* () {
    yield _AperturaNotas.default.deleteMany();
    yield _AperturaNotas.default.create({
      inicio: '2023-04-12T21:38:00.000Z',
      fin: '2023-04-12T21:38:00.000Z',
      parcial1: '0',
      parcial2: '0',
      parcial3: '0',
      parcial4: '0',
      parcial5: '0',
      parcial6: '0',
      examen1: '0',
      examen2: '0',
      examen3: '0',
      proyecto: '0',
      supletorios: '0'
    });
    console.log('Apertura create');
  });

  return function apertura() {
    return _ref5.apply(this, arguments);
  };
}();

exports.apertura = apertura;

var iniciarSecuencia = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(function* () {
    yield _Secuencia.default.deleteMany();
    yield _Secuencia.default.create({
      numMatricula: '1'
    });
    console.log('secuencia creada');
  });

  return function iniciarSecuencia() {
    return _ref6.apply(this, arguments);
  };
}();

exports.iniciarSecuencia = iniciarSecuencia;

var clearCache = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(function* () {
    _rediss.client.del("".concat(_rediss.claveOnPort, "cursos"));

    _rediss.client.del("".concat(_rediss.claveOnPort, "fechas"));

    _rediss.client.del("".concat(_rediss.claveOnPort, "autoridades"));

    console.log('cache cleared');
  });

  return function clearCache() {
    return _ref7.apply(this, arguments);
  };
}(); //TODO LIMPIAR LA BASE DE DATOS REDIS CACHE


exports.clearCache = clearCache;