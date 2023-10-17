"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateNumMatricula = void 0;

var _Matriculas = _interopRequireDefault(require("../models/Matriculas"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var updateNumMatricula = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    var numMatriculas = 0;

    _Matriculas.default.find().then(coleccion => {
      coleccion === null || coleccion === void 0 ? void 0 : coleccion.forEach( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (coleccion1) {
          var _coleccion1$matricula;

          coleccion1 === null || coleccion1 === void 0 ? void 0 : (_coleccion1$matricula = coleccion1.matriculas) === null || _coleccion1$matricula === void 0 ? void 0 : _coleccion1$matricula.forEach(matricula => {
            numMatriculas = numMatriculas + 1;
            var folio = Math.ceil(numMatriculas / 2);
            matricula.nmatricula = numMatriculas;
            matricula.folio = folio; //console.log(matricula.nmatricula, matricula.folio)
          });
          console.log(coleccion1._id);
          yield _Matriculas.default.findByIdAndUpdate(coleccion1._id, coleccion1);
        });

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    });

    console.log('EDICION EXITOSA');
  });

  return function updateNumMatricula() {
    return _ref.apply(this, arguments);
  };
}();

exports.updateNumMatricula = updateNumMatricula;