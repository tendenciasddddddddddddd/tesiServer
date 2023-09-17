export const reporteSuper = () => {

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

    const juntasExamProyec = (rowM, rowD, estudiantes, paralelo, keymateria) => {
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
            for (let j = 0; j < distributivo?.length; j++) {
                if (keymateria == distributivo[j].fkmaterias) {
                    const aux = []
                    const materias = distributivo[j]
                    const promAB = []; const promCD = []; const promEF = [];const promGe = [];const promF = []
                    for (let k = 0; k < matriculas.length; k++) {
                        const res = matriculas[k];
                        if (estudiantes.includes(res.fkestudiante)) {
                            const computo = matriculas[k].computo
                            let proAB, proCD,proEF,suma1090,suma90, pytf,suma10, final,
                            promGen, supletorio, examf = ''
                            for (let i = 0; i < computo.length; i++) {
                                const element = computo[i];
                                if (element.fkmateria == materias.fkmaterias) {
                                    const res = element.resultados
                                    proAB = element.notas?.proAB
                                    proCD = element.notas?.proCD
                                    proEF = element.notas?.proEF
                                    suma1090 = res?.suma1090
                                    suma90 = res?.suma90
                                    pytf = res?.pytf
                                    examf = res?.examf
                                    suma10 = res?.suma10
                                    promGen = res?.promGen
                                    supletorio = res?.supletorio
                                    final = res?.notaFinal
                                }
                            }
                            promAB.push(proAB)
                            promCD.push(proCD)
                            promEF.push(proEF)
                            promGe.push(promGen)
                            promF.push(final)
                            aux.push({
                                estudiante: res.estudiante?.fullname,
                                proAB,proCD,proEF,suma1090,suma90,pytf,examf,
                                final, supletorio,suma10, promGen
                            })
                        }
                    }
                    const medAB = calcMedia(promAB)
                    const medCD = calcMedia(promCD)
                    const medEF = calcMedia(promEF)
                    const medGE = calcMedia(promGe)
                    const medF = calcMedia(promF)
                    const pPPA = calcProm(promAB)
                    const pPPB = calcProm(promCD)
                    const pPPC = calcProm(promEF)
                    const prABGen = calcProm(promGe)
                    const prAB = calcProm(promF)
                    //console.log(mediaPPA)
                    //console.log(aux)
                    help.push({
                        materia: materias.materia?.nombre,
                        docente: materias.docente?.fullname,
                        curso: rowD?.curso.nombre,
                        paralelo,
                        data: aux,
                        fechaA,
                        medF, medCD,medEF, medAB,
                        periodo: rowM?.periodo.nombre,
                        pPPA, pPPB,pPPC, prAB,prABGen, medGE
                    })
                }
            }
           // console.log('es100',help)
            return help
        } catch (error) {
            console.log(error)
        }
    }
    return {
        juntasExamProyec
    }
};

function trunc(x, posiciones = 0) {
    var s = x.toString()
    var decimalLength = s.indexOf('.') + 1
    var numStr = s.substr(0, decimalLength + posiciones)
    return Number(numStr)
}
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
function calcMedia(array) {
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
