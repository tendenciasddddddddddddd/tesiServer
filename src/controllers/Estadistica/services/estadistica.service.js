export const estadistica = () => {

    //CALCULAMOS LOS PROMEDIOS POR CURSO
    const promByCurso = (array) => {
        try {
            const aux = []
            array?.forEach((item) => {
                const { matriculas, curso, paralelo } = item
                const proAB = []; const proCD = []; const proEF = []; const final = []
                const ppa = []; const ppb = []; const ppc = []; const ppd = []; const ppe = []; const ppf = [];
                const pry1 = []; const pry2 = []; const pry3 = [];
                const exa1 = []; const exa2 = []; const exa3 = [];
                matriculas?.forEach((subitem) => {
                    const { computo } = subitem
                    computo?.forEach((mititem) => {
                        const { notas, resultados } = mititem
                        /* PARA ACTIVIDADES*/
                        ppa.push(notas?.ppa)
                        ppb.push(notas?.ppb)
                        ppc.push(notas?.ppc)
                        ppd.push(notas?.ppd)
                        ppe.push(notas?.ppe)
                        ppf.push(notas?.ppf)

                        pry1.push(notas?.pry1)
                        pry2.push(notas?.pry2)
                        pry3.push(notas?.pry3)

                        exa1.push(notas?.exa1)
                        exa2.push(notas?.exa2)
                        exa3.push(notas?.exa3)

                        proAB.push(notas?.proAB)
                        proCD.push(notas?.proCD)
                        proEF.push(notas?.proEF)
                        final.push(resultados?.notaFinal)
                    });
                })
                const pa = calcProm(ppa)
                const pb = calcProm(ppb)
                const pc = calcProm(ppc)
                const pd = calcProm(ppd)
                const pe = calcProm(ppe)
                const pf = calcProm(ppf)

                const py1 = calcProm(pry1)
                const py2 = calcProm(pry2)
                const py3 = calcProm(pry3)

                const ex1 = calcProm(exa1)
                const ex2 = calcProm(exa2)
                const ex3 = calcProm(exa3)

                const pAB = calcProm(proAB)
                const pCD = calcProm(proCD)
                const pEF = calcProm(proEF)
                const pFinal = calcProm(final)
                aux.push({
                    curso, paralelo,
                    pa, pb, pc, pd, pe, pf,
                    py1, py2, py3, ex1, ex2, ex3,
                    pAB, pCD, pEF, pFinal
                })
            });
            return aux
        } catch (error) {
            console.log(error)
        }
    }
    return {
        promByCurso
    }
};

const calcProm = (array) => {
    let contador = 0;
    let aux = 0
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const letras = ['EX', 'MB', 'B', 'R', 'A', 'B', 'C', 'D', 'E']
        if (letras.includes(element)) continue;
        if (element == '') continue;
        if (element == undefined) continue;
        if (element == null) continue;
        contador = contador + parseFloat(element)
        aux += 1
    }
    let pro = contador / aux;
    result = trunc(pro, 2)
    if (isNaN(result) || result == '') result = ''
    return ifDecimal(result)
}

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