"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _promedioLetras = require("./helper/promedioLetras");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  calcPrimerParcial
} = (0, _promedioLetras.promedioLetras)();

function primerIngresoNotas(_x, _x2, _x3) {
  return _primerIngresoNotas.apply(this, arguments);
}

function _primerIngresoNotas() {
  _primerIngresoNotas = _asyncToGenerator(function* (idcurso, idmatricula, data) {
    try {
      var Dto = data.cualitativo; //PRIMER QUIMESTRE ENTRA A y B

      var sumaP1P2PY = calcPrimerParcial(Dto.p1, Dto.p2, Dto.py1);
      data.cualitativo['sumaP1P2PY'] = sumaP1P2PY; //SEGUNDO QUIMESTRE ENTRA C y D

      var sumaP3P4PY = calcPrimerParcial(Dto.p3, Dto.p4, Dto.py2);
      data.cualitativo['sumaP3P4PY'] = sumaP3P4PY; //TERCER TRIMESTRE ENTRA E y F

      var sumaP5P6PY = calcPrimerParcial(Dto.p5, Dto.p6, Dto.py3);
      data.cualitativo['sumaP5P6PY'] = sumaP5P6PY; //RESUKTADOS FINALES DE NOTAS

      var promGen = calcPrimerParcial(sumaP1P2PY, sumaP3P4PY, sumaP5P6PY);
      data.resultados['promGen'] = promGen;
      yield _Matriculas.default.updateOne({
        _id: idcurso
      }, {
        $push: {
          "matriculas.$[perf].computo": data
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idmatricula
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  });
  return _primerIngresoNotas.apply(this, arguments);
}

function updateNotas(_x4, _x5, _x6, _x7) {
  return _updateNotas.apply(this, arguments);
}

function _updateNotas() {
  _updateNotas = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var Dto = data.cualitativo; //PRIMER QUIMESTRE ENTRA A y B

      var sumaP1P2PY = calcPrimerParcial(Dto.p1, Dto.p2, Dto.py1);
      data.cualitativo['sumaP1P2PY'] = sumaP1P2PY; //SEGUNDO QUIMESTRE ENTRA C y D

      var sumaP3P4PY = calcPrimerParcial(Dto.p3, Dto.p4, Dto.py2);
      data.cualitativo['sumaP3P4PY'] = sumaP3P4PY; //TERCER TRIMESTRE ENTRA E y F

      var sumaP5P6PY = calcPrimerParcial(Dto.p5, Dto.p6, Dto.py3);
      data.cualitativo['sumaP5P6PY'] = sumaP5P6PY; //RESUKTADOS FINALES DE NOTAS

      var promGen = calcPrimerParcial(sumaP1P2PY, sumaP3P4PY, sumaP5P6PY);
      data.resultados['promGen'] = promGen;
      yield _Matriculas.default.updateOne({
        _id: idcurso
      }, {
        $set: {
          "matriculas.$[perf].computo.$[est].cualitativo": data.cualitativo,
          "matriculas.$[perf].computo.$[est].resultados": data.resultados,
          "matriculas.$[perf].computo.$[est].fkdocente": data.fkdocente,
          "matriculas.$[perf].computo.$[est].docente": data.docente,
          "matriculas.$[perf].computo.$[est].orden": data.orden,
          "matriculas.$[perf].computo.$[est].notas": {}
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idmatricula
          }
        }, {
          "est.fkmateria": {
            $eq: fkmateria
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  });
  return _updateNotas.apply(this, arguments);
}

var _default = {
  createCualitativo: function () {
    var _createCualitativo = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var array = req.body;

        for (var i = 0; i < array.length; i++) {
          var element = array[i];

          if (element.isConfirm) {
            yield updateNotas(id, element.idMatricula, element.fkmateria, element);
          } else {
            yield primerIngresoNotas(id, element.idMatricula, element);
          }
        }

        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function createCualitativo(_x8, _x9) {
      return _createCualitativo.apply(this, arguments);
    }

    return createCualitativo;
  }(),
  ajustarPromedios: function () {
    var _ajustarPromedios = _asyncToGenerator(function* (req, res) {
      var {
        id
      } = req.params;
      var matriculas = yield _Matriculas.default.find({
        fkcurso: id
      });

      for (var i = 0; i < matriculas.length; i++) {
        var element = matriculas[i].matriculas;

        for (var j = 0; j < element.length; j++) {
          var subelement = element[j].computo;

          for (var k = 0; k < subelement.length; k++) {
            var finelement = subelement[k];
            yield updateNotas(matriculas[i]._id, element[j]._id, subelement[k].fkmateria, finelement);
          }
        }
      } //console.log(matriculas);


      res.status(200).json({});
    });

    function ajustarPromedios(_x10, _x11) {
      return _ajustarPromedios.apply(this, arguments);
    }

    return ajustarPromedios;
  }()
};
exports.default = _default;