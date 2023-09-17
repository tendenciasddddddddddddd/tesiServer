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
    function formatPromociones(rowM, rowD, estudiantes) {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            for (let i = 0; i < matriculas?.length; i++) {
                const element = matriculas[i];
                const aux = []
                const aux2 = []
                if (estudiantes.includes(element.fkestudiante)) {
                    const computo = matriculas[i].computo;
                    const promGeneral = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        if (subelement.materia?.computo==2) {
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
                        } else {
                            let promedio, letras = '';
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    promedio = result.resultados?.promedioFinal
                                }
                            }
                            letras = calcularPryectos(promedio, subelement.materia?.nombre)
                            promGeneral.push(promedio)
                            aux2.push({
                                materia: subelement.materia?.nombre,
                                area: subelement.materia?.area,
                                promedio: promedio,
                                letras: letras,
                            }) 
                        }
                    }
                    const pgeneral = calcProm(promGeneral)
                    const letrasFinal = trasformnumberToText(pgeneral)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,
                        data2: aux2,
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
                const aux2 = []
                if (estudiantes.includes(element.fkestudiante)) {
                    const computo = matriculas[i].computo;
                    const promPPA = []
                    const promPPB = []
                    const general = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        if (subelement.materia?.computo==2) {
                            let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, sumAB90, exa1,pry1, sumAB10, proAB = ''
                            let letras = '';
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    if (quim == 'PRIMER TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.a1; n2 = ins?.a2; n3 = ins?.a3; n4 = ins?.a4;
                                        n6 = ins?.b1; n7 = ins?.b2; n8 = ins?.b3; n9 = ins?.b4; 
                                        ppa = ins?.ppa; ppb = ins?.ppb; sumAB = ins?.sumAB; sumAB90 = ins?.sumAB90;
                                        exa1 = ins?.exa1; pry1= ins?.pry1; sumAB10 = ins?.sumAB10; proAB = ins?.proAB;
                                        letras = promCuantitativoLetras(ins?.proAB);
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4; 
                                        n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4; 
                                        ppa = ins?.ppc; ppb = ins?.ppd; sumAB = ins?.sumCD; sumAB90 = ins?.sumCD90;
                                        exa1 = ins?.exa2;pry1= ins?.pry2; sumAB10 = ins?.sumCD10; proAB = ins?.proCD;
                                        letras = promCuantitativoLetras(ins?.proCD);
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                        n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4; 
                                        ppa = ins?.ppe; ppb = ins?.ppf; sumAB = ins?.sumEF; sumAB90 = ins?.sumEF90;
                                        exa1 = ins?.exa3;pry1= ins?.pry3; sumAB10 = ins?.sumEF10; proAB = ins?.proEF;
                                        letras = promCuantitativoLetras(ins?.proEF);
                                    }
                                }
                            }
                            promPPA.push(ppa)
                            promPPB.push(ppb)
                            general.push(proAB)
                            aux.push({
                                materia: subelement.materia?.nombre,
                                area: subelement.materia?.area,
                                n1: n1, n2: n2, n3: n3, n4: n4,  n6: n6, n7: n7, n8: n8, n9: n9,pry1:pry1,
                                ppa: ppa, ppb: ppb, sumAB: sumAB, sumAB90: sumAB90, exa1: exa1, sumAB10: sumAB10, proAB: proAB,
                                letras: letras,
                            })
                        } else {
                            let p1, p2= ''
                            let letras = '';
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    if (quim == 'PRIMER TRIMESTRE') {
                                        const ins = result.cualitativo
                                        p1 = ins.p1;
                                        p2 = ins.p2;
                                        if (subelement.materia?.nombre == 'COMPORTAMIENTO' || subelement.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        letras = calcularPromedioInsumosLetrasComportamiento(ins.p1)
                                        else letras = calcularPromedioInsumosLetras(ins.p1, ins.p2)
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const ins = result.cualitativo
                                        p1 = ins.p3;
                                        p2 = ins.p4;
                                        if (subelement.materia?.nombre == 'COMPORTAMIENTO' || subelement.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        letras = calcularPromedioInsumosLetrasComportamiento(ins.p2)
                                        else letras = calcularPromedioInsumosLetras(ins.p3, ins.p4)
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = result.cualitativo
                                        p1 = ins.p3;
                                        p2 = ins.p4;
                                        if (subelement.materia?.nombre == 'COMPORTAMIENTO' || subelement.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        letras = calcularPromedioInsumosLetrasComportamiento(ins.p3)
                                        else letras = calcularPromedioInsumosLetras(ins.p5, ins.p6)
                                    }
                                }
                            }
                            aux2.push({
                                materia: subelement.materia?.nombre,
                                letras: letras, p1: p1, p2: p2
                            })
                        }
                        
                    }
                    const pPPA = calcProm(promPPA)
                    const pPPB = calcProm(promPPB)
                    const pgeneral = calcProm(general)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux, data2: aux2, pPPA: pPPA,
                        pPPB: pPPB, pgeneral: pgeneral,
                        fechaA: fechaA, nmatricula: element.nmatricula,
                    })
                }
            }
            return help
        } catch (error) {
            console.log(error)
            return []
        }
    }
    function formatJuntas(rowM, rowD, estudiantes, quim, paralelo) {
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
                const aux = []
                const aux2 = []
                const materias = distributivo[j]
                if (materias.materia?.computo==2) {
                    const proPPA = []; const proPPB = []; const promAB = []
                    for (let k = 0; k < matriculas.length; k++) {
                        const res = matriculas[k];
                        if (estudiantes.includes(res.fkestudiante)) {
                            const computo = matriculas[k].computo
                            let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, sumAB90, exa1, pry1, sumAB10, proAB = ''
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
                                        sumAB90 = element.notas?.sumAB90
                                        exa1 = element.notas?.exa1
                                        pry1 = element.notas?.pry1;
                                        sumAB10 = element.notas?.sumAB10
                                        proAB = element.notas?.proAB
                                        letras = promCuantitativoLetras(ins?.proAB);
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const ins = element.notas
                                        n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4;
                                        n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4;
                                        ppa = element.notas?.ppc
                                        ppb = element.notas?.ppd
                                        sumAB = element.notas?.sumCD
                                        sumAB90 = element.notas?.sumCD90
                                        exa1 = element.notas?.exa2
                                        pry1 = element.notas?.pry2;
                                        sumAB10 = element.notas?.sumCD10
                                        proAB = element.notas?.proCD
                                        letras = promCuantitativoLetras(ins?.proCD);
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = element.notas
                                        n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                        n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4;
                                        ppa = element.notas?.ppe
                                        ppb = element.notas?.ppf
                                        sumAB = element.notas?.sumEF
                                        sumAB90 = element.notas?.sumEF90
                                        exa1 = element.notas?.exa3
                                        pry1 = element.notas?.pry3;
                                        sumAB10 = element.notas?.sumEF10
                                        proAB = element.notas?.proEF
                                        letras = promCuantitativoLetras(ins?.proEF);
                                    }
                                }
                            }
                            proPPA.push(ppa)
                            proPPB.push(ppb)
                            promAB.push(proAB)
                            aux.push({
                                estudiante: res.estudiante?.fullname,
                                n1: n1, n2: n2, n3: n3, n4: n4, n6: n6, n7: n7, n8: n8, n9: n9,
                                ppa: ppa,
                                ppb: ppb,
                                sumAB: sumAB,
                                sumAB90: sumAB90,
                                exa1: exa1, pry1: pry1,
                                sumAB10: sumAB10,
                                proAB: proAB,
                                letras: letras,
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
                        fechaA: fechaA,
                        medPPA: medPPA, medPPB: medPPB, medAB: medAB,
                        periodo: rowM?.periodo.nombre,
                        pPPA: pPPA, pPPB: pPPB, prAB: prAB
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
                                        else letras = calcularPromedioInsumosLetras(ins.p3, ins.p4)
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = element.cualitativo
                                        p1 = ins.p5;
                                        p2 = ins.p6;
                                        if (element.materia?.nombre == 'COMPORTAMIENTO' || element.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        letras = calcularPromedioInsumosLetrasComportamiento(ins.p3)
                                        else letras = calcularPromedioInsumosLetras(ins.p5, ins.p6)
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
            const arr = {
                help: help,
                help2 : help2,
            }
            return arr
        } catch (error) {
            console.log(error)
        }
    }
    function formatJuntasIndividual(rowM, rowD, estudiantes, quim, paralelo, keymateria) {
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
                                let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, sumAB90, exa1,pry1, sumAB10, proAB = ''
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
                                            sumAB90 = element.notas?.sumAB90
                                            exa1 = element.notas?.exa1
                                            pry1 = element.notas?.pry1
                                            sumAB10 = element.notas?.sumAB10
                                            proAB = element.notas?.proAB
                                            letras = promCuantitativoLetras(ins?.proAB);
                                        }
                                        if (quim == 'SEGUNDO TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4;
                                            n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4;
                                            ppa = element.notas?.ppc
                                            ppb = element.notas?.ppd
                                            sumAB = element.notas?.sumCD
                                            sumAB90 = element.notas?.sumCD90
                                            exa1 = element.notas?.exa2
                                            pry1 = element.notas?.pry2
                                            sumAB10 = element.notas?.sumCD10
                                            proAB = element.notas?.proCD
                                            letras = promCuantitativoLetras(ins?.proCD);
                                        }
                                        if (quim == 'TERCER TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                            n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4;
                                            ppa = element.notas?.ppe
                                            ppb = element.notas?.ppf
                                            sumAB = element.notas?.sumEF
                                            sumAB90 = element.notas?.sumEF90
                                            exa1 = element.notas?.exa3
                                            pry1 = element.notas?.pry3
                                            sumAB10 = element.notas?.sumEF10
                                            proAB = element.notas?.proEF
                                            letras = promCuantitativoLetras(ins?.proEF);
                                        }
                                    }
                                }
                                proPPA.push(ppa)
                                proPPB.push(ppb)
                                promAB.push(proAB)
                                aux.push({
                                    estudiante: res.estudiante?.fullname,
                                    n1: n1, n2: n2, n3: n3, n4: n4, n6: n6, n7: n7, n8: n8, n9: n9,
                                    ppa: ppa,
                                    ppb: ppb,
                                    sumAB: sumAB,
                                    sumAB90: sumAB90,
                                    exa1: exa1,pry1:pry1,
                                    sumAB10: sumAB10,
                                    proAB: proAB,
                                    letras: letras,
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
                            fechaA: fechaA,
                            medPPA: medPPA, medPPB: medPPB, medAB: medAB,
                            periodo: rowM?.periodo.nombre,
                            pPPA: pPPA, pPPB: pPPB, prAB: prAB
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
    function formatJuntasFinal(rowM, rowD, estudiantes, quim, paralelo, keymateria) {
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
                    const promAB = []; const promCD = []; const promF = []
                    for (let k = 0; k < matriculas.length; k++) {
                        const res = matriculas[k];
                        if (estudiantes.includes(res.fkestudiante)) {
                            const computo = matriculas[k].computo
                            let proAB, proCD, suple, final, promedioFinal, remedial, gracia = ''
                            for (let i = 0; i < computo.length; i++) {
                                const element = computo[i];
                                if (element.fkmateria == materias.fkmaterias) {
                                    const res = element.resultados
                                    proAB = element.notas?.proAB
                                    proCD = element.notas?.proCD
                                    suple = res?.supletorio
                                    final = res?.notaFinal
                                    promedioFinal = res?.promedioFinal
                                    remedial = res?.remedial;
                                    gracia = res?.gracia;
                                }
                            }
                            promAB.push(proAB)
                            promCD.push(proCD)
                            promF.push(final)
                            aux.push({
                                estudiante: res.estudiante?.fullname,
                                proAB: proAB,proCD:proCD, suple : suple,
                                final : final, promedioFinal : promedioFinal,
                                remedial : remedial,gracia : gracia,
                            })
                        }
                    }
                    const medAB = calcMedia(promAB)
                    const medCD = calcMedia(promCD)
                    const medF = calcMedia(promF)
                    const pPPA = calcProm(promAB)
                    const pPPB = calcProm(promCD)
                    const prAB = calcProm(promF)
                    //console.log(mediaPPA)
                    //console.log(distributivo)
                    help.push({
                        materia: materias.materia?.nombre,
                        docente: materias.docente?.fullname,
                        curso: rowD?.curso.nombre,
                        paralelo: paralelo,
                        data: aux,
                        fechaA: fechaA,
                        medF: medF, medCD: medCD, medAB: medAB,
                        periodo: rowM?.periodo.nombre,
                        pPPA: pPPA, pPPB: pPPB, prAB: prAB
                    })
                }
            }
            //console.log('es',help)
            return help
        } catch (error) {
            console.log(error)
        }
    }
    function formatInforme(rowM, rowD, estudiantes) {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            var fechaA = fechaActual()
            for (let i = 0; i < matriculas?.length; i++) {
                const element = matriculas[i];
                const aux = []
                const aux2 = []
                if (estudiantes.includes(element.fkestudiante)) {
                    const computo = matriculas[i].computo;
                    const promPPA = []
                    const promPPB = []
                    const promAB = []
                    const general = []
                    const promPPC = []
                    const promPPD = []
                    const promCD = []
                    const general2 = []
                    const general3 = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        if (subelement.materia?.computo==2) {
                            let ppa, ppb, sumAB, sumAB80, exa1, sumAB20, proAB, ppc, ppd, sumCD, sumCD80, exa2, sumCD20, proCD, suple, final = ''
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.notas
                                    const res = result.resultados
                                    ppa = ins?.ppa; ppb = ins?.ppb; sumAB = ins?.sumAB; sumAB80 = ins?.sumAB80;
                                    exa1 = ins?.exa1; sumAB20 = ins?.sumAB20; proAB = ins?.proAB;
    
                                    ppc = ins?.ppc; ppd = ins?.ppd; sumCD = ins?.sumCD; sumCD80 = ins?.sumCD80;
                                    exa2 = ins?.exa2; sumCD20 = ins?.sumCD20; proCD = ins?.proCD;
    
                                    suple = res?.supletorio,
                                        final = res?.notaFinal
                                }
                            }
                            promPPA.push(ppa)
                            promPPB.push(ppb)
                            promAB.push(sumAB)
                            general.push(proAB)
                            promPPC.push(ppc)
                            promPPD.push(ppd)
                            promCD.push(sumCD)
                            general2.push(proCD)
                            general3.push(final)
                            aux.push({
                                materia: subelement.materia?.nombre,
                                area: subelement.materia?.area,
                                ppa: ppa, ppb: ppb, sumAB: sumAB, sumAB80: sumAB80, exa1: exa1, sumAB20: sumAB20, proAB: proAB,
                                ppc: ppc, ppd: ppd, sumCD: sumCD, sumCD80: sumCD80, exa2: exa2, sumCD20: sumCD20, proCD: proCD,
                                final: final, suple: suple
                            })
                        } else {
                            let p1, p2,p3,p4, final = ''
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.cualitativo
                                        p1 = ins.p1;
                                        p2 = ins.p2;
                                        if (subelement.materia?.nombre == 'COMPORTAMIENTO' || subelement.materia?.nombre == 'DESARROLLO HUMANO INTEGRAL')
                                        final = calcularPromedioInsumosLetrasComportamiento(ins.p1, ins.p2)
                                        else final = calcularPromedioInsumosLetras(ins.p1, ins.p2)
                                   
                                }
                            }
                            aux2.push({
                                materia: subelement.materia?.nombre,
                                final : final,
                                p1 : p1, p2 : p2
                            })
                        }
                    }
                    const pPPA = calcProm(promPPA)
                    const pPPB = calcProm(promPPB)
                    const pAB = calcProm(promAB)
                    const pgeneral = calcProm(general)
                    const pPPC = calcProm(promPPC)
                    const pPPD = calcProm(promPPD)
                    const pCD = calcProm(promCD)
                    const pgeneral2 = calcProm(general2)
                    const pgeneral3 = calcProm(general3)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,data2: aux2, pgeneral3: pgeneral3,
                        pPPA: pPPA, pPPB: pPPB, pAB: pAB, pgeneral: pgeneral,
                        pPPC: pPPC, pPPD: pPPD, pCD: pCD, pgeneral2: pgeneral2,
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
    function formatFinal(rowM, rowD, estudiantes) {
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
                    const general3 = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        if (subelement.materia?.computo==2) {
                            let proAB, proCD, suple, final, promGen, remedial, gracia, letras = ''
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.notas
                                    const res = result.resultados
                                    proAB = ins?.proAB;
                                    proCD = ins?.proCD;
                                    gracia = ins?.gracia;
                                    suple = res?.supletorio; remedial = res?.remedial;
                                    final = res?.notaFinal
                                    promGen = res?.promGen
                                }
                            }
                            letras = promCuantitativoLetras2(final)
                            general3.push(final)
                            aux.push({
                                materia: subelement.materia?.nombre,
                                proAB: proAB, letras: letras,
                                proCD: proCD, remedial: remedial, gracia: gracia,
                                final: final, suple: suple, promGen: promGen
                            })
                        } 
                    }
                    const pgeneral3 = calcProm(general3)
                    const letras = trasformnumberToText(pgeneral3)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux, pgeneral3: pgeneral3,
                        fechaA: fechaA, nmatricula: element.nmatricula, letras: letras
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
    function formatParcial(rowM, rowD, estudiantes, quim, paralelo) {
        console.log(quim)
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            matriculas.sort(function (a, b) {
                var nameA = a.estudiante.fullname.toLowerCase(), nameB = b.estudiante.fullname.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            for (let i = 0; i < matriculas.length; i++) {
                const element = matriculas[i];
                const computo = element.computo;
                const notas = []
                if (estudiantes.includes(element.fkestudiante)) {
                    for (let h = 0; h < distributivo.length; h++) {
                        const subarray = distributivo[h];
                        let nota = ''
                        for (let k = 0; k < computo.length; k++) {
                            const reg = computo[k];
                            if (subarray.fkmaterias == reg.fkmateria) {
                                if (quim.quimestre == 'PRIMER TRIMESTRE') {
                                    if (quim.qr == 'INSUMO INDIVIDUAL') {
                                        if (subarray.materia?.computo==2)  nota = reg.notas?.ppa
                                       else nota = reg.cualitativo?.p1
                                    }
                                    if (quim.qr == 'INSUMO GRUPAL') {
                                        if (subarray.materia?.computo==2)  nota = reg.notas?.ppb
                                       else nota = reg.cualitativo?.p2
                                    }
                                    if (quim.qr == 'PROYECTO / EXAMEN') {
                                        nota = reg.notas?.exa1
                                    }
                                }
                                if (quim.quimestre == 'SEGUNDO TRIMESTRE') {
                                    if (quim.qr == 'INSUMO INDIVIDUAL') {
                                        if (subarray.materia?.computo==2)  nota = reg.notas?.ppc
                                        else nota = reg.cualitativo?.p3
                                    }
                                    if (quim.qr == 'INSUMO GRUPAL') {
                                        if (subarray.materia?.computo==2)  nota = reg.notas?.ppd
                                        else nota = reg.cualitativo?.p4
                                    }
                                    if (quim.qr == 'PROYECTO / EXAMEN') {
                                        nota = reg.notas?.exa2
                                    }
                                }
                                if (quim.quimestre == 'TERCER TRIMESTRE') {
                                    if (quim.qr == 'INSUMO INDIVIDUAL') {
                                        if (subarray.materia?.computo==2)  nota = reg.notas?.ppe
                                        else nota = reg.cualitativo?.p5
                                    }
                                    if (quim.qr == 'INSUMO GRUPAL') {
                                        if (subarray.materia?.computo==2)  nota = reg.notas?.ppf
                                        else nota = reg.cualitativo?.p6
                                    }
                                    if (quim.qr == 'PROYECTO / EXAMEN') {
                                        nota = reg.notas?.exa3
                                    }
                                }
                            }
                        }
                        notas.push(nota)
                    }
                }
                const result = calcProm(notas)
                help.push({
                    fullname: element.estudiante?.fullname,
                    data: notas,
                    result: result,
                })
            }
            //console.log('es',help)
            const promedios = calcPromMatriz(help, distributivo)
            return {
                help: help, distributivo: distributivo, promedios: promedios,
                curso: rowM.curso?.nombre, periodo: rowM.periodo?.nombre,
            }
        } catch (error) {
            console.log(error)
        }
    }
    function formatQuimestral(rowM, rowD, estudiantes, quim) {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            matriculas.sort(function (a, b) {
                var nameA = a.estudiante.fullname.toLowerCase(), nameB = b.estudiante.fullname.toLowerCase();
                if (nameA < nameB)
                    return -1;
                if (nameA > nameB)
                    return 1;
                return 0;
            });
            for (let i = 0; i < matriculas.length; i++) {
                const element = matriculas[i];
                const computo = element.computo;
                const notas = []
                if (estudiantes.includes(element.fkestudiante)) {
                    for (let h = 0; h < distributivo.length; h++) {
                        const subarray = distributivo[h];
                        let nota = ''
                        for (let k = 0; k < computo.length; k++) {
                            const reg = computo[k];
                            if (subarray.fkmaterias == reg.fkmateria) {
                                if (quim.quimestre == 'PRIMER TRIMESTRE') {
                                    nota = reg.notas?.proAB
                                }
                                if (quim.quimestre == 'SEGUNDO TRIMESTRE') {
                                    nota = reg.notas?.proCD
                                }
                                if (quim.quimestre == 'TERCER TRIMESTRE') {
                                    nota = reg.notas?.proEF
                                }
                            }
                        }
                        notas.push(nota)
                    }
                }
                const result = calcProm(notas)
                help.push({
                    fullname: element.estudiante?.fullname,
                    data: notas,
                    result: result,
                })
            }
            //console.log('es',help)
            const promedios = calcPromMatriz(help, distributivo)
            return {
                help: help, distributivo: distributivo, promedios: promedios,
                curso: rowM.curso?.nombre, periodo: rowM.periodo?.nombre,
            }
        } catch (error) {
            console.log(error)
        }
    }
    function formatAnual(rowM, rowD, estudiantes) {
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
                const aux = []
                const materias = distributivo[j]
                const proPPA = []; const proPPB = []; const promAB = []
                for (let k = 0; k < matriculas.length; k++) {
                    const res = matriculas[k];
                    if (estudiantes.includes(res.fkestudiante)) {
                        const computo = matriculas[k].computo
                        let ppa, ppb, sumAB, sumAB80, exa1, sumAB20, proAB, ppc, ppd, sumCD, sumCD80, exa2, sumCD20, proCD = ''
                        let suple = ''; let final = '';
                        for (let i = 0; i < computo.length; i++) {
                            const element = computo[i];
                            if (element.fkmateria == materias.fkmaterias) {
                                ppa = element.notas?.ppa
                                ppb = element.notas?.ppb
                                sumAB = element.notas?.sumAB
                                sumAB80 = element.notas?.sumAB80
                                exa1 = element.notas?.exa1
                                sumAB20 = element.notas?.sumAB20
                                proAB = element.notas?.proAB

                                ppc = element.notas?.ppc
                                ppd = element.notas?.ppd
                                sumCD = element.notas?.sumCD
                                sumCD80 = element.notas?.sumCD80
                                exa2 = element.notas?.exa2
                                sumCD20 = element.notas?.sumCD20
                                proCD = element.notas?.proCD,

                                    suple = element.resultados?.supletorio,
                                    final = element.resultados?.notaFinal
                            }
                        }
                        proPPA.push(ppa)
                        proPPB.push(ppb)
                        promAB.push(proAB)
                        aux.push({
                            estudiante: res.estudiante?.fullname,
                            ppa: ppa, ppb: ppb,
                            sumAB: sumAB, sumAB80: sumAB80,
                            exa1: exa1, sumAB20: sumAB20,
                            proAB: proAB,
                            ppc: ppc, ppd: ppd,
                            sumCD: sumCD, sumCD80: sumCD80,
                            exa2: exa2, sumCD20: sumCD20,
                            proCD: proCD,
                            suple: suple, final: final
                        })
                    }
                }
                //console.log(distributivo)
                help.push({
                    materia: materias.materia?.nombre,
                    docente: materias.docente?.fullname,
                    curso: rowD?.curso.nombre,
                    paralelo: rowM?.paralelo,
                    data: aux,
                    fechaA: fechaA,
                    periodo: rowM?.periodo.nombre,
                })
            }
            //console.log('es',help)
            return help
        } catch (error) {
            console.log(error)
        }
    }
    const formarNomina = (array) => {
        try {
            const a = []
            var fechaA = fechaActual()
            for (let i = 0; i < array.length; i++) {
                const element = array[i].matriculas;
                if (element.length == 0) continue;
                const paralelo = array[i].paralelo
                const curso = array[i].curso
                const periodo = array[i].periodo
                const subdata = []
                for (let j = 0; j < element.length; j++) {
                    const element2 = element[j].estudiante;
                    const data = {
                        fullname: element2.fullname,
                        cedula: element2.cedula,
                        nmatricula: element[j].nmatricula,
                    }
                    subdata.push(data)
                }
                const ordenName = subdata.sort(function (a, b) {
                    var nameA = a.fullname.toLowerCase(), nameB = b.fullname.toLowerCase();
                    if (nameA < nameB)
                        return -1;
                    if (nameA > nameB)
                        return 1;
                    return 0;
                });
                const model = {
                    curso: curso,
                    periodo: periodo,
                    paralelo: paralelo,
                    data: ordenName,
                    orden: curso.num,
                    fechaA: fechaA
                }
                a.push(model)
            }
            const orden = a.sort((a, b) => parseFloat(a.orden) - parseFloat(b.orden));
            return orden
        } catch (error) {
            console.log(error)
        }
    }
    return {
        formatPromociones, formatMatricula, formatLibretas, formatJuntas, formatInforme, formatFinal, formatParcial,
        formatQuimestral, formatAnual, formarNomina,formatJuntasIndividual, formatJuntasFinal
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
function promCuantitativoLetras2(prom) {
    let num = parseFloat(prom)
    let result = ''
    if (num >= 9 && num <= 10) {
        result = 'Domina Aprendizaje'
    } else if (num >= 7 && num <= 8.99) {
        result = 'Alcanza Aprendizaje'
    } else if (num >= 4.01 && num <= 6.99) {
        result = 'Próximo Alcanzar'
    } else {
        result = 'No Alcanza'
    }
    return result
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
