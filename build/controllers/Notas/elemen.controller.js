"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _auditoria = require("./auditoria");

var _promElement = require("./helper/promElement");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  saveProgreso
} = (0, _auditoria.auditoria)();
var {
  convertirNum,
  calcularPromedioInsumos
} = (0, _promElement.promElement)();

function primerIngresoNotas(_x, _x2, _x3) {
  return _primerIngresoNotas.apply(this, arguments);
}

function _primerIngresoNotas() {
  _primerIngresoNotas = _asyncToGenerator(function* (idcurso, idmatricula, data) {
    try {
      var Dto = data.notas; //PRIMER QUIMESTRE ENTRA A y B

      var pr1 = convertirNum(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppa = calcularPromedioInsumos(pr1[0], pr1[1], pr1[2], pr1[3]);
      var pr2 = convertirNum(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var ppb = calcularPromedioInsumos(pr2[0], pr2[1], pr2[2], pr2[3]);
      var pr3 = convertirNum(ppa, ppb, Dto.pry1, '0');
      var proAB = calcularPromedioInsumos(pr3[0], pr3[1], pr3[2], '');
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['proAB'] = proAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var pr4 = convertirNum(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppc = calcularPromedioInsumos(pr4[0], pr4[1], pr4[2], pr4[3]);
      var pr5 = convertirNum(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var ppd = calcularPromedioInsumos(pr5[0], pr5[1], pr5[2], pr5[3]);
      var pr6 = convertirNum(ppc, ppd, Dto.pry2, '0');
      var proCD = calcularPromedioInsumos(pr6[0], pr6[1], pr6[2], '');
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['proCD'] = proCD; //TERCER QUIMESTRE ENTRA E y F

      var pr7 = convertirNum(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppe = calcularPromedioInsumos(pr7[0], pr7[1], pr7[2], pr7[3]);
      var pr8 = convertirNum(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var ppf = calcularPromedioInsumos(pr8[0], pr8[1], pr8[2], pr8[3]);
      var pr9 = convertirNum(ppe, ppf, Dto.pry2, '0');
      var proEF = calcularPromedioInsumos(pr9[0], pr9[1], pr9[2], '');
      data.notas['ppe'] = ppe;
      data.notas['ppf'] = ppf;
      data.notas['proEF'] = proEF;
      var final = convertirNum(proAB, proCD, proEF, 'm');
      var final2 = calcularPromedioInsumos(final[0], final[1], final[2], '');
      data.resultados.notaFinal = final2;
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

function actualizarIngresoNotas(_x4, _x5, _x6, _x7) {
  return _actualizarIngresoNotas.apply(this, arguments);
}

function _actualizarIngresoNotas() {
  _actualizarIngresoNotas = _asyncToGenerator(function* (idcurso, idmatricula, fkmateria, data) {
    try {
      var Dto = data.notas; //PRIMER QUIMESTRE ENTRA A y B

      var pr1 = convertirNum(Dto.a1, Dto.a2, Dto.a3, Dto.a4);
      var ppa = calcularPromedioInsumos(pr1[0], pr1[1], pr1[2], pr1[3]);
      var pr2 = convertirNum(Dto.b1, Dto.b2, Dto.b3, Dto.b4);
      var ppb = calcularPromedioInsumos(pr2[0], pr2[1], pr2[2], pr2[3]);
      var pr3 = convertirNum(ppa, ppb, Dto.pry1, '0');
      var proAB = calcularPromedioInsumos(pr3[0], pr3[1], pr3[2], '');
      data.notas['ppa'] = ppa;
      data.notas['ppb'] = ppb;
      data.notas['proAB'] = proAB; //SEGUNDO QUIMESTRE ENTRA C y D

      var pr4 = convertirNum(Dto.c1, Dto.c2, Dto.c3, Dto.c4);
      var ppc = calcularPromedioInsumos(pr4[0], pr4[1], pr4[2], pr4[3]);
      var pr5 = convertirNum(Dto.d1, Dto.d2, Dto.d3, Dto.d4);
      var ppd = calcularPromedioInsumos(pr5[0], pr5[1], pr5[2], pr5[3]);
      var pr6 = convertirNum(ppc, ppd, Dto.pry2, '0');
      var proCD = calcularPromedioInsumos(pr6[0], pr6[1], pr6[2], '');
      data.notas['ppc'] = ppc;
      data.notas['ppd'] = ppd;
      data.notas['proCD'] = proCD; //TERCER QUIMESTRE ENTRA E y F

      var pr7 = convertirNum(Dto.e1, Dto.e2, Dto.e3, Dto.e4);
      var ppe = calcularPromedioInsumos(pr7[0], pr7[1], pr7[2], pr7[3]);
      var pr8 = convertirNum(Dto.f1, Dto.f2, Dto.f3, Dto.f4);
      var ppf = calcularPromedioInsumos(pr8[0], pr8[1], pr8[2], pr8[3]);
      var pr9 = convertirNum(ppe, ppf, Dto.pry2, '0');
      var proEF = calcularPromedioInsumos(pr9[0], pr9[1], pr9[2], '');
      data.notas['ppe'] = ppe;
      data.notas['ppf'] = ppf;
      data.notas['proEF'] = proEF;
      var final = convertirNum(proAB, proCD, proEF, 'm');
      var final2 = calcularPromedioInsumos(final[0], final[1], final[2], '');
      data.resultados.notaFinal = final2;
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

    function create(_x8, _x9) {
      return _create.apply(this, arguments);
    }

    return create;
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

    function ajustarPromedios(_x10, _x11) {
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