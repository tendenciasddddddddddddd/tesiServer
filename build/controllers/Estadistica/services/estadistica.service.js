"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.estadistica = void 0;

var estadistica = () => {
  //CALCULAMOS LOS PROMEDIOS POR CURSO
  var promByCurso = array => {
    try {
      var aux = [];
      array === null || array === void 0 ? void 0 : array.forEach(item => {
        var {
          matriculas,
          curso,
          paralelo
        } = item;
        var proAB = [];
        var proCD = [];
        var proEF = [];
        var final = [];
        var ppa = [];
        var ppb = [];
        var ppc = [];
        var ppd = [];
        var ppe = [];
        var ppf = [];
        var pry1 = [];
        var pry2 = [];
        var pry3 = [];
        var exa1 = [];
        var exa2 = [];
        var exa3 = [];
        matriculas === null || matriculas === void 0 ? void 0 : matriculas.forEach(subitem => {
          var {
            computo
          } = subitem;
          computo === null || computo === void 0 ? void 0 : computo.forEach(mititem => {
            var {
              notas,
              resultados
            } = mititem;
            /* PARA ACTIVIDADES*/

            ppa.push(notas === null || notas === void 0 ? void 0 : notas.ppa);
            ppb.push(notas === null || notas === void 0 ? void 0 : notas.ppb);
            ppc.push(notas === null || notas === void 0 ? void 0 : notas.ppc);
            ppd.push(notas === null || notas === void 0 ? void 0 : notas.ppd);
            ppe.push(notas === null || notas === void 0 ? void 0 : notas.ppe);
            ppf.push(notas === null || notas === void 0 ? void 0 : notas.ppf);
            pry1.push(notas === null || notas === void 0 ? void 0 : notas.pry1);
            pry2.push(notas === null || notas === void 0 ? void 0 : notas.pry2);
            pry3.push(notas === null || notas === void 0 ? void 0 : notas.pry3);
            exa1.push(notas === null || notas === void 0 ? void 0 : notas.exa1);
            exa2.push(notas === null || notas === void 0 ? void 0 : notas.exa2);
            exa3.push(notas === null || notas === void 0 ? void 0 : notas.exa3);
            proAB.push(notas === null || notas === void 0 ? void 0 : notas.proAB);
            proCD.push(notas === null || notas === void 0 ? void 0 : notas.proCD);
            proEF.push(notas === null || notas === void 0 ? void 0 : notas.proEF);
            final.push(resultados === null || resultados === void 0 ? void 0 : resultados.notaFinal);
          });
        });
        var pa = calcProm(ppa);
        var pb = calcProm(ppb);
        var pc = calcProm(ppc);
        var pd = calcProm(ppd);
        var pe = calcProm(ppe);
        var pf = calcProm(ppf);
        var py1 = calcProm(pry1);
        var py2 = calcProm(pry2);
        var py3 = calcProm(pry3);
        var ex1 = calcProm(exa1);
        var ex2 = calcProm(exa2);
        var ex3 = calcProm(exa3);
        var pAB = calcProm(proAB);
        var pCD = calcProm(proCD);
        var pEF = calcProm(proEF);
        var pFinal = calcProm(final);
        aux.push({
          curso,
          paralelo,
          pa,
          pb,
          pc,
          pd,
          pe,
          pf,
          py1,
          py2,
          py3,
          ex1,
          ex2,
          ex3,
          pAB,
          pCD,
          pEF,
          pFinal
        });
      });
      return aux;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    promByCurso
  };
};

exports.estadistica = estadistica;

var calcProm = array => {
  var contador = 0;
  var aux = 0;
  var result = 0;

  for (var i = 0; i < array.length; i++) {
    var element = array[i];
    var letras = ['EX', 'MB', 'B', 'R', 'A', 'B', 'C', 'D', 'E'];
    if (letras.includes(element)) continue;
    if (element == '') continue;
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