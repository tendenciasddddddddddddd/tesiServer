"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promElement = void 0;

var promElement = () => {
  function convertirNum(p1, p2, p3, p4) {
    var aux = '';
    var aux2 = '';
    var aux3 = '';
    var aux4 = '';
    var res = [];

    switch (p1) {
      case "A":
        aux = 4;
        break;

      case "EP":
        aux = 3;
        break;

      case "I":
        aux = 2;
        break;

      case "NE":
        aux = 1;
        break;
    }

    switch (p2) {
      case "A":
        aux2 = 4;
        break;

      case "EP":
        aux2 = 3;
        break;

      case "I":
        aux2 = 2;
        break;

      case "NE":
        aux2 = 1;
        break;
    }

    switch (p3) {
      case "A":
        aux3 = 4;
        break;

      case "EP":
        aux3 = 3;
        break;

      case "I":
        aux3 = 2;
        break;

      case "NE":
        aux3 = 1;
        break;
    }

    switch (p4) {
      case "A":
        aux4 = 4;
        break;

      case "EP":
        aux4 = 3;
        break;

      case "I":
        aux4 = 2;
        break;

      case "NE":
        aux4 = 1;
        break;
    }

    res.push(aux, aux2, aux3, aux4);
    return res;
  }

  function calcularPromedioInsumos(n1, n2, n3, n4) {
    var array = [];
    var promedio = 0;
    if (n1 != '' && n1) array.push(n1);
    if (n2 != '' && n2) array.push(n2);
    if (n3 != '' && n3) array.push(n3);
    if (n4 != '' && n4) array.push(n4);
    var sumatoria = array.reduce(function (acumulador, siguienteValor) {
      return acumulador + parseInt(siguienteValor);
    }, 0);
    var par = (sumatoria / array.length).toFixed(0);
    promedio = parseInt(par);
    if (promedio == 0) return '';
    if (isNaN(promedio) || promedio == '') promedio = '';
    var salida = numbToletters(promedio);
    return salida;
  }

  function numbToletters(numb) {
    var letra = '';

    switch (numb) {
      case 4:
        letra = 'A';
        break;

      case 3:
        letra = 'EP';
        break;

      case 2:
        letra = 'I';
        break;

      case 1:
        letra = 'NE';
        break;
    }

    return letra;
  }

  return {
    convertirNum,
    calcularPromedioInsumos
  };
};

exports.promElement = promElement;