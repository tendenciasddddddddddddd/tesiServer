"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.superior = void 0;

var _funciones = require("./helper/funciones");

var _conString = require("./helper/conString");

var {
  calcProm,
  fechaActual,
  calcMedia,
  promCuantitativoLetras,
  promCuantitativoLetrasDos,
  calcPromMatriz,
  calcularPryectos,
  promCuantitativoPalabra,
  setPalabraComportamiento,
  setMediaLetra,
  promCuantitativoPalabraDos
} = (0, _funciones.funciones)();
var {
  trasformnumberToText
} = (0, _conString.conString)();

var superior = () => {
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
          var _materias$materia, _materias$materia2, _materias$docente;

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
                  examf = void 0,
                  letras = void 0,
                  letras2 = '';

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
                  letras = promCuantitativoLetras(final);
                  letras2 = promCuantitativoLetrasDos(final);
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
                promGen,
                letras,
                letras2
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
          var prAB = calcProm(promF);
          var finLetra = promCuantitativoLetrasDos(prABGen); //console.log(mediaPPA)
          //console.log(aux)

          help.push({
            materia: (_materias$materia = materias.materia) === null || _materias$materia === void 0 ? void 0 : _materias$materia.nombre,
            computo: (_materias$materia2 = materias.materia) === null || _materias$materia2 === void 0 ? void 0 : _materias$materia2.computo,
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
            medGE,
            finLetra
          });
        }
      } // console.log('es100',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  };

  var promParcial = (rowM, rowD, estudiantes, quim) => {
    try {
      var _rowM$curso, _rowM$periodo;

      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      matriculas.sort(function (a, b) {
        var nameA = a.estudiante.fullname.toLowerCase(),
            nameB = b.estudiante.fullname.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      for (var i = 0; i < matriculas.length; i++) {
        var _element$estudiante;

        var element = matriculas[i];
        var computo = element.computo;
        var notas = [];

        if (estudiantes.includes(element.fkestudiante)) {
          for (var h = 0; h < distributivo.length; h++) {
            var subarray = distributivo[h];
            var nota = '';

            for (var k = 0; k < computo.length; k++) {
              var reg = computo[k];

              if (subarray.fkmaterias == reg.fkmateria) {
                if (quim.quimestre == 'PRIMER TRIMESTRE') {
                  var _subarray$materia, _reg$cualitativo;

                  if (((_subarray$materia = subarray.materia) === null || _subarray$materia === void 0 ? void 0 : _subarray$materia.nombre) == 'COMPORTAMIENTO') nota = (_reg$cualitativo = reg.cualitativo) === null || _reg$cualitativo === void 0 ? void 0 : _reg$cualitativo.p1;else {
                    var _reg$notas, _reg$notas2, _reg$notas3, _reg$notas4;

                    if (quim.qr == 'INSUMO INDIVIDUAL') nota = (_reg$notas = reg.notas) === null || _reg$notas === void 0 ? void 0 : _reg$notas.ppa;
                    if (quim.qr == 'INSUMO GRUPAL') nota = (_reg$notas2 = reg.notas) === null || _reg$notas2 === void 0 ? void 0 : _reg$notas2.ppb;
                    if (quim.qr == 'PROYECTO') nota = (_reg$notas3 = reg.notas) === null || _reg$notas3 === void 0 ? void 0 : _reg$notas3.pry1;
                    if (quim.qr == 'EXAMEN') nota = (_reg$notas4 = reg.notas) === null || _reg$notas4 === void 0 ? void 0 : _reg$notas4.exa1;
                  }
                }

                if (quim.quimestre == 'SEGUNDO TRIMESTRE') {
                  var _subarray$materia2, _reg$cualitativo2;

                  if (((_subarray$materia2 = subarray.materia) === null || _subarray$materia2 === void 0 ? void 0 : _subarray$materia2.nombre) == 'COMPORTAMIENTO') nota = (_reg$cualitativo2 = reg.cualitativo) === null || _reg$cualitativo2 === void 0 ? void 0 : _reg$cualitativo2.p2;else {
                    var _reg$notas5, _reg$notas6, _reg$notas7, _reg$notas8;

                    if (quim.qr == 'INSUMO INDIVIDUAL') nota = (_reg$notas5 = reg.notas) === null || _reg$notas5 === void 0 ? void 0 : _reg$notas5.ppc;
                    if (quim.qr == 'INSUMO GRUPAL') nota = (_reg$notas6 = reg.notas) === null || _reg$notas6 === void 0 ? void 0 : _reg$notas6.ppd;
                    if (quim.qr == 'PROYECTO') nota = (_reg$notas7 = reg.notas) === null || _reg$notas7 === void 0 ? void 0 : _reg$notas7.pry2;
                    if (quim.qr == 'EXAMEN') nota = (_reg$notas8 = reg.notas) === null || _reg$notas8 === void 0 ? void 0 : _reg$notas8.exa2;
                  }
                }

                if (quim.quimestre == 'TERCER TRIMESTRE') {
                  var _subarray$materia3, _reg$cualitativo3;

                  if (((_subarray$materia3 = subarray.materia) === null || _subarray$materia3 === void 0 ? void 0 : _subarray$materia3.nombre) == 'COMPORTAMIENTO') nota = (_reg$cualitativo3 = reg.cualitativo) === null || _reg$cualitativo3 === void 0 ? void 0 : _reg$cualitativo3.p3;else {
                    var _reg$notas9, _reg$notas10, _reg$notas11, _reg$notas12;

                    if (quim.qr == 'INSUMO INDIVIDUAL') nota = (_reg$notas9 = reg.notas) === null || _reg$notas9 === void 0 ? void 0 : _reg$notas9.ppe;
                    if (quim.qr == 'INSUMO GRUPAL') nota = (_reg$notas10 = reg.notas) === null || _reg$notas10 === void 0 ? void 0 : _reg$notas10.ppf;
                    if (quim.qr == 'PROYECTO') nota = (_reg$notas11 = reg.notas) === null || _reg$notas11 === void 0 ? void 0 : _reg$notas11.pry3;
                    if (quim.qr == 'EXAMEN') nota = (_reg$notas12 = reg.notas) === null || _reg$notas12 === void 0 ? void 0 : _reg$notas12.exa3;
                  }
                }

                if (quim.quimestre == 'FINAL') {
                  var _reg$resultados, _reg$resultados2;

                  if (quim.qr == 'PROYECTO') nota = (_reg$resultados = reg.resultados) === null || _reg$resultados === void 0 ? void 0 : _reg$resultados.pytf;
                  if (quim.qr == 'EXAMEN') nota = (_reg$resultados2 = reg.resultados) === null || _reg$resultados2 === void 0 ? void 0 : _reg$resultados2.examf;
                }
              }
            }

            notas.push(nota);
          }
        }

        var result = calcProm(notas);
        help.push({
          fullname: (_element$estudiante = element.estudiante) === null || _element$estudiante === void 0 ? void 0 : _element$estudiante.fullname,
          data: notas,
          result: result
        });
      } //console.log('es',help)


      var promedios = calcPromMatriz(help, distributivo);
      return {
        help: help,
        distributivo: distributivo,
        promedios: promedios,
        curso: (_rowM$curso = rowM.curso) === null || _rowM$curso === void 0 ? void 0 : _rowM$curso.nombre,
        periodo: (_rowM$periodo = rowM.periodo) === null || _rowM$periodo === void 0 ? void 0 : _rowM$periodo.nombre
      };
    } catch (error) {
      console.log(error);
    }
  };

  var promQuimestral = (rowM, rowD, estudiantes, quim) => {
    try {
      var _rowM$curso2, _rowM$periodo2;

      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      matriculas.sort(function (a, b) {
        var nameA = a.estudiante.fullname.toLowerCase(),
            nameB = b.estudiante.fullname.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      for (var i = 0; i < matriculas.length; i++) {
        var _element$estudiante2;

        var element = matriculas[i];
        var computo = element.computo;
        var notas = [];

        if (estudiantes.includes(element.fkestudiante)) {
          for (var h = 0; h < distributivo.length; h++) {
            var subarray = distributivo[h];
            var nota = '';

            for (var k = 0; k < computo.length; k++) {
              var reg = computo[k];

              if (subarray.fkmaterias == reg.fkmateria) {
                if (quim.quimestre == 'PRIMER TRIMESTRE') {
                  var _subarray$materia4, _reg$cualitativo4, _reg$notas13;

                  if (((_subarray$materia4 = subarray.materia) === null || _subarray$materia4 === void 0 ? void 0 : _subarray$materia4.nombre) == 'COMPORTAMIENTO') nota = (_reg$cualitativo4 = reg.cualitativo) === null || _reg$cualitativo4 === void 0 ? void 0 : _reg$cualitativo4.p1;else nota = (_reg$notas13 = reg.notas) === null || _reg$notas13 === void 0 ? void 0 : _reg$notas13.proAB;
                }

                if (quim.quimestre == 'SEGUNDO TRIMESTRE') {
                  var _subarray$materia5, _reg$cualitativo5, _reg$notas14;

                  if (((_subarray$materia5 = subarray.materia) === null || _subarray$materia5 === void 0 ? void 0 : _subarray$materia5.nombre) == 'COMPORTAMIENTO') nota = (_reg$cualitativo5 = reg.cualitativo) === null || _reg$cualitativo5 === void 0 ? void 0 : _reg$cualitativo5.p2;else nota = (_reg$notas14 = reg.notas) === null || _reg$notas14 === void 0 ? void 0 : _reg$notas14.proCD;
                }

                if (quim.quimestre == 'TERCER TRIMESTRE') {
                  var _subarray$materia6, _reg$cualitativo6, _reg$notas15;

                  if (((_subarray$materia6 = subarray.materia) === null || _subarray$materia6 === void 0 ? void 0 : _subarray$materia6.nombre) == 'COMPORTAMIENTO') nota = (_reg$cualitativo6 = reg.cualitativo) === null || _reg$cualitativo6 === void 0 ? void 0 : _reg$cualitativo6.p3;else nota = (_reg$notas15 = reg.notas) === null || _reg$notas15 === void 0 ? void 0 : _reg$notas15.proEF;
                }
              }
            }

            notas.push(nota);
          }
        }

        var result = calcProm(notas);
        help.push({
          fullname: (_element$estudiante2 = element.estudiante) === null || _element$estudiante2 === void 0 ? void 0 : _element$estudiante2.fullname,
          data: notas,
          result: result
        });
      } //console.log('es',help)


      var promedios = calcPromMatriz(help, distributivo);
      return {
        help: help,
        distributivo: distributivo,
        promedios: promedios,
        curso: (_rowM$curso2 = rowM.curso) === null || _rowM$curso2 === void 0 ? void 0 : _rowM$curso2.nombre,
        periodo: (_rowM$periodo2 = rowM.periodo) === null || _rowM$periodo2 === void 0 ? void 0 : _rowM$periodo2.nombre
      };
    } catch (error) {
      console.log(error);
    }
  };

  var promAnual = (rowM, rowD, estudiantes) => {
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
        var _materias$materia3, _materias$docente2;

        var aux = [];
        var materias = distributivo[j];
        var proPPA = [];
        var proPPB = [];
        var promAB = [];

        for (var k = 0; k < matriculas.length; k++) {
          var res = matriculas[k];

          if (estudiantes.includes(res.fkestudiante)) {
            var _res$estudiante2;

            var computo = matriculas[k].computo;
            var ppa = void 0,
                ppb = void 0,
                sumAB = void 0,
                sumAB80 = void 0,
                exa1 = void 0,
                sumAB20 = void 0,
                proAB = void 0,
                ppc = void 0,
                ppd = void 0,
                sumCD = void 0,
                sumCD80 = void 0,
                exa2 = void 0,
                sumCD20 = void 0,
                proCD = '';
            var suple = '';
            var final = '';

            for (var i = 0; i < computo.length; i++) {
              var element = computo[i];

              if (element.fkmateria == materias.fkmaterias) {
                var _element$notas4, _element$notas5, _element$notas6, _element$notas7, _element$notas8, _element$notas9, _element$notas10, _element$notas11, _element$notas12, _element$notas13, _element$notas14, _element$notas15, _element$notas16, _element$notas17, _element$resultados, _element$resultados2;

                ppa = (_element$notas4 = element.notas) === null || _element$notas4 === void 0 ? void 0 : _element$notas4.ppa;
                ppb = (_element$notas5 = element.notas) === null || _element$notas5 === void 0 ? void 0 : _element$notas5.ppb;
                sumAB = (_element$notas6 = element.notas) === null || _element$notas6 === void 0 ? void 0 : _element$notas6.sumAB;
                sumAB80 = (_element$notas7 = element.notas) === null || _element$notas7 === void 0 ? void 0 : _element$notas7.sumAB80;
                exa1 = (_element$notas8 = element.notas) === null || _element$notas8 === void 0 ? void 0 : _element$notas8.exa1;
                sumAB20 = (_element$notas9 = element.notas) === null || _element$notas9 === void 0 ? void 0 : _element$notas9.sumAB20;
                proAB = (_element$notas10 = element.notas) === null || _element$notas10 === void 0 ? void 0 : _element$notas10.proAB;
                ppc = (_element$notas11 = element.notas) === null || _element$notas11 === void 0 ? void 0 : _element$notas11.ppc;
                ppd = (_element$notas12 = element.notas) === null || _element$notas12 === void 0 ? void 0 : _element$notas12.ppd;
                sumCD = (_element$notas13 = element.notas) === null || _element$notas13 === void 0 ? void 0 : _element$notas13.sumCD;
                sumCD80 = (_element$notas14 = element.notas) === null || _element$notas14 === void 0 ? void 0 : _element$notas14.sumCD80;
                exa2 = (_element$notas15 = element.notas) === null || _element$notas15 === void 0 ? void 0 : _element$notas15.exa2;
                sumCD20 = (_element$notas16 = element.notas) === null || _element$notas16 === void 0 ? void 0 : _element$notas16.sumCD20;
                proCD = (_element$notas17 = element.notas) === null || _element$notas17 === void 0 ? void 0 : _element$notas17.proCD, suple = (_element$resultados = element.resultados) === null || _element$resultados === void 0 ? void 0 : _element$resultados.supletorio, final = (_element$resultados2 = element.resultados) === null || _element$resultados2 === void 0 ? void 0 : _element$resultados2.notaFinal;
              }
            }

            proPPA.push(ppa);
            proPPB.push(ppb);
            promAB.push(proAB);
            aux.push({
              estudiante: (_res$estudiante2 = res.estudiante) === null || _res$estudiante2 === void 0 ? void 0 : _res$estudiante2.fullname,
              ppa,
              ppb,
              sumAB,
              sumAB80,
              exa1,
              sumAB20,
              proAB,
              ppc,
              ppd,
              sumCD,
              sumCD80,
              exa2,
              sumCD20,
              proCD,
              suple,
              final
            });
          }
        } //console.log(distributivo)


        help.push({
          materia: (_materias$materia3 = materias.materia) === null || _materias$materia3 === void 0 ? void 0 : _materias$materia3.nombre,
          docente: (_materias$docente2 = materias.docente) === null || _materias$docente2 === void 0 ? void 0 : _materias$docente2.fullname,
          curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
          paralelo: rowM === null || rowM === void 0 ? void 0 : rowM.paralelo,
          data: aux,
          fechaA,
          periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre
        });
      } //console.log('es',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  };

  var promPromociones = (rowM, rowD, estudiantes) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];
        var aux2 = [];
        var aux3 = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante3, _rowM$curso3, _rowM$periodo3;

          var computo = matriculas[i].computo;
          var promGeneral = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia;

            var subelement = distributivo[j];

            if (((_subelement$materia = subelement.materia) === null || _subelement$materia === void 0 ? void 0 : _subelement$materia.computo) == 2) {
              var _subelement$materia2, _subelement$materia3;

              //todo falta verificar si es promovido
              var promedio = void 0,
                  letras = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  promedio = result.resultados.notaFinal;
                }
              }

              letras = trasformnumberToText(promedio);
              promGeneral.push(promedio);
              aux.push({
                materia: (_subelement$materia2 = subelement.materia) === null || _subelement$materia2 === void 0 ? void 0 : _subelement$materia2.nombre,
                area: (_subelement$materia3 = subelement.materia) === null || _subelement$materia3 === void 0 ? void 0 : _subelement$materia3.area,
                promedio: promedio ? promedio.toString().replace('.', ',') : '',
                letras: letras
              });
            } else {
              var _subelement$materia4;

              if ((subelement === null || subelement === void 0 ? void 0 : (_subelement$materia4 = subelement.materia) === null || _subelement$materia4 === void 0 ? void 0 : _subelement$materia4.nombre) == 'COMPORTAMIENTO') {
                var _subelement$materia5, _subelement$materia6, _subelement$materia7;

                var _promedio = void 0,
                    _letras = '';

                for (var _m = 0; _m < computo.length; _m++) {
                  var _result$resultados;

                  var _result = computo[_m];
                  if (subelement.fkmaterias == _result.fkmateria) _promedio = (_result$resultados = _result.resultados) === null || _result$resultados === void 0 ? void 0 : _result$resultados.promGen;
                }

                _letras = calcularPryectos(_promedio, (_subelement$materia5 = subelement.materia) === null || _subelement$materia5 === void 0 ? void 0 : _subelement$materia5.nombre);
                promGeneral.push(_promedio);
                aux2.push({
                  materia: (_subelement$materia6 = subelement.materia) === null || _subelement$materia6 === void 0 ? void 0 : _subelement$materia6.nombre,
                  area: (_subelement$materia7 = subelement.materia) === null || _subelement$materia7 === void 0 ? void 0 : _subelement$materia7.area,
                  promedio: _promedio,
                  letras: _letras
                });
              } else {
                var _subelement$materia8, _subelement$materia9;

                /* MATERIAS COMPLEMENTARIAS */
                var _promedio2 = void 0,
                    _letras2 = '';

                for (var _m2 = 0; _m2 < computo.length; _m2++) {
                  var _result2$resultados;

                  var _result2 = computo[_m2];
                  if (subelement.fkmaterias == _result2.fkmateria) _promedio2 = (_result2$resultados = _result2.resultados) === null || _result2$resultados === void 0 ? void 0 : _result2$resultados.notaFinal;
                }

                _letras2 = promCuantitativoPalabraDos(_promedio2);
                if (_letras2 == '' || _letras2 == undefined) _letras2 = 'Sin confirmar';
                aux3.push({
                  materia: (_subelement$materia8 = subelement.materia) === null || _subelement$materia8 === void 0 ? void 0 : _subelement$materia8.nombre,
                  area: (_subelement$materia9 = subelement.materia) === null || _subelement$materia9 === void 0 ? void 0 : _subelement$materia9.area,
                  promedio: _promedio2,
                  letras: _letras2
                });
              }
            }
          } //console.log(aux3)


          var pgeneral = calcProm(promGeneral);
          var letrasFinal = trasformnumberToText(pgeneral);
          help.push({
            nombre: (_element$estudiante3 = element.estudiante) === null || _element$estudiante3 === void 0 ? void 0 : _element$estudiante3.fullname,
            curso: (_rowM$curso3 = rowM.curso) === null || _rowM$curso3 === void 0 ? void 0 : _rowM$curso3.nombre,
            periodo: (_rowM$periodo3 = rowM.periodo) === null || _rowM$periodo3 === void 0 ? void 0 : _rowM$periodo3.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            data3: aux3,
            pgeneral: pgeneral ? pgeneral.toString().replace('.', ',') : '',
            letrasFinal
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  var promMatricula = (rowM, estudiantes) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var fechaA = fechaActual();
      var help = [];

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante4, _rowM$curso4, _rowM$periodo4;

          help.push({
            nombre: (_element$estudiante4 = element.estudiante) === null || _element$estudiante4 === void 0 ? void 0 : _element$estudiante4.fullname,
            curso: (_rowM$curso4 = rowM.curso) === null || _rowM$curso4 === void 0 ? void 0 : _rowM$curso4.nombre,
            periodo: (_rowM$periodo4 = rowM.periodo) === null || _rowM$periodo4 === void 0 ? void 0 : _rowM$periodo4.nombre,
            paralelo: rowM.paralelo,
            nmatricula: element.nmatricula,
            folio: element.folio,
            fecha: element.fecha,
            fechaA: fechaA
          });
        }
      }

      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  var promLibretas = (rowM, rowD, estudiantes, quim) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];
        var aux2 = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante5, _rowM$curso5, _rowM$periodo5;

          var computo = matriculas[i].computo;
          var promPPA = [];
          var promPPB = [];
          var general = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia10;

            var subelement = distributivo[j];

            if (((_subelement$materia10 = subelement.materia) === null || _subelement$materia10 === void 0 ? void 0 : _subelement$materia10.nombre) != 'COMPORTAMIENTO') {
              var _subelement$materia11, _subelement$materia12, _subelement$materia13;

              var n1 = void 0,
                  n2 = void 0,
                  n3 = void 0,
                  n4 = void 0,
                  n6 = void 0,
                  n7 = void 0,
                  n8 = void 0,
                  n9 = void 0,
                  ppa = void 0,
                  ppb = void 0,
                  sumAB = void 0,
                  sumAB90 = void 0,
                  exa1 = void 0,
                  pry1 = void 0,
                  sumAB10 = void 0,
                  proAB = '';
              var letras = void 0,
                  letrasp1 = void 0,
                  letrasp2 = void 0,
                  letraspf = '';
              var computos = (_subelement$materia11 = subelement.materia) === null || _subelement$materia11 === void 0 ? void 0 : _subelement$materia11.computo;

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  if (quim == 'PRIMER TRIMESTRE') {
                    var ins = result.notas;
                    n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                    n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                    n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                    n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                    n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                    n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                    n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                    n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                    ppa = ins === null || ins === void 0 ? void 0 : ins.ppa;
                    ppb = ins === null || ins === void 0 ? void 0 : ins.ppb;
                    sumAB = ins === null || ins === void 0 ? void 0 : ins.sumAB;
                    sumAB90 = ins === null || ins === void 0 ? void 0 : ins.sumAB90;
                    exa1 = ins === null || ins === void 0 ? void 0 : ins.exa1;
                    pry1 = ins === null || ins === void 0 ? void 0 : ins.pry1;
                    sumAB10 = ins === null || ins === void 0 ? void 0 : ins.sumAB10;
                    proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                    letrasp1 = promCuantitativoLetrasDos(ppa);
                    letrasp2 = promCuantitativoLetrasDos(ppb);
                    letraspf = promCuantitativoLetrasDos(proAB);
                    letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _ins = result.notas;
                    n1 = _ins === null || _ins === void 0 ? void 0 : _ins.c1;
                    n2 = _ins === null || _ins === void 0 ? void 0 : _ins.c2;
                    n3 = _ins === null || _ins === void 0 ? void 0 : _ins.c3;
                    n4 = _ins === null || _ins === void 0 ? void 0 : _ins.c4;
                    n6 = _ins === null || _ins === void 0 ? void 0 : _ins.d1;
                    n7 = _ins === null || _ins === void 0 ? void 0 : _ins.d2;
                    n8 = _ins === null || _ins === void 0 ? void 0 : _ins.d3;
                    n9 = _ins === null || _ins === void 0 ? void 0 : _ins.d4;
                    ppa = _ins === null || _ins === void 0 ? void 0 : _ins.ppc;
                    ppb = _ins === null || _ins === void 0 ? void 0 : _ins.ppd;
                    sumAB = _ins === null || _ins === void 0 ? void 0 : _ins.sumCD;
                    sumAB90 = _ins === null || _ins === void 0 ? void 0 : _ins.sumCD90;
                    exa1 = _ins === null || _ins === void 0 ? void 0 : _ins.exa2;
                    pry1 = _ins === null || _ins === void 0 ? void 0 : _ins.pry2;
                    sumAB10 = _ins === null || _ins === void 0 ? void 0 : _ins.sumCD10;
                    proAB = _ins === null || _ins === void 0 ? void 0 : _ins.proCD;
                    letrasp1 = promCuantitativoLetrasDos(ppa);
                    letrasp2 = promCuantitativoLetrasDos(ppb);
                    letraspf = promCuantitativoLetrasDos(proAB);
                    letras = promCuantitativoLetras(_ins === null || _ins === void 0 ? void 0 : _ins.proCD);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _ins2 = result.notas;
                    n1 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e1;
                    n2 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e2;
                    n3 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e3;
                    n4 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e4;
                    n6 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f1;
                    n7 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f2;
                    n8 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f3;
                    n9 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f4;
                    ppa = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.ppe;
                    ppb = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.ppf;
                    sumAB = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.sumEF;
                    sumAB90 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.sumEF90;
                    exa1 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.exa3;
                    pry1 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.pry3;
                    sumAB10 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.sumEF10;
                    proAB = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.proEF;
                    letrasp1 = promCuantitativoLetrasDos(ppa);
                    letrasp2 = promCuantitativoLetrasDos(ppb);
                    letraspf = promCuantitativoLetrasDos(proAB);
                    letras = promCuantitativoLetras(_ins2 === null || _ins2 === void 0 ? void 0 : _ins2.proEF);
                  }
                }
              }

              if (computos == 2) {
                promPPA.push(ppa);
                promPPB.push(ppb);
                general.push(proAB);
              }

              aux.push({
                computo: computos,
                materia: (_subelement$materia12 = subelement.materia) === null || _subelement$materia12 === void 0 ? void 0 : _subelement$materia12.nombre,
                area: (_subelement$materia13 = subelement.materia) === null || _subelement$materia13 === void 0 ? void 0 : _subelement$materia13.area,
                n1,
                n2,
                n3,
                n4,
                n6,
                n7,
                n8,
                n9,
                pry1,
                ppa,
                ppb,
                sumAB,
                sumAB90,
                exa1,
                sumAB10,
                proAB,
                letras,
                letrasp1,
                letrasp2,
                letraspf
              });
            } else {
              var _subelement$materia15;

              //TODO check COMPORTAMIENTO PROYECTOS ESCOLARES DHI
              var pp1 = void 0,
                  pp2 = '';
              var _letras3 = '';

              for (var _m3 = 0; _m3 < computo.length; _m3++) {
                var _result3 = computo[_m3];

                if (subelement.fkmaterias == _result3.fkmateria) {
                  var _subelement$materia14;

                  var mate = (_subelement$materia14 = subelement.materia) === null || _subelement$materia14 === void 0 ? void 0 : _subelement$materia14.nombre;

                  if (quim == 'PRIMER TRIMESTRE') {
                    var {
                      p1
                    } = _result3.cualitativo;
                    pp1 = p1;
                    pp2 = p1;
                    _letras3 = setPalabraComportamiento(p1);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var {
                      p2
                    } = _result3.cualitativo;
                    pp1 = p2;
                    pp2 = p2;
                    _letras3 = setPalabraComportamiento(p2);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var {
                      p3
                    } = _result3.cualitativo;
                    pp1 = p3;
                    pp2 = p3;
                    _letras3 = setPalabraComportamiento(p3);
                  }
                }
              }

              aux2.push({
                materia: (_subelement$materia15 = subelement.materia) === null || _subelement$materia15 === void 0 ? void 0 : _subelement$materia15.nombre,
                letras: _letras3,
                pp1,
                pp2
              });
            }
          }

          var pPPA = calcProm(promPPA);
          var pPPB = calcProm(promPPB);
          var pgeneral = calcProm(general);
          help.push({
            nombre: (_element$estudiante5 = element.estudiante) === null || _element$estudiante5 === void 0 ? void 0 : _element$estudiante5.fullname,
            curso: (_rowM$curso5 = rowM.curso) === null || _rowM$curso5 === void 0 ? void 0 : _rowM$curso5.nombre,
            periodo: (_rowM$periodo5 = rowM.periodo) === null || _rowM$periodo5 === void 0 ? void 0 : _rowM$periodo5.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            pPPA,
            pPPB,
            pgeneral,
            fechaA,
            nmatricula: element.nmatricula
          });
        }
      }

      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  var promJuntas = (rowM, rowD, estudiantes, quim, paralelo) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var help2 = [];
      var fechaA = fechaActual();
      matriculas.sort(function (a, b) {
        var nameA = a.estudiante.fullname.toLowerCase(),
            nameB = b.estudiante.fullname.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
        var _materias$materia4;

        var aux = [];
        var aux2 = [];
        var materias = distributivo[j];

        if (((_materias$materia4 = materias.materia) === null || _materias$materia4 === void 0 ? void 0 : _materias$materia4.nombre) != 'COMPORTAMIENTO') {
          var _materias$materia5, _materias$materia6, _materias$docente3;

          var proPPA = [];
          var proPPB = [];
          var promAB = [];

          for (var k = 0; k < matriculas.length; k++) {
            var res = matriculas[k];

            if (estudiantes.includes(res.fkestudiante)) {
              var _res$estudiante3;

              var computo = matriculas[k].computo;
              var n1 = void 0,
                  n2 = void 0,
                  n3 = void 0,
                  n4 = void 0,
                  n6 = void 0,
                  n7 = void 0,
                  n8 = void 0,
                  n9 = void 0,
                  ppa = void 0,
                  ppb = void 0,
                  sumAB = void 0,
                  sumAB90 = void 0,
                  exa1 = void 0,
                  pry1 = void 0,
                  sumAB10 = void 0,
                  proAB = '';
              var letras = void 0,
                  letras2 = '';

              for (var i = 0; i < computo.length; i++) {
                var element = computo[i];

                if (element.fkmateria == materias.fkmaterias) {
                  if (quim == 'PRIMER TRIMESTRE') {
                    var _element$notas18, _element$notas19, _element$notas20, _element$notas21, _element$notas22, _element$notas23, _element$notas24, _element$notas25;

                    var ins = element.notas;
                    n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                    n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                    n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                    n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                    n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                    n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                    n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                    n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                    ppa = (_element$notas18 = element.notas) === null || _element$notas18 === void 0 ? void 0 : _element$notas18.ppa;
                    ppb = (_element$notas19 = element.notas) === null || _element$notas19 === void 0 ? void 0 : _element$notas19.ppb;
                    sumAB = (_element$notas20 = element.notas) === null || _element$notas20 === void 0 ? void 0 : _element$notas20.sumAB;
                    sumAB90 = (_element$notas21 = element.notas) === null || _element$notas21 === void 0 ? void 0 : _element$notas21.sumAB90;
                    exa1 = (_element$notas22 = element.notas) === null || _element$notas22 === void 0 ? void 0 : _element$notas22.exa1;
                    pry1 = (_element$notas23 = element.notas) === null || _element$notas23 === void 0 ? void 0 : _element$notas23.pry1;
                    sumAB10 = (_element$notas24 = element.notas) === null || _element$notas24 === void 0 ? void 0 : _element$notas24.sumAB10;
                    proAB = (_element$notas25 = element.notas) === null || _element$notas25 === void 0 ? void 0 : _element$notas25.proAB;
                    letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                    letras2 = promCuantitativoLetrasDos(ins === null || ins === void 0 ? void 0 : ins.proAB);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _element$notas26, _element$notas27, _element$notas28, _element$notas29, _element$notas30, _element$notas31, _element$notas32, _element$notas33;

                    var _ins3 = element.notas;
                    n1 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.c1;
                    n2 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.c2;
                    n3 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.c3;
                    n4 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.c4;
                    n6 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.d1;
                    n7 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.d2;
                    n8 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.d3;
                    n9 = _ins3 === null || _ins3 === void 0 ? void 0 : _ins3.d4;
                    ppa = (_element$notas26 = element.notas) === null || _element$notas26 === void 0 ? void 0 : _element$notas26.ppc;
                    ppb = (_element$notas27 = element.notas) === null || _element$notas27 === void 0 ? void 0 : _element$notas27.ppd;
                    sumAB = (_element$notas28 = element.notas) === null || _element$notas28 === void 0 ? void 0 : _element$notas28.sumCD;
                    sumAB90 = (_element$notas29 = element.notas) === null || _element$notas29 === void 0 ? void 0 : _element$notas29.sumCD90;
                    exa1 = (_element$notas30 = element.notas) === null || _element$notas30 === void 0 ? void 0 : _element$notas30.exa2;
                    pry1 = (_element$notas31 = element.notas) === null || _element$notas31 === void 0 ? void 0 : _element$notas31.pry2;
                    sumAB10 = (_element$notas32 = element.notas) === null || _element$notas32 === void 0 ? void 0 : _element$notas32.sumCD10;
                    proAB = (_element$notas33 = element.notas) === null || _element$notas33 === void 0 ? void 0 : _element$notas33.proCD;
                    letras = promCuantitativoLetras(_ins3 === null || _ins3 === void 0 ? void 0 : _ins3.proCD);
                    letras2 = promCuantitativoLetrasDos(_ins3 === null || _ins3 === void 0 ? void 0 : _ins3.proCD);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _element$notas34, _element$notas35, _element$notas36, _element$notas37, _element$notas38, _element$notas39, _element$notas40, _element$notas41;

                    var _ins4 = element.notas;
                    n1 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.e1;
                    n2 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.e2;
                    n3 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.e3;
                    n4 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.e4;
                    n6 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.f1;
                    n7 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.f2;
                    n8 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.f3;
                    n9 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.f4;
                    ppa = (_element$notas34 = element.notas) === null || _element$notas34 === void 0 ? void 0 : _element$notas34.ppe;
                    ppb = (_element$notas35 = element.notas) === null || _element$notas35 === void 0 ? void 0 : _element$notas35.ppf;
                    sumAB = (_element$notas36 = element.notas) === null || _element$notas36 === void 0 ? void 0 : _element$notas36.sumEF;
                    sumAB90 = (_element$notas37 = element.notas) === null || _element$notas37 === void 0 ? void 0 : _element$notas37.sumEF90;
                    exa1 = (_element$notas38 = element.notas) === null || _element$notas38 === void 0 ? void 0 : _element$notas38.exa3;
                    pry1 = (_element$notas39 = element.notas) === null || _element$notas39 === void 0 ? void 0 : _element$notas39.pry3;
                    sumAB10 = (_element$notas40 = element.notas) === null || _element$notas40 === void 0 ? void 0 : _element$notas40.sumEF10;
                    proAB = (_element$notas41 = element.notas) === null || _element$notas41 === void 0 ? void 0 : _element$notas41.proEF;
                    letras = promCuantitativoLetras(_ins4 === null || _ins4 === void 0 ? void 0 : _ins4.proEF);
                    letras2 = promCuantitativoLetrasDos(_ins4 === null || _ins4 === void 0 ? void 0 : _ins4.proEF);
                  }
                }
              }

              proPPA.push(ppa);
              proPPB.push(ppb);
              promAB.push(proAB);
              aux.push({
                estudiante: (_res$estudiante3 = res.estudiante) === null || _res$estudiante3 === void 0 ? void 0 : _res$estudiante3.fullname,
                n1,
                n2,
                n3,
                n4,
                n6,
                n7,
                n8,
                n9,
                ppa,
                ppb,
                sumAB,
                sumAB90,
                exa1,
                pry1,
                sumAB10,
                proAB,
                letras,
                letras2
              });
            }
          }

          var medPPA = calcMedia(proPPA);
          var medPPB = calcMedia(proPPB);
          var medAB = calcMedia(promAB);
          var pPPA = calcProm(proPPA);
          var pPPB = calcProm(proPPB);
          var prAB = calcProm(promAB); //console.log(mediaPPA)
          //console.log(distributivo)

          help.push({
            materia: (_materias$materia5 = materias.materia) === null || _materias$materia5 === void 0 ? void 0 : _materias$materia5.nombre,
            computo: (_materias$materia6 = materias.materia) === null || _materias$materia6 === void 0 ? void 0 : _materias$materia6.computo,
            docente: (_materias$docente3 = materias.docente) === null || _materias$docente3 === void 0 ? void 0 : _materias$docente3.fullname,
            curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
            paralelo,
            data: aux,
            fechaA,
            medPPA,
            medPPB,
            medAB,
            periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre,
            pPPA,
            pPPB,
            prAB
          });
        } else {
          var _materias$materia7, _materias$materia8, _materias$materia9, _materias$materia10, _materias$docente4;

          var _proPPA = [];
          var _proPPB = [];
          var _promAB = [];

          for (var _k = 0; _k < matriculas.length; _k++) {
            var _res2 = matriculas[_k];

            if (estudiantes.includes(_res2.fkestudiante)) {
              var _res2$estudiante;

              var _computo = matriculas[_k].computo;
              var p1 = void 0,
                  p2 = '';
              var _letras4 = '';

              for (var _i = 0; _i < _computo.length; _i++) {
                var _element = _computo[_i];

                if (_element.fkmateria == materias.fkmaterias) {
                  if (quim == 'PRIMER TRIMESTRE') {
                    var _ins5 = _element.cualitativo;
                    p1 = _ins5.p1;
                    p2 = _ins5.p1;
                    _letras4 = setPalabraComportamiento(_ins5.p1);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _ins6 = _element.cualitativo;
                    p1 = _ins6.p2;
                    p2 = _ins6.p2;
                    _letras4 = setPalabraComportamiento(_ins6.p2);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _ins7 = _element.cualitativo;
                    p1 = _ins7.p3;
                    p2 = _ins7.p3;
                    _letras4 = setPalabraComportamiento(_ins7.p3);
                  }
                }
              }

              _proPPA.push(p1);

              _proPPB.push(p2);

              _promAB.push(_letras4);

              aux2.push({
                estudiante: (_res2$estudiante = _res2.estudiante) === null || _res2$estudiante === void 0 ? void 0 : _res2$estudiante.fullname,
                letras: _letras4,
                p1,
                p2
              });
            }
          }

          var _medPPA = setMediaLetra(_proPPA, (_materias$materia7 = materias.materia) === null || _materias$materia7 === void 0 ? void 0 : _materias$materia7.nombre);

          var _medPPB = setMediaLetra(_proPPB, (_materias$materia8 = materias.materia) === null || _materias$materia8 === void 0 ? void 0 : _materias$materia8.nombre);

          var _medAB = setMediaLetra(_promAB, (_materias$materia9 = materias.materia) === null || _materias$materia9 === void 0 ? void 0 : _materias$materia9.nombre);

          help2.push({
            materia: (_materias$materia10 = materias.materia) === null || _materias$materia10 === void 0 ? void 0 : _materias$materia10.nombre,
            docente: (_materias$docente4 = materias.docente) === null || _materias$docente4 === void 0 ? void 0 : _materias$docente4.fullname,
            curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
            paralelo,
            data: aux2,
            fechaA,
            medPPA: _medPPA,
            medPPB: _medPPB,
            medAB: _medAB,
            periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre
          });
        }
      }

      var arr = {
        help: help,
        help2: help2
      };
      return arr;
    } catch (error) {
      console.log(error);
    }
  };

  var promJuntasOnly = (rowM, rowD, estudiantes, quim, paralelo, keymateria) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var help2 = [];
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
          var _materias$materia11;

          var aux = [];
          var materias = distributivo[j];

          if (((_materias$materia11 = materias.materia) === null || _materias$materia11 === void 0 ? void 0 : _materias$materia11.nombre) != 'COMPORTAMIENTO') {
            var _materias$materia12, _materias$materia13, _materias$docente5;

            var proPPA = [];
            var proPPB = [];
            var promAB = [];

            for (var k = 0; k < matriculas.length; k++) {
              var res = matriculas[k];

              if (estudiantes.includes(res.fkestudiante)) {
                var _res$estudiante4;

                var computo = matriculas[k].computo;
                var n1 = void 0,
                    n2 = void 0,
                    n3 = void 0,
                    n4 = void 0,
                    n6 = void 0,
                    n7 = void 0,
                    n8 = void 0,
                    n9 = void 0,
                    ppa = void 0,
                    ppb = void 0,
                    sumAB = void 0,
                    sumAB90 = void 0,
                    exa1 = void 0,
                    pry1 = void 0,
                    sumAB10 = void 0,
                    proAB = '';
                var letras = '';
                var letras2 = '';

                for (var i = 0; i < computo.length; i++) {
                  var element = computo[i];

                  if (element.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER TRIMESTRE') {
                      var _element$notas42, _element$notas43, _element$notas44, _element$notas45, _element$notas46, _element$notas47, _element$notas48, _element$notas49;

                      var ins = element.notas;
                      n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                      n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                      n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                      n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                      n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                      n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                      n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                      n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                      ppa = (_element$notas42 = element.notas) === null || _element$notas42 === void 0 ? void 0 : _element$notas42.ppa;
                      ppb = (_element$notas43 = element.notas) === null || _element$notas43 === void 0 ? void 0 : _element$notas43.ppb;
                      sumAB = (_element$notas44 = element.notas) === null || _element$notas44 === void 0 ? void 0 : _element$notas44.sumAB;
                      sumAB90 = (_element$notas45 = element.notas) === null || _element$notas45 === void 0 ? void 0 : _element$notas45.sumAB90;
                      exa1 = (_element$notas46 = element.notas) === null || _element$notas46 === void 0 ? void 0 : _element$notas46.exa1;
                      pry1 = (_element$notas47 = element.notas) === null || _element$notas47 === void 0 ? void 0 : _element$notas47.pry1;
                      sumAB10 = (_element$notas48 = element.notas) === null || _element$notas48 === void 0 ? void 0 : _element$notas48.sumAB10;
                      proAB = (_element$notas49 = element.notas) === null || _element$notas49 === void 0 ? void 0 : _element$notas49.proAB;
                      letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                      letras2 = promCuantitativoLetrasDos(ins === null || ins === void 0 ? void 0 : ins.proAB);
                    }

                    if (quim == 'SEGUNDO TRIMESTRE') {
                      var _element$notas50, _element$notas51, _element$notas52, _element$notas53, _element$notas54, _element$notas55, _element$notas56, _element$notas57;

                      var _ins8 = element.notas;
                      n1 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.c1;
                      n2 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.c2;
                      n3 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.c3;
                      n4 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.c4;
                      n6 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.d1;
                      n7 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.d2;
                      n8 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.d3;
                      n9 = _ins8 === null || _ins8 === void 0 ? void 0 : _ins8.d4;
                      ppa = (_element$notas50 = element.notas) === null || _element$notas50 === void 0 ? void 0 : _element$notas50.ppc;
                      ppb = (_element$notas51 = element.notas) === null || _element$notas51 === void 0 ? void 0 : _element$notas51.ppd;
                      sumAB = (_element$notas52 = element.notas) === null || _element$notas52 === void 0 ? void 0 : _element$notas52.sumCD;
                      sumAB90 = (_element$notas53 = element.notas) === null || _element$notas53 === void 0 ? void 0 : _element$notas53.sumCD90;
                      exa1 = (_element$notas54 = element.notas) === null || _element$notas54 === void 0 ? void 0 : _element$notas54.exa2;
                      pry1 = (_element$notas55 = element.notas) === null || _element$notas55 === void 0 ? void 0 : _element$notas55.pry2;
                      sumAB10 = (_element$notas56 = element.notas) === null || _element$notas56 === void 0 ? void 0 : _element$notas56.sumCD10;
                      proAB = (_element$notas57 = element.notas) === null || _element$notas57 === void 0 ? void 0 : _element$notas57.proCD;
                      letras = promCuantitativoLetras(_ins8 === null || _ins8 === void 0 ? void 0 : _ins8.proCD);
                      letras2 = promCuantitativoLetrasDos(_ins8 === null || _ins8 === void 0 ? void 0 : _ins8.proCD);
                    }

                    if (quim == 'TERCER TRIMESTRE') {
                      var _element$notas58, _element$notas59, _element$notas60, _element$notas61, _element$notas62, _element$notas63, _element$notas64, _element$notas65;

                      var _ins9 = element.notas;
                      n1 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.e1;
                      n2 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.e2;
                      n3 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.e3;
                      n4 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.e4;
                      n6 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.f1;
                      n7 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.f2;
                      n8 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.f3;
                      n9 = _ins9 === null || _ins9 === void 0 ? void 0 : _ins9.f4;
                      ppa = (_element$notas58 = element.notas) === null || _element$notas58 === void 0 ? void 0 : _element$notas58.ppe;
                      ppb = (_element$notas59 = element.notas) === null || _element$notas59 === void 0 ? void 0 : _element$notas59.ppf;
                      sumAB = (_element$notas60 = element.notas) === null || _element$notas60 === void 0 ? void 0 : _element$notas60.sumEF;
                      sumAB90 = (_element$notas61 = element.notas) === null || _element$notas61 === void 0 ? void 0 : _element$notas61.sumEF90;
                      exa1 = (_element$notas62 = element.notas) === null || _element$notas62 === void 0 ? void 0 : _element$notas62.exa3;
                      pry1 = (_element$notas63 = element.notas) === null || _element$notas63 === void 0 ? void 0 : _element$notas63.pry3;
                      sumAB10 = (_element$notas64 = element.notas) === null || _element$notas64 === void 0 ? void 0 : _element$notas64.sumEF10;
                      proAB = (_element$notas65 = element.notas) === null || _element$notas65 === void 0 ? void 0 : _element$notas65.proEF;
                      letras = promCuantitativoLetras(_ins9 === null || _ins9 === void 0 ? void 0 : _ins9.proEF);
                      letras2 = promCuantitativoLetrasDos(_ins9 === null || _ins9 === void 0 ? void 0 : _ins9.proEF);
                    }
                  }
                }

                proPPA.push(ppa);
                proPPB.push(ppb);
                promAB.push(proAB);
                aux.push({
                  estudiante: (_res$estudiante4 = res.estudiante) === null || _res$estudiante4 === void 0 ? void 0 : _res$estudiante4.fullname,
                  n1,
                  n2,
                  n3,
                  n4,
                  n6,
                  n7,
                  n8,
                  n9,
                  ppa,
                  ppb,
                  sumAB,
                  sumAB90,
                  exa1,
                  pry1,
                  sumAB10,
                  proAB,
                  letras,
                  letras2
                });
              }
            }

            var medPPA = calcMedia(proPPA);
            var medPPB = calcMedia(proPPB);
            var medAB = calcMedia(promAB);
            var pPPA = calcProm(proPPA);
            var pPPB = calcProm(proPPB);
            var prAB = calcProm(promAB);
            var lettras = promCuantitativoLetrasDos(prAB);
            help.push({
              materia: (_materias$materia12 = materias.materia) === null || _materias$materia12 === void 0 ? void 0 : _materias$materia12.nombre,
              computo: (_materias$materia13 = materias.materia) === null || _materias$materia13 === void 0 ? void 0 : _materias$materia13.computo,
              docente: (_materias$docente5 = materias.docente) === null || _materias$docente5 === void 0 ? void 0 : _materias$docente5.fullname,
              curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
              paralelo,
              data: aux,
              fechaA,
              medPPA,
              medPPB,
              medAB,
              periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre,
              pPPA,
              pPPB,
              prAB,
              lettras
            });
          }
        }
      }

      var arr = {
        help: help,
        help2: help2
      };
      return arr;
    } catch (error) {
      console.log(error);
    }
  };

  var promInforme = (rowM, rowD, estudiantes) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];
        var aux2 = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante6, _rowM$curso6, _rowM$periodo6;

          var computo = matriculas[i].computo;
          var promAB = [];
          var general = [];
          var promCD = [];
          var general2 = [];
          var promEF = [];
          var general33 = [];
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia16;

            var subelement = distributivo[j];

            if (((_subelement$materia16 = subelement.materia) === null || _subelement$materia16 === void 0 ? void 0 : _subelement$materia16.nombre) != 'COMPORTAMIENTO') {
              var _subelement$materia17, _subelement$materia18, _subelement$materia19;

              var sumAB = void 0,
                  sumAB90 = void 0,
                  exa1 = void 0,
                  pry1 = void 0,
                  sumAB10 = void 0,
                  proAB = void 0,
                  sumCD = void 0,
                  sumCD90 = void 0,
                  exa2 = void 0,
                  pry2 = void 0,
                  sumCD10 = void 0,
                  proCD = void 0,
                  suple = void 0,
                  final = void 0,
                  pytf = void 0,
                  examf = void 0,
                  promGen = void 0,
                  sumEF = void 0,
                  sumEF90 = void 0,
                  exa3 = void 0,
                  pry3 = void 0,
                  sumEF10 = void 0,
                  proEF = void 0,
                  letras1 = void 0,
                  letras2 = void 0,
                  letras3 = void 0,
                  letrasf = '';
              var computos = (_subelement$materia17 = subelement.materia) === null || _subelement$materia17 === void 0 ? void 0 : _subelement$materia17.computo;

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var ins = result.notas;
                  var res = result.resultados;
                  sumAB = ins === null || ins === void 0 ? void 0 : ins.sumAB;
                  sumAB90 = ins === null || ins === void 0 ? void 0 : ins.sumAB90;
                  exa1 = ins === null || ins === void 0 ? void 0 : ins.exa1;
                  pry1 = ins === null || ins === void 0 ? void 0 : ins.pry1;
                  sumAB10 = ins === null || ins === void 0 ? void 0 : ins.sumAB10;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  letras1 = promCuantitativoLetrasDos(ins === null || ins === void 0 ? void 0 : ins.proAB);
                  sumCD = ins === null || ins === void 0 ? void 0 : ins.sumCD;
                  sumCD90 = ins === null || ins === void 0 ? void 0 : ins.sumCD90;
                  exa2 = ins === null || ins === void 0 ? void 0 : ins.exa2;
                  pry2 = ins === null || ins === void 0 ? void 0 : ins.pry2;
                  sumCD10 = ins === null || ins === void 0 ? void 0 : ins.sumCD10;
                  proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                  letras2 = promCuantitativoLetrasDos(ins === null || ins === void 0 ? void 0 : ins.proCD);
                  sumEF = ins === null || ins === void 0 ? void 0 : ins.sumEF;
                  sumEF90 = ins === null || ins === void 0 ? void 0 : ins.sumEF90;
                  exa3 = ins === null || ins === void 0 ? void 0 : ins.exa3;
                  pry3 = ins === null || ins === void 0 ? void 0 : ins.pry3;
                  sumEF10 = ins === null || ins === void 0 ? void 0 : ins.sumEF10;
                  proEF = ins === null || ins === void 0 ? void 0 : ins.proEF;
                  letras3 = promCuantitativoLetrasDos(ins === null || ins === void 0 ? void 0 : ins.proEF);
                  suple = res === null || res === void 0 ? void 0 : res.supletorio;
                  promGen = res === null || res === void 0 ? void 0 : res.promGen;
                  final = res === null || res === void 0 ? void 0 : res.notaFinal;
                  pytf = res === null || res === void 0 ? void 0 : res.pytf;
                  examf = res === null || res === void 0 ? void 0 : res.examf;
                  letrasf = promCuantitativoLetrasDos(res === null || res === void 0 ? void 0 : res.notaFinal);
                }
              }
              /* NO CALCULAR LAS COMPLEMENTARIAS */


              if (computos == 2) {
                promAB.push(sumAB);
                general.push(proAB);
                promCD.push(sumCD);
                general2.push(proCD);
                promEF.push(sumEF);
                general33.push(proEF);
                general3.push(final);
              }

              aux.push({
                materia: (_subelement$materia18 = subelement.materia) === null || _subelement$materia18 === void 0 ? void 0 : _subelement$materia18.nombre,
                computo: computos,
                area: (_subelement$materia19 = subelement.materia) === null || _subelement$materia19 === void 0 ? void 0 : _subelement$materia19.area,
                sumAB,
                sumAB90,
                exa1,
                pry1,
                sumAB10,
                proAB,
                sumCD,
                sumCD90,
                exa2,
                pry2,
                sumCD10,
                proCD,
                final,
                suple,
                sumEF,
                sumEF90,
                exa3,
                pry3,
                promGen,
                sumEF10,
                proEF,
                letras1,
                letras2,
                letras3,
                letrasf,
                pytf,
                examf
              });
            } else {
              var _subelement$materia20;

              var p1 = void 0,
                  p2 = void 0,
                  _final = '';

              for (var _m4 = 0; _m4 < computo.length; _m4++) {
                var _result4 = computo[_m4];

                if (subelement.fkmaterias == _result4.fkmateria) {
                  var _result4$resultados;

                  var _ins10 = _result4.cualitativo;
                  p1 = _ins10.p1;
                  p2 = _ins10.p2;
                  _final = (_result4$resultados = _result4.resultados) === null || _result4$resultados === void 0 ? void 0 : _result4$resultados.promGen;
                }
              }

              aux2.push({
                materia: (_subelement$materia20 = subelement.materia) === null || _subelement$materia20 === void 0 ? void 0 : _subelement$materia20.nombre,
                final: _final,
                p1,
                p2
              });
            }
          }

          var pAB = calcProm(promAB);
          var pgeneral = calcProm(general);
          var pCD = calcProm(promCD);
          var pgeneral2 = calcProm(general2);
          var pEF = calcProm(promEF);
          var pgeneral33 = calcProm(general33);
          var pgeneral3 = calcProm(general3);
          help.push({
            nombre: (_element$estudiante6 = element.estudiante) === null || _element$estudiante6 === void 0 ? void 0 : _element$estudiante6.fullname,
            curso: (_rowM$curso6 = rowM.curso) === null || _rowM$curso6 === void 0 ? void 0 : _rowM$curso6.nombre,
            periodo: (_rowM$periodo6 = rowM.periodo) === null || _rowM$periodo6 === void 0 ? void 0 : _rowM$periodo6.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            pgeneral3,
            pAB,
            pgeneral,
            pCD,
            pgeneral2,
            fechaA,
            nmatricula: element.nmatricula,
            pEF,
            pgeneral33
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  var promFinal = (rowM, rowD, estudiantes) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];
        var aux2 = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante7, _rowM$curso7, _rowM$periodo7;

          var computo = matriculas[i].computo;
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia21;

            var subelement = distributivo[j];

            if (((_subelement$materia21 = subelement.materia) === null || _subelement$materia21 === void 0 ? void 0 : _subelement$materia21.nombre) != 'COMPORTAMIENTO') {
              var _subelement$materia22, _subelement$materia23;

              var computos = (_subelement$materia22 = subelement.materia) === null || _subelement$materia22 === void 0 ? void 0 : _subelement$materia22.computo;

              var proAB = void 0,
                  proCD = void 0,
                  proEF = void 0,
                  pytf = void 0,
                  examf = void 0,
                  suple = void 0,
                  final = void 0,
                  promGen = void 0,
                  _letras5 = void 0,
                  letras2 = '';

              var ll1 = void 0,
                  ll2 = void 0,
                  ll3 = void 0,
                  llp = void 0,
                  lle = void 0,
                  llf = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var ins = result.notas;
                  var res = result.resultados;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                  proEF = ins === null || ins === void 0 ? void 0 : ins.proEF;
                  pytf = res === null || res === void 0 ? void 0 : res.pytf;
                  examf = res === null || res === void 0 ? void 0 : res.examf;
                  suple = res === null || res === void 0 ? void 0 : res.supletorio;
                  final = res === null || res === void 0 ? void 0 : res.notaFinal;
                  promGen = res === null || res === void 0 ? void 0 : res.promGen;
                  ll1 = promCuantitativoLetrasDos(proAB);
                  ll2 = promCuantitativoLetrasDos(proCD);
                  ll3 = promCuantitativoLetrasDos(proEF);
                  llp = promCuantitativoLetrasDos(pytf);
                  lle = promCuantitativoLetrasDos(examf);
                  llf = promCuantitativoLetrasDos(final);
                }
              }

              _letras5 = promCuantitativoPalabra(final);
              letras2 = promCuantitativoPalabraDos(final);
              if (computos == 2) general3.push(final);
              aux.push({
                materia: (_subelement$materia23 = subelement.materia) === null || _subelement$materia23 === void 0 ? void 0 : _subelement$materia23.nombre,
                computo: computos,
                letras: _letras5,
                letras2,
                proAB,
                proCD,
                proEF,
                pytf,
                examf,
                final,
                suple,
                promGen,
                ll1,
                ll2,
                ll3,
                llp,
                lle,
                llf
              });
            } else {
              var _subelement$materia24, _subelement$materia25, _subelement$materia26;

              var _computos = (_subelement$materia24 = subelement.materia) === null || _subelement$materia24 === void 0 ? void 0 : _subelement$materia24.computo;

              var p1 = void 0,
                  p2 = void 0,
                  p3 = void 0,
                  _promGen = void 0,
                  _letras6 = '';

              for (var _m5 = 0; _m5 < computo.length; _m5++) {
                var _result5 = computo[_m5];

                if (subelement.fkmaterias == _result5.fkmateria) {
                  var _ins11 = _result5.cualitativo;
                  var _res3 = _result5.resultados;
                  p1 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.p1;
                  p2 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.p2;
                  p3 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.p3;
                  _promGen = _res3 === null || _res3 === void 0 ? void 0 : _res3.promGen;
                }
              }

              _letras6 = calcularPryectos(_promGen, (_subelement$materia25 = subelement.materia) === null || _subelement$materia25 === void 0 ? void 0 : _subelement$materia25.nombre);
              aux2.push({
                materia: (_subelement$materia26 = subelement.materia) === null || _subelement$materia26 === void 0 ? void 0 : _subelement$materia26.nombre,
                computo: _computos,
                letras: _letras6,
                p1,
                p2,
                p3,
                promGen: _promGen
              });
            }
          }

          var pgeneral3 = calcProm(general3);
          var letras = trasformnumberToText(pgeneral3);
          help.push({
            nombre: (_element$estudiante7 = element.estudiante) === null || _element$estudiante7 === void 0 ? void 0 : _element$estudiante7.fullname,
            curso: (_rowM$curso7 = rowM.curso) === null || _rowM$curso7 === void 0 ? void 0 : _rowM$curso7.nombre,
            periodo: (_rowM$periodo7 = rowM.periodo) === null || _rowM$periodo7 === void 0 ? void 0 : _rowM$periodo7.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            pgeneral3,
            fechaA,
            nmatricula: element.nmatricula,
            letras
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return {
    juntasExamProyec,
    promParcial,
    promQuimestral,
    promAnual,
    promPromociones,
    promMatricula,
    promLibretas,
    promJuntas,
    promInforme,
    promFinal,
    promJuntasOnly
  };
};

exports.superior = superior;