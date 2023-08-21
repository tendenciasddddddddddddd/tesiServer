"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _promedios = require("./helper/promedios");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  promedioInsumos,
  sumaParciales,
  sumaParciales80,
  examen20,
  totalPrimerQuim,
  finalAnual,
  finalSupletorios,
  ifDecimal
} = (0, _promedios.promedio)();

function primerIngresoNotas(_x, _x2, _x3) {
  return _primerIngresoNotas.apply(this, arguments);
}

function _primerIngresoNotas() {
  _primerIngresoNotas = _asyncToGenerator(function* (idcurso, idmatricula, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados; //PRIMER QUIMESTRE ENTRA A y B

      var ppa = yield promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4, Dto.a5);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4, Dto.b5);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB80 = sumaParciales80(sumAB);
      var sumAB20 = examen20(Dto.exa1);
      var proAB = totalPrimerQuim(sumAB80, sumAB20);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB80'] = sumAB80;
      data.notas['sumAB20'] = sumAB20;
      data.notas['proAB'] = proAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4, Dto.c5);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4, Dto.d5);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD80 = sumaParciales80(sumCD);
      var sumCD20 = examen20(Dto.exa2);
      var proCD = totalPrimerQuim(sumCD80, sumCD20);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD80'] = sumCD80;
      data.notas['sumCD20'] = sumCD20;
      data.notas['proCD'] = proCD; //RESUKTADOS FINALES DE NOTAS

      var notaFinal = finalAnual(proAB, proCD);
      data.resultados.promedioFinal = notaFinal;
      var notaAux = '';

      if (Rto.supletorio == '' && Rto.remedial == '' && Rto.gracia == '') {
        notaAux = notaFinal;
      } else {
        notaAux = Rto.supletorio;
        notaAux = Rto.remedial;
        notaAux = Rto.gracia;
      }

      data.resultados.notaFinal = notaAux;
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

function primerIngresoIniciales(_x4, _x5, _x6) {
  return _primerIngresoIniciales.apply(this, arguments);
}

function _primerIngresoIniciales() {
  _primerIngresoIniciales = _asyncToGenerator(function* (idcurso, idmatricula, data) {
    try {
      yield _Matriculas.default.updateOne({
        _id: idcurso
      }, {
        $set: {
          "matriculas.$[perf].destrezas": data
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
  return _primerIngresoIniciales.apply(this, arguments);
}

function actualizarIngresoNotas(_x7, _x8, _x9, _x10) {
  return _actualizarIngresoNotas.apply(this, arguments);
}

function _actualizarIngresoNotas() {
  _actualizarIngresoNotas = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados; //PRIMER QUIMESTRE ENTRA A y B

      var ppa = promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4, Dto.a5);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4, Dto.b5);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB80 = sumaParciales80(sumAB);
      var sumAB20 = examen20(Dto.exa1);
      var proAB = totalPrimerQuim(sumAB80, sumAB20);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB80'] = sumAB80;
      data.notas['sumAB20'] = sumAB20;
      data.notas['proAB'] = proAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4, Dto.c5);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4, Dto.d5);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD80 = sumaParciales80(sumCD);
      var sumCD20 = examen20(Dto.exa2);
      var proCD = totalPrimerQuim(sumCD80, sumCD20);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD80'] = sumCD80;
      data.notas['sumCD20'] = sumCD20;
      data.notas['proCD'] = proCD; //RESUKTADOS FINALES DE NOTAS

      var notaFinal = finalAnual(proAB, proCD);
      data.resultados.promedioFinal = notaFinal;
      var notaAux = '';

      if (Rto.supletorio == '' && Rto.remedial == '' && Rto.gracia == '') {
        notaAux = notaFinal;
      } else {
        notaAux = Rto.supletorio;
        notaAux = Rto.remedial;
        notaAux = Rto.gracia;
      }

      data.resultados.notaFinal = notaAux;
      yield _Matriculas.default.updateOne({
        _id: idcurso
      }, {
        $set: {
          "matriculas.$[perf].computo.$[est].notas": data.notas,
          "matriculas.$[perf].computo.$[est].resultados": data.resultados,
          "matriculas.$[perf].computo.$[est].fkdocente": data.fkdocente,
          "matriculas.$[perf].computo.$[est].docente": data.docente,
          "matriculas.$[perf].computo.$[est].orden": data.orden,
          "matriculas.$[perf].computo.$[est].cualitativo": {}
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
  return _actualizarIngresoNotas.apply(this, arguments);
}

function actualizarIngresoSupletorios(_x11, _x12, _x13, _x14) {
  return _actualizarIngresoSupletorios.apply(this, arguments);
}

function _actualizarIngresoSupletorios() {
  _actualizarIngresoSupletorios = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var reg = finalSupletorios(data.resultados);
      var regAux = reg ? ifDecimal(reg) : '';

      if (data.resultados.supletorio == '' && data.resultados.remedial == '' && data.resultados.gracia == '') {
        regAux = data.resultados.promedioFinal ? ifDecimal(data.resultados.promedioFinal) : '';
      }

      data.resultados.notaFinal = regAux;
      yield _Matriculas.default.updateOne({
        _id: idcurso
      }, {
        $set: {
          "matriculas.$[perf].computo.$[est].resultados": data.resultados
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
  return _actualizarIngresoSupletorios.apply(this, arguments);
}

function actualizarIngresoNotasCualitativo(_x15, _x16, _x17, _x18) {
  return _actualizarIngresoNotasCualitativo.apply(this, arguments);
}

function _actualizarIngresoNotasCualitativo() {
  _actualizarIngresoNotasCualitativo = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
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
  return _actualizarIngresoNotasCualitativo.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var array = req.body;

        for (var i = 0; i < array.length; i++) {
          var element = array[i];

          if (element.isConfirm) {
            yield actualizarIngresoNotas(id, element.idMatricula, element.fkmateria, element);
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

    function create(_x19, _x20) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  supletorios: function () {
    var _supletorios = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var array = req.body;

        for (var i = 0; i < array.length; i++) {
          var element = array[i];

          if (element.isConfirm) {
            yield actualizarIngresoSupletorios(id, element.idMatricula, element.fkmateria, element);
          }
        }

        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function supletorios(_x21, _x22) {
      return _supletorios.apply(this, arguments);
    }

    return supletorios;
  }(),
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
            yield actualizarIngresoNotasCualitativo(id, element.idMatricula, element.fkmateria, element);
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

    function createCualitativo(_x23, _x24) {
      return _createCualitativo.apply(this, arguments);
    }

    return createCualitativo;
  }(),
  iniciales: function () {
    var _iniciales = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var array = req.body;

        for (var i = 0; i < array.length; i++) {
          var element = array[i];
          yield primerIngresoIniciales(id, element.idMatricula, element);
        }

        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function iniciales(_x25, _x26) {
      return _iniciales.apply(this, arguments);
    }

    return iniciales;
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
            yield actualizarIngresoNotas(matriculas[i]._id, element[j]._id, subelement[k].fkmateria, finelement);
          }
        }
      } //console.log(matriculas);


      res.status(200).json({});
    });

    function ajustarPromedios(_x27, _x28) {
      return _ajustarPromedios.apply(this, arguments);
    }

    return ajustarPromedios;
  }()
};
exports.default = _default;