export const funciones = () => {
   
    //CALCULAMOS LOS PROMEDIOS FINALES 
    const calcProm = (array) => {
        let contador = 0;
        let aux = 0
        let result = 0;
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element == '') continue;
            if (isNaN(element)) continue;
            contador = contador + parseFloat(element)
            aux += 1
        }
        let pro = contador / aux;
        result = trunc(pro, 2)
        if (isNaN(result) || result == '') result = ''
        return ifDecimal(result)
    }

    //FECHA ACTUAL DE REPORTES 
    const fechaActual = () => {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const dateObj = new Date();
        const month = monthNames[dateObj.getMonth()];
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const output = day + " de " + month + '\n' + ' del ' + year;
        return output
    }

    //CALCULAMOS LA MEDIA DE REPORTES POR %%
    const calcMedia = (array) => {
        let a = 0; let b = 0; let c = 0; let d = 0;
        const reg = [];
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            const op = parseFloat(element)
            if (op <= 10 && op > 8.99) a += 1;
            if (op < 9 && op >= 7) b += 1;
            if (op < 7 && op >= 5) c += 1;
            if (op < 5 && op >= 0) d += 1;
        }
        reg.push(a, b, c, d)
        return reg
    }

    //RETORNA LA LETRAS DE ESCALA
    const promCuantitativoLetras = (num) => {
        if(!num||num=='') return ''
        if (num >= 9 && num <= 10) return 'DA'
        else if (num >= 7 && num <= 8.99) return 'AA'
        else if (num >= 4.01 && num <= 9.99) return 'EP'
        else if (num <= 4) return 'NA'
        else return ''
    }

    //RETORNA LA PALABRA COMPLETA
    const promCuantitativoPalabra = (num) => {
        if(!num||num=='') return ''
        if (num >= 9 && num <= 10) return 'Domina Aprendizaje'
        else if (num >= 7 && num <= 8.99) return 'Alcanza Aprendizaje'
        else if (num >= 4.01 && num <= 9.99) return 'Próximo Alcanzar'
        else if (num <= 4) return 'No Alcanza'
        else return ''
    }

      //RETORNA LA PALABRA COMPLETA INICIALES
      const promInicialesPalabra = (num) => {
        if(!num||num=='') return ''
        if (num >= 9 && num <= 10) return 'ADQUIRIDA'
        else if (num >= 7 && num <= 8.99) return 'EN PROCESO'
        else if (num >= 4.01 && num <= 9.99) return 'INICIADO'
        else if (num <= 4) return 'NO EVALUADO'
        else return ''
    }

       //RETORNA LA ESCALA DE CUALITATIVA
       const promIniciales = (num) => {
        if(!num||num=='') return ''
        if (num >= 9 && num <= 10) return 'A'
        else if (num >= 7 && num <= 8.99) return 'EP'
        else if (num >= 4.01 && num <= 9.99) return 'I'
        else if (num <= 4) return 'NE'
        else return ''
    }

    //RETORNA LA LETRA DE PROMEDIOS
    const promCuantitativoLetrasDos = (num) => {
        if (!num || num == '') return ''
        if (num >= 9 && num <= 10) return 'EX'
        else if (num >= 7 && num <= 8.99) return 'MB'
        else if (num >= 4.01 && num <= 9.99) return 'B'
        else if (num <= 4) return 'R'
        else return ''
    }

       //RETORNA LA PALABRA DE PROMEDIOS
    const promCuantitativoPalabraDos = (num) => {
        if (!num || num == '') return ''
        if (num >= 9 && num <= 10) return 'EX Excelente'
        else if (num >= 7 && num <= 8.99) return 'MB Muy Buena'
        else if (num >= 4.01 && num <= 9.99) return 'B Buena'
        else if (num <= 4) return 'R Regular'
        else return ''
    }

    // RETORNA EL PROMEDIO DE NOTAS VERTICAL
    const calcPromMatriz = (arr, array) => {
        const notas = []
        for (let j = 0; j < array?.length; j++) {
            let contador = 0
            let aux = 0
            for (let k = 0; k < arr?.length; k++) {
                const res = arr[k].data;
                for (let m = 0; m < res.length; m++) {
                    const elemen = res[m];
                    if (m == j) {
                        if (elemen == '') continue;
                        contador = contador + parseFloat(elemen);
                        aux += 1
                    }
                }
            }
            let prom = 0
            if (aux != 0) prom = (contador / aux).toFixed(2)
            notas.push(prom);
        }
        return notas
    }

    //RETORNA PROMEDIO DE PROYECTOS PARA PROMOCION
    const calcularPryectos = (prmd, nombre) => {
        let letra = ''
        if (nombre == 'DESARROLLO HUMANO INTEGRAL' || nombre == 'COMPORTAMIENTO') {
            switch (prmd) {
                case 'A': letra = 'Muy Satisfactorio';
                    break;
                case 'B': letra = 'Satisfactorio';
                    break;
                case 'C': letra = 'Poco Satisfactorio';
                    break;
                case 'D': letra = 'Mejorable';
                    break;
                case 'e': letra = 'Insatisfactorio';
                    break;
                default:
                    letra = 'Sin Confirmar';
                    break;
            }
        } else {
            switch (prmd) {
                case 'EX': letra = 'Excelente';
                    break;
                case 'MB': letra = 'Muy Buena';
                    break;
                case 'B': letra = 'Buena';
                    break;
                case 'R': letra = 'Regular';
                    break;
                default:
                    letra = 'E';
                    break;
            }
        }
        return letra;
    }

    //RETORNE LA LETRA DEL COMPORTAMIENTO
    const setPalabraComportamiento = (p1) => {
        var letra = ''
        switch (p1) {
            case "A": letra = 'A Muy Satisfactorio';
                break;
            case "B": letra = 'B Satisfactorio';
                break;
            case "C": letra = 'C Poco Satisfactorio';
                break;
            case "D": letra = 'D Mejorable';
                break;
            case "E": letra = 'E Insatisfactorio';
                break;
            default:
                break;
        }
        return letra;
    }

    //RETORNE MEDIA LETRAS 
    const setMediaLetra = (array, materia) => {
        if(materia=='COMPORTAMIENTO'){
            let a = 0; let b = 0; let c = 0; let d = 0; let e =0;
            const reg = [];
            for (let i = 0; i < array.length; i++){
                const element = array[i];
                const op = element
                if (op =='A' ||op =='A Muy Satisfactorio') a += 1;
                if (op =='B'||op =='B Satisfactorio') b += 1;
                if (op =='C'||op =='C Poco Satisfactorio') c += 1;
                if (op =='D'||op =='D Mejorable') d += 1; 
                if (op =='E'||op =='E Insatisfactorio') e += 1;
            }
            reg.push(a, b, c, d, e)
            return reg
        } else {
            let a = 0; let b = 0; let c = 0; let d = 0;
            const reg = [];
            for (let i = 0; i < array.length; i++){
                const element = array[i];
                const op = element
                if (op =='EX' ||op =='EX Excelente') a += 1;
                if (op =='MB'||op =='MB Muy Buena') b += 1;
                if (op =='B'||op =='B Buena') c += 1;
                if (op =='R'||op =='R Regular') d += 1; 
            }
            reg.push(a, b, c, d)
            return reg
        }
    }

    return {
        calcProm, fechaActual, calcMedia, promCuantitativoLetras, promCuantitativoLetrasDos, calcPromMatriz, calcularPryectos,
        promCuantitativoPalabra, promInicialesPalabra, promIniciales, setPalabraComportamiento, setMediaLetra, promCuantitativoPalabraDos
    }
};

//PARA TRUNCAR LOS PROMEDIOS
function trunc(x, posiciones = 0) {
    var s = x.toString()
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}

//RELLENAR CON CERO A LOS NUMEROS
const ifDecimal = (num) => {
    if (num == 0) return '0.00'
    if (num != '') {
        var partes = num.toString().split('.');
        var re = /^-?[0-9]+$/;
        if (re.test(num)) {
            return num + ".00";
        } else if (partes[1]?.length == 1) {
            return num + "0";
        } else {
            return trunc(num, 2)
        }
    } else {
        return '';
    }
};





