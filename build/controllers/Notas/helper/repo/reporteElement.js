"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reporteElement = void 0;

var reporteElement = () => {
  var calcProm = array => {
    var contador = 0;
    var aux = 0;

    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      if (element == '') continue;
      if (element == undefined) continue;
      contador = contador + retornNumber(element);
      aux += 1;
    }

    var sum = '';
    if (contador != 0) sum = (contador / aux).toFixed();
    return retornLetra(parseInt(sum));
  };

  var calcMedia = array => {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var reg = [];

    for (var i = 0; i < array.length; i++) {
      var element = array[i];
      var op = retornNumber(element);
      if (op == 4) a += 1;
      if (op == 3) b += 1;
      if (op == 2) c += 1;
      if (op == 1) d += 1;
    }

    reg.push(a, b, c, d);
    return reg;
  }; //TODO  PROMEDIO DE JUNTAS 2DO 3RO 4TO


  function juntasOnly(rowM, rowD, estudiantes, quim, paralelo, keymateria) {
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
                var letras = '';

                for (var i = 0; i < computo.length; i++) {
                  var element = computo[i];

                  if (element.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER TRIMESTRE') {
                      var _element$notas, _element$notas2, _element$notas3, _element$notas4, _element$notas5, _element$notas6;

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
                      exa1 = (_element$notas4 = element.notas) === null || _element$notas4 === void 0 ? void 0 : _element$notas4.exa1;
                      pry1 = (_element$notas5 = element.notas) === null || _element$notas5 === void 0 ? void 0 : _element$notas5.pry1;
                      proAB = (_element$notas6 = element.notas) === null || _element$notas6 === void 0 ? void 0 : _element$notas6.proAB;
                      letras = lettersToletters(ins === null || ins === void 0 ? void 0 : ins.proAB);
                    }

                    if (quim == 'SEGUNDO TRIMESTRE') {
                      var _element$notas7, _element$notas8, _element$notas9, _element$notas10, _element$notas11, _element$notas12;

                      var _ins = element.notas;
                      n1 = _ins === null || _ins === void 0 ? void 0 : _ins.c1;
                      n2 = _ins === null || _ins === void 0 ? void 0 : _ins.c2;
                      n3 = _ins === null || _ins === void 0 ? void 0 : _ins.c3;
                      n4 = _ins === null || _ins === void 0 ? void 0 : _ins.c4;
                      n6 = _ins === null || _ins === void 0 ? void 0 : _ins.d1;
                      n7 = _ins === null || _ins === void 0 ? void 0 : _ins.d2;
                      n8 = _ins === null || _ins === void 0 ? void 0 : _ins.d3;
                      n9 = _ins === null || _ins === void 0 ? void 0 : _ins.d4;
                      ppa = (_element$notas7 = element.notas) === null || _element$notas7 === void 0 ? void 0 : _element$notas7.ppc;
                      ppb = (_element$notas8 = element.notas) === null || _element$notas8 === void 0 ? void 0 : _element$notas8.ppd;
                      sumAB = (_element$notas9 = element.notas) === null || _element$notas9 === void 0 ? void 0 : _element$notas9.sumCD;
                      exa1 = (_element$notas10 = element.notas) === null || _element$notas10 === void 0 ? void 0 : _element$notas10.exa2;
                      pry1 = (_element$notas11 = element.notas) === null || _element$notas11 === void 0 ? void 0 : _element$notas11.pry2;
                      proAB = (_element$notas12 = element.notas) === null || _element$notas12 === void 0 ? void 0 : _element$notas12.proCD;
                      letras = lettersToletters(_ins === null || _ins === void 0 ? void 0 : _ins.proCD);
                    }

                    if (quim == 'TERCER TRIMESTRE') {
                      var _element$notas13, _element$notas14, _element$notas15, _element$notas16, _element$notas17, _element$notas18;

                      var _ins2 = element.notas;
                      n1 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e1;
                      n2 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e2;
                      n3 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e3;
                      n4 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.e4;
                      n6 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f1;
                      n7 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f2;
                      n8 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f3;
                      n9 = _ins2 === null || _ins2 === void 0 ? void 0 : _ins2.f4;
                      ppa = (_element$notas13 = element.notas) === null || _element$notas13 === void 0 ? void 0 : _element$notas13.ppe;
                      ppb = (_element$notas14 = element.notas) === null || _element$notas14 === void 0 ? void 0 : _element$notas14.ppf;
                      sumAB = (_element$notas15 = element.notas) === null || _element$notas15 === void 0 ? void 0 : _element$notas15.sumEF;
                      exa1 = (_element$notas16 = element.notas) === null || _element$notas16 === void 0 ? void 0 : _element$notas16.exa3;
                      pry1 = (_element$notas17 = element.notas) === null || _element$notas17 === void 0 ? void 0 : _element$notas17.pry3;
                      proAB = (_element$notas18 = element.notas) === null || _element$notas18 === void 0 ? void 0 : _element$notas18.proEF;
                      letras = lettersToletters(_ins2 === null || _ins2 === void 0 ? void 0 : _ins2.proEF);
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
            help.push({
              materia: (_materias$materia2 = materias.materia) === null || _materias$materia2 === void 0 ? void 0 : _materias$materia2.nombre,
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
                var _letras = '';

                for (var _i = 0; _i < _computo.length; _i++) {
                  var _element = _computo[_i];

                  if (_element.fkmateria == materias.fkmaterias) {
                    if (quim == 'PRIMER TRIMESTRE') {
                      var _element$materia, _element$materia2;

                      var _ins3 = _element.cualitativo;
                      p1 = _ins3.p1;
                      p2 = _ins3.p2;
                      if (((_element$materia = _element.materia) === null || _element$materia === void 0 ? void 0 : _element$materia.nombre) == 'COMPORTAMIENTO' || ((_element$materia2 = _element.materia) === null || _element$materia2 === void 0 ? void 0 : _element$materia2.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins3.p1);else _letras = calcularPromedioInsumosLetras(_ins3.p1, _ins3.p2);
                    }

                    if (quim == 'SEGUNDO TRIMESTRE') {
                      var _element$materia3, _element$materia4;

                      var _ins4 = _element.cualitativo;
                      p1 = _ins4.p3;
                      p2 = _ins4.p4;
                      if (((_element$materia3 = _element.materia) === null || _element$materia3 === void 0 ? void 0 : _element$materia3.nombre) == 'COMPORTAMIENTO' || ((_element$materia4 = _element.materia) === null || _element$materia4 === void 0 ? void 0 : _element$materia4.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins4.p2);else _letras = calcularPromedioInsumosLetras(_ins4.p1, _ins4.p2);
                    }

                    if (quim == 'TERCER TRIMESTRE') {
                      var _element$materia5, _element$materia6;

                      var _ins5 = _element.cualitativo;
                      p1 = _ins5.p5;
                      p2 = _ins5.p6;
                      if (((_element$materia5 = _element.materia) === null || _element$materia5 === void 0 ? void 0 : _element$materia5.nombre) == 'COMPORTAMIENTO' || ((_element$materia6 = _element.materia) === null || _element$materia6 === void 0 ? void 0 : _element$materia6.nombre) == 'DESARROLLO HUMANO INTEGRAL') _letras = calcularPromedioInsumosLetrasComportamiento(_ins5.p3);else _letras = calcularPromedioInsumosLetras(_ins5.p1, _ins5.p2);
                    }
                  }
                }

                _proPPA.push(p1);

                _proPPB.push(p2);

                _promAB.push(_letras);

                aux2.push({
                  estudiante: (_res$estudiante2 = _res.estudiante) === null || _res$estudiante2 === void 0 ? void 0 : _res$estudiante2.fullname,
                  letras: _letras,
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
          var _materias$materia7, _materias$docente3;

          var aux = [];
          var materias = distributivo[j];
          var promAB = [];
          var promCD = [];
          var promEF = [];
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

              for (var i = 0; i < computo.length; i++) {
                var element = computo[i];

                if (element.fkmateria == materias.fkmaterias) {
                  var _element$notas19, _element$notas20, _element$notas21, _element$notas22;

                  var _res2 = element.resultados;
                  proAB = (_element$notas19 = element.notas) === null || _element$notas19 === void 0 ? void 0 : _element$notas19.proAB;
                  proCD = (_element$notas20 = element.notas) === null || _element$notas20 === void 0 ? void 0 : _element$notas20.proCD;
                  proEF = (_element$notas21 = element.notas) === null || _element$notas21 === void 0 ? void 0 : _element$notas21.proEF;
                  pytf = (_element$notas22 = element.notas) === null || _element$notas22 === void 0 ? void 0 : _element$notas22.pytf;
                  final = _res2 === null || _res2 === void 0 ? void 0 : _res2.notaFinal;
                }
              }

              promAB.push(proAB);
              promCD.push(proCD);
              promEF.push(proEF);
              promF.push(final);
              aux.push({
                estudiante: (_res$estudiante3 = res.estudiante) === null || _res$estudiante3 === void 0 ? void 0 : _res$estudiante3.fullname,
                proAB,
                proCD,
                proEF,
                pytf,
                final
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
          var prAB = calcProm(promF); //console.log(mediaPPA)
          //console.log(aux)

          help.push({
            materia: (_materias$materia7 = materias.materia) === null || _materias$materia7 === void 0 ? void 0 : _materias$materia7.nombre,
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
            prAB
          });
        }
      } // console.log('es100',help)


      return help;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    juntasOnly,
    juntasFinal
  };
};

exports.reporteElement = reporteElement;

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

    for (var _i2 = 0; _i2 < array.length; _i2++) {
      var _element2 = array[_i2];
      var _op = _element2;
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