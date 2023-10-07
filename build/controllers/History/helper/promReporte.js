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
      if (element == undefined) continue;
      if (element == null) continue;
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
        var aux2 = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante, _rowM$curso, _rowM$periodo;

          var computo = matriculas[i].computo;
          var promGeneral = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia;

            var subelement = distributivo[j];

            if (((_subelement$materia = subelement.materia) === null || _subelement$materia === void 0 ? void 0 : _subelement$materia.computo) == 2) {
              var _subelement$materia2, _subelement$materia3;

              var promedio = void 0,
                  letras = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var _result$resultados, _result$resultados2, _result$resultados3;

                  if (((_result$resultados = result.resultados) === null || _result$resultados === void 0 ? void 0 : _result$resultados.supletorio) != '' || ((_result$resultados2 = result.resultados) === null || _result$resultados2 === void 0 ? void 0 : _result$resultados2.remedial) != '' || ((_result$resultados3 = result.resultados) === null || _result$resultados3 === void 0 ? void 0 : _result$resultados3.gracia) != '') {
                    var _result$resultados4, _result$resultados5, _result$resultados6;

                    if (((_result$resultados4 = result.resultados) === null || _result$resultados4 === void 0 ? void 0 : _result$resultados4.supletorio) != '') promedio = result.resultados.supletorio;
                    if (((_result$resultados5 = result.resultados) === null || _result$resultados5 === void 0 ? void 0 : _result$resultados5.remedial) != '') promedio = result.resultados.remedial;
                    if (((_result$resultados6 = result.resultados) === null || _result$resultados6 === void 0 ? void 0 : _result$resultados6.gracia) != '') promedio = result.resultados.gracia;
                  } else promedio = result.resultados.notaFinal;
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
              var _subelement$materia4, _subelement$materia5, _subelement$materia6;

              var _promedio = void 0,
                  _letras = '';

              for (var _m = 0; _m < computo.length; _m++) {
                var _result = computo[_m];

                if (subelement.fkmaterias == _result.fkmateria) {
                  var _result$materia;

                  // console.log(result) //result.resultados?.promedioFinal
                  if (((_result$materia = _result.materia) === null || _result$materia === void 0 ? void 0 : _result$materia.nombre) == 'COMPORTAMIENTO') _promedio = 'A';else {
                    var nott = ['EX', 'MB', 'MB'];
                    var ramdom = Math.floor(Math.random() * nott.length);
                    _promedio = nott[ramdom];
                  }
                }
              }

              _letras = calcularPryectos(_promedio, (_subelement$materia4 = subelement.materia) === null || _subelement$materia4 === void 0 ? void 0 : _subelement$materia4.nombre);
              promGeneral.push(_promedio);
              aux2.push({
                materia: (_subelement$materia5 = subelement.materia) === null || _subelement$materia5 === void 0 ? void 0 : _subelement$materia5.nombre,
                area: (_subelement$materia6 = subelement.materia) === null || _subelement$materia6 === void 0 ? void 0 : _subelement$materia6.area,
                promedio: _promedio,
                letras: _letras
              });
            }
          }

          var pgeneral = calcProm(promGeneral);
          var letrasFinal = trasformnumberToText(pgeneral);
          help.push({
            nombre: (_element$estudiante = element.estudiante) === null || _element$estudiante === void 0 ? void 0 : _element$estudiante.fullname,
            curso: (_rowM$curso = rowM.curso) === null || _rowM$curso === void 0 ? void 0 : _rowM$curso.nombre,
            periodo: (_rowM$periodo = rowM.periodo) === null || _rowM$periodo === void 0 ? void 0 : _rowM$periodo.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
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
        var aux2 = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante3, _rowM$curso3, _rowM$periodo3;

          var computo = matriculas[i].computo;
          var promPPA = [];
          var promPPB = [];
          var general = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia7;

            var subelement = distributivo[j];

            if (((_subelement$materia7 = subelement.materia) === null || _subelement$materia7 === void 0 ? void 0 : _subelement$materia7.computo) == 2) {
              var _subelement$materia8, _subelement$materia9;

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
                materia: (_subelement$materia8 = subelement.materia) === null || _subelement$materia8 === void 0 ? void 0 : _subelement$materia8.nombre,
                area: (_subelement$materia9 = subelement.materia) === null || _subelement$materia9 === void 0 ? void 0 : _subelement$materia9.area,
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
            } else {
              var _subelement$materia14;

              var p1 = void 0,
                  p2 = '';
              var _letras2 = '';

              for (var _m2 = 0; _m2 < computo.length; _m2++) {
                var _result2 = computo[_m2];

                if (subelement.fkmaterias == _result2.fkmateria) {
                  if (quim == 'PRIMER QUIMESTRE') {
                    var _subelement$materia10, _subelement$materia11;

                    var _ins2 = _result2.cualitativo;
                    p1 = _ins2.p1;
                    p2 = _ins2.p2;
                    if (((_subelement$materia10 = subelement.materia) === null || _subelement$materia10 === void 0 ? void 0 : _subelement$materia10.nombre) == 'COMPORTAMIENTO' || ((_subelement$materia11 = subelement.materia) === null || _subelement$materia11 === void 0 ? void 0 : _subelement$materia11.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins2.p1, _ins2.p2);else _letras2 = calcularPromedioInsumosLetras(_ins2.p1, _ins2.p2);
                  }

                  if (quim == 'SEGUNDO QUIMESTRE') {
                    var _subelement$materia12, _subelement$materia13;

                    var _ins3 = _result2.cualitativo;
                    p1 = _ins3.p3;
                    p2 = _ins3.p4;
                    if (((_subelement$materia12 = subelement.materia) === null || _subelement$materia12 === void 0 ? void 0 : _subelement$materia12.nombre) == 'COMPORTAMIENTO' || ((_subelement$materia13 = subelement.materia) === null || _subelement$materia13 === void 0 ? void 0 : _subelement$materia13.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins3.p3, _ins3.p4);else _letras2 = calcularPromedioInsumosLetras(_ins3.p3, _ins3.p4);
                  }
                }
              }

              aux2.push({
                materia: (_subelement$materia14 = subelement.materia) === null || _subelement$materia14 === void 0 ? void 0 : _subelement$materia14.nombre,
                letras: _letras2,
                p1: p1,
                p2: p2
              });
            }
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
            data2: aux2,
            pPPA: pPPA,
            pPPB: pPPB,
            pgeneral: pgeneral,
            fechaA: fechaA,
            nmatricula: element.nmatricula
          });
        }
      }

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
        var _materias$materia;

        var aux = [];
        var aux2 = [];
        var materias = distributivo[j];

        if (((_materias$materia = materias.materia) === null || _materias$materia === void 0 ? void 0 : _materias$materia.computo) == 2) {
          var _materias$materia2, _materias$docente;

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

                    var _ins4 = element.notas;
                    n1 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.c1;
                    n2 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.c2;
                    n3 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.c3;
                    n4 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.c4;
                    n5 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.c5;
                    n6 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.d1;
                    n7 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.d2;
                    n8 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.d3;
                    n9 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.d4;
                    n10 = _ins4 === null || _ins4 === void 0 ? void 0 : _ins4.d5;
                    ppa = (_element$notas8 = element.notas) === null || _element$notas8 === void 0 ? void 0 : _element$notas8.ppc;
                    ppb = (_element$notas9 = element.notas) === null || _element$notas9 === void 0 ? void 0 : _element$notas9.ppd;
                    sumAB = (_element$notas10 = element.notas) === null || _element$notas10 === void 0 ? void 0 : _element$notas10.sumCD;
                    sumAB80 = (_element$notas11 = element.notas) === null || _element$notas11 === void 0 ? void 0 : _element$notas11.sumCD80;
                    exa1 = (_element$notas12 = element.notas) === null || _element$notas12 === void 0 ? void 0 : _element$notas12.exa2;
                    sumAB20 = (_element$notas13 = element.notas) === null || _element$notas13 === void 0 ? void 0 : _element$notas13.sumCD20;
                    proAB = (_element$notas14 = element.notas) === null || _element$notas14 === void 0 ? void 0 : _element$notas14.proCD;
                    letras = promCuantitativoLetras(_ins4 === null || _ins4 === void 0 ? void 0 : _ins4.proCD);
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
            materia: (_materias$materia2 = materias.materia) === null || _materias$materia2 === void 0 ? void 0 : _materias$materia2.nombre,
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
        } else {
          var _materias$materia3, _materias$materia4, _materias$materia5, _materias$materia6, _materias$docente2;

          var _proPPA = [];
          var _proPPB = [];
          var _promAB = [];

          for (var _k = 0; _k < matriculas.length; _k++) {
            var _res = matriculas[_k];

            if (estudiantes.includes(_res.fkestudiante)) {
              var _res$estudiante2;

              var _computo = matriculas[_k].computo;
              var p1 = void 0,
                  p2 = '';
              var _letras3 = '';

              for (var _i = 0; _i < _computo.length; _i++) {
                var _element = _computo[_i];

                if (_element.fkmateria == materias.fkmaterias) {
                  if (quim == 'PRIMER QUIMESTRE') {
                    var _element$materia, _element$materia2;

                    var _ins5 = _element.cualitativo;
                    p1 = _ins5.p1;
                    p2 = _ins5.p2;
                    if (((_element$materia = _element.materia) === null || _element$materia === void 0 ? void 0 : _element$materia.nombre) == 'COMPORTAMIENTO' || ((_element$materia2 = _element.materia) === null || _element$materia2 === void 0 ? void 0 : _element$materia2.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras3 = calcularPromedioInsumosLetrasComportamiento(_ins5.p1, _ins5.p2);else _letras3 = calcularPromedioInsumosLetras(_ins5.p1, _ins5.p2);
                  }

                  if (quim == 'SEGUNDO QUIMESTRE') {
                    var _element$materia3, _element$materia4;

                    var _ins6 = _element.cualitativo;
                    p1 = _ins6.p3;
                    p2 = _ins6.p4;
                    if (((_element$materia3 = _element.materia) === null || _element$materia3 === void 0 ? void 0 : _element$materia3.nombre) == 'COMPORTAMIENTO' || ((_element$materia4 = _element.materia) === null || _element$materia4 === void 0 ? void 0 : _element$materia4.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras3 = calcularPromedioInsumosLetrasComportamiento(_ins6.p1, _ins6.p2);else _letras3 = calcularPromedioInsumosLetras(_ins6.p1, _ins6.p2);
                  }
                }
              }

              _proPPA.push(p1);

              _proPPB.push(p2);

              _promAB.push(_letras3);

              aux2.push({
                estudiante: (_res$estudiante2 = _res.estudiante) === null || _res$estudiante2 === void 0 ? void 0 : _res$estudiante2.fullname,
                letras: _letras3,
                p1: p1,
                p2: p2
              });
            }
          }

          var _medPPA = contarMediaLet(_proPPA, (_materias$materia3 = materias.materia) === null || _materias$materia3 === void 0 ? void 0 : _materias$materia3.nombre);

          var _medPPB = contarMediaLet(_proPPB, (_materias$materia4 = materias.materia) === null || _materias$materia4 === void 0 ? void 0 : _materias$materia4.nombre);

          var _medAB = contarMediaLet(_promAB, (_materias$materia5 = materias.materia) === null || _materias$materia5 === void 0 ? void 0 : _materias$materia5.nombre);

          help2.push({
            materia: (_materias$materia6 = materias.materia) === null || _materias$materia6 === void 0 ? void 0 : _materias$materia6.nombre,
            docente: (_materias$docente2 = materias.docente) === null || _materias$docente2 === void 0 ? void 0 : _materias$docente2.fullname,
            curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
            paralelo: paralelo,
            data: aux2,
            fechaA: fechaA,
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
  }

  function formatJuntasIndividual(rowM, rowD, estudiantes, quim, paralelo, keymateria) {
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
          var _materias$materia7;

          var aux = [];
          var aux2 = [];
          var materias = distributivo[j];

          if (((_materias$materia7 = materias.materia) === null || _materias$materia7 === void 0 ? void 0 : _materias$materia7.computo) == 2) {
            var _materias$materia8, _materias$docente3;

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
                      var _element$notas15, _element$notas16, _element$notas17, _element$notas18, _element$notas19, _element$notas20, _element$notas21;

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
                      ppa = (_element$notas15 = element.notas) === null || _element$notas15 === void 0 ? void 0 : _element$notas15.ppa;
                      ppb = (_element$notas16 = element.notas) === null || _element$notas16 === void 0 ? void 0 : _element$notas16.ppb;
                      sumAB = (_element$notas17 = element.notas) === null || _element$notas17 === void 0 ? void 0 : _element$notas17.sumAB;
                      sumAB80 = (_element$notas18 = element.notas) === null || _element$notas18 === void 0 ? void 0 : _element$notas18.sumAB80;
                      exa1 = (_element$notas19 = element.notas) === null || _element$notas19 === void 0 ? void 0 : _element$notas19.exa1;
                      sumAB20 = (_element$notas20 = element.notas) === null || _element$notas20 === void 0 ? void 0 : _element$notas20.sumAB20;
                      proAB = (_element$notas21 = element.notas) === null || _element$notas21 === void 0 ? void 0 : _element$notas21.proAB;
                      letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                    }

                    if (quim == 'SEGUNDO QUIMESTRE') {
                      var _element$notas22, _element$notas23, _element$notas24, _element$notas25, _element$notas26, _element$notas27, _element$notas28;

                      var _ins7 = element.notas;
                      n1 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.c1;
                      n2 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.c2;
                      n3 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.c3;
                      n4 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.c4;
                      n5 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.c5;
                      n6 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.d1;
                      n7 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.d2;
                      n8 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.d3;
                      n9 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.d4;
                      n10 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.d5;
                      ppa = (_element$notas22 = element.notas) === null || _element$notas22 === void 0 ? void 0 : _element$notas22.ppc;
                      ppb = (_element$notas23 = element.notas) === null || _element$notas23 === void 0 ? void 0 : _element$notas23.ppd;
                      sumAB = (_element$notas24 = element.notas) === null || _element$notas24 === void 0 ? void 0 : _element$notas24.sumCD;
                      sumAB80 = (_element$notas25 = element.notas) === null || _element$notas25 === void 0 ? void 0 : _element$notas25.sumCD80;
                      exa1 = (_element$notas26 = element.notas) === null || _element$notas26 === void 0 ? void 0 : _element$notas26.exa2;
                      sumAB20 = (_element$notas27 = element.notas) === null || _element$notas27 === void 0 ? void 0 : _element$notas27.sumCD20;
                      proAB = (_element$notas28 = element.notas) === null || _element$notas28 === void 0 ? void 0 : _element$notas28.proCD;
                      letras = promCuantitativoLetras(_ins7 === null || _ins7 === void 0 ? void 0 : _ins7.proCD);
                    }
                  }
                }

                proPPA.push(ppa);
                proPPB.push(ppb);
                promAB.push(proAB);
                aux.push({
                  estudiante: (_res$estudiante3 = res.estudiante) === null || _res$estudiante3 === void 0 ? void 0 : _res$estudiante3.fullname,
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
              materia: (_materias$materia8 = materias.materia) === null || _materias$materia8 === void 0 ? void 0 : _materias$materia8.nombre,
              docente: (_materias$docente3 = materias.docente) === null || _materias$docente3 === void 0 ? void 0 : _materias$docente3.fullname,
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
          } else {
            var _materias$materia9, _materias$materia10, _materias$materia11, _materias$materia12, _materias$docente4;

            var _proPPA2 = [];
            var _proPPB2 = [];
            var _promAB2 = [];

            for (var _k2 = 0; _k2 < matriculas.length; _k2++) {
              var _res2 = matriculas[_k2];

              if (estudiantes.includes(_res2.fkestudiante)) {
                var _res2$estudiante;

                var _computo2 = matriculas[_k2].computo;
                var p1 = void 0,
                    p2 = '';
                var _letras4 = '';

                for (var _i2 = 0; _i2 < _computo2.length; _i2++) {
                  var _element2 = _computo2[_i2];

                  if (_element2.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER QUIMESTRE') {
                      var _element2$materia, _element2$materia2;

                      var _ins8 = _element2.cualitativo;
                      p1 = _ins8.p1;
                      p2 = _ins8.p2;
                      if (((_element2$materia = _element2.materia) === null || _element2$materia === void 0 ? void 0 : _element2$materia.nombre) == 'COMPORTAMIENTO' || ((_element2$materia2 = _element2.materia) === null || _element2$materia2 === void 0 ? void 0 : _element2$materia2.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras4 = calcularPromedioInsumosLetrasComportamiento(_ins8.p1, _ins8.p2);else _letras4 = calcularPromedioInsumosLetras(_ins8.p1, _ins8.p2);
                    }

                    if (quim == 'SEGUNDO QUIMESTRE') {
                      var _element2$materia3, _element2$materia4;

                      var _ins9 = _element2.cualitativo;
                      p1 = _ins9.p3;
                      p2 = _ins9.p4;
                      if (((_element2$materia3 = _element2.materia) === null || _element2$materia3 === void 0 ? void 0 : _element2$materia3.nombre) == 'COMPORTAMIENTO' || ((_element2$materia4 = _element2.materia) === null || _element2$materia4 === void 0 ? void 0 : _element2$materia4.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras4 = calcularPromedioInsumosLetrasComportamiento(_ins9.p1, _ins9.p2);else _letras4 = calcularPromedioInsumosLetras(_ins9.p1, _ins9.p2);
                    }
                  }
                }

                _proPPA2.push(p1);

                _proPPB2.push(p2);

                _promAB2.push(_letras4);

                aux2.push({
                  estudiante: (_res2$estudiante = _res2.estudiante) === null || _res2$estudiante === void 0 ? void 0 : _res2$estudiante.fullname,
                  letras: _letras4,
                  p1: p1,
                  p2: p2
                });
              }
            }

            var _medPPA2 = contarMediaLet(_proPPA2, (_materias$materia9 = materias.materia) === null || _materias$materia9 === void 0 ? void 0 : _materias$materia9.nombre);

            var _medPPB2 = contarMediaLet(_proPPB2, (_materias$materia10 = materias.materia) === null || _materias$materia10 === void 0 ? void 0 : _materias$materia10.nombre);

            var _medAB2 = contarMediaLet(_promAB2, (_materias$materia11 = materias.materia) === null || _materias$materia11 === void 0 ? void 0 : _materias$materia11.nombre);

            help2.push({
              materia: (_materias$materia12 = materias.materia) === null || _materias$materia12 === void 0 ? void 0 : _materias$materia12.nombre,
              docente: (_materias$docente4 = materias.docente) === null || _materias$docente4 === void 0 ? void 0 : _materias$docente4.fullname,
              curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
              paralelo: paralelo,
              data: aux2,
              fechaA: fechaA,
              medPPA: _medPPA2,
              medPPB: _medPPB2,
              medAB: _medAB2,
              periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre
            });
          }
        }
      } //console.log('es',help)


      var arr = {
        help: help,
        help2: help2
      };
      return arr;
    } catch (error) {
      console.log(error);
    }
  }

  function formatJuntasFinal(rowM, rowD, estudiantes, quim, paralelo, keymateria) {
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
          var _materias$materia13, _materias$docente5;

          var aux = [];
          var materias = distributivo[j];
          var promAB = [];
          var promCD = [];
          var promF = [];

          for (var k = 0; k < matriculas.length; k++) {
            var res = matriculas[k];

            if (estudiantes.includes(res.fkestudiante)) {
              var _res$estudiante4;

              var computo = matriculas[k].computo;
              var proAB = void 0,
                  proCD = void 0,
                  suple = void 0,
                  final = void 0,
                  promedioFinal = void 0,
                  remedial = void 0,
                  gracia = '';

              for (var i = 0; i < computo.length; i++) {
                var element = computo[i];

                if (element.fkmateria == materias.fkmaterias) {
                  var _element$notas29, _element$notas30;

                  var _res3 = element.resultados;
                  proAB = (_element$notas29 = element.notas) === null || _element$notas29 === void 0 ? void 0 : _element$notas29.proAB;
                  proCD = (_element$notas30 = element.notas) === null || _element$notas30 === void 0 ? void 0 : _element$notas30.proCD;
                  suple = _res3 === null || _res3 === void 0 ? void 0 : _res3.supletorio;
                  final = _res3 === null || _res3 === void 0 ? void 0 : _res3.notaFinal;
                  promedioFinal = _res3 === null || _res3 === void 0 ? void 0 : _res3.promedioFinal;
                  remedial = _res3 === null || _res3 === void 0 ? void 0 : _res3.remedial;
                  gracia = _res3 === null || _res3 === void 0 ? void 0 : _res3.gracia;
                }
              }

              promAB.push(proAB);
              promCD.push(proCD);
              promF.push(final);
              aux.push({
                estudiante: (_res$estudiante4 = res.estudiante) === null || _res$estudiante4 === void 0 ? void 0 : _res$estudiante4.fullname,
                proAB: proAB,
                proCD: proCD,
                suple: suple,
                final: final,
                promedioFinal: promedioFinal,
                remedial: remedial,
                gracia: gracia
              });
            }
          }

          var medAB = calcMedia(promAB);
          var medCD = calcMedia(promCD);
          var medF = calcMedia(promF);
          var pPPA = calcProm(promAB);
          var pPPB = calcProm(promCD);
          var prAB = calcProm(promF); //console.log(mediaPPA)
          //console.log(distributivo)

          help.push({
            materia: (_materias$materia13 = materias.materia) === null || _materias$materia13 === void 0 ? void 0 : _materias$materia13.nombre,
            docente: (_materias$docente5 = materias.docente) === null || _materias$docente5 === void 0 ? void 0 : _materias$docente5.fullname,
            curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
            paralelo: paralelo,
            data: aux,
            fechaA: fechaA,
            medF: medF,
            medCD: medCD,
            medAB: medAB,
            periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre,
            pPPA: pPPA,
            pPPB: pPPB,
            prAB: prAB
          });
        }
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
        var aux2 = [];

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
            var _subelement$materia15;

            var subelement = distributivo[j];

            if (((_subelement$materia15 = subelement.materia) === null || _subelement$materia15 === void 0 ? void 0 : _subelement$materia15.computo) == 2) {
              var _subelement$materia16, _subelement$materia17;

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
                materia: (_subelement$materia16 = subelement.materia) === null || _subelement$materia16 === void 0 ? void 0 : _subelement$materia16.nombre,
                area: (_subelement$materia17 = subelement.materia) === null || _subelement$materia17 === void 0 ? void 0 : _subelement$materia17.area,
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
            } else {
              var _subelement$materia20;

              var p1 = void 0,
                  p2 = void 0,
                  p3 = void 0,
                  p4 = void 0,
                  _final = '';

              for (var _m3 = 0; _m3 < computo.length; _m3++) {
                var _result3 = computo[_m3];

                if (subelement.fkmaterias == _result3.fkmateria) {
                  var _subelement$materia18, _subelement$materia19;

                  var _ins10 = _result3.cualitativo;
                  p1 = _ins10.p1;
                  p2 = _ins10.p2;
                  if (((_subelement$materia18 = subelement.materia) === null || _subelement$materia18 === void 0 ? void 0 : _subelement$materia18.nombre) == 'COMPORTAMIENTO' || ((_subelement$materia19 = subelement.materia) === null || _subelement$materia19 === void 0 ? void 0 : _subelement$materia19.nombre) == 'DESARROLLO HUMANO INTEGRAL') _final = calcularPromedioInsumosLetrasComportamiento(_ins10.p1, _ins10.p2);else _final = calcularPromedioInsumosLetras(_ins10.p1, _ins10.p2);
                }
              }

              aux2.push({
                materia: (_subelement$materia20 = subelement.materia) === null || _subelement$materia20 === void 0 ? void 0 : _subelement$materia20.nombre,
                final: _final,
                p1: p1,
                p2: p2
              });
            }
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
            data2: aux2,
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

  function formatFinal(rowM, rowD, estudiantes) {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];
        var aux = [];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante5, _rowM$curso5, _rowM$periodo5;

          var computo = matriculas[i].computo;
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia21;

            var subelement = distributivo[j];

            if (((_subelement$materia21 = subelement.materia) === null || _subelement$materia21 === void 0 ? void 0 : _subelement$materia21.computo) == 2) {
              var _subelement$materia22;

              var proAB = void 0,
                  proCD = void 0,
                  suple = void 0,
                  final = void 0,
                  promedioFinal = void 0,
                  remedial = void 0,
                  gracia = void 0,
                  _letras5 = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var ins = result.notas;
                  var res = result.resultados;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                  gracia = res === null || res === void 0 ? void 0 : res.gracia;
                  suple = res === null || res === void 0 ? void 0 : res.supletorio;
                  remedial = res === null || res === void 0 ? void 0 : res.remedial;
                  final = res === null || res === void 0 ? void 0 : res.notaFinal;
                  promedioFinal = res === null || res === void 0 ? void 0 : res.promedioFinal;

                  if ((res === null || res === void 0 ? void 0 : res.supletorio) != '' || (res === null || res === void 0 ? void 0 : res.remedial) != '' || (res === null || res === void 0 ? void 0 : res.gracia) != '') {
                    if ((res === null || res === void 0 ? void 0 : res.supletorio) != '') final = res.supletorio;
                    if ((res === null || res === void 0 ? void 0 : res.remedial) != '') final = res.remedial;
                    if ((res === null || res === void 0 ? void 0 : res.gracia) != '') final = res.gracia;
                  } else final = res === null || res === void 0 ? void 0 : res.notaFinal;
                }
              }

              _letras5 = promCuantitativoLetras2(final);
              general3.push(final);
              aux.push({
                materia: (_subelement$materia22 = subelement.materia) === null || _subelement$materia22 === void 0 ? void 0 : _subelement$materia22.nombre,
                proAB: proAB,
                letras: _letras5,
                proCD: proCD,
                remedial: remedial,
                gracia: gracia,
                final: final,
                suple: suple,
                promedioFinal: promedioFinal
              });
            }
          }

          var pgeneral3 = calcProm(general3);
          var letras = trasformnumberToText(pgeneral3);
          help.push({
            nombre: (_element$estudiante5 = element.estudiante) === null || _element$estudiante5 === void 0 ? void 0 : _element$estudiante5.fullname,
            curso: (_rowM$curso5 = rowM.curso) === null || _rowM$curso5 === void 0 ? void 0 : _rowM$curso5.nombre,
            periodo: (_rowM$periodo5 = rowM.periodo) === null || _rowM$periodo5 === void 0 ? void 0 : _rowM$periodo5.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            pgeneral3: pgeneral3,
            fechaA: fechaA,
            nmatricula: element.nmatricula,
            letras: letras
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  function formatParcial(rowM, rowD, estudiantes, quim, paralelo) {
    try {
      var _rowM$curso6, _rowM$periodo6;

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
        var _element$estudiante6;

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
                if (quim.quimestre == 'PRIMER QUIMESTRE') {
                  if (quim.q1 == 'PRIMER PARCIAL') {
                    var _subarray$materia, _reg$notas, _reg$cualitativo;

                    if (((_subarray$materia = subarray.materia) === null || _subarray$materia === void 0 ? void 0 : _subarray$materia.computo) == 2) nota = (_reg$notas = reg.notas) === null || _reg$notas === void 0 ? void 0 : _reg$notas.ppa;else nota = (_reg$cualitativo = reg.cualitativo) === null || _reg$cualitativo === void 0 ? void 0 : _reg$cualitativo.p1;
                  }

                  if (quim.q1 == 'SEGUNDO PARCIAL') {
                    var _subarray$materia2, _reg$notas2, _reg$cualitativo2;

                    if (((_subarray$materia2 = subarray.materia) === null || _subarray$materia2 === void 0 ? void 0 : _subarray$materia2.computo) == 2) nota = (_reg$notas2 = reg.notas) === null || _reg$notas2 === void 0 ? void 0 : _reg$notas2.ppb;else nota = (_reg$cualitativo2 = reg.cualitativo) === null || _reg$cualitativo2 === void 0 ? void 0 : _reg$cualitativo2.p2;
                  }

                  if (quim.q1 == 'EXAMEN') {
                    var _reg$notas3;

                    nota = (_reg$notas3 = reg.notas) === null || _reg$notas3 === void 0 ? void 0 : _reg$notas3.exa1;
                  }
                }

                if (quim.quimestre == 'SEGUNDO QUIMESTRE') {
                  if (quim.q1 == 'PRIMER PARCIAL') {
                    var _subarray$materia3, _reg$notas4, _reg$cualitativo3;

                    if (((_subarray$materia3 = subarray.materia) === null || _subarray$materia3 === void 0 ? void 0 : _subarray$materia3.computo) == 2) nota = (_reg$notas4 = reg.notas) === null || _reg$notas4 === void 0 ? void 0 : _reg$notas4.ppc;else nota = (_reg$cualitativo3 = reg.cualitativo) === null || _reg$cualitativo3 === void 0 ? void 0 : _reg$cualitativo3.p3;
                  }

                  if (quim.q1 == 'SEGUNDO PARCIAL') {
                    var _subarray$materia4, _reg$notas5, _reg$cualitativo4;

                    if (((_subarray$materia4 = subarray.materia) === null || _subarray$materia4 === void 0 ? void 0 : _subarray$materia4.computo) == 2) nota = (_reg$notas5 = reg.notas) === null || _reg$notas5 === void 0 ? void 0 : _reg$notas5.ppd;else nota = (_reg$cualitativo4 = reg.cualitativo) === null || _reg$cualitativo4 === void 0 ? void 0 : _reg$cualitativo4.p4;
                  }

                  if (quim.q1 == 'EXAMEN') {
                    var _reg$notas6;

                    nota = (_reg$notas6 = reg.notas) === null || _reg$notas6 === void 0 ? void 0 : _reg$notas6.exa2;
                  }
                }
              }
            }

            notas.push(nota);
          }
        }

        var result = calcProm(notas);
        help.push({
          fullname: (_element$estudiante6 = element.estudiante) === null || _element$estudiante6 === void 0 ? void 0 : _element$estudiante6.fullname,
          data: notas,
          result: result
        });
      } //console.log('es',help)


      var promedios = calcPromMatriz(help, distributivo);
      return {
        help: help,
        distributivo: distributivo,
        promedios: promedios,
        curso: (_rowM$curso6 = rowM.curso) === null || _rowM$curso6 === void 0 ? void 0 : _rowM$curso6.nombre,
        periodo: (_rowM$periodo6 = rowM.periodo) === null || _rowM$periodo6 === void 0 ? void 0 : _rowM$periodo6.nombre
      };
    } catch (error) {
      console.log(error);
    }
  }

  function formatQuimestral(rowM, rowD, estudiantes, quim) {
    try {
      var _rowM$curso7, _rowM$periodo7;

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
        var _element$estudiante7;

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
                if (quim.quimestre == 'PRIMER QUIMESTRE') {
                  var _reg$notas7;

                  nota = (_reg$notas7 = reg.notas) === null || _reg$notas7 === void 0 ? void 0 : _reg$notas7.proAB;
                }

                if (quim.quimestre == 'SEGUNDO QUIMESTRE') {
                  var _reg$notas8;

                  nota = (_reg$notas8 = reg.notas) === null || _reg$notas8 === void 0 ? void 0 : _reg$notas8.proCD;
                }
              }
            }

            notas.push(nota);
          }
        }

        var result = calcProm(notas);
        help.push({
          fullname: (_element$estudiante7 = element.estudiante) === null || _element$estudiante7 === void 0 ? void 0 : _element$estudiante7.fullname,
          data: notas,
          result: result
        });
      } //console.log('es',help)


      var promedios = calcPromMatriz(help, distributivo);
      return {
        help: help,
        distributivo: distributivo,
        promedios: promedios,
        curso: (_rowM$curso7 = rowM.curso) === null || _rowM$curso7 === void 0 ? void 0 : _rowM$curso7.nombre,
        periodo: (_rowM$periodo7 = rowM.periodo) === null || _rowM$periodo7 === void 0 ? void 0 : _rowM$periodo7.nombre
      };
    } catch (error) {
      console.log(error);
    }
  }

  function consolidado(rowM, rowD, estudiantes, quim) {
    try {
      var _rowM$curso8, _rowM$periodo8;

      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var aux = [];
      var help = [];
      matriculas.sort(function (a, b) {
        var nameA = a.estudiante.fullname.toLowerCase(),
            nameB = b.estudiante.fullname.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      for (var i = 0; i < matriculas.length; i++) {
        var _matriculas$i;

        var computo = (_matriculas$i = matriculas[i]) === null || _matriculas$i === void 0 ? void 0 : _matriculas$i.computo;

        var _loop = function _loop(k) {
          var _computo$i;

          var reg = computo[k];
          if ((reg === null || reg === void 0 ? void 0 : reg.materia) == undefined) return "continue";
          aux.push(reg === null || reg === void 0 ? void 0 : reg.materia);
          var finds = aux.filter(x => x._id === reg.fkmateria);
          if (finds.length == 0) aux.push((_computo$i = computo[i]) === null || _computo$i === void 0 ? void 0 : _computo$i.materia);
        };

        for (var k = 0; k < computo.length; k++) {
          var _ret = _loop(k);

          if (_ret === "continue") continue;
        }
      }

      function getUniqueListBy(arr, key) {
        return [...new Map(arr.map(item => [item[key], item])).values()];
      }

      var distributivo = getUniqueListBy(aux, '_id');

      for (var _i3 = 0; _i3 < matriculas.length; _i3++) {
        var _element$estudiante8;

        var element = matriculas[_i3];
        var _computo3 = element.computo;
        var notas = [];

        if (estudiantes.includes(element.fkestudiante)) {
          for (var h = 0; h < distributivo.length; h++) {
            var subarray = distributivo[h];
            var nota = '';

            for (var _k3 = 0; _k3 < _computo3.length; _k3++) {
              var reg = _computo3[_k3];

              if (subarray._id == reg.fkmateria) {
                var _reg$resultados;

                nota = (_reg$resultados = reg.resultados) === null || _reg$resultados === void 0 ? void 0 : _reg$resultados.notaFinal;
              }
            }

            notas.push(nota);
          }
        }

        var result = calcProm(notas);
        help.push({
          fullname: (_element$estudiante8 = element.estudiante) === null || _element$estudiante8 === void 0 ? void 0 : _element$estudiante8.fullname,
          data: notas,
          result: result
        });
      } // console.log('es', distributivo)


      var promedios = calcPromMatriz(help, distributivo);
      return {
        help: help,
        distributivo: distributivo,
        promedios: promedios,
        curso: (_rowM$curso8 = rowM.curso) === null || _rowM$curso8 === void 0 ? void 0 : _rowM$curso8.nombre,
        periodo: (_rowM$periodo8 = rowM.periodo) === null || _rowM$periodo8 === void 0 ? void 0 : _rowM$periodo8.nombre
      };
    } catch (error) {
      console.log(error);
    }
  }

  function formatAnual(rowM, rowD, estudiantes) {
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
        var _materias$materia14, _materias$docente6;

        var aux = [];
        var materias = distributivo[j];
        var proPPA = [];
        var proPPB = [];
        var promAB = [];

        for (var k = 0; k < matriculas.length; k++) {
          var res = matriculas[k];

          if (estudiantes.includes(res.fkestudiante)) {
            var _res$estudiante5;

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
                var _element$notas31, _element$notas32, _element$notas33, _element$notas34, _element$notas35, _element$notas36, _element$notas37, _element$notas38, _element$notas39, _element$notas40, _element$notas41, _element$notas42, _element$notas43, _element$notas44, _element$resultados, _element$resultados2;

                ppa = (_element$notas31 = element.notas) === null || _element$notas31 === void 0 ? void 0 : _element$notas31.ppa;
                ppb = (_element$notas32 = element.notas) === null || _element$notas32 === void 0 ? void 0 : _element$notas32.ppb;
                sumAB = (_element$notas33 = element.notas) === null || _element$notas33 === void 0 ? void 0 : _element$notas33.sumAB;
                sumAB80 = (_element$notas34 = element.notas) === null || _element$notas34 === void 0 ? void 0 : _element$notas34.sumAB80;
                exa1 = (_element$notas35 = element.notas) === null || _element$notas35 === void 0 ? void 0 : _element$notas35.exa1;
                sumAB20 = (_element$notas36 = element.notas) === null || _element$notas36 === void 0 ? void 0 : _element$notas36.sumAB20;
                proAB = (_element$notas37 = element.notas) === null || _element$notas37 === void 0 ? void 0 : _element$notas37.proAB;
                ppc = (_element$notas38 = element.notas) === null || _element$notas38 === void 0 ? void 0 : _element$notas38.ppc;
                ppd = (_element$notas39 = element.notas) === null || _element$notas39 === void 0 ? void 0 : _element$notas39.ppd;
                sumCD = (_element$notas40 = element.notas) === null || _element$notas40 === void 0 ? void 0 : _element$notas40.sumCD;
                sumCD80 = (_element$notas41 = element.notas) === null || _element$notas41 === void 0 ? void 0 : _element$notas41.sumCD80;
                exa2 = (_element$notas42 = element.notas) === null || _element$notas42 === void 0 ? void 0 : _element$notas42.exa2;
                sumCD20 = (_element$notas43 = element.notas) === null || _element$notas43 === void 0 ? void 0 : _element$notas43.sumCD20;
                proCD = (_element$notas44 = element.notas) === null || _element$notas44 === void 0 ? void 0 : _element$notas44.proCD, suple = (_element$resultados = element.resultados) === null || _element$resultados === void 0 ? void 0 : _element$resultados.supletorio, final = (_element$resultados2 = element.resultados) === null || _element$resultados2 === void 0 ? void 0 : _element$resultados2.notaFinal;
              }
            }

            proPPA.push(ppa);
            proPPB.push(ppb);
            promAB.push(proAB);
            aux.push({
              estudiante: (_res$estudiante5 = res.estudiante) === null || _res$estudiante5 === void 0 ? void 0 : _res$estudiante5.fullname,
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
              suple: suple,
              final: final
            });
          }
        } //console.log(distributivo)


        help.push({
          materia: (_materias$materia14 = materias.materia) === null || _materias$materia14 === void 0 ? void 0 : _materias$materia14.nombre,
          docente: (_materias$docente6 = materias.docente) === null || _materias$docente6 === void 0 ? void 0 : _materias$docente6.fullname,
          curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
          paralelo: rowM === null || rowM === void 0 ? void 0 : rowM.paralelo,
          data: aux,
          fechaA: fechaA,
          periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre
        });
      } //console.log('es',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  }

  var formarNomina = array => {
    try {
      var a = [];
      var fechaA = fechaActual();

      for (var i = 0; i < array.length; i++) {
        var element = array[i].matriculas;
        if (element.length == 0) continue;
        var paralelo = array[i].paralelo;
        var curso = array[i].curso;
        var periodo = array[i].periodo;
        var subdata = [];

        for (var j = 0; j < element.length; j++) {
          var element2 = element[j].estudiante;
          var data = {
            fullname: element2.fullname,
            cedula: element2.cedula,
            nmatricula: element[j].nmatricula
          };
          subdata.push(data);
        }

        var ordenName = subdata.sort(function (a, b) {
          var nameA = a.fullname.toLowerCase(),
              nameB = b.fullname.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        var model = {
          curso: curso,
          periodo: periodo,
          paralelo: paralelo,
          data: ordenName,
          orden: curso.num,
          fechaA: fechaA
        };
        a.push(model);
      }

      var orden = a.sort((a, b) => parseFloat(a.orden) - parseFloat(b.orden));
      return orden;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    formatPromociones,
    formatMatricula,
    formatLibretas,
    formatJuntas,
    formatInforme,
    formatFinal,
    formatParcial,
    formatQuimestral,
    formatAnual,
    formarNomina,
    formatJuntasIndividual,
    formatJuntasFinal,
    consolidado
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

var calcPromMatriz = (arr, array) => {
  var notas = [];

  for (var j = 0; j < (array === null || array === void 0 ? void 0 : array.length); j++) {
    var contador = 0;
    var aux = 0;

    for (var k = 0; k < (arr === null || arr === void 0 ? void 0 : arr.length); k++) {
      var res = arr[k].data;

      for (var m = 0; m < res.length; m++) {
        var elemen = res[m];

        if (m == j) {
          if (elemen == '') continue;
          if (isNaN(elemen)) continue;
          if (elemen == undefined) continue;
          if (elemen == null) continue;
          contador = contador + parseFloat(elemen);
          aux += 1;
        }
      }
    }

    var prom = 0;
    if (aux != 0) prom = (contador / aux).toFixed(2);
    notas.push(prom);
  }

  return notas;
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

function contarMediaLet(array, materia) {
  if (materia == 'COMPORTAMIENTO') {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var reg = [];

    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      var op = element;
      if (op == 'A' || op == 'A Muy Satisfactorio') a += 1;
      if (op == 'B' || op == 'B Satisfactorio') b += 1;
      if (op == 'C' || op == 'C Poco Satisfactorio') c += 1;
      if (op == 'D' || op == 'D Mejorable') d += 1;
      if (op == 'E' || op == 'E Insatisfactorio') e += 1;
    }

    reg.push(a, b, c, d, e);
    return reg;
  } else {
    var _a = 0;
    var _b = 0;
    var _c = 0;
    var _d = 0;
    var _reg = [];

    for (var _i4 = 0; _i4 < array.length; _i4++) {
      var _element3 = array[_i4];
      var _op = _element3;
      if (_op == 'EX' || _op == 'EX Excelente') _a += 1;
      if (_op == 'MB' || _op == 'MB Muy Buena') _b += 1;
      if (_op == 'B' || _op == 'B Buena') _c += 1;
      if (_op == 'R' || _op == 'R Regular') _d += 1;
    }

    _reg.push(_a, _b, _c, _d);

    return _reg;
  }
}

var calcularPryectos = (prmd, nombre) => {
  var letra = '';

  if (nombre == 'DESARROLLO HUMANO INTEGRAL' || nombre == 'COMPORTAMIENTO') {
    switch (prmd) {
      case 'A':
        letra = 'Muy Satisfactorio';
        break;

      case 'B':
        letra = 'Satisfactorio';
        break;

      case 'C':
        letra = 'Poco Satisfactorio';
        break;

      case 'D':
        letra = 'Mejorable';
        break;

      case 'e':
        letra = 'Insatisfactorio';
        break;

      default:
        letra = 'Sin Confirmar';
        break;
    }
  } else {
    switch (prmd) {
      case 'EX':
        letra = 'Excelente';
        break;

      case 'MB':
        letra = 'Muy Buena';
        break;

      case 'B':
        letra = 'Buena';
        break;

      case 'R':
        letra = 'Regular';
        break;

      default:
        letra = 'E';
        break;
    }
  }

  return letra;
};

function calcularPromedioInsumosLetrasComportamiento(p1, p2) {
  var aux = 0;
  var aux2 = 0;

  switch (p1) {
    case "A":
      aux = 5;
      break;

    case "B":
      aux = 4;
      break;

    case "C":
      aux = 3;
      break;

    case "D":
      aux = 2;
      break;

    case "E":
      aux = 1;
      break;

    default:
      break;
  }

  switch (p2) {
    case "A":
      aux2 = 5;
      break;

    case "B":
      aux2 = 4;
      break;

    case "C":
      aux2 = 3;
      break;

    case "D":
      aux2 = 2;
      break;

    case "E":
      aux2 = 1;
      break;

    default:
      break;
  }

  var result = parseInt((aux + aux2) / 2);
  var letra = '';

  switch (result) {
    case 5:
      letra = 'A Muy Satisfactorio';
      break;

    case 4:
      letra = 'B Satisfactorio';
      break;

    case 3:
      letra = 'C Poco Satisfactorio';
      break;

    case 2:
      letra = 'D Mejorable';
      break;

    case 1:
      letra = 'E Insatisfactorio';
      break;

    default:
      break;
  }

  return letra;
}

function calcularPromedioInsumosLetras(p1, p2) {
  var aux = 0;
  var aux2 = 0;

  switch (p1) {
    case "EX":
      aux = 5;
      break;

    case "MB":
      aux = 4;
      break;

    case "B":
      aux = 3;
      break;

    case "R":
      aux = 2;
      break;

    default:
      break;
  }

  switch (p2) {
    case "EX":
      aux2 = 5;
      break;

    case "MB":
      aux2 = 4;
      break;

    case "B":
      aux2 = 3;
      break;

    case "R":
      aux2 = 2;
      break;

    default:
      break;
  }

  var result = parseInt((aux + aux2) / 2);
  var letra = '';

  switch (result) {
    case 5:
      letra = 'EX Excelente';
      break;

    case 4:
      letra = 'MB Muy Buena';
      break;

    case 3:
      letra = 'B Buena';
      break;

    case 2:
      letra = 'R Regular';
      break;

    default:
      break;
  }

  return letra;
}

function promCuantitativoLetras2(prom) {
  var num = parseFloat(prom);
  var result = '';

  if (num >= 9 && num <= 10) {
    result = 'Domina Aprendizaje';
  } else if (num >= 7 && num <= 8.99) {
    result = 'Alcanza Aprendizaje';
  } else if (num >= 4.01 && num <= 6.99) {
    result = 'Próximo Alcanzar';
  } else {
    result = 'No Alcanza';
  }

  return result;
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