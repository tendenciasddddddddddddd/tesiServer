"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _promedios = require("./services/promedios");

var _auditoria = require("./auditoria");

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
  ifDecimal,
  ponderado,
  ponderado90,
  calcUnoPonderado,
  sumatoriaProm
} = (0, _promedios.promedio)();
var {
  saveProgreso
} = (0, _auditoria.auditoria)();
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
            yield updateNotas(id, element.idMatricula, element.fkmateria, element);
          } else {
            yield saveNotas(id, element.idMatricula, element);
          }
        }

        sendProgress(req.body, id);
        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function create(_x, _x2) {
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
            yield saveSupletorios(id, element.idMatricula, element.fkmateria, element);
          }
        }

        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function supletorios(_x3, _x4) {
      return _supletorios.apply(this, arguments);
    }

    return supletorios;
  }(),
  proyecto: function () {
    var _proyecto = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var array = req.body;

        for (var i = 0; i < array.length; i++) {
          var element = array[i];

          if (element.isConfirm) {
            yield saveProyecto(id, element.idMatricula, element.fkmateria, element);
          }
        }

        sendProgress(req.body, id);
        res.status(200).json({});
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function proyecto(_x5, _x6) {
      return _proyecto.apply(this, arguments);
    }

    return proyecto;
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
      }

      res.status(200).json({});
    });

    function ajustarPromedios(_x7, _x8) {
      return _ajustarPromedios.apply(this, arguments);
    }

    return ajustarPromedios;
  }()
};
exports.default = _default;

function saveNotas(_x9, _x10, _x11) {
  return _saveNotas.apply(this, arguments);
}

function _saveNotas() {
  _saveNotas = _asyncToGenerator(function* (idcurso, idmatricula, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados;
      /*  PRIMER QUIMESTRE ENTRA A y B  */

      var ppa = yield promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB90 = sumaParciales80(sumAB);
      var sumAB10 = examen20(Dto.exa1, Dto.pry1);
      var proAB = totalPrimerQuim(sumAB90, sumAB10);
      var pondAB = ponderado(proAB);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB90'] = sumAB90;
      data.notas['sumAB10'] = sumAB10;
      data.notas['proAB'] = proAB;
      data.notas['pondAB'] = pondAB;
      /*  SEGUNDO QUIMESTRE ENTRA C y D  */

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD90 = sumaParciales80(sumCD);
      var sumCD10 = examen20(Dto.exa2, Dto.pry2);
      var proCD = totalPrimerQuim(sumCD90, sumCD10);
      var pondCD = ponderado(proCD);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD90'] = sumCD90;
      data.notas['sumCD10'] = sumCD10;
      data.notas['proCD'] = proCD;
      data.notas['pondCD'] = pondCD;
      /*  TERCER TRIMESTRE ENTRA E y F  */

      var ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var sumEF = sumaParciales(ppe, ppf);
      var sumEF90 = sumaParciales80(sumEF);
      var sumEF10 = examen20(Dto.exa3, Dto.pry3);
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
      var suma10 = calcUnoPonderado(data.resultados.pytf);
      var promGen = sumatoriaProm(suma10, suma90);
      data.resultados['suma90'] = suma90;
      data.resultados['suma10'] = suma10;
      data.resultados['promGen'] = promGen;
      data.resultados['suma1090'] = notaFinal;
      var reg = finalSupletorios(data.resultados);
      var regAux = reg ? ifDecimal(reg) : '';
      var notaAux = '';

      if (Rto.supletorio == '') {
        notaAux = promGen;
      } else {
        notaAux = regAux;
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
  return _saveNotas.apply(this, arguments);
}

var sendProgress = (data, idcurso) => {
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
  var term = data[0].ip;
  var navegador = data[0].nav;
  total = isA + isB + isPY1 + isEX1 + isC + isD + isPY2 + isEX2 + isE + isF + isPY3 + isEX3 + isPROY;

  try {
    var model = {
      reg: total,
      materia: data[0].materia,
      fkcurso: idcurso,
      term,
      navegador,
      usuario: data[0].usuario
    };
    saveProgreso(idDistributivo, model, idCarga);
  } catch (error) {
    console.log(error);
  }
};

function updateNotas(_x12, _x13, _x14, _x15) {
  return _updateNotas.apply(this, arguments);
}

function _updateNotas() {
  _updateNotas = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var Dto = data.notas;
      var Rto = data.resultados;
      /*  PRIMER QUIMESTRE ENTRA A y B  */

      var ppa = yield promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var sumAB = sumaParciales(ppa, ppb);
      var sumAB90 = sumaParciales80(sumAB);
      var sumAB10 = examen20(Dto.exa1, Dto.pry1);
      var proAB = totalPrimerQuim(sumAB90, sumAB10);
      var pondAB = ponderado(proAB);
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['sumAB'] = sumAB;
      data.notas['sumAB90'] = sumAB90;
      data.notas['sumAB10'] = sumAB10;
      data.notas['proAB'] = proAB;
      data.notas['pondAB'] = pondAB;
      /*  SEGUNDO QUIMESTRE ENTRA C y D  */

      var ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var sumCD = sumaParciales(ppc, ppd);
      var sumCD90 = sumaParciales80(sumCD);
      var sumCD10 = examen20(Dto.exa2, Dto.pry2);
      var proCD = totalPrimerQuim(sumCD90, sumCD10);
      var pondCD = ponderado(proCD);
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['sumCD'] = sumCD;
      data.notas['sumCD90'] = sumCD90;
      data.notas['sumCD10'] = sumCD10;
      data.notas['proCD'] = proCD;
      data.notas['pondCD'] = pondCD;
      /*  TERCER TRIMESTRE ENTRA E y F  */

      var ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var sumEF = sumaParciales(ppe, ppf);
      var sumEF90 = sumaParciales80(sumEF);
      var sumEF10 = examen20(Dto.exa3, Dto.pry3);
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
      var suma10 = calcUnoPonderado(data.resultados.pytf);
      var promGen = sumatoriaProm(suma10, suma90);
      data.resultados['suma90'] = suma90;
      data.resultados['suma10'] = suma10;
      data.resultados['promGen'] = promGen;
      data.resultados['suma1090'] = notaFinal;
      var reg = finalSupletorios(data.resultados);
      var regAux = reg ? ifDecimal(reg) : '';
      var notaAux = '';

      if (Rto.supletorio == '') {
        notaAux = promGen;
      } else {
        notaAux = regAux;
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
  return _updateNotas.apply(this, arguments);
}

function saveSupletorios(_x16, _x17, _x18, _x19) {
  return _saveSupletorios.apply(this, arguments);
}

function _saveSupletorios() {
  _saveSupletorios = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var dto = data.resultados;
      var suma10 = calcUnoPonderado(dto.pytf);
      var promGen = sumatoriaProm(suma10, dto.suma90);
      dto['suma10'] = suma10;
      dto['promGen'] = promGen;
      var reg = finalSupletorios(dto);
      var regAux = reg ? ifDecimal(reg) : '';

      if (dto.supletorio == '') {
        regAux = promGen;
      }

      dto.notaFinal = regAux;
      yield _Matriculas.default.updateOne({
        _id: idcurso
      }, {
        $set: {
          "matriculas.$[perf].computo.$[est].resultados": dto
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
  return _saveSupletorios.apply(this, arguments);
}

function saveProyecto(_x20, _x21, _x22, _x23) {
  return _saveProyecto.apply(this, arguments);
}

function _saveProyecto() {
  _saveProyecto = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var dto = data.resultados;
      var suma10 = calcUnoPonderado(dto.pytf);
      var promGen = sumatoriaProm(suma10, dto.suma90);
      dto['suma10'] = suma10;
      dto['promGen'] = promGen;
      var notaAux = '';

      if (dto.supletorio == '') {
        notaAux = promGen;
      } else {
        var reg = finalSupletorios(dto);
        var regAux = reg ? ifDecimal(reg) : '';
        notaAux = regAux;
      }

      dto.notaFinal = notaAux;
      yield _Matriculas.default.updateOne({
        _id: idcurso
      }, {
        $set: {
          "matriculas.$[perf].computo.$[est].resultados": dto
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
  return _saveProyecto.apply(this, arguments);
}