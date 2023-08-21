"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promedioReportes = void 0;

var promedioReportes = () => {
  var trasformnumberToText = num => {
    if (num == '') return 'Sin confirmar';
    if (num == undefined) return 'Sin confirmar';
    if (isNaN(num)) return 'Sin confirmar';
    var result = parseFloat(num);
    return NumeroALetras(result);
  };

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

  function formatPromociones(rowM, rowD, estudiantes) {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante, _rowM$curso, _rowM$periodo;

          var computo = matriculas[i].computo;
          var promGeneral = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia, _subelement$materia2;

            var subelement = distributivo[j];
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
              materia: (_subelement$materia = subelement.materia) === null || _subelement$materia === void 0 ? void 0 : _subelement$materia.nombre,
              area: (_subelement$materia2 = subelement.materia) === null || _subelement$materia2 === void 0 ? void 0 : _subelement$materia2.area,
              promedio: promedio ? promedio.toString().replace('.', ',') : '',
              letras: letras
            });
          }

          var pgeneral = calcProm(promGeneral);
          var letrasFinal = trasformnumberToText(pgeneral);
          help.push({
            nombre: (_element$estudiante = element.estudiante) === null || _element$estudiante === void 0 ? void 0 : _element$estudiante.fullname,
            curso: (_rowM$curso = rowM.curso) === null || _rowM$curso === void 0 ? void 0 : _rowM$curso.nombre,
            periodo: (_rowM$periodo = rowM.periodo) === null || _rowM$periodo === void 0 ? void 0 : _rowM$periodo.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            pgeneral: pgeneral ? pgeneral.toString().replace('.', ',') : '',
            letrasFinal: letrasFinal
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function formatMatricula(rowM, estudiantes) {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var fechaA = fechaActual();
      var help = [];

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante2, _rowM$curso2, _rowM$periodo2;

          help.push({
            nombre: (_element$estudiante2 = element.estudiante) === null || _element$estudiante2 === void 0 ? void 0 : _element$estudiante2.fullname,
            curso: (_rowM$curso2 = rowM.curso) === null || _rowM$curso2 === void 0 ? void 0 : _rowM$curso2.nombre,
            periodo: (_rowM$periodo2 = rowM.periodo) === null || _rowM$periodo2 === void 0 ? void 0 : _rowM$periodo2.nombre,
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
  }

  function formatLibretas(rowM, rowD, estudiantes, quim) {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante3, _rowM$curso3, _rowM$periodo3;

          var computo = matriculas[i].computo;
          var promPPA = [];
          var promPPB = [];
          var general = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia3, _subelement$materia4;

            var subelement = distributivo[j];
            var n1 = void 0,
                n2 = void 0,
                n3 = void 0,
                n4 = void 0,
                n5 = void 0,
                n6 = void 0,
                n7 = void 0,
                n8 = void 0,
                n9 = void 0,
                n10 = void 0,
                ppa = void 0,
                ppb = void 0,
                sumAB = void 0,
                sumAB80 = void 0,
                exa1 = void 0,
                sumAB20 = void 0,
                proAB = '';
            var letras = '';

            for (var m = 0; m < computo.length; m++) {
              var result = computo[m];

              if (subelement.fkmaterias == result.fkmateria) {
                if (quim == 'PRIMER QUIMESTRE') {
                  var ins = result.notas;
                  n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                  n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                  n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                  n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                  n5 = ins === null || ins === void 0 ? void 0 : ins.a5;
                  n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                  n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                  n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                  n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                  n10 = ins === null || ins === void 0 ? void 0 : ins.b5;
                  ppa = ins === null || ins === void 0 ? void 0 : ins.ppa;
                  ppb = ins === null || ins === void 0 ? void 0 : ins.ppb;
                  sumAB = ins === null || ins === void 0 ? void 0 : ins.sumAB;
                  sumAB80 = ins === null || ins === void 0 ? void 0 : ins.sumAB80;
                  exa1 = ins === null || ins === void 0 ? void 0 : ins.exa1;
                  sumAB20 = ins === null || ins === void 0 ? void 0 : ins.sumAB20;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                }

                if (quim == 'SEGUNDO QUIMESTRE') {
                  var _ins = result.notas;
                  n1 = _ins === null || _ins === void 0 ? void 0 : _ins.c1;
                  n2 = _ins === null || _ins === void 0 ? void 0 : _ins.c2;
                  n3 = _ins === null || _ins === void 0 ? void 0 : _ins.c3;
                  n4 = _ins === null || _ins === void 0 ? void 0 : _ins.c4;
                  n5 = _ins === null || _ins === void 0 ? void 0 : _ins.c5;
                  n6 = _ins === null || _ins === void 0 ? void 0 : _ins.d1;
                  n7 = _ins === null || _ins === void 0 ? void 0 : _ins.d2;
                  n8 = _ins === null || _ins === void 0 ? void 0 : _ins.d3;
                  n9 = _ins === null || _ins === void 0 ? void 0 : _ins.d4;
                  n10 = _ins === null || _ins === void 0 ? void 0 : _ins.d5;
                  ppa = _ins === null || _ins === void 0 ? void 0 : _ins.ppc;
                  ppb = _ins === null || _ins === void 0 ? void 0 : _ins.ppd;
                  sumAB = _ins === null || _ins === void 0 ? void 0 : _ins.sumCD;
                  sumAB80 = _ins === null || _ins === void 0 ? void 0 : _ins.sumCD80;
                  exa1 = _ins === null || _ins === void 0 ? void 0 : _ins.exa2;
                  sumAB20 = _ins === null || _ins === void 0 ? void 0 : _ins.sumCD20;
                  proAB = _ins === null || _ins === void 0 ? void 0 : _ins.proCD;
                  letras = promCuantitativoLetras(_ins === null || _ins === void 0 ? void 0 : _ins.proCD);
                }
              }
            }

            promPPA.push(ppa);
            promPPB.push(ppb);
            general.push(proAB);
            aux.push({
              materia: (_subelement$materia3 = subelement.materia) === null || _subelement$materia3 === void 0 ? void 0 : _subelement$materia3.nombre,
              area: (_subelement$materia4 = subelement.materia) === null || _subelement$materia4 === void 0 ? void 0 : _subelement$materia4.area,
              n1: n1,
              n2: n2,
              n3: n3,
              n4: n4,
              n5: n5,
              n6: n6,
              n7: n7,
              n8: n8,
              n9: n9,
              n10: n10,
              ppa: ppa,
              ppb: ppb,
              sumAB: sumAB,
              sumAB80: sumAB80,
              exa1: exa1,
              sumAB20: sumAB20,
              proAB: proAB,
              letras: letras
            });
          }

          var pPPA = calcProm(promPPA);
          var pPPB = calcProm(promPPB);
          var pgeneral = calcProm(general);
          help.push({
            nombre: (_element$estudiante3 = element.estudiante) === null || _element$estudiante3 === void 0 ? void 0 : _element$estudiante3.fullname,
            curso: (_rowM$curso3 = rowM.curso) === null || _rowM$curso3 === void 0 ? void 0 : _rowM$curso3.nombre,
            periodo: (_rowM$periodo3 = rowM.periodo) === null || _rowM$periodo3 === void 0 ? void 0 : _rowM$periodo3.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            pPPA: pPPA,
            pPPB: pPPB,
            pgeneral: pgeneral,
            fechaA: fechaA,
            nmatricula: element.nmatricula
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function formatJuntas(rowM, rowD, estudiantes, quim, paralelo) {
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
        var _materias$materia, _materias$docente;

        var aux = [];
        var materias = distributivo[j];
        var proPPA = [];
        var proPPB = [];
        var promAB = [];

        for (var k = 0; k < matriculas.length; k++) {
          var res = matriculas[k];

          if (estudiantes.includes(res.fkestudiante)) {
            var _res$estudiante;

            var computo = matriculas[k].computo;
            var n1 = void 0,
                n2 = void 0,
                n3 = void 0,
                n4 = void 0,
                n5 = void 0,
                n6 = void 0,
                n7 = void 0,
                n8 = void 0,
                n9 = void 0,
                n10 = void 0,
                ppa = void 0,
                ppb = void 0,
                sumAB = void 0,
                sumAB80 = void 0,
                exa1 = void 0,
                sumAB20 = void 0,
                proAB = '';
            var letras = '';

            for (var i = 0; i < computo.length; i++) {
              var element = computo[i];

              if (element.fkmateria == materias.fkmaterias) {
                if (quim == 'PRIMER QUIMESTRE') {
                  var _element$notas, _element$notas2, _element$notas3, _element$notas4, _element$notas5, _element$notas6, _element$notas7;

                  var ins = element.notas;
                  n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                  n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                  n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                  n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                  n5 = ins === null || ins === void 0 ? void 0 : ins.a5;
                  n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                  n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                  n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                  n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                  n10 = ins === null || ins === void 0 ? void 0 : ins.b5;
                  ppa = (_element$notas = element.notas) === null || _element$notas === void 0 ? void 0 : _element$notas.ppa;
                  ppb = (_element$notas2 = element.notas) === null || _element$notas2 === void 0 ? void 0 : _element$notas2.ppb;
                  sumAB = (_element$notas3 = element.notas) === null || _element$notas3 === void 0 ? void 0 : _element$notas3.sumAB;
                  sumAB80 = (_element$notas4 = element.notas) === null || _element$notas4 === void 0 ? void 0 : _element$notas4.sumAB80;
                  exa1 = (_element$notas5 = element.notas) === null || _element$notas5 === void 0 ? void 0 : _element$notas5.exa1;
                  sumAB20 = (_element$notas6 = element.notas) === null || _element$notas6 === void 0 ? void 0 : _element$notas6.sumAB20;
                  proAB = (_element$notas7 = element.notas) === null || _element$notas7 === void 0 ? void 0 : _element$notas7.proAB;
                  letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                }

                if (quim == 'SEGUNDO QUIMESTRE') {
                  var _element$notas8, _element$notas9, _element$notas10, _element$notas11, _element$notas12, _element$notas13, _element$notas14;

                  var _ins2 = element.notas;
                  n1 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.c1;
                  n2 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.c2;
                  n3 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.c3;
                  n4 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.c4;
                  n5 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.c5;
                  n6 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.d1;
                  n7 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.d2;
                  n8 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.d3;
                  n9 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.d4;
                  n10 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.d5;
                  ppa = (_element$notas8 = element.notas) === null || _element$notas8 === void 0 ? void 0 : _element$notas8.ppc;
                  ppb = (_element$notas9 = element.notas) === null || _element$notas9 === void 0 ? void 0 : _element$notas9.ppd;
                  sumAB = (_element$notas10 = element.notas) === null || _element$notas10 === void 0 ? void 0 : _element$notas10.sumCD;
                  sumAB80 = (_element$notas11 = element.notas) === null || _element$notas11 === void 0 ? void 0 : _element$notas11.sumCD80;
                  exa1 = (_element$notas12 = element.notas) === null || _element$notas12 === void 0 ? void 0 : _element$notas12.exa2;
                  sumAB20 = (_element$notas13 = element.notas) === null || _element$notas13 === void 0 ? void 0 : _element$notas13.sumCD20;
                  proAB = (_element$notas14 = element.notas) === null || _element$notas14 === void 0 ? void 0 : _element$notas14.proCD;
                  letras = promCuantitativoLetras(_ins2 === null || _ins2 === void 0 ? void 0 : _ins2.proCD);
                }
              }
            }

            proPPA.push(ppa);
            proPPB.push(ppb);
            promAB.push(proAB);
            aux.push({
              estudiante: (_res$estudiante = res.estudiante) === null || _res$estudiante === void 0 ? void 0 : _res$estudiante.fullname,
              n1: n1,
              n2: n2,
              n3: n3,
              n4: n4,
              n5: n5,
              n6: n6,
              n7: n7,
              n8: n8,
              n9: n9,
              n10: n10,
              ppa: ppa,
              ppb: ppb,
              sumAB: sumAB,
              sumAB80: sumAB80,
              exa1: exa1,
              sumAB20: sumAB20,
              proAB: proAB,
              letras: letras
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
          materia: (_materias$materia = materias.materia) === null || _materias$materia === void 0 ? void 0 : _materias$materia.nombre,
          docente: (_materias$docente = materias.docente) === null || _materias$docente === void 0 ? void 0 : _materias$docente.fullname,
          curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
          paralelo: paralelo,
          data: aux,
          fechaA: fechaA,
          medPPA: medPPA,
          medPPB: medPPB,
          medAB: medAB,
          periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre,
          pPPA: pPPA,
          pPPB: pPPB,
          prAB: prAB
        });
      } //console.log('es',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  }

  function formatInforme(rowM, rowD, estudiantes) {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante4, _rowM$curso4, _rowM$periodo4;

          var computo = matriculas[i].computo;
          var promPPA = [];
          var promPPB = [];
          var promAB = [];
          var general = [];
          var promPPC = [];
          var promPPD = [];
          var promCD = [];
          var general2 = [];
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia5, _subelement$materia6;

            var subelement = distributivo[j];
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
                proCD = void 0,
                suple = void 0,
                final = '';

            for (var m = 0; m < computo.length; m++) {
              var result = computo[m];

              if (subelement.fkmaterias == result.fkmateria) {
                var ins = result.notas;
                var res = result.resultados;
                ppa = ins === null || ins === void 0 ? void 0 : ins.ppa;
                ppb = ins === null || ins === void 0 ? void 0 : ins.ppb;
                sumAB = ins === null || ins === void 0 ? void 0 : ins.sumAB;
                sumAB80 = ins === null || ins === void 0 ? void 0 : ins.sumAB80;
                exa1 = ins === null || ins === void 0 ? void 0 : ins.exa1;
                sumAB20 = ins === null || ins === void 0 ? void 0 : ins.sumAB20;
                proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                ppc = ins === null || ins === void 0 ? void 0 : ins.ppc;
                ppd = ins === null || ins === void 0 ? void 0 : ins.ppd;
                sumCD = ins === null || ins === void 0 ? void 0 : ins.sumCD;
                sumCD80 = ins === null || ins === void 0 ? void 0 : ins.sumCD80;
                exa2 = ins === null || ins === void 0 ? void 0 : ins.exa2;
                sumCD20 = ins === null || ins === void 0 ? void 0 : ins.sumCD20;
                proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                suple = res === null || res === void 0 ? void 0 : res.supletorio, final = res === null || res === void 0 ? void 0 : res.notaFinal;
              }
            }

            promPPA.push(ppa);
            promPPB.push(ppb);
            promAB.push(sumAB);
            general.push(proAB);
            promPPC.push(ppc);
            promPPD.push(ppd);
            promCD.push(sumCD);
            general2.push(proCD);
            general3.push(final);
            aux.push({
              materia: (_subelement$materia5 = subelement.materia) === null || _subelement$materia5 === void 0 ? void 0 : _subelement$materia5.nombre,
              area: (_subelement$materia6 = subelement.materia) === null || _subelement$materia6 === void 0 ? void 0 : _subelement$materia6.area,
              ppa: ppa,
              ppb: ppb,
              sumAB: sumAB,
              sumAB80: sumAB80,
              exa1: exa1,
              sumAB20: sumAB20,
              proAB: proAB,
              ppc: ppc,
              ppd: ppd,
              sumCD: sumCD,
              sumCD80: sumCD80,
              exa2: exa2,
              sumCD20: sumCD20,
              proCD: proCD,
              final: final,
              suple: suple
            });
          }

          var pPPA = calcProm(promPPA);
          var pPPB = calcProm(promPPB);
          var pAB = calcProm(promAB);
          var pgeneral = calcProm(general);
          var pPPC = calcProm(promPPC);
          var pPPD = calcProm(promPPD);
          var pCD = calcProm(promCD);
          var pgeneral2 = calcProm(general2);
          var pgeneral3 = calcProm(general3);
          help.push({
            nombre: (_element$estudiante4 = element.estudiante) === null || _element$estudiante4 === void 0 ? void 0 : _element$estudiante4.fullname,
            curso: (_rowM$curso4 = rowM.curso) === null || _rowM$curso4 === void 0 ? void 0 : _rowM$curso4.nombre,
            periodo: (_rowM$periodo4 = rowM.periodo) === null || _rowM$periodo4 === void 0 ? void 0 : _rowM$periodo4.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            pgeneral3: pgeneral3,
            pPPA: pPPA,
            pPPB: pPPB,
            pAB: pAB,
            pgeneral: pgeneral,
            pPPC: pPPC,
            pPPD: pPPD,
            pCD: pCD,
            pgeneral2: pgeneral2,
            fechaA: fechaA,
            nmatricula: element.nmatricula
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return {
    formatPromociones,
    formatMatricula,
    formatLibretas,
    formatJuntas,
    formatInforme
  };
};

exports.promedioReportes = promedioReportes;

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

function promCuantitativoLetras(prom) {
  var num = parseFloat(prom);
  var result = '';

  if (num >= 9 && num <= 10) {
    result = 'DA';
  } else if (num >= 7 && num <= 8.99) {
    result = 'AA';
  } else if (num >= 4.01 && num <= 6.99) {
    result = 'PA';
  } else {
    result = 'NA';
  }

  return result;
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

function Unidades(num) {
  switch (num) {
    case 1:
      return "uno";

    case 2:
      return "dos";

    case 3:
      return "tres";

    case 4:
      return "cuatro";

    case 5:
      return "cinco";

    case 6:
      return "seis";

    case 7:
      return "siete";

    case 8:
      return "ocho";

    case 9:
      return "nueve";
  }

  return "";
} //Unidades()


function Decenas(num) {
  var decena = Math.floor(num / 10);
  var unidad = num - decena * 10;

  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "diez";

        case 1:
          return "once";

        case 2:
          return "doce";

        case 3:
          return "trece";

        case 4:
          return "catorce";

        case 5:
          return "quince";

        default:
          return "dieci" + Unidades(unidad);
      }

    case 2:
      switch (unidad) {
        case 0:
          return "veinte";

        default:
          return "veinti" + Unidades(unidad);
      }

    case 3:
      return DecenasY("treinta", unidad);

    case 4:
      return DecenasY("cuarenta", unidad);

    case 5:
      return DecenasY("cincuenta", unidad);

    case 6:
      return DecenasY("sesenta", unidad);

    case 7:
      return DecenasY("setenta", unidad);

    case 8:
      return DecenasY("ochenta", unidad);

    case 9:
      return DecenasY("noventa", unidad);

    case 0:
      return Unidades(unidad);
  }
} //Unidades()


function DecenasY(strSin, numUnidades) {
  if (numUnidades > 0) return strSin + " y " + Unidades(numUnidades);
  return strSin;
} //DecenasY()


function Centenas(num) {
  var centenas = Math.floor(num / 100);
  var decenas = num - centenas * 100;

  switch (centenas) {
    case 1:
      if (decenas > 0) return "CIENTO " + Decenas(decenas);
      return "CIEN";

    case 2:
      return "DOSCIENTOS " + Decenas(decenas);

    case 3:
      return "TRESCIENTOS " + Decenas(decenas);

    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);

    case 5:
      return "QUINIENTOS " + Decenas(decenas);

    case 6:
      return "SEISCIENTOS " + Decenas(decenas);

    case 7:
      return "SETECIENTOS " + Decenas(decenas);

    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);

    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
  }

  return Decenas(decenas);
} //Centenas()


function Seccion(num, divisor, strSingular, strPlural) {
  var cientos = Math.floor(num / divisor);
  var resto = num - cientos * divisor;
  var letras = "";
  if (cientos > 0) if (cientos > 1) letras = Centenas(cientos) + " " + strPlural;else letras = strSingular;
  if (resto > 0) letras += "";
  return letras;
} //Seccion()


function Miles(num) {
  var divisor = 1000;
  var cientos = Math.floor(num / divisor);
  var resto = num - cientos * divisor;
  var strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  var strCentenas = Centenas(resto);
  if (strMiles == "") return strCentenas;
  return strMiles + " " + strCentenas;
} //Miles()


function Millones(num) {
  var divisor = 1000000;
  var cientos = Math.floor(num / divisor);
  var resto = num - cientos * divisor;
  var strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
  var strMiles = Miles(resto);
  if (strMillones == "") return strMiles;
  return strMillones + " " + strMiles;
} //Millones()


function NumeroALetras(num) {
  if (num != '' || num != null || num != NaN) {
    var data = {
      numero: num,
      enteros: Math.floor(num),
      centavos: Math.round(num * 100) - Math.floor(num) * 100,
      letrasCentavos: ""
    }; //RANGOS DE 0 A 9

    if (data.centavos > 0 && data.centavos <= 9) {
      data.letrasCentavos = "coma cero " + function () {
        if (data.centavos == 1) return Millones(data.centavos);else return Millones(data.centavos);
      }();
    }

    if (data.centavos > 9) {
      data.letrasCentavos = "coma " + function () {
        if (data.centavos == 1) return Millones(data.centavos);else return Millones(data.centavos);
      }();
    } //RANGOS CERRADOS


    if (data.centavos == 0) {
      data.letrasCentavos = "coma cero cero" + function () {
        if (data.centavos == 1) return Millones(data.centavos);else return Millones(data.centavos);
      }();
    }

    if (data.enteros == 0) return "cero " + data.letrasCentavos;
    if (data.enteros == 1) return Millones(data.enteros) + data.letrasCentavos;else return Millones(data.enteros) + " " + data.letrasCentavos;
  } else {
    return 'Cero';
  }
}