"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conString = void 0;

var conString = () => {
  var trasformnumberToText = num => {
    if (num == '') return 'Sin confirmar';
    if (num == undefined) return 'Sin confirmar';
    if (isNaN(num)) return 'Sin confirmar';
    var result = parseFloat(num);
    return NumeroALetras(result);
  };

  return {
    trasformnumberToText
  };
};

exports.conString = conString;

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
  } else return 'Cero';
}