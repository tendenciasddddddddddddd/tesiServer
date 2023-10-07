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

  function formatMatricula(rowM, estudiantes) {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var fechaA = fechaActual();
      var help = [];

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var element = matriculas[i];

        if (estudiantes.includes(element.fkestudiante)) {
          var _element$estudiante, _rowM$curso, _rowM$periodo;

          help.push({
            nombre: (_element$estudiante = element.estudiante) === null || _element$estudiante === void 0 ? void 0 : _element$estudiante.fullname,
            curso: (_rowM$curso = rowM.curso) === null || _rowM$curso === void 0 ? void 0 : _rowM$curso.nombre,
            periodo: (_rowM$periodo = rowM.periodo) === null || _rowM$periodo === void 0 ? void 0 : _rowM$periodo.nombre,
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
          var _element$estudiante2, _rowM$curso2, _rowM$periodo2;

          var computo = matriculas[i].computo;
          var promPPA = [];
          var promPPB = [];
          var general = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia;

            var subelement = distributivo[j];

            if (((_subelement$materia = subelement.materia) === null || _subelement$materia === void 0 ? void 0 : _subelement$materia.computo) == 2) {
              var _subelement$materia2, _subelement$materia3;

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
                    letras = promCuantitativoLetras(_ins2 === null || _ins2 === void 0 ? void 0 : _ins2.proEF);
                  }
                }
              }

              promPPA.push(ppa);
              promPPB.push(ppb);
              general.push(proAB);
              aux.push({
                materia: (_subelement$materia2 = subelement.materia) === null || _subelement$materia2 === void 0 ? void 0 : _subelement$materia2.nombre,
                area: (_subelement$materia3 = subelement.materia) === null || _subelement$materia3 === void 0 ? void 0 : _subelement$materia3.area,
                n1: n1,
                n2: n2,
                n3: n3,
                n4: n4,
                n6: n6,
                n7: n7,
                n8: n8,
                n9: n9,
                pry1: pry1,
                ppa: ppa,
                ppb: ppb,
                sumAB: sumAB,
                sumAB90: sumAB90,
                exa1: exa1,
                sumAB10: sumAB10,
                proAB: proAB,
                letras: letras
              });
            } else {
              var _subelement$materia10;

              var p1 = void 0,
                  p2 = '';
              var _letras = '';

              for (var _m = 0; _m < computo.length; _m++) {
                var _result = computo[_m];

                if (subelement.fkmaterias == _result.fkmateria) {
                  if (quim == 'PRIMER TRIMESTRE') {
                    var _subelement$materia4, _subelement$materia5;

                    var _ins3 = _result.cualitativo;
                    p1 = _ins3.p1;
                    p2 = _ins3.p2;
                    if (((_subelement$materia4 = subelement.materia) === null || _subelement$materia4 === void 0 ? void 0 : _subelement$materia4.nombre) == 'COMPORTAMIENTO' || ((_subelement$materia5 = subelement.materia) === null || _subelement$materia5 === void 0 ? void 0 : _subelement$materia5.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins3.p1);else _letras = calcularPromedioInsumosLetras(_ins3.p1, _ins3.p2);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _subelement$materia6, _subelement$materia7;

                    var _ins4 = _result.cualitativo;
                    p1 = _ins4.p3;
                    p2 = _ins4.p4;
                    if (((_subelement$materia6 = subelement.materia) === null || _subelement$materia6 === void 0 ? void 0 : _subelement$materia6.nombre) == 'COMPORTAMIENTO' || ((_subelement$materia7 = subelement.materia) === null || _subelement$materia7 === void 0 ? void 0 : _subelement$materia7.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins4.p2);else _letras = calcularPromedioInsumosLetras(_ins4.p3, _ins4.p4);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _subelement$materia8, _subelement$materia9;

                    var _ins5 = _result.cualitativo;
                    p1 = _ins5.p3;
                    p2 = _ins5.p4;
                    if (((_subelement$materia8 = subelement.materia) === null || _subelement$materia8 === void 0 ? void 0 : _subelement$materia8.nombre) == 'COMPORTAMIENTO' || ((_subelement$materia9 = subelement.materia) === null || _subelement$materia9 === void 0 ? void 0 : _subelement$materia9.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins5.p3);else _letras = calcularPromedioInsumosLetras(_ins5.p5, _ins5.p6);
                  }
                }
              }

              aux2.push({
                materia: (_subelement$materia10 = subelement.materia) === null || _subelement$materia10 === void 0 ? void 0 : _subelement$materia10.nombre,
                letras: _letras,
                p1: p1,
                p2: p2
              });
            }
          }

          var pPPA = calcProm(promPPA);
          var pPPB = calcProm(promPPB);
          var pgeneral = calcProm(general);
          help.push({
            nombre: (_element$estudiante2 = element.estudiante) === null || _element$estudiante2 === void 0 ? void 0 : _element$estudiante2.fullname,
            curso: (_rowM$curso2 = rowM.curso) === null || _rowM$curso2 === void 0 ? void 0 : _rowM$curso2.nombre,
            periodo: (_rowM$periodo2 = rowM.periodo) === null || _rowM$periodo2 === void 0 ? void 0 : _rowM$periodo2.nombre,
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
        var _materias$materia, _materias$materia2;

        var aux = [];
        var aux2 = [];
        var materias = distributivo[j];

        if (((_materias$materia = materias.materia) === null || _materias$materia === void 0 ? void 0 : _materias$materia.nombre) != 'COMPORTAMIENTO' || ((_materias$materia2 = materias.materia) === null || _materias$materia2 === void 0 ? void 0 : _materias$materia2.nombre) != 'DESARROLLO HUMANO INTEGRAL') {
          var _materias$materia3, _materias$materia4, _materias$docente;

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
                    var _element$notas, _element$notas2, _element$notas3, _element$notas4, _element$notas5, _element$notas6, _element$notas7, _element$notas8;

                    var ins = element.notas;
                    n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                    n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                    n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                    n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                    n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                    n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                    n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                    n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                    ppa = (_element$notas = element.notas) === null || _element$notas === void 0 ? void 0 : _element$notas.ppa;
                    ppb = (_element$notas2 = element.notas) === null || _element$notas2 === void 0 ? void 0 : _element$notas2.ppb;
                    sumAB = (_element$notas3 = element.notas) === null || _element$notas3 === void 0 ? void 0 : _element$notas3.sumAB;
                    sumAB90 = (_element$notas4 = element.notas) === null || _element$notas4 === void 0 ? void 0 : _element$notas4.sumAB90;
                    exa1 = (_element$notas5 = element.notas) === null || _element$notas5 === void 0 ? void 0 : _element$notas5.exa1;
                    pry1 = (_element$notas6 = element.notas) === null || _element$notas6 === void 0 ? void 0 : _element$notas6.pry1;
                    sumAB10 = (_element$notas7 = element.notas) === null || _element$notas7 === void 0 ? void 0 : _element$notas7.sumAB10;
                    proAB = (_element$notas8 = element.notas) === null || _element$notas8 === void 0 ? void 0 : _element$notas8.proAB;
                    letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                    letras2 = promCuantitativoLetrasDos(ins === null || ins === void 0 ? void 0 : ins.proAB);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _element$notas9, _element$notas10, _element$notas11, _element$notas12, _element$notas13, _element$notas14, _element$notas15, _element$notas16;

                    var _ins6 = element.notas;
                    n1 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c1;
                    n2 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c2;
                    n3 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c3;
                    n4 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c4;
                    n6 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d1;
                    n7 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d2;
                    n8 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d3;
                    n9 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d4;
                    ppa = (_element$notas9 = element.notas) === null || _element$notas9 === void 0 ? void 0 : _element$notas9.ppc;
                    ppb = (_element$notas10 = element.notas) === null || _element$notas10 === void 0 ? void 0 : _element$notas10.ppd;
                    sumAB = (_element$notas11 = element.notas) === null || _element$notas11 === void 0 ? void 0 : _element$notas11.sumCD;
                    sumAB90 = (_element$notas12 = element.notas) === null || _element$notas12 === void 0 ? void 0 : _element$notas12.sumCD90;
                    exa1 = (_element$notas13 = element.notas) === null || _element$notas13 === void 0 ? void 0 : _element$notas13.exa2;
                    pry1 = (_element$notas14 = element.notas) === null || _element$notas14 === void 0 ? void 0 : _element$notas14.pry2;
                    sumAB10 = (_element$notas15 = element.notas) === null || _element$notas15 === void 0 ? void 0 : _element$notas15.sumCD10;
                    proAB = (_element$notas16 = element.notas) === null || _element$notas16 === void 0 ? void 0 : _element$notas16.proCD;
                    letras = promCuantitativoLetras(_ins6 === null || _ins6 === void 0 ? void 0 : _ins6.proCD);
                    letras2 = promCuantitativoLetrasDos(_ins6 === null || _ins6 === void 0 ? void 0 : _ins6.proCD);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _element$notas17, _element$notas18, _element$notas19, _element$notas20, _element$notas21, _element$notas22, _element$notas23, _element$notas24;

                    var _ins7 = element.notas;
                    n1 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e1;
                    n2 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e2;
                    n3 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e3;
                    n4 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e4;
                    n6 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f1;
                    n7 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f2;
                    n8 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f3;
                    n9 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f4;
                    ppa = (_element$notas17 = element.notas) === null || _element$notas17 === void 0 ? void 0 : _element$notas17.ppe;
                    ppb = (_element$notas18 = element.notas) === null || _element$notas18 === void 0 ? void 0 : _element$notas18.ppf;
                    sumAB = (_element$notas19 = element.notas) === null || _element$notas19 === void 0 ? void 0 : _element$notas19.sumEF;
                    sumAB90 = (_element$notas20 = element.notas) === null || _element$notas20 === void 0 ? void 0 : _element$notas20.sumEF90;
                    exa1 = (_element$notas21 = element.notas) === null || _element$notas21 === void 0 ? void 0 : _element$notas21.exa3;
                    pry1 = (_element$notas22 = element.notas) === null || _element$notas22 === void 0 ? void 0 : _element$notas22.pry3;
                    sumAB10 = (_element$notas23 = element.notas) === null || _element$notas23 === void 0 ? void 0 : _element$notas23.sumEF10;
                    proAB = (_element$notas24 = element.notas) === null || _element$notas24 === void 0 ? void 0 : _element$notas24.proEF;
                    letras = promCuantitativoLetras(_ins7 === null || _ins7 === void 0 ? void 0 : _ins7.proEF);
                    letras2 = promCuantitativoLetrasDos(_ins7 === null || _ins7 === void 0 ? void 0 : _ins7.proEF);
                  }
                }
              }

              proPPA.push(ppa);
              proPPB.push(ppb);
              promAB.push(proAB);
              aux.push({
                estudiante: (_res$estudiante = res.estudiante) === null || _res$estudiante === void 0 ? void 0 : _res$estudiante.fullname,
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
            materia: (_materias$materia3 = materias.materia) === null || _materias$materia3 === void 0 ? void 0 : _materias$materia3.nombre,
            computo: (_materias$materia4 = materias.materia) === null || _materias$materia4 === void 0 ? void 0 : _materias$materia4.computo,
            docente: (_materias$docente = materias.docente) === null || _materias$docente === void 0 ? void 0 : _materias$docente.fullname,
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
          var _materias$materia5, _materias$materia6, _materias$materia7, _materias$materia8, _materias$docente2;

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
              var _letras2 = '';

              for (var _i = 0; _i < _computo.length; _i++) {
                var _element = _computo[_i];

                if (_element.fkmateria == materias.fkmaterias) {
                  if (quim == 'PRIMER TRIMESTRE') {
                    var _element$materia, _element$materia2;

                    var _ins8 = _element.cualitativo;
                    p1 = _ins8.p1;
                    p2 = _ins8.p2;
                    if (((_element$materia = _element.materia) === null || _element$materia === void 0 ? void 0 : _element$materia.nombre) == 'COMPORTAMIENTO' || ((_element$materia2 = _element.materia) === null || _element$materia2 === void 0 ? void 0 : _element$materia2.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins8.p1);else _letras2 = calcularPromedioInsumosLetras(_ins8.p1, _ins8.p2);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _element$materia3, _element$materia4;

                    var _ins9 = _element.cualitativo;
                    p1 = _ins9.p3;
                    p2 = _ins9.p4;
                    if (((_element$materia3 = _element.materia) === null || _element$materia3 === void 0 ? void 0 : _element$materia3.nombre) == 'COMPORTAMIENTO' || ((_element$materia4 = _element.materia) === null || _element$materia4 === void 0 ? void 0 : _element$materia4.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins9.p2);else _letras2 = calcularPromedioInsumosLetras(_ins9.p3, _ins9.p4);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _element$materia5, _element$materia6;

                    var _ins10 = _element.cualitativo;
                    p1 = _ins10.p5;
                    p2 = _ins10.p6;
                    if (((_element$materia5 = _element.materia) === null || _element$materia5 === void 0 ? void 0 : _element$materia5.nombre) == 'COMPORTAMIENTO' || ((_element$materia6 = _element.materia) === null || _element$materia6 === void 0 ? void 0 : _element$materia6.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins10.p3);else _letras2 = calcularPromedioInsumosLetras(_ins10.p5, _ins10.p6);
                  }
                }
              }

              _proPPA.push(p1);

              _proPPB.push(p2);

              _promAB.push(_letras2);

              aux2.push({
                estudiante: (_res$estudiante2 = _res.estudiante) === null || _res$estudiante2 === void 0 ? void 0 : _res$estudiante2.fullname,
                letras: _letras2,
                p1: p1,
                p2: p2
              });
            }
          }

          var _medPPA = contarMediaLet(_proPPA, (_materias$materia5 = materias.materia) === null || _materias$materia5 === void 0 ? void 0 : _materias$materia5.nombre);

          var _medPPB = contarMediaLet(_proPPB, (_materias$materia6 = materias.materia) === null || _materias$materia6 === void 0 ? void 0 : _materias$materia6.nombre);

          var _medAB = contarMediaLet(_promAB, (_materias$materia7 = materias.materia) === null || _materias$materia7 === void 0 ? void 0 : _materias$materia7.nombre);

          help2.push({
            materia: (_materias$materia8 = materias.materia) === null || _materias$materia8 === void 0 ? void 0 : _materias$materia8.nombre,
            docente: (_materias$docente2 = materias.docente) === null || _materias$docente2 === void 0 ? void 0 : _materias$docente2.fullname,
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
          var _materias$materia9, _materias$materia10;

          var aux = [];
          var aux2 = [];
          var materias = distributivo[j];

          if (((_materias$materia9 = materias.materia) === null || _materias$materia9 === void 0 ? void 0 : _materias$materia9.nombre) != 'COMPORTAMIENTO' || ((_materias$materia10 = materias.materia) === null || _materias$materia10 === void 0 ? void 0 : _materias$materia10.nombre) != 'DESARROLLO HUMANO INTEGRAL') {
            var _materias$materia11, _materias$materia12, _materias$docente3;

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
                var letras = '';
                var letras2 = '';

                for (var i = 0; i < computo.length; i++) {
                  var element = computo[i];

                  if (element.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER TRIMESTRE') {
                      var _element$notas25, _element$notas26, _element$notas27, _element$notas28, _element$notas29, _element$notas30, _element$notas31, _element$notas32;

                      var ins = element.notas;
                      n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                      n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                      n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                      n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                      n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                      n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                      n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                      n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                      ppa = (_element$notas25 = element.notas) === null || _element$notas25 === void 0 ? void 0 : _element$notas25.ppa;
                      ppb = (_element$notas26 = element.notas) === null || _element$notas26 === void 0 ? void 0 : _element$notas26.ppb;
                      sumAB = (_element$notas27 = element.notas) === null || _element$notas27 === void 0 ? void 0 : _element$notas27.sumAB;
                      sumAB90 = (_element$notas28 = element.notas) === null || _element$notas28 === void 0 ? void 0 : _element$notas28.sumAB90;
                      exa1 = (_element$notas29 = element.notas) === null || _element$notas29 === void 0 ? void 0 : _element$notas29.exa1;
                      pry1 = (_element$notas30 = element.notas) === null || _element$notas30 === void 0 ? void 0 : _element$notas30.pry1;
                      sumAB10 = (_element$notas31 = element.notas) === null || _element$notas31 === void 0 ? void 0 : _element$notas31.sumAB10;
                      proAB = (_element$notas32 = element.notas) === null || _element$notas32 === void 0 ? void 0 : _element$notas32.proAB;
                      letras = promCuantitativoLetras(ins === null || ins === void 0 ? void 0 : ins.proAB);
                      letras2 = promCuantitativoLetrasDos(ins === null || ins === void 0 ? void 0 : ins.proAB);
                    }

                    if (quim == 'SEGUNDO TRIMESTRE') {
                      var _element$notas33, _element$notas34, _element$notas35, _element$notas36, _element$notas37, _element$notas38, _element$notas39, _element$notas40;

                      var _ins11 = element.notas;
                      n1 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c1;
                      n2 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c2;
                      n3 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c3;
                      n4 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c4;
                      n6 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d1;
                      n7 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d2;
                      n8 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d3;
                      n9 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d4;
                      ppa = (_element$notas33 = element.notas) === null || _element$notas33 === void 0 ? void 0 : _element$notas33.ppc;
                      ppb = (_element$notas34 = element.notas) === null || _element$notas34 === void 0 ? void 0 : _element$notas34.ppd;
                      sumAB = (_element$notas35 = element.notas) === null || _element$notas35 === void 0 ? void 0 : _element$notas35.sumCD;
                      sumAB90 = (_element$notas36 = element.notas) === null || _element$notas36 === void 0 ? void 0 : _element$notas36.sumCD90;
                      exa1 = (_element$notas37 = element.notas) === null || _element$notas37 === void 0 ? void 0 : _element$notas37.exa2;
                      pry1 = (_element$notas38 = element.notas) === null || _element$notas38 === void 0 ? void 0 : _element$notas38.pry2;
                      sumAB10 = (_element$notas39 = element.notas) === null || _element$notas39 === void 0 ? void 0 : _element$notas39.sumCD10;
                      proAB = (_element$notas40 = element.notas) === null || _element$notas40 === void 0 ? void 0 : _element$notas40.proCD;
                      letras = promCuantitativoLetras(_ins11 === null || _ins11 === void 0 ? void 0 : _ins11.proCD);
                      letras2 = promCuantitativoLetrasDos(_ins11 === null || _ins11 === void 0 ? void 0 : _ins11.proCD);
                    }

                    if (quim == 'TERCER TRIMESTRE') {
                      var _element$notas41, _element$notas42, _element$notas43, _element$notas44, _element$notas45, _element$notas46, _element$notas47, _element$notas48;

                      var _ins12 = element.notas;
                      n1 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e1;
                      n2 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e2;
                      n3 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e3;
                      n4 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e4;
                      n6 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f1;
                      n7 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f2;
                      n8 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f3;
                      n9 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f4;
                      ppa = (_element$notas41 = element.notas) === null || _element$notas41 === void 0 ? void 0 : _element$notas41.ppe;
                      ppb = (_element$notas42 = element.notas) === null || _element$notas42 === void 0 ? void 0 : _element$notas42.ppf;
                      sumAB = (_element$notas43 = element.notas) === null || _element$notas43 === void 0 ? void 0 : _element$notas43.sumEF;
                      sumAB90 = (_element$notas44 = element.notas) === null || _element$notas44 === void 0 ? void 0 : _element$notas44.sumEF90;
                      exa1 = (_element$notas45 = element.notas) === null || _element$notas45 === void 0 ? void 0 : _element$notas45.exa3;
                      pry1 = (_element$notas46 = element.notas) === null || _element$notas46 === void 0 ? void 0 : _element$notas46.pry3;
                      sumAB10 = (_element$notas47 = element.notas) === null || _element$notas47 === void 0 ? void 0 : _element$notas47.sumEF10;
                      proAB = (_element$notas48 = element.notas) === null || _element$notas48 === void 0 ? void 0 : _element$notas48.proEF;
                      letras = promCuantitativoLetras(_ins12 === null || _ins12 === void 0 ? void 0 : _ins12.proEF);
                      letras2 = promCuantitativoLetrasDos(_ins12 === null || _ins12 === void 0 ? void 0 : _ins12.proEF);
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
            var prAB = calcProm(promAB);
            var lettras = promCuantitativoLetrasDos(prAB);
            help.push({
              materia: (_materias$materia11 = materias.materia) === null || _materias$materia11 === void 0 ? void 0 : _materias$materia11.nombre,
              computo: (_materias$materia12 = materias.materia) === null || _materias$materia12 === void 0 ? void 0 : _materias$materia12.computo,
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
              prAB,
              lettras
            });
          } else {
            var _materias$materia13, _materias$materia14, _materias$materia15, _materias$materia16, _materias$docente4;

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
                var _letras3 = '';

                for (var _i2 = 0; _i2 < _computo2.length; _i2++) {
                  var _element2 = _computo2[_i2];

                  if (_element2.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER TRIMESTRE') {
                      var _element2$materia, _element2$materia2;

                      var _ins13 = _element2.cualitativo;
                      p1 = _ins13.p1;
                      p2 = _ins13.p2;
                      if (((_element2$materia = _element2.materia) === null || _element2$materia === void 0 ? void 0 : _element2$materia.nombre) == 'COMPORTAMIENTO' || ((_element2$materia2 = _element2.materia) === null || _element2$materia2 === void 0 ? void 0 : _element2$materia2.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras3 = calcularPromedioInsumosLetrasComportamiento(_ins13.p1);else _letras3 = calcularPromedioInsumosLetras(_ins13.p1, _ins13.p2);
                    }

                    if (quim == 'SEGUNDO TRIMESTRE') {
                      var _element2$materia3, _element2$materia4;

                      var _ins14 = _element2.cualitativo;
                      p1 = _ins14.p3;
                      p2 = _ins14.p4;
                      if (((_element2$materia3 = _element2.materia) === null || _element2$materia3 === void 0 ? void 0 : _element2$materia3.nombre) == 'COMPORTAMIENTO' || ((_element2$materia4 = _element2.materia) === null || _element2$materia4 === void 0 ? void 0 : _element2$materia4.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras3 = calcularPromedioInsumosLetrasComportamiento(_ins14.p2);else _letras3 = calcularPromedioInsumosLetras(_ins14.p1, _ins14.p2);
                    }

                    if (quim == 'TERCER TRIMESTRE') {
                      var _element2$materia5, _element2$materia6;

                      var _ins15 = _element2.cualitativo;
                      p1 = _ins15.p5;
                      p2 = _ins15.p6;
                      if (((_element2$materia5 = _element2.materia) === null || _element2$materia5 === void 0 ? void 0 : _element2$materia5.nombre) == 'COMPORTAMIENTO' || ((_element2$materia6 = _element2.materia) === null || _element2$materia6 === void 0 ? void 0 : _element2$materia6.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras3 = calcularPromedioInsumosLetrasComportamiento(_ins15.p3);else _letras3 = calcularPromedioInsumosLetras(_ins15.p1, _ins15.p2);
                    }
                  }
                }

                _proPPA2.push(p1);

                _proPPB2.push(p2);

                _promAB2.push(_letras3);

                aux2.push({
                  estudiante: (_res2$estudiante = _res2.estudiante) === null || _res2$estudiante === void 0 ? void 0 : _res2$estudiante.fullname,
                  letras: _letras3,
                  p1,
                  p2
                });
              }
            }

            var _medPPA2 = contarMediaLet(_proPPA2, (_materias$materia13 = materias.materia) === null || _materias$materia13 === void 0 ? void 0 : _materias$materia13.nombre);

            var _medPPB2 = contarMediaLet(_proPPB2, (_materias$materia14 = materias.materia) === null || _materias$materia14 === void 0 ? void 0 : _materias$materia14.nombre);

            var _medAB2 = contarMediaLet(_promAB2, (_materias$materia15 = materias.materia) === null || _materias$materia15 === void 0 ? void 0 : _materias$materia15.nombre);

            help2.push({
              materia: (_materias$materia16 = materias.materia) === null || _materias$materia16 === void 0 ? void 0 : _materias$materia16.nombre,
              docente: (_materias$docente4 = materias.docente) === null || _materias$docente4 === void 0 ? void 0 : _materias$docente4.fullname,
              curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
              paralelo,
              data: aux2,
              fechaA: fechaA,
              medPPA: _medPPA2,
              medPPB: _medPPB2,
              medAB: _medAB2,
              periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre
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
          var _materias$materia17, _materias$docente5;

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
                  var _element$notas49, _element$notas50;

                  var _res3 = element.resultados;
                  proAB = (_element$notas49 = element.notas) === null || _element$notas49 === void 0 ? void 0 : _element$notas49.proAB;
                  proCD = (_element$notas50 = element.notas) === null || _element$notas50 === void 0 ? void 0 : _element$notas50.proCD;
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
            materia: (_materias$materia17 = materias.materia) === null || _materias$materia17 === void 0 ? void 0 : _materias$materia17.nombre,
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
          var _element$estudiante3, _rowM$curso3, _rowM$periodo3;

          var computo = matriculas[i].computo;
          var promPPA = [];
          var promPPB = [];
          var promAB = [];
          var general = [];
          var promPPC = [];
          var promPPD = [];
          var promCD = [];
          var general2 = [];
          var promPPE = [];
          var promPPF = [];
          var promEF = [];
          var general33 = [];
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia11;

            var subelement = distributivo[j];

            if (((_subelement$materia11 = subelement.materia) === null || _subelement$materia11 === void 0 ? void 0 : _subelement$materia11.computo) == 2) {
              var _subelement$materia12, _subelement$computo, _subelement$materia13;

              var ppa = void 0,
                  ppb = void 0,
                  sumAB = void 0,
                  sumAB90 = void 0,
                  exa1 = void 0,
                  sumAB10 = void 0,
                  proAB = void 0,
                  ppc = void 0,
                  ppd = void 0,
                  sumCD = void 0,
                  sumCD90 = void 0,
                  exa2 = void 0,
                  sumCD10 = void 0,
                  proCD = void 0,
                  suple = void 0,
                  final = void 0,
                  ppf = void 0,
                  ppe = void 0,
                  sumEF = void 0,
                  sumEF90 = void 0,
                  exa3 = void 0,
                  sumEF10 = void 0,
                  proEF = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var ins = result.notas;
                  var res = result.resultados;
                  ppa = ins === null || ins === void 0 ? void 0 : ins.ppa;
                  ppb = ins === null || ins === void 0 ? void 0 : ins.ppb;
                  sumAB = ins === null || ins === void 0 ? void 0 : ins.sumAB;
                  sumAB90 = ins === null || ins === void 0 ? void 0 : ins.sumAB90;
                  exa1 = ins === null || ins === void 0 ? void 0 : ins.exa1;
                  sumAB10 = ins === null || ins === void 0 ? void 0 : ins.sumAB10;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  ppc = ins === null || ins === void 0 ? void 0 : ins.ppc;
                  ppd = ins === null || ins === void 0 ? void 0 : ins.ppd;
                  sumCD = ins === null || ins === void 0 ? void 0 : ins.sumCD;
                  sumCD90 = ins === null || ins === void 0 ? void 0 : ins.sumCD90;
                  exa2 = ins === null || ins === void 0 ? void 0 : ins.exa2;
                  sumCD10 = ins === null || ins === void 0 ? void 0 : ins.sumCD10;
                  proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                  ppe = ins === null || ins === void 0 ? void 0 : ins.ppe;
                  ppf = ins === null || ins === void 0 ? void 0 : ins.ppf;
                  sumEF = ins === null || ins === void 0 ? void 0 : ins.sumEF;
                  sumEF90 = ins === null || ins === void 0 ? void 0 : ins.sumEF90;
                  exa3 = ins === null || ins === void 0 ? void 0 : ins.exa3;
                  sumEF10 = ins === null || ins === void 0 ? void 0 : ins.sumEF10;
                  proEF = ins === null || ins === void 0 ? void 0 : ins.proEF;
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
              promPPE.push(ppe);
              promPPF.push(ppf);
              promEF.push(sumEF);
              general33.push(proEF);
              general3.push(final);
              aux.push({
                materia: (_subelement$materia12 = subelement.materia) === null || _subelement$materia12 === void 0 ? void 0 : _subelement$materia12.nombre,
                computo: (_subelement$computo = subelement.computo) === null || _subelement$computo === void 0 ? void 0 : _subelement$computo.nombre,
                area: (_subelement$materia13 = subelement.materia) === null || _subelement$materia13 === void 0 ? void 0 : _subelement$materia13.area,
                ppa,
                ppb,
                sumAB,
                sumAB90,
                exa1,
                sumAB10,
                proAB,
                ppc,
                ppd,
                sumCD,
                sumCD90,
                exa2,
                sumCD10,
                proCD,
                final,
                suple,
                ppe,
                ppf,
                sumEF,
                sumEF90,
                exa3,
                sumEF10,
                proEF
              });
            } else {
              var _subelement$materia16;

              var p1 = void 0,
                  p2 = void 0,
                  p3 = void 0,
                  p4 = void 0,
                  _final = '';

              for (var _m2 = 0; _m2 < computo.length; _m2++) {
                var _result2 = computo[_m2];

                if (subelement.fkmaterias == _result2.fkmateria) {
                  var _subelement$materia14, _subelement$materia15;

                  var _ins16 = _result2.cualitativo;
                  p1 = _ins16.p1;
                  p2 = _ins16.p2;
                  if (((_subelement$materia14 = subelement.materia) === null || _subelement$materia14 === void 0 ? void 0 : _subelement$materia14.nombre) == 'COMPORTAMIENTO' || ((_subelement$materia15 = subelement.materia) === null || _subelement$materia15 === void 0 ? void 0 : _subelement$materia15.nombre) == 'DESARROLLO HUMANO INTEGRAL') _final = calcularPromedioInsumosLetrasComportamiento(_ins16.p1, _ins16.p2);else _final = calcularPromedioInsumosLetras(_ins16.p1, _ins16.p2);
                }
              }

              aux2.push({
                materia: (_subelement$materia16 = subelement.materia) === null || _subelement$materia16 === void 0 ? void 0 : _subelement$materia16.nombre,
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
          var pPPE = calcProm(promPPE);
          var pPPF = calcProm(promPPF);
          var pEF = calcProm(promEF);
          var pgeneral33 = calcProm(general33);
          var pgeneral3 = calcProm(general3);
          help.push({
            nombre: (_element$estudiante3 = element.estudiante) === null || _element$estudiante3 === void 0 ? void 0 : _element$estudiante3.fullname,
            curso: (_rowM$curso3 = rowM.curso) === null || _rowM$curso3 === void 0 ? void 0 : _rowM$curso3.nombre,
            periodo: (_rowM$periodo3 = rowM.periodo) === null || _rowM$periodo3 === void 0 ? void 0 : _rowM$periodo3.nombre,
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
            nmatricula: element.nmatricula,
            pPPE,
            pPPF,
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
          var _element$estudiante4, _rowM$curso4, _rowM$periodo4;

          var computo = matriculas[i].computo;
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia17;

            var subelement = distributivo[j];

            if (((_subelement$materia17 = subelement.materia) === null || _subelement$materia17 === void 0 ? void 0 : _subelement$materia17.computo) == 2) {
              var _subelement$materia18;

              var proAB = void 0,
                  proCD = void 0,
                  suple = void 0,
                  final = void 0,
                  promGen = void 0,
                  remedial = void 0,
                  gracia = void 0,
                  _letras4 = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var ins = result.notas;
                  var res = result.resultados;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                  gracia = ins === null || ins === void 0 ? void 0 : ins.gracia;
                  suple = res === null || res === void 0 ? void 0 : res.supletorio;
                  remedial = res === null || res === void 0 ? void 0 : res.remedial;
                  final = res === null || res === void 0 ? void 0 : res.notaFinal;
                  promGen = res === null || res === void 0 ? void 0 : res.promGen;
                }
              }

              _letras4 = promCuantitativoLetras2(final);
              general3.push(final);
              aux.push({
                materia: (_subelement$materia18 = subelement.materia) === null || _subelement$materia18 === void 0 ? void 0 : _subelement$materia18.nombre,
                proAB: proAB,
                letras: _letras4,
                proCD: proCD,
                remedial: remedial,
                gracia: gracia,
                final: final,
                suple: suple,
                promGen: promGen
              });
            }
          }

          var pgeneral3 = calcProm(general3);
          var letras = trasformnumberToText(pgeneral3);
          help.push({
            nombre: (_element$estudiante4 = element.estudiante) === null || _element$estudiante4 === void 0 ? void 0 : _element$estudiante4.fullname,
            curso: (_rowM$curso4 = rowM.curso) === null || _rowM$curso4 === void 0 ? void 0 : _rowM$curso4.nombre,
            periodo: (_rowM$periodo4 = rowM.periodo) === null || _rowM$periodo4 === void 0 ? void 0 : _rowM$periodo4.nombre,
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
    formatMatricula,
    formatLibretas,
    formatJuntas,
    formatInforme,
    formatFinal,
    formarNomina,
    formatJuntasIndividual,
    formatJuntasFinal
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

    for (var _i3 = 0; _i3 < array.length; _i3++) {
      var _element3 = array[_i3];
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

function calcularPromedioInsumosLetrasComportamiento(p1) {
  var letra = '';

  switch (p1) {
    case "A":
      letra = 'A Muy Satisfactorio';
      break;

    case "B":
      letra = 'B Satisfactorio';
      break;

    case "C":
      letra = 'C Poco Satisfactorio';
      break;

    case "D":
      letra = 'D Mejorable';
      break;

    case "E":
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

function promCuantitativoLetras(num) {
  if (!num || num == '') return '';
  if (num >= 9 && num <= 10) return 'DA';else if (num >= 7 && num <= 8.99) return 'AA';else if (num >= 4.01 && num <= 9.99) return 'EP';else if (num <= 4) return 'NA';else return '';
}

function promCuantitativoLetrasDos(num) {
  if (!num || num == '') return '';
  if (num >= 9 && num <= 10) return 'EX';else if (num >= 7 && num <= 8.99) return 'MB';else if (num >= 4.01 && num <= 9.99) return 'B';else if (num <= 4) return 'R';else return '';
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