"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.element = void 0;

var _funciones = require("./helper/funciones");

var {
  calcProm,
  calcMedia,
  promCuantitativoLetras,
  promCuantitativoLetrasDos,
  calcPromMatriz,
  promCuantitativoPalabraDos,
  calcularPryectos,
  promCuantitativoPalabra,
  promInicialesPalabra,
  promIniciales,
  setPalabraComportamiento
} = (0, _funciones.funciones)();

var element = () => {
  //TODO  PROMEDIO DE JUNTAS 2DO 3RO 4TO
  var juntasOnly = (rowM, rowD, estudiantes, quim, paralelo, keymateria) => {
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
          var _materias$materia;

          var aux = [];
          var aux2 = [];
          var materias = distributivo[j];

          if (((_materias$materia = materias.materia) === null || _materias$materia === void 0 ? void 0 : _materias$materia.nombre) != 'COMPORTAMIENTO') {
            var _materias$materia2, _materias$materia3, _materias$docente;

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
                    exa1 = void 0,
                    pry1 = void 0,
                    proAB = '';
                var letras = void 0,
                    ll1 = void 0,
                    ll2 = '';

                for (var i = 0; i < computo.length; i++) {
                  var _element = computo[i];

                  if (_element.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER TRIMESTRE') {
                      var _element$notas, _element$notas2, _element$notas3, _element$notas4, _element$notas5, _element$notas6;

                      var ins = _element.notas;
                      n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                      n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                      n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                      n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                      n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                      n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                      n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                      n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                      ppa = (_element$notas = _element.notas) === null || _element$notas === void 0 ? void 0 : _element$notas.ppa;
                      ll1 = promIniciales(ppa);
                      ppb = (_element$notas2 = _element.notas) === null || _element$notas2 === void 0 ? void 0 : _element$notas2.ppb;
                      ll2 = promIniciales(ppb);
                      sumAB = (_element$notas3 = _element.notas) === null || _element$notas3 === void 0 ? void 0 : _element$notas3.sumAB;
                      exa1 = (_element$notas4 = _element.notas) === null || _element$notas4 === void 0 ? void 0 : _element$notas4.exa1;
                      pry1 = (_element$notas5 = _element.notas) === null || _element$notas5 === void 0 ? void 0 : _element$notas5.pry1;
                      proAB = (_element$notas6 = _element.notas) === null || _element$notas6 === void 0 ? void 0 : _element$notas6.proAB;
                      letras = promInicialesPalabra(ins === null || ins === void 0 ? void 0 : ins.proAB);
                    }

                    if (quim == 'SEGUNDO TRIMESTRE') {
                      var _element$notas7, _element$notas8, _element$notas9, _element$notas10, _element$notas11, _element$notas12;

                      var _ins = _element.notas;
                      n1 = _ins === null || _ins === void 0 ? void 0 : _ins.c1;
                      n2 = _ins === null || _ins === void 0 ? void 0 : _ins.c2;
                      n3 = _ins === null || _ins === void 0 ? void 0 : _ins.c3;
                      n4 = _ins === null || _ins === void 0 ? void 0 : _ins.c4;
                      n6 = _ins === null || _ins === void 0 ? void 0 : _ins.d1;
                      n7 = _ins === null || _ins === void 0 ? void 0 : _ins.d2;
                      n8 = _ins === null || _ins === void 0 ? void 0 : _ins.d3;
                      n9 = _ins === null || _ins === void 0 ? void 0 : _ins.d4;
                      ppa = (_element$notas7 = _element.notas) === null || _element$notas7 === void 0 ? void 0 : _element$notas7.ppc;
                      ll1 = promIniciales(ppa);
                      ppb = (_element$notas8 = _element.notas) === null || _element$notas8 === void 0 ? void 0 : _element$notas8.ppd;
                      ll2 = promIniciales(ppb);
                      sumAB = (_element$notas9 = _element.notas) === null || _element$notas9 === void 0 ? void 0 : _element$notas9.sumCD;
                      exa1 = (_element$notas10 = _element.notas) === null || _element$notas10 === void 0 ? void 0 : _element$notas10.exa2;
                      pry1 = (_element$notas11 = _element.notas) === null || _element$notas11 === void 0 ? void 0 : _element$notas11.pry2;
                      proAB = (_element$notas12 = _element.notas) === null || _element$notas12 === void 0 ? void 0 : _element$notas12.proCD;
                      letras = promInicialesPalabra(_ins === null || _ins === void 0 ? void 0 : _ins.proCD);
                    }

                    if (quim == 'TERCER TRIMESTRE') {
                      var _element$notas13, _element$notas14, _element$notas15, _element$notas16, _element$notas17, _element$notas18;

                      var _ins2 = _element.notas;
                      n1 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e1;
                      n2 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e2;
                      n3 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e3;
                      n4 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e4;
                      n6 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f1;
                      n7 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f2;
                      n8 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f3;
                      n9 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f4;
                      ppa = (_element$notas13 = _element.notas) === null || _element$notas13 === void 0 ? void 0 : _element$notas13.ppe;
                      ll1 = promIniciales(ppa);
                      ppb = (_element$notas14 = _element.notas) === null || _element$notas14 === void 0 ? void 0 : _element$notas14.ppf;
                      ll2 = promIniciales(ppb);
                      sumAB = (_element$notas15 = _element.notas) === null || _element$notas15 === void 0 ? void 0 : _element$notas15.sumEF;
                      exa1 = (_element$notas16 = _element.notas) === null || _element$notas16 === void 0 ? void 0 : _element$notas16.exa3;
                      pry1 = (_element$notas17 = _element.notas) === null || _element$notas17 === void 0 ? void 0 : _element$notas17.pry3;
                      proAB = (_element$notas18 = _element.notas) === null || _element$notas18 === void 0 ? void 0 : _element$notas18.proEF;
                      letras = promInicialesPalabra(_ins2 === null || _ins2 === void 0 ? void 0 : _ins2.proEF);
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
                  ll1,
                  ll2,
                  exa1,
                  pry1,
                  proAB,
                  letras
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
            var llf = promInicialesPalabra(prAB);
            var lla = promIniciales(pPPA);
            var llb = promIniciales(prAB);
            help.push({
              materia: (_materias$materia2 = materias.materia) === null || _materias$materia2 === void 0 ? void 0 : _materias$materia2.nombre,
              computo: (_materias$materia3 = materias.materia) === null || _materias$materia3 === void 0 ? void 0 : _materias$materia3.computo,
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
              prAB,
              lettras,
              llf,
              lla,
              llb
            });
          } else {
            var _materias$materia4, _materias$materia5, _materias$materia6, _materias$materia7, _materias$docente2;

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
                var _letras = '';

                for (var _i = 0; _i < _computo.length; _i++) {
                  var _element2 = _computo[_i];

                  if (_element2.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER TRIMESTRE') {
                      var _element2$materia, _element2$materia2;

                      var _ins3 = _element2.cualitativo;
                      p1 = _ins3.p1;
                      p2 = _ins3.p2;
                      if (((_element2$materia = _element2.materia) === null || _element2$materia === void 0 ? void 0 : _element2$materia.nombre) == 'COMPORTAMIENTO' || ((_element2$materia2 = _element2.materia) === null || _element2$materia2 === void 0 ? void 0 : _element2$materia2.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins3.p1);else _letras = calcularPromedioInsumosLetras(_ins3.p1, _ins3.p2);
                    }

                    if (quim == 'SEGUNDO TRIMESTRE') {
                      var _element2$materia3, _element2$materia4;

                      var _ins4 = _element2.cualitativo;
                      p1 = _ins4.p3;
                      p2 = _ins4.p4;
                      if (((_element2$materia3 = _element2.materia) === null || _element2$materia3 === void 0 ? void 0 : _element2$materia3.nombre) == 'COMPORTAMIENTO' || ((_element2$materia4 = _element2.materia) === null || _element2$materia4 === void 0 ? void 0 : _element2$materia4.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins4.p2);else _letras = calcularPromedioInsumosLetras(_ins4.p1, _ins4.p2);
                    }

                    if (quim == 'TERCER TRIMESTRE') {
                      var _element2$materia5, _element2$materia6;

                      var _ins5 = _element2.cualitativo;
                      p1 = _ins5.p5;
                      p2 = _ins5.p6;
                      if (((_element2$materia5 = _element2.materia) === null || _element2$materia5 === void 0 ? void 0 : _element2$materia5.nombre) == 'COMPORTAMIENTO' || ((_element2$materia6 = _element2.materia) === null || _element2$materia6 === void 0 ? void 0 : _element2$materia6.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins5.p3);else _letras = calcularPromedioInsumosLetras(_ins5.p1, _ins5.p2);
                    }
                  }
                }

                _proPPA.push(p1);

                _proPPB.push(p2);

                _promAB.push(_letras);

                aux2.push({
                  estudiante: (_res$estudiante2 = _res.estudiante) === null || _res$estudiante2 === void 0 ? void 0 : _res$estudiante2.fullname,
                  letras: _letras,
                  p1,
                  p2
                });
              }
            }

            var _medPPA = contarMediaLet(_proPPA, (_materias$materia4 = materias.materia) === null || _materias$materia4 === void 0 ? void 0 : _materias$materia4.nombre);

            var _medPPB = contarMediaLet(_proPPB, (_materias$materia5 = materias.materia) === null || _materias$materia5 === void 0 ? void 0 : _materias$materia5.nombre);

            var _medAB = contarMediaLet(_promAB, (_materias$materia6 = materias.materia) === null || _materias$materia6 === void 0 ? void 0 : _materias$materia6.nombre);

            help2.push({
              materia: (_materias$materia7 = materias.materia) === null || _materias$materia7 === void 0 ? void 0 : _materias$materia7.nombre,
              docente: (_materias$docente2 = materias.docente) === null || _materias$docente2 === void 0 ? void 0 : _materias$docente2.fullname,
              curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
              paralelo,
              data: aux2,
              fechaA: fechaA,
              medPPA: _medPPA,
              medPPB: _medPPB,
              medAB: _medAB,
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
  };

  var juntasFinal = (rowM, rowD, estudiantes, paralelo, keymateria) => {
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
          var _materias$materia8, _materias$docente3;

          var aux = [];
          var materias = distributivo[j];
          var promAB = [];
          var promCD = [];
          var promEF = [];
          var promPY = [];
          var promF = [];

          for (var k = 0; k < matriculas.length; k++) {
            var res = matriculas[k];

            if (estudiantes.includes(res.fkestudiante)) {
              var _res$estudiante3;

              var computo = matriculas[k].computo;
              var proAB = void 0,
                  proCD = void 0,
                  proEF = void 0,
                  final = void 0,
                  pytf = '';
              var ll1 = void 0,
                  ll2 = void 0,
                  ll3 = void 0,
                  ll4 = void 0,
                  llf = '';

              for (var i = 0; i < computo.length; i++) {
                var _element3 = computo[i];

                if (_element3.fkmateria == materias.fkmaterias) {
                  var _element3$notas, _element3$notas2, _element3$notas3;

                  var _res2 = _element3.resultados;
                  proAB = (_element3$notas = _element3.notas) === null || _element3$notas === void 0 ? void 0 : _element3$notas.proAB;
                  ll1 = promIniciales(proAB);
                  proCD = (_element3$notas2 = _element3.notas) === null || _element3$notas2 === void 0 ? void 0 : _element3$notas2.proCD;
                  ll2 = promIniciales(proCD);
                  proEF = (_element3$notas3 = _element3.notas) === null || _element3$notas3 === void 0 ? void 0 : _element3$notas3.proEF;
                  ll3 = promIniciales(proEF);
                  pytf = _res2 === null || _res2 === void 0 ? void 0 : _res2.pytf;
                  ll4 = promIniciales(pytf);
                  final = _res2 === null || _res2 === void 0 ? void 0 : _res2.notaFinal;
                  llf = promInicialesPalabra(final);
                }
              }

              promAB.push(proAB);
              promCD.push(proCD);
              promEF.push(proEF);
              promPY.push(pytf);
              promF.push(final);
              aux.push({
                estudiante: (_res$estudiante3 = res.estudiante) === null || _res$estudiante3 === void 0 ? void 0 : _res$estudiante3.fullname,
                proAB,
                proCD,
                proEF,
                pytf,
                final,
                ll1,
                ll2,
                ll3,
                ll4,
                llf
              });
            }
          }

          var medAB = calcMedia(promAB);
          var medCD = calcMedia(promCD);
          var medEF = calcMedia(promEF);
          var medF = calcMedia(promF);
          var pPPA = calcProm(promAB);
          var pPPB = calcProm(promCD);
          var pPPC = calcProm(promEF);
          var pPPY = calcProm(promPY);
          var prAB = calcProm(promF);
          var lm1 = promIniciales(pPPA);
          var lm2 = promIniciales(pPPB);
          var lm3 = promIniciales(pPPC);
          var lm4 = promIniciales(pPPY);
          var lmf = promInicialesPalabra(prAB);
          help.push({
            materia: (_materias$materia8 = materias.materia) === null || _materias$materia8 === void 0 ? void 0 : _materias$materia8.nombre,
            docente: (_materias$docente3 = materias.docente) === null || _materias$docente3 === void 0 ? void 0 : _materias$docente3.fullname,
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
            pPPY,
            lm1,
            lm2,
            lm3,
            lm4,
            lmf
          });
        }
      } // console.log('es100',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  };

  var juntasGeneral = (rowM, rowD, estudiantes, quim, paralelo) => {
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
        var _materias$materia9;

        var aux = [];
        var aux2 = [];
        var materias = distributivo[j];

        if (((_materias$materia9 = materias.materia) === null || _materias$materia9 === void 0 ? void 0 : _materias$materia9.nombre) != 'COMPORTAMIENTO') {
          var _materias$materia10, _materias$materia11, _materias$docente4;

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
                  exa1 = void 0,
                  pry1 = void 0,
                  proAB = '';
              var letras = void 0,
                  ll1 = void 0,
                  ll2 = '';

              for (var i = 0; i < computo.length; i++) {
                var _element4 = computo[i];

                if (_element4.fkmateria == materias.fkmaterias) {
                  if (quim == 'PRIMER TRIMESTRE') {
                    var _element4$notas, _element4$notas2, _element4$notas3, _element4$notas4, _element4$notas5, _element4$notas6;

                    var ins = _element4.notas;
                    n1 = ins === null || ins === void 0 ? void 0 : ins.a1;
                    n2 = ins === null || ins === void 0 ? void 0 : ins.a2;
                    n3 = ins === null || ins === void 0 ? void 0 : ins.a3;
                    n4 = ins === null || ins === void 0 ? void 0 : ins.a4;
                    n6 = ins === null || ins === void 0 ? void 0 : ins.b1;
                    n7 = ins === null || ins === void 0 ? void 0 : ins.b2;
                    n8 = ins === null || ins === void 0 ? void 0 : ins.b3;
                    n9 = ins === null || ins === void 0 ? void 0 : ins.b4;
                    ppa = (_element4$notas = _element4.notas) === null || _element4$notas === void 0 ? void 0 : _element4$notas.ppa;
                    ll1 = promIniciales(ppa);
                    ppb = (_element4$notas2 = _element4.notas) === null || _element4$notas2 === void 0 ? void 0 : _element4$notas2.ppb;
                    ll2 = promIniciales(ppb);
                    sumAB = (_element4$notas3 = _element4.notas) === null || _element4$notas3 === void 0 ? void 0 : _element4$notas3.sumAB;
                    exa1 = (_element4$notas4 = _element4.notas) === null || _element4$notas4 === void 0 ? void 0 : _element4$notas4.exa1;
                    pry1 = (_element4$notas5 = _element4.notas) === null || _element4$notas5 === void 0 ? void 0 : _element4$notas5.pry1;
                    proAB = (_element4$notas6 = _element4.notas) === null || _element4$notas6 === void 0 ? void 0 : _element4$notas6.proAB;
                    letras = promInicialesPalabra(ins === null || ins === void 0 ? void 0 : ins.proAB);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _element4$notas7, _element4$notas8, _element4$notas9, _element4$notas10, _element4$notas11, _element4$notas12;

                    var _ins6 = _element4.notas;
                    n1 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c1;
                    n2 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c2;
                    n3 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c3;
                    n4 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.c4;
                    n6 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d1;
                    n7 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d2;
                    n8 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d3;
                    n9 = _ins6 === null || _ins6 === void 0 ? void 0 : _ins6.d4;
                    ppa = (_element4$notas7 = _element4.notas) === null || _element4$notas7 === void 0 ? void 0 : _element4$notas7.ppc;
                    ll1 = promIniciales(ppa);
                    ppb = (_element4$notas8 = _element4.notas) === null || _element4$notas8 === void 0 ? void 0 : _element4$notas8.ppd;
                    ll2 = promIniciales(ppb);
                    sumAB = (_element4$notas9 = _element4.notas) === null || _element4$notas9 === void 0 ? void 0 : _element4$notas9.sumCD;
                    exa1 = (_element4$notas10 = _element4.notas) === null || _element4$notas10 === void 0 ? void 0 : _element4$notas10.exa2;
                    pry1 = (_element4$notas11 = _element4.notas) === null || _element4$notas11 === void 0 ? void 0 : _element4$notas11.pry2;
                    proAB = (_element4$notas12 = _element4.notas) === null || _element4$notas12 === void 0 ? void 0 : _element4$notas12.proCD;
                    letras = promInicialesPalabra(_ins6 === null || _ins6 === void 0 ? void 0 : _ins6.proCD);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _element4$notas13, _element4$notas14, _element4$notas15, _element4$notas16, _element4$notas17, _element4$notas18;

                    var _ins7 = _element4.notas;
                    n1 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e1;
                    n2 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e2;
                    n3 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e3;
                    n4 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.e4;
                    n6 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f1;
                    n7 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f2;
                    n8 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f3;
                    n9 = _ins7 === null || _ins7 === void 0 ? void 0 : _ins7.f4;
                    ppa = (_element4$notas13 = _element4.notas) === null || _element4$notas13 === void 0 ? void 0 : _element4$notas13.ppe;
                    ll1 = promIniciales(ppa);
                    ppb = (_element4$notas14 = _element4.notas) === null || _element4$notas14 === void 0 ? void 0 : _element4$notas14.ppf;
                    ll2 = promIniciales(ppb);
                    sumAB = (_element4$notas15 = _element4.notas) === null || _element4$notas15 === void 0 ? void 0 : _element4$notas15.sumEF;
                    exa1 = (_element4$notas16 = _element4.notas) === null || _element4$notas16 === void 0 ? void 0 : _element4$notas16.exa3;
                    pry1 = (_element4$notas17 = _element4.notas) === null || _element4$notas17 === void 0 ? void 0 : _element4$notas17.pry3;
                    proAB = (_element4$notas18 = _element4.notas) === null || _element4$notas18 === void 0 ? void 0 : _element4$notas18.proEF;
                    letras = promInicialesPalabra(_ins7 === null || _ins7 === void 0 ? void 0 : _ins7.proEF);
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
                ll1,
                ll2,
                exa1,
                pry1,
                proAB,
                letras
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
          var llf = promInicialesPalabra(prAB);
          var lla = promIniciales(pPPA);
          var llb = promIniciales(prAB);
          help.push({
            materia: (_materias$materia10 = materias.materia) === null || _materias$materia10 === void 0 ? void 0 : _materias$materia10.nombre,
            computo: (_materias$materia11 = materias.materia) === null || _materias$materia11 === void 0 ? void 0 : _materias$materia11.computo,
            docente: (_materias$docente4 = materias.docente) === null || _materias$docente4 === void 0 ? void 0 : _materias$docente4.fullname,
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
            lettras,
            llf,
            lla,
            llb
          });
        } else {
          var _materias$materia12, _materias$materia13, _materias$materia14, _materias$materia15, _materias$docente5;

          var _proPPA2 = [];
          var _proPPB2 = [];
          var _promAB2 = [];

          for (var _k2 = 0; _k2 < matriculas.length; _k2++) {
            var _res3 = matriculas[_k2];

            if (estudiantes.includes(_res3.fkestudiante)) {
              var _res3$estudiante;

              var _computo2 = matriculas[_k2].computo;
              var p1 = void 0,
                  p2 = '';
              var _letras2 = '';

              for (var _i2 = 0; _i2 < _computo2.length; _i2++) {
                var _element5 = _computo2[_i2];

                if (_element5.fkmateria == materias.fkmaterias) {
                  if (quim == 'PRIMER TRIMESTRE') {
                    var _element5$materia, _element5$materia2;

                    var _ins8 = _element5.cualitativo;
                    p1 = _ins8.p1;
                    p2 = _ins8.p2;
                    if (((_element5$materia = _element5.materia) === null || _element5$materia === void 0 ? void 0 : _element5$materia.nombre) == 'COMPORTAMIENTO' || ((_element5$materia2 = _element5.materia) === null || _element5$materia2 === void 0 ? void 0 : _element5$materia2.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins8.p1);else _letras2 = calcularPromedioInsumosLetras(_ins8.p1, _ins8.p2);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _element5$materia3, _element5$materia4;

                    var _ins9 = _element5.cualitativo;
                    p1 = _ins9.p3;
                    p2 = _ins9.p4;
                    if (((_element5$materia3 = _element5.materia) === null || _element5$materia3 === void 0 ? void 0 : _element5$materia3.nombre) == 'COMPORTAMIENTO' || ((_element5$materia4 = _element5.materia) === null || _element5$materia4 === void 0 ? void 0 : _element5$materia4.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins9.p2);else _letras2 = calcularPromedioInsumosLetras(_ins9.p1, _ins9.p2);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _element5$materia5, _element5$materia6;

                    var _ins10 = _element5.cualitativo;
                    p1 = _ins10.p5;
                    p2 = _ins10.p6;
                    if (((_element5$materia5 = _element5.materia) === null || _element5$materia5 === void 0 ? void 0 : _element5$materia5.nombre) == 'COMPORTAMIENTO' || ((_element5$materia6 = _element5.materia) === null || _element5$materia6 === void 0 ? void 0 : _element5$materia6.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras2 = calcularPromedioInsumosLetrasComportamiento(_ins10.p3);else _letras2 = calcularPromedioInsumosLetras(_ins10.p1, _ins10.p2);
                  }
                }
              }

              _proPPA2.push(p1);

              _proPPB2.push(p2);

              _promAB2.push(_letras2);

              aux2.push({
                estudiante: (_res3$estudiante = _res3.estudiante) === null || _res3$estudiante === void 0 ? void 0 : _res3$estudiante.fullname,
                letras: _letras2,
                p1,
                p2
              });
            }
          }

          var _medPPA2 = contarMediaLet(_proPPA2, (_materias$materia12 = materias.materia) === null || _materias$materia12 === void 0 ? void 0 : _materias$materia12.nombre);

          var _medPPB2 = contarMediaLet(_proPPB2, (_materias$materia13 = materias.materia) === null || _materias$materia13 === void 0 ? void 0 : _materias$materia13.nombre);

          var _medAB2 = contarMediaLet(_promAB2, (_materias$materia14 = materias.materia) === null || _materias$materia14 === void 0 ? void 0 : _materias$materia14.nombre);

          help2.push({
            materia: (_materias$materia15 = materias.materia) === null || _materias$materia15 === void 0 ? void 0 : _materias$materia15.nombre,
            docente: (_materias$docente5 = materias.docente) === null || _materias$docente5 === void 0 ? void 0 : _materias$docente5.fullname,
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

      var arr = {
        help: help,
        help2: help2
      };
      return arr;
    } catch (error) {
      console.log(error);
    }
  };

  var promJuntaComportamiento = (rowM, rowD, estudiantes, paralelo, keymateria) => {
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
          var _materias$materia16;

          var aux = [];
          var materias = distributivo[j];

          if (((_materias$materia16 = materias.materia) === null || _materias$materia16 === void 0 ? void 0 : _materias$materia16.nombre) == 'COMPORTAMIENTO') {
            var _materias$materia17, _materias$materia18, _materias$materia19, _materias$materia20, _materias$materia21, _materias$docente6;

            var proPPA = [];
            var proPPB = [];
            var proPPC = [];
            var promAB = [];

            for (var k = 0; k < matriculas.length; k++) {
              var res = matriculas[k];

              if (estudiantes.includes(res.fkestudiante)) {
                var _res$estudiante5;

                var computo = matriculas[k].computo;
                var p1 = void 0,
                    p2 = void 0,
                    p3 = void 0,
                    final = '';
                var letras = '';

                for (var i = 0; i < computo.length; i++) {
                  var _element6 = computo[i];

                  if (_element6.fkmateria == materias.fkmaterias) {
                    var _element6$resultados;

                    var ins = _element6.cualitativo;
                    p1 = ins.p1;
                    p2 = ins.p2;
                    p3 = ins.p3;
                    final = (_element6$resultados = _element6.resultados) === null || _element6$resultados === void 0 ? void 0 : _element6$resultados.promGen;
                    letras = calcularPromedioInsumosLetrasComportamiento(final);
                  }
                }

                proPPA.push(p1);
                proPPB.push(p2);
                proPPC.push(p3);
                promAB.push(letras);
                aux.push({
                  estudiante: (_res$estudiante5 = res.estudiante) === null || _res$estudiante5 === void 0 ? void 0 : _res$estudiante5.fullname,
                  letras,
                  p1,
                  p2,
                  p3
                });
              }
            }

            var medPPA = contarMediaLet(proPPA, (_materias$materia17 = materias.materia) === null || _materias$materia17 === void 0 ? void 0 : _materias$materia17.nombre);
            var medPPB = contarMediaLet(proPPB, (_materias$materia18 = materias.materia) === null || _materias$materia18 === void 0 ? void 0 : _materias$materia18.nombre);
            var medPPC = contarMediaLet(proPPC, (_materias$materia19 = materias.materia) === null || _materias$materia19 === void 0 ? void 0 : _materias$materia19.nombre);
            var medAB = contarMediaLet(promAB, (_materias$materia20 = materias.materia) === null || _materias$materia20 === void 0 ? void 0 : _materias$materia20.nombre);
            help.push({
              materia: (_materias$materia21 = materias.materia) === null || _materias$materia21 === void 0 ? void 0 : _materias$materia21.nombre,
              docente: (_materias$docente6 = materias.docente) === null || _materias$docente6 === void 0 ? void 0 : _materias$docente6.fullname,
              curso: rowD === null || rowD === void 0 ? void 0 : rowD.curso.nombre,
              paralelo,
              data: aux,
              fechaA,
              medPPA,
              medPPB,
              medAB,
              medPPC,
              periodo: rowM === null || rowM === void 0 ? void 0 : rowM.periodo.nombre
            });
          }
        }
      } // console.log('es100',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  };

  var promLibretasElem = (rowM, rowD, estudiantes, quim) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var _element7 = matriculas[i];
        var aux = [];
        var aux2 = [];

        if (estudiantes.includes(_element7.fkestudiante)) {
          var _element7$estudiante, _rowM$curso, _rowM$periodo;

          var computo = matriculas[i].computo;
          var promPPA = [];
          var promPPB = [];
          var general = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia;

            var subelement = distributivo[j];

            if (((_subelement$materia = subelement.materia) === null || _subelement$materia === void 0 ? void 0 : _subelement$materia.nombre) != 'COMPORTAMIENTO') {
              var _subelement$materia2, _subelement$materia3, _subelement$materia4;

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
                  letraspf = void 0,
                  ll1 = void 0,
                  ll2 = '';
              var computos = (_subelement$materia2 = subelement.materia) === null || _subelement$materia2 === void 0 ? void 0 : _subelement$materia2.computo;

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
                    ll1 = promIniciales(ppa);
                    ll2 = promIniciales(ppb);
                    letrasp1 = promCuantitativoLetrasDos(ppa);
                    letrasp2 = promCuantitativoLetrasDos(ppb);
                    letraspf = promCuantitativoLetrasDos(proAB);
                    letras = promInicialesPalabra(ins === null || ins === void 0 ? void 0 : ins.proAB);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var _ins11 = result.notas;
                    n1 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c1;
                    n2 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c2;
                    n3 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c3;
                    n4 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.c4;
                    n6 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d1;
                    n7 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d2;
                    n8 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d3;
                    n9 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.d4;
                    ppa = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.ppc;
                    ppb = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.ppd;
                    sumAB = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.sumCD;
                    sumAB90 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.sumCD90;
                    exa1 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.exa2;
                    pry1 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.pry2;
                    sumAB10 = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.sumCD10;
                    proAB = _ins11 === null || _ins11 === void 0 ? void 0 : _ins11.proCD;
                    ll1 = promIniciales(ppa);
                    ll2 = promIniciales(ppb);
                    letrasp1 = promCuantitativoLetrasDos(ppa);
                    letrasp2 = promCuantitativoLetrasDos(ppb);
                    letraspf = promCuantitativoLetrasDos(proAB);
                    letras = promInicialesPalabra(_ins11 === null || _ins11 === void 0 ? void 0 : _ins11.proCD);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var _ins12 = result.notas;
                    n1 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e1;
                    n2 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e2;
                    n3 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e3;
                    n4 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.e4;
                    n6 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f1;
                    n7 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f2;
                    n8 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f3;
                    n9 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.f4;
                    ppa = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.ppe;
                    ppb = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.ppf;
                    sumAB = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.sumEF;
                    sumAB90 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.sumEF90;
                    exa1 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.exa3;
                    pry1 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.pry3;
                    sumAB10 = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.sumEF10;
                    proAB = _ins12 === null || _ins12 === void 0 ? void 0 : _ins12.proEF;
                    ll1 = promIniciales(ppa);
                    ll2 = promIniciales(ppb);
                    letrasp1 = promCuantitativoLetrasDos(ppa);
                    letrasp2 = promCuantitativoLetrasDos(ppb);
                    letraspf = promCuantitativoLetrasDos(proAB);
                    letras = promInicialesPalabra(_ins12 === null || _ins12 === void 0 ? void 0 : _ins12.proEF);
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
                materia: (_subelement$materia3 = subelement.materia) === null || _subelement$materia3 === void 0 ? void 0 : _subelement$materia3.nombre,
                area: (_subelement$materia4 = subelement.materia) === null || _subelement$materia4 === void 0 ? void 0 : _subelement$materia4.area,
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
                letraspf,
                ll1,
                ll2
              });
            } else {
              var _subelement$materia6;

              //TODO check COMPORTAMIENTO PROYECTOS ESCOLARES DHI
              var pp1 = void 0,
                  pp2 = '';
              var _letras3 = '';

              for (var _m = 0; _m < computo.length; _m++) {
                var _result = computo[_m];

                if (subelement.fkmaterias == _result.fkmateria) {
                  var _subelement$materia5;

                  var mate = (_subelement$materia5 = subelement.materia) === null || _subelement$materia5 === void 0 ? void 0 : _subelement$materia5.nombre;

                  if (quim == 'PRIMER TRIMESTRE') {
                    var {
                      p1
                    } = _result.cualitativo;
                    pp1 = p1;
                    pp2 = p1;
                    _letras3 = setPalabraComportamiento(p1);
                  }

                  if (quim == 'SEGUNDO TRIMESTRE') {
                    var {
                      p2
                    } = _result.cualitativo;
                    pp1 = p2;
                    pp2 = p2;
                    _letras3 = setPalabraComportamiento(p2);
                  }

                  if (quim == 'TERCER TRIMESTRE') {
                    var {
                      p3
                    } = _result.cualitativo;
                    pp1 = p3;
                    pp2 = p3;
                    _letras3 = setPalabraComportamiento(p3);
                  }
                }
              }

              aux2.push({
                materia: (_subelement$materia6 = subelement.materia) === null || _subelement$materia6 === void 0 ? void 0 : _subelement$materia6.nombre,
                letras: _letras3,
                pp1,
                pp2
              });
            }
          }

          var pPPA = calcProm(promPPA);
          var pPPB = calcProm(promPPB);
          var pgeneral = calcProm(general);
          var lll1 = promIniciales(pPPA);
          var lll2 = promIniciales(pPPB);
          var lllf = promInicialesPalabra(pPPB);
          help.push({
            nombre: (_element7$estudiante = _element7.estudiante) === null || _element7$estudiante === void 0 ? void 0 : _element7$estudiante.fullname,
            curso: (_rowM$curso = rowM.curso) === null || _rowM$curso === void 0 ? void 0 : _rowM$curso.nombre,
            periodo: (_rowM$periodo = rowM.periodo) === null || _rowM$periodo === void 0 ? void 0 : _rowM$periodo.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            pPPA,
            pPPB,
            pgeneral,
            lll1,
            lll2,
            lllf,
            fechaA,
            nmatricula: _element7.nmatricula
          });
        }
      }

      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  var promFinalElem = (rowM, rowD, estudiantes) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var _element8 = matriculas[i];
        var aux = [];
        var aux2 = [];

        if (estudiantes.includes(_element8.fkestudiante)) {
          var _element8$estudiante, _rowM$curso2, _rowM$periodo2;

          var computo = matriculas[i].computo;
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia7;

            var subelement = distributivo[j];

            if (((_subelement$materia7 = subelement.materia) === null || _subelement$materia7 === void 0 ? void 0 : _subelement$materia7.nombre) != 'COMPORTAMIENTO') {
              var _subelement$materia8, _subelement$materia9;

              var computos = (_subelement$materia8 = subelement.materia) === null || _subelement$materia8 === void 0 ? void 0 : _subelement$materia8.computo;

              var proAB = void 0,
                  proCD = void 0,
                  proEF = void 0,
                  pytf = void 0,
                  final = void 0,
                  _letras4 = void 0,
                  letras2 = '';

              var ll1 = void 0,
                  ll2 = void 0,
                  ll3 = void 0,
                  llp = void 0,
                  lle = void 0,
                  llf = '';
              var lc1 = void 0,
                  lc2 = void 0,
                  lc3 = void 0,
                  lcp = void 0,
                  lcf = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var ins = result.notas;
                  var res = result.resultados;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                  proEF = ins === null || ins === void 0 ? void 0 : ins.proEF;
                  pytf = res === null || res === void 0 ? void 0 : res.pytf;
                  final = res === null || res === void 0 ? void 0 : res.notaFinal;
                  ll1 = promCuantitativoLetrasDos(proAB);
                  ll2 = promCuantitativoLetrasDos(proCD);
                  ll3 = promCuantitativoLetrasDos(proEF);
                  llp = promCuantitativoLetrasDos(pytf);
                  llf = promCuantitativoLetrasDos(final);
                  lc1 = promIniciales(proAB);
                  lc2 = promIniciales(proCD);
                  lc3 = promIniciales(proEF);
                  lcp = promIniciales(pytf);
                  lcf = promIniciales(final);
                }
              }

              _letras4 = promInicialesPalabra(final);
              letras2 = promCuantitativoPalabraDos(final);
              if (computos == 2) general3.push(final);
              aux.push({
                materia: (_subelement$materia9 = subelement.materia) === null || _subelement$materia9 === void 0 ? void 0 : _subelement$materia9.nombre,
                computo: computos,
                letras: _letras4,
                letras2,
                proAB,
                proCD,
                proEF,
                pytf,
                final,
                ll1,
                ll2,
                ll3,
                llp,
                lle,
                llf,
                lc1,
                lc2,
                lc3,
                lcp,
                lcf
              });
            } else {
              var _subelement$materia10, _subelement$materia11, _subelement$materia12;

              var _computos = (_subelement$materia10 = subelement.materia) === null || _subelement$materia10 === void 0 ? void 0 : _subelement$materia10.computo;

              var p1 = void 0,
                  p2 = void 0,
                  p3 = void 0,
                  promGen = void 0,
                  _letras5 = '';

              for (var _m2 = 0; _m2 < computo.length; _m2++) {
                var _result2 = computo[_m2];

                if (subelement.fkmaterias == _result2.fkmateria) {
                  var _ins13 = _result2.cualitativo;
                  var _res4 = _result2.resultados;
                  p1 = _ins13 === null || _ins13 === void 0 ? void 0 : _ins13.p1;
                  p2 = _ins13 === null || _ins13 === void 0 ? void 0 : _ins13.p2;
                  p3 = _ins13 === null || _ins13 === void 0 ? void 0 : _ins13.p3;
                  promGen = _res4 === null || _res4 === void 0 ? void 0 : _res4.promGen;
                }
              }

              _letras5 = calcularPryectos(promGen, (_subelement$materia11 = subelement.materia) === null || _subelement$materia11 === void 0 ? void 0 : _subelement$materia11.nombre);
              aux2.push({
                materia: (_subelement$materia12 = subelement.materia) === null || _subelement$materia12 === void 0 ? void 0 : _subelement$materia12.nombre,
                computo: _computos,
                letras: _letras5,
                p1,
                p2,
                p3,
                promGen
              });
            }
          }

          var pgeneral3 = calcProm(general3);
          var promff = promIniciales(pgeneral3); //const letras = trasformnumberToText(pgeneral3)

          var letras = promInicialesPalabra(pgeneral3);
          help.push({
            nombre: (_element8$estudiante = _element8.estudiante) === null || _element8$estudiante === void 0 ? void 0 : _element8$estudiante.fullname,
            curso: (_rowM$curso2 = rowM.curso) === null || _rowM$curso2 === void 0 ? void 0 : _rowM$curso2.nombre,
            periodo: (_rowM$periodo2 = rowM.periodo) === null || _rowM$periodo2 === void 0 ? void 0 : _rowM$periodo2.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            pgeneral3,
            fechaA,
            nmatricula: _element8.nmatricula,
            letras,
            promff
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  var promPromocionElem = (rowM, rowD, estudiantes) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var _element9 = matriculas[i];
        var aux = [];
        var aux2 = [];
        var aux3 = [];

        if (estudiantes.includes(_element9.fkestudiante)) {
          var _element9$estudiante, _rowM$curso3, _rowM$periodo3;

          var computo = matriculas[i].computo;
          var promGeneral = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia13;

            var subelement = distributivo[j];

            if (((_subelement$materia13 = subelement.materia) === null || _subelement$materia13 === void 0 ? void 0 : _subelement$materia13.computo) == 2) {
              var _subelement$materia14, _subelement$materia15;

              //todo falta verificar si es promovido
              var promedio = void 0,
                  letras = void 0,
                  promLetra = '';

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  promedio = result.resultados.notaFinal;
                  promLetra = promIniciales(promedio);
                }
              }

              letras = promInicialesPalabra(promedio);
              promGeneral.push(promedio);
              aux.push({
                materia: (_subelement$materia14 = subelement.materia) === null || _subelement$materia14 === void 0 ? void 0 : _subelement$materia14.nombre,
                area: (_subelement$materia15 = subelement.materia) === null || _subelement$materia15 === void 0 ? void 0 : _subelement$materia15.area,
                promedio: promedio ? promedio.toString().replace('.', ',') : '',
                letras: letras,
                promLetra
              });
            } else {
              var _subelement$materia16;

              if ((subelement === null || subelement === void 0 ? void 0 : (_subelement$materia16 = subelement.materia) === null || _subelement$materia16 === void 0 ? void 0 : _subelement$materia16.nombre) == 'COMPORTAMIENTO') {
                var _subelement$materia17, _subelement$materia18, _subelement$materia19;

                var _promedio = void 0,
                    _letras6 = '';

                for (var _m3 = 0; _m3 < computo.length; _m3++) {
                  var _result3$resultados;

                  var _result3 = computo[_m3];
                  if (subelement.fkmaterias == _result3.fkmateria) _promedio = (_result3$resultados = _result3.resultados) === null || _result3$resultados === void 0 ? void 0 : _result3$resultados.promGen;
                }

                _letras6 = calcularPryectos(_promedio, (_subelement$materia17 = subelement.materia) === null || _subelement$materia17 === void 0 ? void 0 : _subelement$materia17.nombre);
                promGeneral.push(_promedio);
                aux2.push({
                  materia: (_subelement$materia18 = subelement.materia) === null || _subelement$materia18 === void 0 ? void 0 : _subelement$materia18.nombre,
                  area: (_subelement$materia19 = subelement.materia) === null || _subelement$materia19 === void 0 ? void 0 : _subelement$materia19.area,
                  promedio: _promedio,
                  letras: _letras6
                });
              } else {
                var _subelement$materia20, _subelement$materia21;

                /* MATERIAS COMPLEMENTARIAS */
                var _promedio2 = void 0,
                    _letras7 = '';

                for (var _m4 = 0; _m4 < computo.length; _m4++) {
                  var _result4$resultados;

                  var _result4 = computo[_m4];
                  if (subelement.fkmaterias == _result4.fkmateria) _promedio2 = (_result4$resultados = _result4.resultados) === null || _result4$resultados === void 0 ? void 0 : _result4$resultados.notaFinal;
                }

                _letras7 = promCuantitativoPalabraDos(_promedio2);
                if (_letras7 == '' || _letras7 == undefined) _letras7 = 'Sin confirmar';
                aux3.push({
                  materia: (_subelement$materia20 = subelement.materia) === null || _subelement$materia20 === void 0 ? void 0 : _subelement$materia20.nombre,
                  area: (_subelement$materia21 = subelement.materia) === null || _subelement$materia21 === void 0 ? void 0 : _subelement$materia21.area,
                  promedio: _promedio2,
                  letras: _letras7
                });
              }
            }
          } //console.log(aux3)


          var pgeneral = calcProm(promGeneral);
          var promFinLetra = promIniciales(pgeneral);
          var letrasFinal = promInicialesPalabra(pgeneral);
          help.push({
            nombre: (_element9$estudiante = _element9.estudiante) === null || _element9$estudiante === void 0 ? void 0 : _element9$estudiante.fullname,
            curso: (_rowM$curso3 = rowM.curso) === null || _rowM$curso3 === void 0 ? void 0 : _rowM$curso3.nombre,
            periodo: (_rowM$periodo3 = rowM.periodo) === null || _rowM$periodo3 === void 0 ? void 0 : _rowM$periodo3.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            data3: aux3,
            pgeneral: pgeneral ? pgeneral.toString().replace('.', ',') : '',
            letrasFinal,
            promFinLetra
          });
        }
      } //console.log(help)


      return help;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  var promInformeElem = (rowM, rowD, estudiantes) => {
    try {
      var matriculas = rowM === null || rowM === void 0 ? void 0 : rowM.matriculas;
      var distributivo = rowD === null || rowD === void 0 ? void 0 : rowD.carga;
      var help = [];
      var fechaA = fechaActual();

      for (var i = 0; i < (matriculas === null || matriculas === void 0 ? void 0 : matriculas.length); i++) {
        var _element10 = matriculas[i];
        var aux = [];
        var aux2 = [];

        if (estudiantes.includes(_element10.fkestudiante)) {
          var _element10$estudiante, _rowM$curso4, _rowM$periodo4;

          var computo = matriculas[i].computo;
          var promAB = [];
          var general = [];
          var promCD = [];
          var general2 = [];
          var promEF = [];
          var general33 = [];
          var general3 = [];

          for (var j = 0; j < (distributivo === null || distributivo === void 0 ? void 0 : distributivo.length); j++) {
            var _subelement$materia22;

            var subelement = distributivo[j];

            if (((_subelement$materia22 = subelement.materia) === null || _subelement$materia22 === void 0 ? void 0 : _subelement$materia22.nombre) != 'COMPORTAMIENTO') {
              var _subelement$materia23, _subelement$materia24, _subelement$materia25;

              var sumAB = void 0,
                  sumAB90 = void 0,
                  pry1 = void 0,
                  exa1 = void 0,
                  sumAB10 = void 0,
                  proAB = void 0,
                  sumCD = void 0,
                  sumCD90 = void 0,
                  pry2 = void 0,
                  sumCD10 = void 0,
                  proCD = void 0,
                  final = void 0,
                  exa2 = void 0,
                  pytf = void 0,
                  sumEF = void 0,
                  sumEF90 = void 0,
                  pry3 = void 0,
                  exa3 = void 0,
                  sumEF10 = void 0,
                  proEF = void 0,
                  letras1 = void 0,
                  letras2 = void 0,
                  letras3 = void 0,
                  letrasf = '';
              var computos = (_subelement$materia23 = subelement.materia) === null || _subelement$materia23 === void 0 ? void 0 : _subelement$materia23.computo;

              for (var m = 0; m < computo.length; m++) {
                var result = computo[m];

                if (subelement.fkmaterias == result.fkmateria) {
                  var ins = result.notas;
                  var res = result.resultados;
                  sumAB = ins === null || ins === void 0 ? void 0 : ins.sumAB;
                  sumAB90 = ins === null || ins === void 0 ? void 0 : ins.sumAB90;
                  pry1 = ins === null || ins === void 0 ? void 0 : ins.pry1;
                  exa1 = ins === null || ins === void 0 ? void 0 : ins.exa1;
                  sumAB10 = ins === null || ins === void 0 ? void 0 : ins.sumAB10;
                  proAB = ins === null || ins === void 0 ? void 0 : ins.proAB;
                  letras1 = promIniciales(ins === null || ins === void 0 ? void 0 : ins.proAB);
                  sumCD = ins === null || ins === void 0 ? void 0 : ins.sumCD;
                  sumCD90 = ins === null || ins === void 0 ? void 0 : ins.sumCD90;
                  pry2 = ins === null || ins === void 0 ? void 0 : ins.pry2;
                  exa2 = ins === null || ins === void 0 ? void 0 : ins.exa2;
                  sumCD10 = ins === null || ins === void 0 ? void 0 : ins.sumCD10;
                  proCD = ins === null || ins === void 0 ? void 0 : ins.proCD;
                  letras2 = promIniciales(ins === null || ins === void 0 ? void 0 : ins.proCD);
                  sumEF = ins === null || ins === void 0 ? void 0 : ins.sumEF;
                  sumEF90 = ins === null || ins === void 0 ? void 0 : ins.sumEF90;
                  pry3 = ins === null || ins === void 0 ? void 0 : ins.pry3;
                  exa3 = ins === null || ins === void 0 ? void 0 : ins.exa3;
                  sumEF10 = ins === null || ins === void 0 ? void 0 : ins.sumEF10;
                  proEF = ins === null || ins === void 0 ? void 0 : ins.proEF;
                  letras3 = promIniciales(ins === null || ins === void 0 ? void 0 : ins.proEF);
                  final = res === null || res === void 0 ? void 0 : res.notaFinal;
                  pytf = res === null || res === void 0 ? void 0 : res.pytf;
                  letrasf = promIniciales(res === null || res === void 0 ? void 0 : res.notaFinal);
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
                materia: (_subelement$materia24 = subelement.materia) === null || _subelement$materia24 === void 0 ? void 0 : _subelement$materia24.nombre,
                computo: computos,
                area: (_subelement$materia25 = subelement.materia) === null || _subelement$materia25 === void 0 ? void 0 : _subelement$materia25.area,
                sumAB,
                sumAB90,
                pry1,
                exa1,
                sumAB10,
                proAB,
                sumCD,
                sumCD90,
                pry2,
                exa2,
                sumCD10,
                proCD,
                final,
                sumEF,
                sumEF90,
                pry3,
                exa3,
                pytf,
                sumEF10,
                proEF,
                letras1,
                letras2,
                letras3,
                letrasf
              });
            } else {
              var _subelement$materia26;

              var p1 = void 0,
                  p2 = void 0,
                  _final = '';

              for (var _m5 = 0; _m5 < computo.length; _m5++) {
                var _result5 = computo[_m5];

                if (subelement.fkmaterias == _result5.fkmateria) {
                  var _result5$resultados;

                  var _ins14 = _result5.cualitativo;
                  p1 = _ins14.p1;
                  p2 = _ins14.p2;
                  _final = (_result5$resultados = _result5.resultados) === null || _result5$resultados === void 0 ? void 0 : _result5$resultados.promGen;
                }
              }

              aux2.push({
                materia: (_subelement$materia26 = subelement.materia) === null || _subelement$materia26 === void 0 ? void 0 : _subelement$materia26.nombre,
                final: _final,
                p1,
                p2
              });
            }
          }

          var pAB = calcProm(promAB);
          var pgeneral = calcProm(general);
          var ll1 = promIniciales(pgeneral);
          var pCD = calcProm(promCD);
          var pgeneral2 = calcProm(general2);
          var ll2 = promIniciales(pgeneral2);
          var pEF = calcProm(promEF);
          var pgeneral33 = calcProm(general33);
          var ll3 = promIniciales(pgeneral33);
          var pgeneral3 = calcProm(general3);
          var letra = promIniciales(pgeneral3);
          help.push({
            nombre: (_element10$estudiante = _element10.estudiante) === null || _element10$estudiante === void 0 ? void 0 : _element10$estudiante.fullname,
            curso: (_rowM$curso4 = rowM.curso) === null || _rowM$curso4 === void 0 ? void 0 : _rowM$curso4.nombre,
            periodo: (_rowM$periodo4 = rowM.periodo) === null || _rowM$periodo4 === void 0 ? void 0 : _rowM$periodo4.nombre,
            paralelo: rowM.paralelo,
            data: aux,
            data2: aux2,
            pgeneral3,
            pAB,
            pgeneral,
            pCD,
            pgeneral2,
            fechaA,
            nmatricula: _element10.nmatricula,
            pEF,
            pgeneral33,
            letra,
            ll1,
            ll2,
            ll3
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
    juntasOnly,
    juntasFinal,
    juntasGeneral,
    promJuntaComportamiento,
    promLibretasElem,
    promFinalElem,
    promPromocionElem,
    promInformeElem
  };
};

exports.element = element;

function retornNumber(letra) {
  var aux = 0;

  switch (letra) {
    case 'A':
      aux = 4;
      break;

    case 'EP':
      aux = 3;
      break;

    case 'I':
      aux = 2;
      break;

    case 'NE':
      aux = 1;
      break;

    default:
      break;
  }

  return aux;
}

function retornLetra(mep) {
  var letra = '';

  switch (mep) {
    case 4:
      letra = 'ADQUIRIDA';
      break;

    case 3:
      letra = 'EN PROCESO';
      break;

    case 2:
      letra = 'INICIADO';
      break;

    case 1:
      letra = 'NO EVALUADO';
      break;

    default:
      break;
  }

  return letra;
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
      var _element11 = array[i];
      var op = _element11;
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
      var _element12 = array[_i3];
      var _op = _element12;
      if (_op == 'EX' || _op == 'EX Excelente') _a += 1;
      if (_op == 'MB' || _op == 'MB Muy Buena') _b += 1;
      if (_op == 'B' || _op == 'B Buena') _c += 1;
      if (_op == 'R' || _op == 'R Regular') _d += 1;
    }

    _reg.push(_a, _b, _c, _d);

    return _reg;
  }
}

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

function lettersToletters(numb) {
  var letra = '';

  switch (numb) {
    case 'A':
      letra = 'ADQUIRIDA';
      break;

    case 'EP':
      letra = 'EN PROCESO';
      break;

    case 'I':
      letra = 'INICIADO';
      break;

    case 'NE':
      letra = 'NO EVALUADO';
      break;
  }

  return letra;
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