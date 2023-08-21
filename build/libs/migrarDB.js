"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteMatriculasMany = exports.temporalMatricula = exports.migracionMatricula = void 0;

var _Matriculas = _interopRequireDefault(require("../models/Matriculas"));

var _Respaldo = _interopRequireDefault(require("../models/Respaldo"));

var _Temporal = _interopRequireDefault(require("../models/Temporal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var migracionMatricula = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    _Matriculas.default.find().then(colecciones => {
      colecciones.forEach(array => {
        var nuewData = (0, _Respaldo.default)(array);
        nuewData.isNew = true;
        nuewData.save();
      });
    });

    console.log('migracion creada');
  });

  return function migracionMatricula() {
    return _ref.apply(this, arguments);
  };
}();

exports.migracionMatricula = migracionMatricula;

var temporalMatricula = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* () {
    _Matriculas.default.find().then(colecciones => {
      colecciones.forEach(array => {
        var nuewData = (0, _Temporal.default)(array);
        nuewData.isNew = true;
        nuewData.save();
      });
    });

    console.log('temporal creada');
  });

  return function temporalMatricula() {
    return _ref2.apply(this, arguments);
  };
}(); //-------------------ELIMINAMOS LOS DATOS DE LA TABLA MATRICULA---------------------------


exports.temporalMatricula = temporalMatricula;

var deleteMatriculasMany = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(function* () {
    try {
      yield _Matriculas.default.deleteMany();
      console.log('temporal creada');
    } catch (e) {
      console.log('ERROR EN ELIMINACION');
    }
  });

  return function deleteMatriculasMany() {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteMatriculasMany = deleteMatriculasMany;