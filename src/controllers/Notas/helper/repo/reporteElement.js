export const reporteElement = () => {
    const calcProm = (array) => {
        let contador = 0;
        let aux = 0
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element == '') continue;
            if (element == undefined) continue;
            contador = contador + retornNumber(element)
            aux += 1
        }
        let sum = '';
        if (contador != 0) sum = (contador / aux).toFixed()
        return retornLetra(parseInt(sum))
    }
    const calcMedia =(array) => {
        let a = 0; let b = 0; let c = 0; let d = 0;
        const reg = [];
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            const op = retornNumber(element)
            if (op == 4) a += 1;
            if (op == 3) b += 1;
            if (op == 2) c += 1;
            if (op == 1) d += 1;
        }
        reg.push(a, b, c, d)
        return reg
    }
    //TODO  PROMEDIO DE JUNTAS 2DO 3RO 4TO
    function juntasOnly(rowM, rowD, estudiantes, quim, paralelo, keymateria) {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            const help2 = []
            var fechaA = fechaActual()
            matriculas.sort(function (a, b) {
                var nameA = a.estudiante.fullname.toLowerCase(), nameB = b.estudiante.fullname.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            for (let j = 0; j < distributivo?.length; j++) {
                if (keymateria == distributivo[j].fkmaterias) {
                    const aux = []
                    const aux2 = []
                    const materias = distributivo[j]
                    if (materias.materia?.computo==2) {
                        const proPPA = []; const proPPB = []; const promAB = []
                        for (let k = 0; k < matriculas.length; k++) {
                            const res = matriculas[k];
                            if (estudiantes.includes(res.fkestudiante)) {
                                const computo = matriculas[k].computo
                                let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, exa1, pry1, proAB = ''
                                let letras = '';
                                for (let i = 0; i < computo.length; i++) {
                                    const element = computo[i];
                                    if (element.fkmateria == materias.fkmaterias) {
                                        if (quim == 'PRIMER TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.a1; n2 = ins?.a2; n3 = ins?.a3; n4 = ins?.a4;
                                            n6 = ins?.b1; n7 = ins?.b2; n8 = ins?.b3; n9 = ins?.b4;
                                            ppa = element.notas?.ppa
                                            ppb = element.notas?.ppb
                                            sumAB = element.notas?.sumAB
                                            exa1 = element.notas?.exa1
                                            pry1 = element.notas?.pry1
                                            proAB = element.notas?.proAB
                                            letras = lettersToletters(ins?.proAB);
                                        }
                                        if (quim == 'SEGUNDO TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4;
                                            n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4;
                                            ppa = element.notas?.ppc
                                            ppb = element.notas?.ppd
                                            sumAB = element.notas?.sumCD
                                            exa1 = element.notas?.exa2
                                            pry1 = element.notas?.pry2
                                            proAB = element.notas?.proCD
                                            letras = lettersToletters(ins?.proCD);
                                        }
                                        if (quim == 'TERCER TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                            n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4;
                                            ppa = element.notas?.ppe
                                            ppb = element.notas?.ppf
                                            sumAB = element.notas?.sumEF
                                            exa1 = element.notas?.exa3
                                            pry1 = element.notas?.pry3
                                            proAB = element.notas?.proEF
                                            letras = lettersToletters(ins?.proEF);
                                        }
                                    }
                                }
                                proPPA.push(ppa)
                                proPPB.push(ppb)
                                promAB.push(proAB)
                                aux.push({
                                    estudiante: res.estudiante?.fullname,
                                    n1, n2, n3, n4, n6, n7, n8, n9,
                                    ppa, ppb, sumAB, 
                                    exa1,pry1,
                                    proAB, letras,
                                })
                            }
                        }
                        const medPPA = calcMedia(proPPA)
                        const medPPB = calcMedia(proPPB)
                        const medAB = calcMedia(promAB)
                        const pPPA = calcProm(proPPA)
                        const pPPB = calcProm(proPPB)
                        const prAB = calcProm(promAB)
                        help.push({
                            materia: materias.materia?.nombre,
                            docente: materias.docente?.fullname,
                            curso: rowD?.curso.nombre,
                            paralelo,
                            data: aux,
                            fechaA,
                            medPPA, medPPB,medAB,
                            periodo: rowM?.periodo.nombre,
                            pPPA, pPPB, prAB
                        })
                    } else {
                        const proPPA = []; const proPPB = []; const promAB = []
                    for (let k = 0; k < matriculas.length; k++) {
                        const res = matriculas[k];
                        if (estudiantes.includes(res.fkestudiante)) {
                            const computo = matriculas[k].computo
                            let p1, p2= ''
                            let letras = '';
                            for (let i = 0; i < computo.length; i++) {
                                const element = computo[i];
                                if (element.fkmateria == materias.fkmaterias) {
                                    if (quim == 'PRIMER TRIMESTRE') {
                                        const ins = element.cualitativo
                                        p1 = ins.p1;
                                        p2 = ins.p2;
                                        if (element.materia?.nombre == 'COMPORTAMIENTO' || element.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        letras = calcularPromedioInsumosLetrasComportamiento(ins.p1)
                                        else letras = calcularPromedioInsumosLetras(ins.p1, ins.p2)
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const ins = element.cualitativo
                                        p1 = ins.p3;
                                        p2 = ins.p4;
                                        if (element.materia?.nombre == 'COMPORTAMIENTO' || element.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        letras = calcularPromedioInsumosLetrasComportamiento(ins.p2)
                                        else letras = calcularPromedioInsumosLetras(ins.p1, ins.p2)
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = element.cualitativo
                                        p1 = ins.p5;
                                        p2 = ins.p6;
                                        if (element.materia?.nombre == 'COMPORTAMIENTO' || element.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        letras = calcularPromedioInsumosLetrasComportamiento(ins.p3)
                                        else letras = calcularPromedioInsumosLetras(ins.p1, ins.p2)
                                    }
                                }
                            }
                            proPPA.push(p1)
                            proPPB.push(p2)
                            promAB.push(letras)
                            aux2.push({
                                estudiante: res.estudiante?.fullname,
                                letras: letras,
                                p1:p1, p2:p2,
                            })
                        }
                    }
                    const medPPA = contarMediaLet(proPPA,materias.materia?.nombre)
                    const medPPB = contarMediaLet(proPPB,materias.materia?.nombre)
                    const medAB = contarMediaLet(promAB,materias.materia?.nombre)
                    help2.push({
                        materia: materias.materia?.nombre,
                        docente: materias.docente?.fullname,
                        curso: rowD?.curso.nombre,
                        paralelo: paralelo,
                        data: aux2,
                        fechaA: fechaA,
                        medPPA: medPPA, medPPB: medPPB, medAB: medAB,
                        periodo: rowM?.periodo.nombre,
                    })
                    }
                }
            }
            //console.log('es',help)
            const arr = {
                help: help,
                help2 : help2,
            }
            return arr
        } catch (error) {
            console.log(error)
        }
    }
   
    return {
        juntasOnly
    }
};

function trunc(x, posiciones = 0) {
    var s = x.toString()
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}

function retornNumber(letra) {
    let aux = 0;
    switch (letra) {
        case 'A': aux = 4;
            break;
        case 'EP': aux = 3;
            break;
        case 'I': aux = 2;
            break;
        case 'NE': aux = 1;
            break;
        default:
            break;
    }
    return aux;
}
function retornLetra (mep){
    var letra = ''
    switch (mep) {
     case 4: letra = 'ADQUIRIDA'
         break;
     case 3: letra = 'EN PROCESO'
         break;
     case 2: letra = 'INICIADO'
         break;
     case 1: letra = 'NO EVALUADO'
         break;
     default:
         break;
    }
    return letra;
}

function contarMediaLet(array, materia){
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
function calcularPromedioInsumosLetrasComportamiento (p1) {
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
function calcularPromedioInsumosLetras (p1, p2) {
    let aux = 0;
    let aux2 = 0;
    switch (p1) {
        case "EX": aux = 5;
            break;
        case "MB": aux = 4;
            break;
        case "B": aux = 3;
            break;
        case "R": aux = 2;
            break;
        default:
            break;
    }
    switch (p2) {
        case "EX": aux2 = 5;
            break;
        case "MB": aux2 = 4;
            break;
        case "B": aux2 = 3;
            break;
        case "R": aux2 = 2;
            break;
        default:
            break;
    }
    var result = parseInt((aux + aux2) / 2)
    var letra = ''
    switch (result) {
        case 5: letra = 'EX Excelente';
            break;
        case 4: letra = 'MB Muy Buena';
            break;
        case 3: letra = 'B Buena';
            break;
        case 2: letra = 'R Regular';
            break;
        default:
            break;
    }
    return letra;
}
function lettersToletters(numb) {
    let letra = ''
    switch (numb) {
        case 'A': letra = 'ADQUIRIDA';
            break;
        case 'EP': letra = 'EN PROCESO';
            break;
        case 'I': letra = 'INICIADO';
            break;
        case 'NE': letra = 'NO EVALUADO';
            break;
    }
    return letra
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
