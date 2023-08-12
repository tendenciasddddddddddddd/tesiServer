export const promedio = () => {
    function trunc(x, posiciones = 0) {
        var s = x.toString()
        var decimalLength = s.indexOf('.') + 1
        var numStr = s.substr(0, decimalLength + posiciones)
        return Number(numStr)
    }
    const ifDecimal = (num) => {
        if (num != '') {
            var partes = num.toString().split('.');
            var re = /^-?[0-9]+$/;
            if (re.test(num)) {
                return num + ".00";
            } else if (partes[1]?.length == 1) {
                return num + "0";
            } else {
                return num
            }
        } else {
            return '';
        }
    };
    const ifDecimal3 = (num) => {
        try {
          if (num != '') {
            var partes = num.toString().split('.');
            var re = /^-?[0-9]+$/;
            if (re.test(num)) {
              return num + ".00";
            } else if (partes[1]?.length == 1) {
              return num + "0";
            } else {
              return ifDecimal(trunc(num, 2))
            }
          } else {
            return '';
          }
        } catch (error) {
          return num
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
        let aux = parseFloat(prom)
        let promedio = ((aux * 8) / 10);
        let result = trunc(promedio, 2)
        if (result == 0) return '0.00'
        if (isNaN(result) || result == '') result = ''
        let salida = ifDecimal(result)
        return salida;
    }
    function calcular_porcentaje_examen(nota) {
        let aux = parseFloat(nota)
        let promedio = ((aux * 2) / 10);
        let result = trunc(promedio, 2)
        if (result == 0) return '0.00'
        if (isNaN(result) || result == '') result = ''
        let salida = ifDecimal(result)
        return salida;
    }
    function calcularPromedio_quimestre(n1, n2) {
        let aux1 = parseFloat(n1)
        let aux2 = parseFloat(n2)
        let suma = (aux2 + aux1).toFixed(2);
        if(suma ==0) return '0.00'
        if (isNaN(suma) || suma == '') suma = ''
        return suma
      }
    function promedioInsumos(n1, n2, n3, n4, n5) {
        const array = []
        let promedio = 0;
        if (n1 != '' && validarNumber(n1)) array.push(n1)
        if (n2 != '' && validarNumber(n2)) array.push(n2)
        if (n3 != '' && validarNumber(n3)) array.push(n3)
        if (n4 != '' && validarNumber(n4)) array.push(n4)
        if (n5 != '' && validarNumber(n4)) array.push(n5)
        var sumatoria = array.reduce(function (acumulador, siguienteValor) {
            return acumulador + parseFloat(siguienteValor);
        }, 0);
        promedio = (sumatoria / array.length);
        let result = trunc(promedio, 2)
        if (result == 0) return '0.00';
        if (isNaN(result) || result == '') result = ''
        let salida = ifDecimal(result)
        return salida;
    }

    function calacular_dos_parciales(pa1, pa2) {
        var suma = parseFloat(pa1) + parseFloat(pa2)
        let promedio = (suma / 2);
        let result = trunc(promedio, 2)
        if (result == 0) return '0.00'
        if (isNaN(result) || result == '') result = ''
        let salida = ifDecimal(result)
        return salida;
    }
    //================================RETORNA EL PROMEDIO DE 2 PARCIALES=================
    var sumaParciales = function (q1, q2) {
        var res = calacular_dos_parciales(q1, q2)
        return res;
    };
    var sumaParciales80 = function (prom) {
        var test = prom.toString().replace(",", ".")
        let res = calcular_porcentaje_paciales(test)
        return res;
    };

    var examen20 = function (exa) {
        var test = exa ? exa.toString().replace(",", ".") : ''
        let res = calcular_porcentaje_examen(test)
        return res;
    };
    var totalPrimerQuim = function (v80, v20) {
        var test1 = v80 ? v80.toString().replace(",", ".") : ''
        var test2 = v20 ? v20.toString().replace(",", ".") : ''
        let res = calcularPromedio_quimestre(test1, test2)
        return res
    };

    var finalAnual = function (pr1,pr2) {
        let sum = (parseFloat(pr1) + parseFloat(pr2)) / 2;
        if(sum==0) return '0.00' 
        let suma = trunc(sum, 2)
        if (isNaN(suma) || suma == '') suma = ''
        let salida = ifDecimal3(sum)
        return salida
      }
      var finalSupletorios = function (resultados) {
        const supl = resultados.supletorio ? resultados.supletorio.toString().replace(",", ".") : ''
        const rem = resultados.remedial ? resultados.remedial.toString().replace(",", ".") : ''
        const graci = resultados.gracia ? resultados.gracia.toString().replace(",", ".") : ''
        const promfin = resultados.promedioFinal ? resultados.promedioFinal.toString().replace(",", ".") : ''
        const suple = parseFloat(supl)
        const reme = parseFloat(rem)
        const gracia = parseFloat(graci)
        const final = parseFloat(promfin)
        var result = 0
        if (gracia > 0 && gracia <= 10) {
          if (gracia >= 7 && gracia <= 10) result = 7.00
            else result = final
        } else if (reme > 0 && reme <= 10) {
          if (reme >= 7 && reme <= 10) result = 7.00
          else result = final
        } else if (suple > 0 && suple <= 10) {
          if (suple >= 7 && suple <= 10) result = 7.00
            else result = final
        } else {
          result = 0
        }
        return `${result}`;
      }

    return { promedioInsumos, sumaParciales, sumaParciales80, examen20, totalPrimerQuim,finalAnual, finalSupletorios, ifDecimal}
};