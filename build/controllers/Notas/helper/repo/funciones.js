"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.funciones = void 0;

var funciones = () => {
  //CALCULAMOS LOS PROMEDIOS FINALES 
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
  }; //FECHA ACTUAL DE REPORTES 


  var fechaActual = () => {
    var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var dateObj = new Date();
    var month = monthNames[dateObj.getMonth()];
    var day = String(dateObj.getDate()).padStart(2, '0');
    var year = dateObj.getFullYear();
    var output = day + " de " + month + '\n' + ' del ' + year;
    return output;
  }; //CALCULAMOS LA MEDIA DE REPORTES POR %%


  var calcMedia = array => {
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
  }; //RETORNA LA LETRAS DE ESCALA


  var promCuantitativoLetras = num => {
    if (!num || num == '') return '';
    if (num >= 9 && num <= 10) return 'DA';else if (num >= 7 && num <= 8.99) return 'AA';else if (num >= 4.01 && num <= 9.99) return 'EP';else if (num <= 4) return 'NA';else return '';
  }; //RETORNA LA PALABRA COMPLETA


  var promCuantitativoPalabra = num => {
    if (!num || num == '') return '';
    if (num >= 9 && num <= 10) return 'Domina Aprendizaje';else if (num >= 7 && num <= 8.99) return 'Alcanza Aprendizaje';else if (num >= 4.01 && num <= 9.99) return 'Próximo Alcanzar';else if (num <= 4) return 'No Alcanza';else return '';
  }; //RETORNA LA PALABRA COMPLETA INICIALES


  var promInicialesPalabra = num => {
    if (!num || num == '') return '';
    if (num >= 9 && num <= 10) return 'ADQUIRIDA';else if (num >= 7 && num <= 8.99) return 'EN PROCESO';else if (num >= 4.01 && num <= 9.99) return 'INICIADO';else if (num <= 4) return 'NO EVALUADO';else return '';
  }; //RETORNA LA ESCALA DE CUALITATIVA


  var promIniciales = num => {
    if (!num || num == '') return '';
    if (num >= 9 && num <= 10) return 'A';else if (num >= 7 && num <= 8.99) return 'EP';else if (num >= 4.01 && num <= 9.99) return 'I';else if (num <= 4) return 'NE';else return '';
  }; //RETORNA LA LETRA DE PROMEDIOS


  var promCuantitativoLetrasDos = num => {
    if (!num || num == '') return '';
    if (num >= 9 && num <= 10) return 'EX';else if (num >= 7 && num <= 8.99) return 'MB';else if (num >= 4.01 && num <= 9.99) return 'B';else if (num <= 4) return 'R';else return '';
  }; //RETORNA LA PALABRA DE PROMEDIOS


  var promCuantitativoPalabraDos = num => {
    if (!num || num == '') return '';
    if (num >= 9 && num <= 10) return 'EX Excelente';else if (num >= 7 && num <= 8.99) return 'MB Muy Buena';else if (num >= 4.01 && num <= 9.99) return 'B Buena';else if (num <= 4) return 'R Regular';else return '';
  }; // RETORNA EL PROMEDIO DE NOTAS VERTICAL


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
  }; //RETORNA PROMEDIO DE PROYECTOS PARA PROMOCION


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
  }; //RETORNE LA LETRA DEL COMPORTAMIENTO


  var setPalabraComportamiento = p1 => {
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
  }; //RETORNE MEDIA LETRAS 


  var setMediaLetra = (array, materia) => {
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

      for (var _i = 0; _i < array.length; _i++) {
        var _element = array[_i];
        var _op = _element;
        if (_op == 'EX' || _op == 'EX Excelente') _a += 1;
        if (_op == 'MB' || _op == 'MB Muy Buena') _b += 1;
        if (_op == 'B' || _op == 'B Buena') _c += 1;
        if (_op == 'R' || _op == 'R Regular') _d += 1;
      }

      _reg.push(_a, _b, _c, _d);

      return _reg;
    }
  };

  return {
    calcProm,
    fechaActual,
    calcMedia,
    promCuantitativoLetras,
    promCuantitativoLetrasDos,
    calcPromMatriz,
    calcularPryectos,
    promCuantitativoPalabra,
    promInicialesPalabra,
    promIniciales,
    setPalabraComportamiento,
    setMediaLetra,
    promCuantitativoPalabraDos
  };
}; //PARA TRUNCAR LOS PROMEDIOS


exports.funciones = funciones;

function trunc(x) {
  var posiciones = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var s = x.toString();
  var decimalLength = s.indexOf('.') + 1;
  var numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
} //RELLENAR CON CERO A LOS NUMEROS


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