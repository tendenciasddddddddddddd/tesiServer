"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reporteSuper = void 0;

var reporteSuper = () => {
  var calcProm = array => {
    var contador = 0;
    var aux = 0;
    var result = 0;

    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      if (element == '') continue;
      if (isNaN(element)) continue;
      contador = contador + parseFloat(element);
      aux += 1;
    }

    var pro = contador / aux;
    result = trunc(pro, 2);
    if (isNaN(result) || result == '') result = '';
    return ifDecimal(result);
  };

  var juntasExamProyec = (rowM, rowD, estudiantes, paralelo, keymateria) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();
      matriculas.sort(function (a, b) {
        var nameA = a.estudiante.fullname.toLowerCase(),
            nameB = b.estudiante.fullname.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
        if (keymateria == distributivo[j].fkmaterias) {
          var _materias$materia, _materias$docente;

          var aux = [];
          var materias = distributivo[j];
          var promAB = [];
          var promCD = [];
          var promEF = [];
          var promGe = [];
          var promF = [];

          for (var k = 0; k < matriculas.length; k++) {
            var res = matriculas[k];

            if (estudiantes.includes(res.fkestudiante)) {
              var _res$estudiante;

              var computo = matriculas[k].computo;
              var proAB = void 0,
                  proCD = void 0,
                  proEF = void 0,
                  suma1090 = void 0,
                  suma90 = void 0,
                  pytf = void 0,
                  suma10 = void 0,
                  final = void 0,
                  promGen = void 0,
                  supletorio = void 0,
                  examf = '';

              for (var i = 0; i < computo.length; i++) {
                var element = computo[i];

                if (element.fkmateria == materias.fkmaterias) {
                  var _element$notas, _element$notas2, _element$notas3;

                  var _res = element.resultados;
                  proAB = (_element$notas = element.notas) === null || _element$notas === void 0 ? void 0 : _element$notas.proAB;
                  proCD = (_element$notas2 = element.notas) === null || _element$notas2 === void 0 ? void 0 : _element$notas2.proCD;
                  proEF = (_element$notas3 = element.notas) === null || _element$notas3 === void 0 ? void 0 : _element$notas3.proEF;
                  suma1090 = _res === null || _res === void 0 ? void 0 : _res.suma1090;
                  suma90 = _res === null || _res === void 0 ? void 0 : _res.suma90;
                  pytf = _res === null || _res === void 0 ? void 0 : _res.pytf;
                  examf = _res === null || _res === void 0 ? void 0 : _res.examf;
                  suma10 = _res === null || _res === void 0 ? void 0 : _res.suma10;
                  promGen = _res === null || _res === void 0 ? void 0 : _res.promGen;
                  supletorio = _res === null || _res === void 0 ? void 0 : _res.supletorio;
                  final = _res === null || _res === void 0 ? void 0 : _res.notaFinal;
                }
              }

              promAB.push(proAB);
              promCD.push(proCD);
              promEF.push(proEF);
              promGe.push(promGen);
              promF.push(final);
              aux.push({
                estudiante: (_res$estudiante = res.estudiante) === null || _res$estudiante === void 0 ? void 0 : _res$estudiante.fullname,
                proAB,
                proCD,
                proEF,
                suma1090,
                suma90,
                pytf,
                examf,
                final,
                supletorio,
                suma10,
                promGen
              });
            }
          }

          var medAB = calcMedia(promAB);
          var medCD = calcMedia(promCD);
          var medEF = calcMedia(promEF);
          var medGE = calcMedia(promGe);
          var medF = calcMedia(promF);
          var pPPA = calcProm(promAB);
          var pPPB = calcProm(promCD);
          var pPPC = calcProm(promEF);
          var prABGen = calcProm(promGe);
          var prAB = calcProm(promF); //console.log(mediaPPA)
          //console.log(aux)

          help.push({
            materia: (_materias$materia = materias.materia) === null || _materias$materia === void 0 ? void 0 : _materias$materia.nombre,
            docente: (_materias$docente = materias.docente) === null || _materias$docente === void 0 ? void 0 : _materias$docente.fullname,
            curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
            paralelo,
            data: aux,
            fechaA,
            medF,
            medCD,
            medEF,
            medAB,
            periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre,
            pPPA,
            pPPB,
            pPPC,
            prAB,
            prABGen,
            medGE
          });
        }
      } // console.log('es100',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    juntasExamProyec
  };
};

exports.reporteSuper = reporteSuper;

function trunc(x) {
  var posiciones = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var s = x.toString();
  var decimalLength = s.indexOf('.') + 1;
  var numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
}

var ifDecimal = num => {
  if (num == 0) return '0.00';

  if (num != '') {
    var _partes$;

    var partes = num.toString().split('.');
    var re = /^-?[0-9]+$/;

    if (re.test(num)) {
      return num + ".00";
    } else if (((_partes$ = partes[1]) === null || _partes$ === void 0 ? void 0 : _partes$.length) == 1) {
      return num + "0";
    } else {
      return trunc(num, 2);
    }
  } else {
    return '';
  }
};

function calcMedia(array) {
  var a = 0;
  var b = 0;
  var c = 0;
  var d = 0;
  var reg = [];

  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    var op = parseFloat(element);
    if (op <= 10 && op > 8.99) a += 1;
    if (op < 9 && op >= 7) b += 1;
    if (op < 7 && op >= 5) c += 1;
    if (op < 5 && op >= 0) d += 1;
  }

  reg.push(a, b, c, d);
  return reg;
}

var fechaActual = () => {
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var dateObj = new Date();
  var month = monthNames[dateObj.getMonth()];
  var day = String(dateObj.getDate()).padStart(2, '0');
  var year = dateObj.getFullYear();
  var output = day + " de " + month + '\n' + ' del ' + year;
  return output;
};