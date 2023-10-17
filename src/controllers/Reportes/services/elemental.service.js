import { funciones } from "./helper/funciones";

const { calcProm, calcMedia, promCuantitativoLetras, promCuantitativoLetrasDos, calcPromMatriz,promCuantitativoPalabraDos,
    calcularPryectos, promCuantitativoPalabra, promInicialesPalabra, promIniciales, setPalabraComportamiento } = funciones()

export const element = () => {

    //TODO  PROMEDIO DE JUNTAS 2DO 3RO 4TO
    const juntasOnly = (rowM, rowD, estudiantes, quim, paralelo, keymateria) => {
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
                    if (materias.materia?.nombre != 'COMPORTAMIENTO') {
                        const proPPA = []; const proPPB = []; const promAB = []
                        for (let k = 0; k < matriculas.length; k++) {
                            const res = matriculas[k];
                            if (estudiantes.includes(res.fkestudiante)) {
                                const computo = matriculas[k].computo
                                let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, exa1, pry1, proAB = ''
                                let letras,ll1,ll2 = '';
                                for (let i = 0; i < computo.length; i++) {
                                    const element = computo[i];
                                    if (element.fkmateria == materias.fkmaterias) {
                                        if (quim == 'PRIMER TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.a1; n2 = ins?.a2; n3 = ins?.a3; n4 = ins?.a4;
                                            n6 = ins?.b1; n7 = ins?.b2; n8 = ins?.b3; n9 = ins?.b4;
                                            ppa = element.notas?.ppa
                                            ll1 = promIniciales(ppa);
                                            ppb = element.notas?.ppb
                                            ll2 = promIniciales(ppb);
                                            sumAB = element.notas?.sumAB
                                            exa1 = element.notas?.exa1
                                            pry1 = element.notas?.pry1
                                            proAB = element.notas?.proAB
                                            letras = promInicialesPalabra(ins?.proAB);
                                        }
                                        if (quim == 'SEGUNDO TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4;
                                            n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4;
                                            ppa = element.notas?.ppc
                                            ll1 = promIniciales(ppa);
                                            ppb = element.notas?.ppd
                                            ll2 = promIniciales(ppb);
                                            sumAB = element.notas?.sumCD
                                            exa1 = element.notas?.exa2
                                            pry1 = element.notas?.pry2
                                            proAB = element.notas?.proCD
                                            letras = promInicialesPalabra(ins?.proCD);
                                        }
                                        if (quim == 'TERCER TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                            n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4;
                                            ppa = element.notas?.ppe
                                            ll1 = promIniciales(ppa);
                                            ppb = element.notas?.ppf
                                            ll2 = promIniciales(ppb);
                                            sumAB = element.notas?.sumEF
                                            exa1 = element.notas?.exa3
                                            pry1 = element.notas?.pry3
                                            proAB = element.notas?.proEF
                                            letras = promInicialesPalabra(ins?.proEF);
                                        }
                                    }
                                }
                                proPPA.push(ppa)
                                proPPB.push(ppb)
                                promAB.push(proAB)
                                aux.push({
                                    estudiante: res.estudiante?.fullname,
                                    n1, n2, n3, n4, n6, n7, n8, n9,
                                    ppa, ppb, sumAB,ll1, ll2,
                                    exa1, pry1, proAB,letras,
                                })
                            }
                        }
                        const medPPA = calcMedia(proPPA)
                        const medPPB = calcMedia(proPPB)
                        const medAB = calcMedia(promAB)
                        const pPPA = calcProm(proPPA)
                        const pPPB = calcProm(proPPB)
                        const prAB = calcProm(promAB)
                        const lettras = promCuantitativoLetrasDos(prAB);
                        const llf = promInicialesPalabra(prAB);
                        const lla = promIniciales(pPPA);
                        const llb = promIniciales(prAB);
                        help.push({
                            materia: materias.materia?.nombre,
                            computo : materias.materia?.computo,
                            docente: materias.docente?.fullname,
                            curso: rowD?.curso.nombre,
                            paralelo, data: aux,fechaA,
                            medPPA, medPPB, medAB,
                            periodo: rowM?.periodo.nombre,
                            pPPA, pPPB, prAB, lettras, llf, lla, llb
                        })
                    } else {
                        const proPPA = []; const proPPB = []; const promAB = []
                        for (let k = 0; k < matriculas.length; k++) {
                            const res = matriculas[k];
                            if (estudiantes.includes(res.fkestudiante)) {
                                const computo = matriculas[k].computo
                                let p1, p2 = ''
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
                                    letras,p1, p2,
                                })
                            }
                        }
                        const medPPA = contarMediaLet(proPPA, materias.materia?.nombre)
                        const medPPB = contarMediaLet(proPPB, materias.materia?.nombre)
                        const medAB = contarMediaLet(promAB, materias.materia?.nombre)
                        help2.push({
                            materia: materias.materia?.nombre,
                            docente: materias.docente?.fullname,
                            curso: rowD?.curso.nombre,
                            paralelo, data: aux2, fechaA: fechaA,
                            medPPA, medPPB,  medAB,
                            periodo: rowM?.periodo.nombre,
                        })
                    }
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
    const juntasFinal = (rowM, rowD, estudiantes, paralelo, keymateria) => {
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
                    const promAB = []; const promCD = []; const promEF = [];const promPY = [];const promF = []
                    for (let k = 0; k < matriculas.length; k++) {
                        const res = matriculas[k];
                        if (estudiantes.includes(res.fkestudiante)) {
                            const computo = matriculas[k].computo
                            let proAB, proCD,proEF, final, pytf = ''
                            let ll1,ll2,ll3,ll4,llf =''
                            for (let i = 0; i < computo.length; i++) {
                                const element = computo[i];
                                if (element.fkmateria == materias.fkmaterias) {
                                    const res = element.resultados
                                    proAB = element.notas?.proAB
                                    ll1 = promIniciales(proAB);
                                    proCD = element.notas?.proCD
                                    ll2 = promIniciales(proCD);
                                    proEF = element.notas?.proEF
                                    ll3 = promIniciales(proEF);
                                    pytf = res?.pytf
                                    ll4 = promIniciales(pytf);
                                    final = res?.notaFinal
                                    llf = promInicialesPalabra(final);
                                }
                            }
                            promAB.push(proAB)
                            promCD.push(proCD)
                            promEF.push(proEF)
                            promPY.push(pytf)
                            promF.push(final)
                            aux.push({
                                estudiante: res.estudiante?.fullname,
                                proAB,proCD,proEF,pytf, final, 
                                ll1, ll2, ll3,ll4, llf
                            })
                        }
                    }
                    const medAB = calcMedia(promAB)
                    const medCD = calcMedia(promCD)
                    const medEF = calcMedia(promEF)
                    const medF = calcMedia(promF)
                    const pPPA = calcProm(promAB)
                    const pPPB = calcProm(promCD)
                    const pPPC = calcProm(promEF)
                    const pPPY = calcProm(promPY)
                    const prAB = calcProm(promF)
                    const lm1 = promIniciales(pPPA);
                    const lm2 = promIniciales(pPPB);
                    const lm3 = promIniciales(pPPC);
                    const lm4 = promIniciales(pPPY);
                    const lmf = promInicialesPalabra(prAB);
                    
                    help.push({
                        materia: materias.materia?.nombre,
                        docente: materias.docente?.fullname,
                        curso: rowD?.curso.nombre,
                        paralelo,  data: aux, fechaA,
                        medF, medCD,medEF, medAB,
                        periodo: rowM?.periodo.nombre,
                        pPPA, pPPB,pPPC, prAB,pPPY,
                        lm1, lm2, lm3,lm4, lmf
                    })
                }
            }
           // console.log('es100',help)
            return help
        } catch (error) {
            console.log(error)
        }
    }
    const juntasGeneral = (rowM, rowD, estudiantes, quim, paralelo) => {
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
                    if (materias.materia?.nombre != 'COMPORTAMIENTO') {
                        const proPPA = []; const proPPB = []; const promAB = []
                        for (let k = 0; k < matriculas.length; k++) {
                            const res = matriculas[k];
                            if (estudiantes.includes(res.fkestudiante)) {
                                const computo = matriculas[k].computo
                                let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, exa1, pry1, proAB = ''
                                let letras, ll1,ll2 = '';
                                for (let i = 0; i < computo.length; i++) {
                                    const element = computo[i];
                                    if (element.fkmateria == materias.fkmaterias) {
                                        if (quim == 'PRIMER TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.a1; n2 = ins?.a2; n3 = ins?.a3; n4 = ins?.a4;
                                            n6 = ins?.b1; n7 = ins?.b2; n8 = ins?.b3; n9 = ins?.b4;
                                            ppa = element.notas?.ppa
                                            ll1 = promIniciales(ppa);
                                            ppb = element.notas?.ppb
                                            ll2 = promIniciales(ppb);
                                            sumAB = element.notas?.sumAB
                                            exa1 = element.notas?.exa1
                                            pry1 = element.notas?.pry1
                                            proAB = element.notas?.proAB
                                            letras = promInicialesPalabra(ins?.proAB);
                                        }
                                        if (quim == 'SEGUNDO TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4;
                                            n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4;
                                            ppa = element.notas?.ppc
                                            ll1 = promIniciales(ppa);
                                            ppb = element.notas?.ppd
                                            ll2 = promIniciales(ppb);
                                            sumAB = element.notas?.sumCD
                                            exa1 = element.notas?.exa2
                                            pry1 = element.notas?.pry2
                                            proAB = element.notas?.proCD
                                            letras = promInicialesPalabra(ins?.proCD);
                                        }
                                        if (quim == 'TERCER TRIMESTRE') {
                                            const ins = element.notas
                                            n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                            n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4;
                                            ppa = element.notas?.ppe
                                            ll1 = promIniciales(ppa);
                                            ppb = element.notas?.ppf
                                            ll2 = promIniciales(ppb);
                                            sumAB = element.notas?.sumEF
                                            exa1 = element.notas?.exa3
                                            pry1 = element.notas?.pry3
                                            proAB = element.notas?.proEF
                                            letras = promInicialesPalabra(ins?.proEF);
                                        }
                                    }
                                }
                                proPPA.push(ppa)
                                proPPB.push(ppb)
                                promAB.push(proAB)
                                aux.push({
                                    estudiante: res.estudiante?.fullname,
                                    n1, n2, n3, n4, n6, n7, n8, n9,
                                    ppa, ppb, sumAB,ll1, ll2,
                                    exa1, pry1, proAB,letras,
                                })
                            }
                        }
                        const medPPA = calcMedia(proPPA)
                        const medPPB = calcMedia(proPPB)
                        const medAB = calcMedia(promAB)
                        const pPPA = calcProm(proPPA)
                        const pPPB = calcProm(proPPB)
                        const prAB = calcProm(promAB)
                        const lettras = promCuantitativoLetrasDos(prAB);
                        const llf = promInicialesPalabra(prAB);
                        const lla = promIniciales(pPPA);
                        const llb = promIniciales(prAB);
                        help.push({
                            materia: materias.materia?.nombre,
                            computo : materias.materia?.computo,
                            docente: materias.docente?.fullname,
                            curso: rowD?.curso.nombre,
                            paralelo, data: aux,fechaA,
                            medPPA, medPPB, medAB,
                            periodo: rowM?.periodo.nombre,
                            pPPA, pPPB, prAB, lettras, llf, lla, llb
                        })
                    } else {
                        const proPPA = []; const proPPB = []; const promAB = []
                        for (let k = 0; k < matriculas.length; k++) {
                            const res = matriculas[k];
                            if (estudiantes.includes(res.fkestudiante)) {
                                const computo = matriculas[k].computo
                                let p1, p2 = ''
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
                                    letras,p1, p2,
                                })
                            }
                        }
                        const medPPA = contarMediaLet(proPPA, materias.materia?.nombre)
                        const medPPB = contarMediaLet(proPPB, materias.materia?.nombre)
                        const medAB = contarMediaLet(promAB, materias.materia?.nombre)
                        help2.push({
                            materia: materias.materia?.nombre,
                            docente: materias.docente?.fullname,
                            curso: rowD?.curso.nombre,
                            paralelo, data: aux2, fechaA: fechaA,
                            medPPA, medPPB,  medAB,
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
    const promJuntaComportamiento = (rowM, rowD, estudiantes, paralelo, keymateria) => {
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
                    if (materias.materia?.nombre == 'COMPORTAMIENTO'){
                        const proPPA = []; const proPPB = [];const proPPC = []; const promAB = []
                        for (let k = 0; k < matriculas.length; k++) {
                            const res = matriculas[k];
                            if (estudiantes.includes(res.fkestudiante)) {
                                const computo = matriculas[k].computo
                                let p1, p2, p3, final = ''
                                let letras = '';
                                for (let i = 0; i < computo.length; i++) {
                                    const element = computo[i];
                                    if (element.fkmateria == materias.fkmaterias) {
                                        const ins = element.cualitativo
                                        p1 = ins.p1;
                                        p2 = ins.p2;
                                        p3 = ins.p3;
                                        final = element.resultados?.promGen
                                        letras = calcularPromedioInsumosLetrasComportamiento(final)
                                    }
                                }
                                proPPA.push(p1)
                                proPPB.push(p2)
                                proPPC.push(p3)
                                promAB.push(letras)
                                aux.push({
                                    estudiante: res.estudiante?.fullname,
                                    letras,p1, p2,p3
                                })
                            }
                        }
                        const medPPA = contarMediaLet(proPPA, materias.materia?.nombre)
                        const medPPB = contarMediaLet(proPPB, materias.materia?.nombre)
                        const medPPC = contarMediaLet(proPPC, materias.materia?.nombre)
                        const medAB = contarMediaLet(promAB, materias.materia?.nombre)
                        help.push({
                            materia: materias.materia?.nombre,
                            docente: materias.docente?.fullname,
                            curso: rowD?.curso.nombre,
                            paralelo, data: aux, fechaA,
                            medPPA, medPPB,  medAB, medPPC,
                            periodo: rowM?.periodo.nombre,
                        })
                    }
                }
            }
           // console.log('es100',help)
            return help
        } catch (error) {
            console.log(error)
        }
    }
    const promLibretasElem = (rowM, rowD, estudiantes, quim) => {
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
                        if (subelement.materia?.nombre!='COMPORTAMIENTO') {
                            let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, sumAB90, exa1,pry1, sumAB10, proAB = ''
                            let letras, letrasp1, letrasp2, letraspf,ll1,ll2 = '';
                            const computos = subelement.materia?.computo
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    if (quim == 'PRIMER TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.a1; n2 = ins?.a2; n3 = ins?.a3; n4 = ins?.a4;
                                        n6 = ins?.b1; n7 = ins?.b2; n8 = ins?.b3; n9 = ins?.b4; 
                                        ppa = ins?.ppa; ppb = ins?.ppb; sumAB = ins?.sumAB; sumAB90 = ins?.sumAB90;
                                        exa1 = ins?.exa1; pry1= ins?.pry1; sumAB10 = ins?.sumAB10; proAB = ins?.proAB;
                                        ll1 = promIniciales(ppa);
                                        ll2 = promIniciales(ppb);
                                        letrasp1 = promCuantitativoLetrasDos(ppa);
                                        letrasp2 = promCuantitativoLetrasDos(ppb);
                                        letraspf = promCuantitativoLetrasDos(proAB);
                                        letras = promInicialesPalabra(ins?.proAB);
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4; 
                                        n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4; 
                                        ppa = ins?.ppc; ppb = ins?.ppd; sumAB = ins?.sumCD; sumAB90 = ins?.sumCD90;
                                        exa1 = ins?.exa2;pry1= ins?.pry2; sumAB10 = ins?.sumCD10; proAB = ins?.proCD;
                                        ll1 = promIniciales(ppa);
                                        ll2 = promIniciales(ppb);
                                        letrasp1 = promCuantitativoLetrasDos(ppa);
                                        letrasp2 = promCuantitativoLetrasDos(ppb);
                                        letraspf = promCuantitativoLetrasDos(proAB);
                                        letras = promInicialesPalabra(ins?.proCD);
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                        n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4; 
                                        ppa = ins?.ppe; ppb = ins?.ppf; sumAB = ins?.sumEF; sumAB90 = ins?.sumEF90;
                                        exa1 = ins?.exa3;pry1= ins?.pry3; sumAB10 = ins?.sumEF10; proAB = ins?.proEF;
                                        ll1 = promIniciales(ppa);
                                        ll2 = promIniciales(ppb);
                                        letrasp1 = promCuantitativoLetrasDos(ppa);
                                        letrasp2 = promCuantitativoLetrasDos(ppb);
                                        letraspf = promCuantitativoLetrasDos(proAB);
                                        letras = promInicialesPalabra(ins?.proEF);
                                    }
                                }
                            }
                            if(computos==2) {
                                promPPA.push(ppa)
                                promPPB.push(ppb)
                                general.push(proAB)
                            }
                            aux.push({
                                computo : computos,
                                materia: subelement.materia?.nombre,
                                area: subelement.materia?.area,
                                n1, n2, n3, n4, n6, n7, n8, n9,pry1,
                                ppa, ppb, sumAB, sumAB90, exa1, sumAB10, proAB,
                                letras,letrasp1, letrasp2, letraspf,
                                ll1, ll2
                            })
                        } else {
                            //TODO check COMPORTAMIENTO PROYECTOS ESCOLARES DHI
                            let pp1, pp2= ''
                            let letras = '';
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const mate = subelement.materia?.nombre
                                    if (quim == 'PRIMER TRIMESTRE') {
                                        const {p1} = result.cualitativo
                                        pp1 = p1;
                                        pp2 = p1;
                                        letras = setPalabraComportamiento(p1)
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const {p2} = result.cualitativo
                                        pp1 = p2;
                                        pp2 = p2;
                                        letras = setPalabraComportamiento(p2)
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const {p3} = result.cualitativo
                                        pp1 = p3;
                                        pp2 = p3;
                                        letras = setPalabraComportamiento(p3)
                                    }
                                }
                            }
                            aux2.push({
                                materia: subelement.materia?.nombre,
                                letras: letras, pp1, pp2
                            })
                        }
                    }
                    const pPPA = calcProm(promPPA)
                    const pPPB = calcProm(promPPB)
                    const pgeneral = calcProm(general)
                    const lll1 = promIniciales(pPPA);
                    const lll2 = promIniciales(pPPB);
                    const lllf = promInicialesPalabra(pPPB);
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux, data2: aux2, pPPA,
                        pPPB, pgeneral,lll1,lll2,lllf,
                        fechaA, nmatricula: element.nmatricula,
                    })
                }
            }
            return help
        } catch (error) {
            console.log(error)
            return []
        }
    }
    const promFinalElem = (rowM, rowD, estudiantes) => {
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
                    const general3 = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        if (subelement.materia?.nombre!='COMPORTAMIENTO') {
                            const computos = subelement.materia?.computo
                            let proAB, proCD,proEF, pytf,   final, letras, letras2 = ''
                            let ll1, ll2,ll3,llp,lle, llf = ''
                            let lc1, lc2,lc3,lcp, lcf = ''
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.notas
                                    const res = result.resultados
                                    proAB = ins?.proAB;
                                    proCD = ins?.proCD;
                                    proEF = ins?.proEF;
                                    pytf = res?.pytf
                                    final = res?.notaFinal
                                    ll1 = promCuantitativoLetrasDos(proAB);
                                    ll2 = promCuantitativoLetrasDos(proCD);
                                    ll3 = promCuantitativoLetrasDos(proEF);
                                    llp = promCuantitativoLetrasDos(pytf);
                                    llf = promCuantitativoLetrasDos(final);
                                    lc1 = promIniciales(proAB)
                                    lc2 = promIniciales(proCD)
                                    lc3 = promIniciales(proEF)
                                    lcp = promIniciales(pytf)
                                    lcf = promIniciales(final)
                                }
                            }
                            letras = promInicialesPalabra(final)
                            letras2 = promCuantitativoPalabraDos(final)
                            if(computos==2)
                              general3.push(final)
                            aux.push({
                                materia: subelement.materia?.nombre,
                                computo: computos, letras,letras2,
                                proAB, proCD, proEF,pytf,final, 
                                ll1, ll2, ll3, llp, lle, llf,
                                lc1, lc2, lc3,lcp, lcf
                            })
                        } else {
                            const computos = subelement.materia?.computo
                            let p1, p2,p3, promGen, letras = ''
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.cualitativo
                                    const res = result.resultados
                                    p1 = ins?.p1;
                                    p2 = ins?.p2;
                                    p3 = ins?.p3;
                                    promGen = res?.promGen
                                }
                            }
                            letras = calcularPryectos(promGen, subelement.materia?.nombre)
                            aux2.push({
                                materia: subelement.materia?.nombre,
                                computo: computos, letras,
                                p1, p2, p3,
                                promGen,
                            })
                        }
                    }
                    const pgeneral3 = calcProm(general3)
                    const promff = promIniciales(pgeneral3)
                    //const letras = trasformnumberToText(pgeneral3)
                    const letras = promInicialesPalabra(pgeneral3)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,data2: aux2, pgeneral3,
                        fechaA, nmatricula: element.nmatricula, letras, promff
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
    const promPromocionElem = (rowM, rowD, estudiantes) => {
        try {
            const matriculas = rowM?.matriculas
            const distributivo = rowD?.carga
            const help = []
            for (let i = 0; i < matriculas?.length; i++) {
                const element = matriculas[i];
                const aux = []
                const aux2 = []
                const aux3 = []
                if (estudiantes.includes(element.fkestudiante)) {
                    const computo = matriculas[i].computo;
                    const promGeneral = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        if (subelement.materia?.computo==2) {
                            //todo falta verificar si es promovido
                            let promedio, letras, promLetra = '';
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    promedio = result.resultados.notaFinal
                                    promLetra = promIniciales(promedio)
                                }
                            }
                            letras = promInicialesPalabra(promedio)
                            promGeneral.push(promedio)
                            aux.push({
                                materia: subelement.materia?.nombre,
                                area: subelement.materia?.area,
                                promedio: promedio ? promedio.toString().replace('.', ',') : '',
                                letras: letras,promLetra
                            }) 
                        } else {
                            if (subelement?.materia?.nombre=='COMPORTAMIENTO'){
                                let promedio, letras = '';
                                for (let m = 0; m < computo.length; m++) {
                                    const result = computo[m];
                                    if (subelement.fkmaterias == result.fkmateria) 
                                        promedio = result.resultados?.promGen
                                }
                                letras = calcularPryectos(promedio, subelement.materia?.nombre)
                                promGeneral.push(promedio)
                                aux2.push({
                                    materia: subelement.materia?.nombre,
                                    area: subelement.materia?.area,
                                    promedio: promedio,
                                    letras: letras,
                                })
                            } else {
                                /* MATERIAS COMPLEMENTARIAS */
                                let promedio, letras = '';
                                for (let m = 0; m < computo.length; m++) {
                                    const result = computo[m];
                                    if (subelement.fkmaterias == result.fkmateria) 
                                        promedio = result.resultados?.notaFinal
                                }
                                letras = promCuantitativoPalabraDos(promedio)
                                if(letras=='' || letras == undefined) letras = 'Sin confirmar'
                                aux3.push({
                                    materia: subelement.materia?.nombre,
                                    area: subelement.materia?.area,
                                    promedio: promedio,
                                    letras: letras,
                                })
                            }
                        }
                    }
                    //console.log(aux3)
                    const pgeneral = calcProm(promGeneral)
                    const promFinLetra = promIniciales(pgeneral)
                    const letrasFinal = promInicialesPalabra(pgeneral)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,
                        data2: aux2,
                        data3: aux3,
                        pgeneral: pgeneral ? pgeneral.toString().replace('.', ',') : '',
                        letrasFinal, promFinLetra
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
    const promInformeElem = (rowM, rowD, estudiantes) => {
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
                    const promAB = []; const general = []
                    const promCD = []; const general2 = []
                    const promEF = []; const general33 = []
                    const general3 = []
                    for (let j = 0; j < distributivo?.length; j++) {
                        const subelement = distributivo[j];
                        if (subelement.materia?.nombre!='COMPORTAMIENTO') {
                            let sumAB, sumAB90, pry1,exa1, sumAB10, proAB, sumCD, 
                            sumCD90, pry2, sumCD10, proCD, final,exa2, pytf,
                            sumEF, sumEF90, pry3,exa3, sumEF10, proEF, letras1, letras2, letras3, letrasf = ''
                            const computos = subelement.materia?.computo
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.notas
                                    const res = result.resultados
                                    sumAB = ins?.sumAB; sumAB90 = ins?.sumAB90;
                                    pry1 = ins?.pry1; exa1 = ins?.exa1; sumAB10 = ins?.sumAB10; proAB = ins?.proAB;
                                    letras1 = promIniciales(ins?.proAB);
    
                                    sumCD = ins?.sumCD; sumCD90 = ins?.sumCD90;
                                    pry2 = ins?.pry2;exa2 = ins?.exa2; sumCD10 = ins?.sumCD10; proCD = ins?.proCD;
                                    letras2 = promIniciales(ins?.proCD);

                                    sumEF = ins?.sumEF; sumEF90 = ins?.sumEF90;
                                    pry3 = ins?.pry3; exa3 = ins?.exa3; sumEF10 = ins?.sumEF10; proEF = ins?.proEF;
                                    letras3 = promIniciales(ins?.proEF);
    
                                    final = res?.notaFinal
                                    pytf = res?.pytf
                                    letrasf = promIniciales(res?.notaFinal);
                                }
                            }
                            /* NO CALCULAR LAS COMPLEMENTARIAS */
                            if(computos == 2) {
                                promAB.push(sumAB)
                                general.push(proAB)
    
                                promCD.push(sumCD)
                                general2.push(proCD)
    
                                promEF.push(sumEF)
                                general33.push(proEF)
    
                                general3.push(final) 
                            }
                            aux.push({
                                materia: subelement.materia?.nombre,
                                computo: computos,
                                area: subelement.materia?.area,
                                sumAB, sumAB90, pry1,exa1, sumAB10, proAB,
                                sumCD, sumCD90, pry2,exa2, sumCD10, proCD,
                                final, sumEF, sumEF90, pry3,exa3, pytf,
                                sumEF10, proEF, letras1, letras2, letras3, letrasf
                            })
                        } else {
                            let p1, p2, final = ''
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.cualitativo
                                    p1 = ins.p1;
                                    p2 = ins.p2;
                                    final = result.resultados?.promGen
                                }
                            }
                            aux2.push({
                                materia: subelement.materia?.nombre,
                                final,
                                p1, p2
                            })
                        }
                    }
                    const pAB = calcProm(promAB)
                    const pgeneral = calcProm(general)
                    const ll1 = promIniciales(pgeneral);

                    const pCD = calcProm(promCD)
                    const pgeneral2 = calcProm(general2)
                    const ll2 = promIniciales(pgeneral2);

                    const pEF = calcProm(promEF)
                    const pgeneral33 = calcProm(general33)
                    const ll3 = promIniciales(pgeneral33);

                    const pgeneral3 = calcProm(general3)
                    const letra = promIniciales(pgeneral3);
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,data2: aux2, pgeneral3,
                        pAB, pgeneral,
                        pCD, pgeneral2,
                        fechaA, nmatricula: element.nmatricula,
                        pEF, pgeneral33, letra, ll1, ll2, ll3,
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
    return {
        juntasOnly, juntasFinal, juntasGeneral, promJuntaComportamiento, promLibretasElem, promFinalElem, promPromocionElem,
        promInformeElem
    }
};

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
