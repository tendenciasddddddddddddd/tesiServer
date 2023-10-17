"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _auditoria = require("./auditoria");

var _promedios = require("./services/promedios");

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
  ponderado,
  ponderado90,
  calcDosPonderado,
  sumatoriaProm
} = (0, _promedios.promedio)();
var {
  saveProgreso
} = (0, _auditoria.auditoria)();

function primerIngresoNotas(_x, _x2, _x3) {
  return _primerIngresoNotas.apply(this, arguments);
}

function _primerIngresoNotas() {
  _primerIngresoNotas = _asyncToGenerator(function* (idcurso, idmatricula, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados; //PRIMER QUIMESTRE ENTRA A y B

      var ppa = yield promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB90 = sumaParciales80(sumAB);
      var sumAB10 = examen20(Dto.pry1, Dto.pry1);
      var proAB = totalPrimerQuim(sumAB90, sumAB10);
      var pondAB = ponderado(proAB);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB90'] = sumAB90;
      data.notas['sumAB10'] = sumAB10;
      data.notas['proAB'] = proAB;
      data.notas['pondAB'] = pondAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD90 = sumaParciales80(sumCD);
      var sumCD10 = examen20(Dto.pry2, Dto.pry2);
      var proCD = totalPrimerQuim(sumCD90, sumCD10);
      var pondCD = ponderado(proCD);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD90'] = sumCD90;
      data.notas['sumCD10'] = sumCD10;
      data.notas['proCD'] = proCD;
      data.notas['pondCD'] = pondCD; //TERCER TRIMESTRE ENTRA E y F

      var ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var sumEF = sumaParciales(ppe, ppf);
      var sumEF90 = sumaParciales80(sumEF);
      var sumEF10 = examen20(Dto.pry3, Dto.pry3);
      var proEF = totalPrimerQuim(sumEF90, sumEF10);
      var pondEF = ponderado(proEF);
      data.notas['ppe'] = ppe;
      data.notas['ppf'] = ppf;
      data.notas['sumEF'] = sumEF;
      data.notas['sumEF90'] = sumEF90;
      data.notas['sumEF10'] = sumEF10;
      data.notas['proEF'] = proEF;
      data.notas['pondEF'] = pondEF; //RESUKTADOS FINALES DE NOTAS

      var notaFinal = finalAnual(proAB, proCD, proEF);
      data.resultados.promedioFinal = notaFinal;
      data.resultados['notaFinal'] = notaFinal;
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

function primerIngresoCuarto(_x4, _x5, _x6) {
  return _primerIngresoCuarto.apply(this, arguments);
}

function _primerIngresoCuarto() {
  _primerIngresoCuarto = _asyncToGenerator(function* (idcurso, idmatricula, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados; //PRIMER QUIMESTRE ENTRA A y B

      var ppa = yield promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB90 = sumaParciales80(sumAB);
      var sumAB10 = examen20(Dto.pry1, Dto.exa1);
      var proAB = totalPrimerQuim(sumAB90, sumAB10);
      var pondAB = ponderado(proAB);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB90'] = sumAB90;
      data.notas['sumAB10'] = sumAB10;
      data.notas['proAB'] = proAB;
      data.notas['pondAB'] = pondAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD90 = sumaParciales80(sumCD);
      var sumCD10 = examen20(Dto.pry2, Dto.exa2);
      var proCD = totalPrimerQuim(sumCD90, sumCD10);
      var pondCD = ponderado(proCD);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD90'] = sumCD90;
      data.notas['sumCD10'] = sumCD10;
      data.notas['proCD'] = proCD;
      data.notas['pondCD'] = pondCD; //TERCER TRIMESTRE ENTRA E y F

      var ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var sumEF = sumaParciales(ppe, ppf);
      var sumEF90 = sumaParciales80(sumEF);
      var sumEF10 = examen20(Dto.pry3, Dto.exa3);
      var proEF = totalPrimerQuim(sumEF90, sumEF10);
      var pondEF = ponderado(proEF);
      data.notas['ppe'] = ppe;
      data.notas['ppf'] = ppf;
      data.notas['sumEF'] = sumEF;
      data.notas['sumEF90'] = sumEF90;
      data.notas['sumEF10'] = sumEF10;
      data.notas['proEF'] = proEF;
      data.notas['pondEF'] = pondEF; //RESUKTADOS FINALES DE NOTAS

      var notaFinal = finalAnual(proAB, proCD, proEF);
      var suma90 = ponderado90(notaFinal);
      var suma10 = calcDosPonderado(data.resultados.pytf, data.resultados.pytf);
      var promGen = sumatoriaProm(suma10, suma90);
      data.resultados['suma90'] = suma90;
      data.resultados['suma10'] = suma10;
      data.resultados['promGen'] = promGen;
      data.resultados['suma1090'] = notaFinal;
      data.resultados.notaFinal = promGen;
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
  return _primerIngresoCuarto.apply(this, arguments);
}

function actualizarIngresoNotas(_x7, _x8, _x9, _x10) {
  return _actualizarIngresoNotas.apply(this, arguments);
}

function _actualizarIngresoNotas() {
  _actualizarIngresoNotas = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados; //PRIMER QUIMESTRE ENTRA A y B

      var ppa = yield promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB90 = sumaParciales80(sumAB);
      var sumAB10 = examen20(Dto.pry1, Dto.pry1);
      var proAB = totalPrimerQuim(sumAB90, sumAB10);
      var pondAB = ponderado(proAB);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB90'] = sumAB90;
      data.notas['sumAB10'] = sumAB10;
      data.notas['proAB'] = proAB;
      data.notas['pondAB'] = pondAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD90 = sumaParciales80(sumCD);
      var sumCD10 = examen20(Dto.pry2, Dto.pry2);
      var proCD = totalPrimerQuim(sumCD90, sumCD10);
      var pondCD = ponderado(proCD);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD90'] = sumCD90;
      data.notas['sumCD10'] = sumCD10;
      data.notas['proCD'] = proCD;
      data.notas['pondCD'] = pondCD; //TERCER TRIMESTRE ENTRA E y F

      var ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var sumEF = sumaParciales(ppe, ppf);
      var sumEF90 = sumaParciales80(sumEF);
      var sumEF10 = examen20(Dto.pry3, Dto.pry3);
      var proEF = totalPrimerQuim(sumEF90, sumEF10);
      var pondEF = ponderado(proEF);
      data.notas['ppe'] = ppe;
      data.notas['ppf'] = ppf;
      data.notas['sumEF'] = sumEF;
      data.notas['sumEF90'] = sumEF90;
      data.notas['sumEF10'] = sumEF10;
      data.notas['proEF'] = proEF;
      data.notas['pondEF'] = pondEF; //RESUKTADOS FINALES DE NOTAS

      var notaFinal = finalAnual(proAB, proCD, proEF);
      data.resultados.promedioFinal = notaFinal;
      data.resultados['notaFinal'] = notaFinal;
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

function actualizarIngresoCuarto(_x11, _x12, _x13, _x14) {
  return _actualizarIngresoCuarto.apply(this, arguments);
}

function _actualizarIngresoCuarto() {
  _actualizarIngresoCuarto = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados; //PRIMER QUIMESTRE ENTRA A y B

      var ppa = yield promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB90 = sumaParciales80(sumAB);
      var sumAB10 = examen20(Dto.pry1, Dto.exa1);
      var proAB = totalPrimerQuim(sumAB90, sumAB10);
      var pondAB = ponderado(proAB);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB90'] = sumAB90;
      data.notas['sumAB10'] = sumAB10;
      data.notas['proAB'] = proAB;
      data.notas['pondAB'] = pondAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD90 = sumaParciales80(sumCD);
      var sumCD10 = examen20(Dto.pry2, Dto.exa2);
      var proCD = totalPrimerQuim(sumCD90, sumCD10);
      var pondCD = ponderado(proCD);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD90'] = sumCD90;
      data.notas['sumCD10'] = sumCD10;
      data.notas['proCD'] = proCD;
      data.notas['pondCD'] = pondCD; //TERCER TRIMESTRE ENTRA E y F

      var ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var sumEF = sumaParciales(ppe, ppf);
      var sumEF90 = sumaParciales80(sumEF);
      var sumEF10 = examen20(Dto.pry3, Dto.exa3);
      var proEF = totalPrimerQuim(sumEF90, sumEF10);
      var pondEF = ponderado(proEF);
      data.notas['ppe'] = ppe;
      data.notas['ppf'] = ppf;
      data.notas['sumEF'] = sumEF;
      data.notas['sumEF90'] = sumEF90;
      data.notas['sumEF10'] = sumEF10;
      data.notas['proEF'] = proEF;
      data.notas['pondEF'] = pondEF;
      /*  RESUKTADOS FINALES DE NOTAS  */

      var notaFinal = finalAnual(proAB, proCD, proEF);
      var suma90 = ponderado90(notaFinal);
      var suma10 = calcDosPonderado(data.resultados.pytf, data.resultados.pytf);
      var promGen = sumatoriaProm(suma10, suma90);
      data.resultados['suma90'] = suma90;
      data.resultados['suma10'] = suma10;
      data.resultados['promGen'] = promGen;
      data.resultados['suma1090'] = notaFinal;
      data.resultados.notaFinal = promGen;
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
  return _actualizarIngresoCuarto.apply(this, arguments);
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

        sendProgress(req.body, id);
        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function create(_x15, _x16) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  createCuarto: function () {
    var _createCuarto = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var array = req.body;

        for (var i = 0; i < array.length; i++) {
          var element = array[i];

          if (element.isConfirm) {
            yield actualizarIngresoCuarto(id, element.idMatricula, element.fkmateria, element);
          } else {
            yield primerIngresoCuarto(id, element.idMatricula, element);
          }
        }

        sendProgress2(req.body, id);
        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function createCuarto(_x17, _x18) {
      return _createCuarto.apply(this, arguments);
    }

    return createCuarto;
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

    function ajustarPromedios(_x19, _x20) {
      return _ajustarPromedios.apply(this, arguments);
    }

    return ajustarPromedios;
  }()
};
exports.default = _default;

var sendProgress = (data, idcurso) => {
  var total = 0;
  var isA = 0;
  var isB = 0;
  var isPY1 = 0;
  var isC = 0;
  var isD = 0;
  var isPY2 = 0;
  var isE = 0;
  var isF = 0;
  var isPY3 = 0;

  for (var i = 0; i < data.length; i++) {
    var element = data[i].notas;

    if ((element === null || element === void 0 ? void 0 : element.a1) != '' || (element === null || element === void 0 ? void 0 : element.a2) != '' || (element === null || element === void 0 ? void 0 : element.a3) != '' || (element === null || element === void 0 ? void 0 : element.a4) != '') {
      isA = 10;
    }

    if ((element === null || element === void 0 ? void 0 : element.b1) != '' || (element === null || element === void 0 ? void 0 : element.b2) != '' || (element === null || element === void 0 ? void 0 : element.b3) != '' || (element === null || element === void 0 ? void 0 : element.b4) != '') {
      isB = 10;
    }

    if ((element === null || element === void 0 ? void 0 : element.pry1) != '') {
      isPY1 = 15;
    }

    if ((element === null || element === void 0 ? void 0 : element.c1) != '' || (element === null || element === void 0 ? void 0 : element.c2) != '' || (element === null || element === void 0 ? void 0 : element.c3) != '' || (element === null || element === void 0 ? void 0 : element.c4) != '') {
      isC = 10;
    }

    if ((element === null || element === void 0 ? void 0 : element.d1) != '' || (element === null || element === void 0 ? void 0 : element.d2) != '' || (element === null || element === void 0 ? void 0 : element.d3) != '' || (element === null || element === void 0 ? void 0 : element.d4) != '') {
      isD = 10;
    }

    if ((element === null || element === void 0 ? void 0 : element.pry2) != '') {
      isPY2 = 15;
    }

    if ((element === null || element === void 0 ? void 0 : element.e1) != '' || (element === null || element === void 0 ? void 0 : element.e2) != '' || (element === null || element === void 0 ? void 0 : element.e3) != '' || (element === null || element === void 0 ? void 0 : element.e4) != '') {
      isE = 10;
    }

    if ((element === null || element === void 0 ? void 0 : element.f1) != '' || (element === null || element === void 0 ? void 0 : element.f2) != '' || (element === null || element === void 0 ? void 0 : element.f3) != '' || (element === null || element === void 0 ? void 0 : element.f4) != '') {
      isF = 10;
    }

    if ((element === null || element === void 0 ? void 0 : element.pry3) != '') {
      isPY3 = 10;
    }
  }

  var idDistributivo = data[0].idDistributivo;
  var idCarga = data[0].idCarga;
  var ip = data[0].ip;
  var navegador = data[0].nav;
  total = isA + isB + isPY1 + isC + isD + isPY2 + isE + isF + isPY3;

  try {
    var model = {
      reg: total,
      materia: data[0].materia,
      fkcurso: idcurso,
      term: ip,
      navegador: navegador,
      usuario: data[0].usuario
    };
    saveProgreso(idDistributivo, model, idCarga);
  } catch (error) {
    console.log(error);
  }
};

var sendProgress2 = (data, idcurso) => {
  var total = 0;
  var isA = 0;
  var isB = 0;
  var isPY1 = 0;
  var isEX1 = 0;
  var isC = 0;
  var isD = 0;
  var isPY2 = 0;
  var isEX2 = 0;
  var isE = 0;
  var isF = 0;
  var isPY3 = 0;
  var isEX3 = 0;
  var isPROY = 0;

  for (var i = 0; i < data.length; i++) {
    var element = data[i].notas;
    var proy = data[i].resultados;
    if ((element === null || element === void 0 ? void 0 : element.a1) != '' || (element === null || element === void 0 ? void 0 : element.a2) != '' || (element === null || element === void 0 ? void 0 : element.a3) != '' || (element === null || element === void 0 ? void 0 : element.a4) != '') isA = 10;
    if ((element === null || element === void 0 ? void 0 : element.b1) != '' || (element === null || element === void 0 ? void 0 : element.b2) != '' || (element === null || element === void 0 ? void 0 : element.b3) != '' || (element === null || element === void 0 ? void 0 : element.b4) != '') isB = 10;
    if ((element === null || element === void 0 ? void 0 : element.pry1) != '') isPY1 = 5;
    if ((element === null || element === void 0 ? void 0 : element.exa1) != '') isEX1 = 5;
    if ((element === null || element === void 0 ? void 0 : element.c1) != '' || (element === null || element === void 0 ? void 0 : element.c2) != '' || (element === null || element === void 0 ? void 0 : element.c3) != '' || (element === null || element === void 0 ? void 0 : element.c4) != '') isC = 10;
    if ((element === null || element === void 0 ? void 0 : element.d1) != '' || (element === null || element === void 0 ? void 0 : element.d2) != '' || (element === null || element === void 0 ? void 0 : element.d3) != '' || (element === null || element === void 0 ? void 0 : element.d4) != '') isD = 10;
    if ((element === null || element === void 0 ? void 0 : element.pry2) != '') isPY2 = 5;
    if ((element === null || element === void 0 ? void 0 : element.exa2) != '') isEX2 = 5;
    if ((element === null || element === void 0 ? void 0 : element.e1) != '' || (element === null || element === void 0 ? void 0 : element.e2) != '' || (element === null || element === void 0 ? void 0 : element.e3) != '' || (element === null || element === void 0 ? void 0 : element.e4) != '') isE = 10;
    if ((element === null || element === void 0 ? void 0 : element.f1) != '' || (element === null || element === void 0 ? void 0 : element.f2) != '' || (element === null || element === void 0 ? void 0 : element.f3) != '' || (element === null || element === void 0 ? void 0 : element.f4) != '') isF = 10;
    if ((element === null || element === void 0 ? void 0 : element.pry3) != '') isPY3 = 5;
    if ((element === null || element === void 0 ? void 0 : element.exa3) != '') isEX3 = 5;
    if ((proy === null || proy === void 0 ? void 0 : proy.pytf) != '') isPROY = 10;
  }

  var idDistributivo = data[0].idDistributivo;
  var idCarga = data[0].idCarga;
  var ip = data[0].ip;
  var navegador = data[0].nav;
  total = isA + isB + isPY1 + isC + isD + isPY2 + isE + isF + isPY3 + isPROY + isEX1 + isEX2 + isEX3;

  try {
    var model = {
      reg: total,
      materia: data[0].materia,
      fkcurso: idcurso,
      term: ip,
      navegador: navegador,
      usuario: data[0].usuario
    };
    saveProgreso(idDistributivo, model, idCarga);
  } catch (error) {
    console.log(error);
  }
};