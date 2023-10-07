"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promedio = void 0;

var promedio = () => {
  function trunc(x) {
    var posiciones = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var s = x.toString();
    var decimalLength = s.indexOf('.') + 1;
    var numStr = s.substr(0, decimalLength + posiciones);
    return Number(numStr);
  }

  var ifDecimal = num => {
    if (num != '') {
      var _partes$;

      var partes = num.toString().split('.');
      var re = /^-?[0-9]+$/;

      if (re.test(num)) {
        return num + ".00";
      } else if (((_partes$ = partes[1]) === null || _partes$ === void 0 ? void 0 : _partes$.length) == 1) {
        return num + "0";
      } else {
        return num;
      }
    } else {
      return '';
    }
  };

  var ifDecimal3 = num => {
    try {
      if (isNaN(num)) return '';

      if (num != '') {
        var _partes$2;

        var partes = num.toString().split('.');
        var re = /^-?[0-9]+$/;

        if (re.test(num)) {
          return num + ".00";
        } else if (((_partes$2 = partes[1]) === null || _partes$2 === void 0 ? void 0 : _partes$2.length) == 1) {
          return num + "0";
        } else {
          return ifDecimal(trunc(num, 2));
        }
      } else {
        return '';
      }
    } catch (error) {
      return num;
    }
  };

  function validarNumber(num) {
    if (num >= 0 && num <= 10) {
      return true;
    } else {
      return false;
    }
  }

  function calcular_porcentaje_paciales(prom) {
    var aux = parseFloat(prom);
    var promedio = aux * 9 / 10;
    var result = trunc(promedio, 2);
    if (result == 0) return '0.00';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  }

  function calcularPromedio_quimestre(n1, n2) {
    var aux1 = parseFloat(n1);
    var aux2 = parseFloat(n2);
    var suma = (aux2 + aux1).toFixed(2);
    if (suma == 0) return '0.00';
    if (isNaN(suma) || suma == '') suma = '';
    return suma;
  }

  function promedioInsumos(n1, n2, n3, n4) {
    var array = [];
    var promedio = 0;
    if (n1 != '' && validarNumber(n1)) array.push(n1);
    if (n2 != '' && validarNumber(n2)) array.push(n2);
    if (n3 != '' && validarNumber(n3)) array.push(n3);
    if (n4 != '' && validarNumber(n4)) array.push(n4);
    var sumatoria = array.reduce(function (acumulador, siguienteValor) {
      return acumulador + parseFloat(siguienteValor);
    }, 0);
    promedio = sumatoria / array.length;
    var result = trunc(promedio, 2);
    if (result == 0) return '0.00';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  }

  function calacular_dos_parciales(pa1, pa2) {
    var suma = parseFloat(pa1) + parseFloat(pa2);
    var promedio = suma / 2;
    var result = trunc(promedio, 2);
    if (result == 0) return '0.00';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  }

  function calcular_porcentaje_examen(nota, nota2) {
    var aux = parseFloat(nota);
    var aux2 = parseFloat(nota2);
    var res = calacular_dos(aux, aux2);
    var promedio = res * 1 / 10;
    var result = trunc(promedio, 2);
    if (result == 0) return '';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  }

  function ponderado(nota) {
    var aux = parseFloat(nota);
    var promedio = aux * 3 / 10;
    var result = trunc(promedio, 2);
    if (result == 0) return '';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  }

  function ponderado90(nota) {
    var aux = parseFloat(nota);
    var promedio = aux * 9 / 10;
    var result = trunc(promedio, 2);
    if (result == 0) return '';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  }

  function calacular_dos(pa1, pa2) {
    var suma = parseFloat(pa1) + parseFloat(pa2);
    var promedio = suma / 2;
    var result = trunc(promedio, 2);
    if (result == 0) return '';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  } //================================RETORNA EL PROMEDIO DE 2 PARCIALES=================


  var sumaParciales = function sumaParciales(q1, q2) {
    var res = calacular_dos_parciales(q1, q2);
    return res;
  };

  var sumaParciales80 = function sumaParciales80(prom) {
    var test = prom.toString().replace(",", ".");
    var res = calcular_porcentaje_paciales(test);
    return res;
  };

  var examen20 = function examen20(exa, pyt) {
    var test = exa ? exa.toString().replace(",", ".") : '';
    var test2 = pyt ? pyt.toString().replace(",", ".") : '';
    var res = calcular_porcentaje_examen(test, test2);
    return res;
  };

  var totalPrimerQuim = function totalPrimerQuim(v80, v20) {
    var test1 = v80 ? v80.toString().replace(",", ".") : '';
    var test2 = v20 ? v20.toString().replace(",", ".") : '';
    var res = calcularPromedio_quimestre(test1, test2);
    return res;
  };

  var finalAnual = function finalAnual(pr1, pr2, pr3) {
    var sum = (parseFloat(pr1) + parseFloat(pr2) + parseFloat(pr3)) / 3;
    if (sum == 0) return ''; //TODO PARA CAMBIAR 0.00

    var suma = trunc(sum, 2);
    if (isNaN(suma) || suma == '') suma = '';
    var salida = ifDecimal3(sum);
    return salida;
  };

  var finalSupletorios = function finalSupletorios(resultados) {
    var supl = resultados.supletorio ? resultados.supletorio.toString().replace(",", ".") : '';
    var promfin = resultados.promGen ? resultados.promGen.toString().replace(",", ".") : '';
    var suple = parseFloat(supl);
    var final = parseFloat(promfin);
    var result = 0;

    if (suple > 0 && suple <= 10) {
      if (suple >= 7 && suple <= 10) result = 7.00;else result = final;
    } else {
      result = 0;
    }

    return "".concat(result);
  };

  function calcUnoPonderado(nota) {
    var aux = parseFloat(nota);
    var promedio = aux * 1 / 10;
    var result = trunc(promedio, 2);
    if (result == 0) return '';
    if (isNaN(result) || result == '') result = '';
    var salida = ifDecimal(result);
    return salida;
  }

  function calcDosPonderado(exa, pyt) {
    var test = exa ? exa.toString().replace(",", ".") : '';
    var test2 = pyt ? pyt.toString().replace(",", ".") : '';
    var res = calcular_porcentaje_examen(test, test2);
    return res;
  }

  var sumatoriaProm = function sumatoriaProm(rest, rest2) {
    var test = rest ? rest.toString().replace(",", ".") : '';
    var test2 = rest2 ? rest2.toString().replace(",", ".") : '';
    var suma10 = parseFloat(test);
    var suma90 = parseFloat(test2);
    var res = (suma10 + suma90).toFixed(2);
    if (isNaN(res) || res == '') res = '';
    return res;
  };

  return {
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
    sumatoriaProm,
    calcDosPonderado
  };
};

exports.promedio = promedio;