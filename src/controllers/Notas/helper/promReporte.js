export const promedioReportes = () => {

    const trasformnumberToText = (num) => {
        if (num == '') return 'Sin confirmar'
        if (num == undefined) return 'Sin confirmar'
        if (isNaN(num)) return 'Sin confirmar'
        let result = parseFloat(num);
        return NumeroALetras(result)
    }
    const calcProm = (array) => {
        let contador = 0;
        let aux = 0
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element == '') continue;
            if (isNaN(element)) continue;
            contador = contador + parseFloat(element)
            aux += 1
        }
        let sum = '';
        if (contador != 0) sum = (contador / aux).toFixed(2)
        return sum
    }

    function formatPromociones(rowM, rowD, estudiantes) {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            for (let i = 0; i < matriculas?.length; i++) {
                const element = matriculas[i];
                const aux = []
                if (estudiantes.includes(element.fkestudiante)) {
                    const computo = matriculas[i].computo;
                    const promGeneral = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        let promedio, letras = '';
                        for (let m = 0; m < computo.length; m++) {
                            const result = computo[m];
                            if (subelement.fkmaterias == result.fkmateria) {
                                promedio = result.resultados.notaFinal
                            }
                        }
                        letras = trasformnumberToText(promedio)
                        promGeneral.push(promedio)
                        aux.push({
                            materia: subelement.materia?.nombre,
                            area: subelement.materia?.area,
                            promedio: promedio ? promedio.toString().replace('.', ',') : '',
                            letras: letras,
                        })
                    }
                    const pgeneral = calcProm(promGeneral)
                    const letrasFinal = trasformnumberToText(pgeneral)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,
                        pgeneral: pgeneral ? pgeneral.toString().replace('.', ',') : '',
                        letrasFinal: letrasFinal
                    })
                }
            }
            //console.log(help)
            return help
        } catch (error) {
            console.log(error)
            return []
        }
    }
    function formatMatricula(rowM, estudiantes) {
        try {
            const matriculas = rowM?.matriculas
            var fechaA = fechaActual()
            const help = []
            for (let i = 0; i < matriculas?.length; i++) {
                const element = matriculas[i];
                if (estudiantes.includes(element.fkestudiante)) {
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        nmatricula: element.nmatricula,
                        folio: element.folio,
                        fecha: element.fecha,
                        fechaA: fechaA
                    })
                }
            }
            return help
        } catch (error) {
            console.log(error)
            return []
        }
    }
    function formatLibretas(rowM, rowD, estudiantes, quim) {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            var fechaA = fechaActual()
            for (let i = 0; i < matriculas?.length; i++) {
                const element = matriculas[i];
                const aux = []
                if (estudiantes.includes(element.fkestudiante)) {
                    const computo = matriculas[i].computo;
                    const promPPA = []
                    const promPPB = []
                    const general = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        let n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, ppa, ppb, sumAB, sumAB80, exa1, sumAB20, proAB = ''
                        let letras = '';
                        for (let m = 0; m < computo.length; m++) {
                            const result = computo[m];
                            if (subelement.fkmaterias == result.fkmateria) {
                                if (quim == 'PRIMER QUIMESTRE') {
                                    const ins = result.notas
                                    n1 = ins?.a1; n2 = ins?.a2; n3 = ins?.a3; n4 = ins?.a4; n5 = ins?.a5;
                                    n6 = ins?.b1; n7 = ins?.b2; n8 = ins?.b3; n9 = ins?.b4; n10 = ins?.b5;
                                    ppa = ins?.ppa; ppb = ins?.ppb; sumAB = ins?.sumAB; sumAB80 = ins?.sumAB80;
                                    exa1 = ins?.exa1; sumAB20 = ins?.sumAB20; proAB = ins?.proAB;
                                    letras = promCuantitativoLetras(ins?.proAB);
                                }
                                if (quim == 'SEGUNDO QUIMESTRE') {
                                    const ins = result.notas
                                    n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4; n5 = ins?.c5;
                                    n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4; n10 = ins?.d5;
                                    ppa = ins?.ppc; ppb = ins?.ppd; sumAB = ins?.sumCD; sumAB80 = ins?.sumCD80;
                                    exa1 = ins?.exa2; sumAB20 = ins?.sumCD20; proAB = ins?.proCD;
                                    letras = promCuantitativoLetras(ins?.proCD);
                                }
                            }
                        }
                        promPPA.push(ppa)
                        promPPB.push(ppb)
                        general.push(proAB)
                        aux.push({
                            materia: subelement.materia?.nombre,
                            area: subelement.materia?.area,
                            n1: n1, n2: n2, n3: n3, n4: n4, n5: n5, n6: n6, n7: n7, n8: n8, n9: n9, n10: n10,
                            ppa: ppa, ppb: ppb, sumAB: sumAB, sumAB80: sumAB80, exa1: exa1, sumAB20: sumAB20, proAB: proAB,
                            letras: letras,
                        })
                    }
                    const pPPA = calcProm(promPPA)
                    const pPPB = calcProm(promPPB)
                    const pgeneral = calcProm(general)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux, pPPA: pPPA,
                        pPPB: pPPB, pgeneral: pgeneral,
                        fechaA: fechaA, nmatricula: element.nmatricula,
                    })
                }
            }
            //console.log(help)
            return help
        } catch (error) {
            console.log(error)
            return []
        }
    }
    function formatJuntas(rowM, rowD, estudiantes, quim,paralelo) {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            var fechaA = fechaActual()
            matriculas.sort(function (a, b) {
                var nameA = a.estudiante.fullname.toLowerCase(), nameB = b.estudiante.fullname.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            for (let j = 0; j < distributivo.length; j++) {
                const aux = []
                const materias = distributivo[j]
                const proPPA = []; const proPPB = []; const promAB = []
                for (let k = 0; k < matriculas.length; k++) {
                    const res = matriculas[k];
                    if (estudiantes.includes(res.fkestudiante)) {
                        const computo = matriculas[k].computo
                        let n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, ppa, ppb, sumAB, sumAB80, exa1, sumAB20, proAB = ''
                        let letras = '';
                        for (let i = 0; i < computo.length; i++) {
                            const element = computo[i];
                            if (element.fkmateria == materias.fkmaterias) {
                                const ins = element.notas
                                n1 = ins?.a1; n2 = ins?.a2; n3 = ins?.a3; n4 = ins?.a4; n5 = ins?.a5;
                                n6 = ins?.b1; n7 = ins?.b2; n8 = ins?.b3; n9 = ins?.b4; n10 = ins?.b5;
                                ppa = element.notas?.ppa
                                ppb = element.notas?.ppb
                                sumAB = element.notas?.sumAB
                                sumAB80 = element.notas?.sumAB80
                                exa1 = element.notas?.exa1
                                sumAB20 = element.notas?.sumAB20
                                proAB = element.notas?.proAB
                                letras = promCuantitativoLetras(ins?.proCD);
                            }
                        }
                        proPPA.push(ppa)
                        proPPB.push(ppb)
                        promAB.push(proAB)
                        aux.push({
                            estudiante: res.estudiante?.fullname,
                            n1: n1, n2: n2, n3: n3, n4: n4, n5: n5, n6: n6, n7: n7, n8: n8, n9: n9, n10: n10,
                            ppa: ppa,
                            ppb: ppb,
                            sumAB: sumAB,
                            sumAB80: sumAB80,
                            exa1: exa1,
                            sumAB20: sumAB20,
                            proAB: proAB,
                            letras : letras, 
                        })
                    }
                }
                const medPPA = calcMedia(proPPA)
                const medPPB = calcMedia(proPPB)
                const medAB = calcMedia(promAB)
                const pPPA = calcProm(proPPA)
                const pPPB = calcProm(proPPB)
                const prAB = calcProm(promAB)
                //console.log(mediaPPA)
                //console.log(distributivo)
                help.push({
                    materia: materias.materia?.nombre,
                    docente: materias.docente?.fullname,
                    curso: rowD?.curso.nombre,
                    paralelo: paralelo,
                    data: aux,
                    fechaA : fechaA,
                    medPPA : medPPA, medPPB :medPPB,medAB: medAB,
                    periodo : rowM?.periodo.nombre,
                    pPPA : pPPA, pPPB:pPPB, prAB : prAB
                })
            }
            //console.log(help)
            return help
        } catch (error) {
            console.log(error)
        }
    }
    return { formatPromociones, formatMatricula, formatLibretas,formatJuntas }
};

function calcMedia (array){
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

function contarMedia (array, num, parcial){
    let soma = 0;
    for (let i = 0; i < array.length; i++){
        let  element = [];
        if (parcial=='p1')  element = array[i].prom1;
        if (parcial=='p2')  element = array[i].prom2;
        if (parcial=='to')  element = array[i].promFinal;
        if (parcial=='fi')  element = array[i].notaFinal;
        const op = parseFloat(element)
        if (num=='1') {
             if (op <= 10 && op > 8.99) soma += 1;
            }
        if (num=='2')  {
            if (op < 9 && op >= 7) soma += 1;
        }
        if (num=='3')  {
            if (op < 7 && op >= 5) soma += 1;
        } 
        if (num=='4')  {
            if (op < 5 && op >= 0) soma += 1;
        }  
    }
    return soma
}

function promCuantitativoLetras(prom) {
    let num = parseFloat(prom)
    let result = ''
    if (num >= 9 && num <= 10) {
        result = 'DA'
    } else if (num >= 7 && num <= 8.99) {
        result = 'AA'
    } else if (num >= 4.01 && num <= 6.99) {
        result = 'PA'
    } else {
        result = 'NA'
    }
    return result
}

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


function Unidades(num) {
    switch (num) {
        case 1: return "uno";
        case 2: return "dos";
        case 3: return "tres";
        case 4: return "cuatro";
        case 5: return "cinco";
        case 6: return "seis";
        case 7: return "siete";
        case 8: return "ocho";
        case 9: return "nueve";
    }
    return "";
}//Unidades()
function Decenas(num) {
    let decena = Math.floor(num / 10);
    let unidad = num - (decena * 10);
    switch (decena) {
        case 1:
            switch (unidad) {
                case 0: return "diez";
                case 1: return "once";
                case 2: return "doce";
                case 3: return "trece";
                case 4: return "catorce";
                case 5: return "quince";
                default: return "dieci" + Unidades(unidad);
            }
        case 2:
            switch (unidad) {
                case 0: return "veinte";
                default: return "veinti" + Unidades(unidad);
            }
        case 3: return DecenasY("treinta", unidad);
        case 4: return DecenasY("cuarenta", unidad);
        case 5: return DecenasY("cincuenta", unidad);
        case 6: return DecenasY("sesenta", unidad);
        case 7: return DecenasY("setenta", unidad);
        case 8: return DecenasY("ochenta", unidad);
        case 9: return DecenasY("noventa", unidad);
        case 0: return Unidades(unidad);
    }
}//Unidades()
function DecenasY(strSin, numUnidades) {
    if (numUnidades > 0)
        return strSin + " y " + Unidades(numUnidades)
    return strSin;
}//DecenasY()
function Centenas(num) {
    let centenas = Math.floor(num / 100);
    let decenas = num - (centenas * 100);
    switch (centenas) {
        case 1:
            if (decenas > 0)
                return "CIENTO " + Decenas(decenas);
            return "CIEN";
        case 2: return "DOSCIENTOS " + Decenas(decenas);
        case 3: return "TRESCIENTOS " + Decenas(decenas);
        case 4: return "CUATROCIENTOS " + Decenas(decenas);
        case 5: return "QUINIENTOS " + Decenas(decenas);
        case 6: return "SEISCIENTOS " + Decenas(decenas);
        case 7: return "SETECIENTOS " + Decenas(decenas);
        case 8: return "OCHOCIENTOS " + Decenas(decenas);
        case 9: return "NOVECIENTOS " + Decenas(decenas);
    }
    return Decenas(decenas);
}//Centenas()
function Seccion(num, divisor, strSingular, strPlural) {
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)
    let letras = "";
    if (cientos > 0)
        if (cientos > 1)
            letras = Centenas(cientos) + " " + strPlural;
        else
            letras = strSingular;
    if (resto > 0)
        letras += "";
    return letras;
}//Seccion()
function Miles(num) {
    let divisor = 1000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)
    let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
    let strCentenas = Centenas(resto);
    if (strMiles == "")
        return strCentenas;
    return strMiles + " " + strCentenas;
}//Miles()
function Millones(num) {
    let divisor = 1000000;
    let cientos = Math.floor(num / divisor)
    let resto = num - (cientos * divisor)
    let strMillones = Seccion(num, divisor, "UN MILLON DE", "MILLONES DE");
    let strMiles = Miles(resto);
    if (strMillones == "")
        return strMiles;
    return strMillones + " " + strMiles;
}//Millones()
function NumeroALetras(num) {
    if (num != '' || num != null || num != NaN) {
        var data = {
            numero: num,
            enteros: Math.floor(num),
            centavos: (((Math.round(num * 100)) - (Math.floor(num) * 100))),
            letrasCentavos: "",
        };
        //RANGOS DE 0 A 9
        if (data.centavos > 0 && data.centavos <= 9) {
            data.letrasCentavos = "coma cero " + (function () {
                if (data.centavos == 1)
                    return Millones(data.centavos);
                else
                    return Millones(data.centavos);
            })();
        }
        if (data.centavos > 9) {
            data.letrasCentavos = "coma " + (function () {
                if (data.centavos == 1)
                    return Millones(data.centavos);
                else
                    return Millones(data.centavos);
            })();
        }
        //RANGOS CERRADOS
        if (data.centavos == 0) {
            data.letrasCentavos = "coma cero cero" + (function () {
                if (data.centavos == 1)
                    return Millones(data.centavos);
                else
                    return Millones(data.centavos);
            })();
        }
        if (data.enteros == 0)
            return "cero " + data.letrasCentavos;
        if (data.enteros == 1)
            return Millones(data.enteros) + data.letrasCentavos;
        else
            return Millones(data.enteros) + " " + data.letrasCentavos;
    } else {
        return 'Cero'
    }

}
