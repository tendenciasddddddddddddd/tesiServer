import { funciones } from "./helper/funciones";
import { conString } from "./helper/conString";

const { calcProm, fechaActual, calcMedia, promCuantitativoLetras, promCuantitativoLetrasDos, calcPromMatriz,
    calcularPryectos, promCuantitativoPalabra, setPalabraComportamiento, setMediaLetra, promCuantitativoPalabraDos } = funciones()

const { trasformnumberToText} = conString()

export const superior = () => {

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
                            promGen, supletorio, examf,letras,letras2 = ''
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
                                    letras = promCuantitativoLetras(final);
                                    letras2 = promCuantitativoLetrasDos(final);
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
                                final, supletorio,suma10, promGen, letras, letras2
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
                    const finLetra = promCuantitativoLetrasDos(prABGen);
                    //console.log(mediaPPA)
                    //console.log(aux)
                    help.push({
                        materia: materias.materia?.nombre,
                        computo : materias.materia?.computo,
                        docente: materias.docente?.fullname,
                        curso: rowD?.curso.nombre,
                        paralelo,
                        data: aux,
                        fechaA,
                        medF, medCD,medEF, medAB,
                        periodo: rowM?.periodo.nombre,
                        pPPA, pPPB,pPPC, prAB,prABGen, medGE, finLetra
                    })
                }
            }
           // console.log('es100',help)
            return help
        } catch (error) {
            console.log(error)
        }
    }

    const promParcial = (rowM, rowD, estudiantes, quim) => {
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
                                    if(subarray.materia?.nombre =='COMPORTAMIENTO') nota = reg.cualitativo?.p1
                                    else {
                                        if (quim.qr == 'INSUMO INDIVIDUAL') nota = reg.notas?.ppa
                                        if (quim.qr == 'INSUMO GRUPAL') nota = reg.notas?.ppb
                                        if (quim.qr == 'PROYECTO') nota = reg.notas?.pry1
                                        if (quim.qr == 'EXAMEN')  nota = reg.notas?.exa1
                                    }
                                }
                                if (quim.quimestre == 'SEGUNDO TRIMESTRE') {
                                    if(subarray.materia?.nombre =='COMPORTAMIENTO') nota = reg.cualitativo?.p2
                                    else {
                                        if (quim.qr == 'INSUMO INDIVIDUAL') nota = reg.notas?.ppc
                                        if (quim.qr == 'INSUMO GRUPAL') nota = reg.notas?.ppd
                                        if (quim.qr == 'PROYECTO') nota = reg.notas?.pry2
                                        if (quim.qr == 'EXAMEN')  nota = reg.notas?.exa2
                                    }
                                }
                                if (quim.quimestre == 'TERCER TRIMESTRE') {
                                    if(subarray.materia?.nombre =='COMPORTAMIENTO') nota = reg.cualitativo?.p3
                                    else {
                                        if (quim.qr == 'INSUMO INDIVIDUAL') nota = reg.notas?.ppe
                                        if (quim.qr == 'INSUMO GRUPAL') nota = reg.notas?.ppf
                                        if (quim.qr == 'PROYECTO') nota = reg.notas?.pry3
                                        if (quim.qr == 'EXAMEN')  nota = reg.notas?.exa3
                                    }
                                }
                                if (quim.quimestre == 'FINAL') {
                                    if (quim.qr == 'PROYECTO') nota = reg.resultados?.pytf
                                    if (quim.qr == 'EXAMEN')  nota = reg.resultados?.examf
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

    const promQuimestral = (rowM, rowD, estudiantes, quim) => {
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
                                    if (subarray.materia?.nombre=='COMPORTAMIENTO') nota = reg.cualitativo?.p1
                                    else nota = reg.notas?.proAB
                                }
                                if (quim.quimestre == 'SEGUNDO TRIMESTRE') {
                                    if (subarray.materia?.nombre=='COMPORTAMIENTO') nota = reg.cualitativo?.p2
                                    else nota = reg.notas?.proCD
                                }
                                if (quim.quimestre == 'TERCER TRIMESTRE') {
                                    if (subarray.materia?.nombre=='COMPORTAMIENTO') nota = reg.cualitativo?.p3
                                    else nota = reg.notas?.proEF
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

    const promAnual = (rowM, rowD, estudiantes) => {
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
                            ppa, ppb, sumAB, sumAB80,
                            exa1, sumAB20, proAB,
                            ppc, ppd, sumCD, sumCD80,
                            exa2, sumCD20, proCD,
                            suple, final
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
                    fechaA,
                    periodo: rowM?.periodo.nombre,
                })
            }
            //console.log('es',help)
            return help
        } catch (error) {
            console.log(error)
        }
    }

    const promPromociones = (rowM, rowD, estudiantes) => {
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
                    const letrasFinal = trasformnumberToText(pgeneral)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,
                        data2: aux2,
                        data3: aux3,
                        pgeneral: pgeneral ? pgeneral.toString().replace('.', ',') : '',
                        letrasFinal
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

    const promMatricula = (rowM, estudiantes) => {
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

    const promLibretas = (rowM, rowD, estudiantes, quim) => {
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
                            let letras, letrasp1, letrasp2,letraspf = '';
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
                                        letrasp1 = promCuantitativoLetrasDos(ppa);
                                        letrasp2 = promCuantitativoLetrasDos(ppb);
                                        letraspf = promCuantitativoLetrasDos(proAB);
                                        letras = promCuantitativoLetras(ins?.proAB);
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.c1; n2 = ins?.c2; n3 = ins?.c3; n4 = ins?.c4; 
                                        n6 = ins?.d1; n7 = ins?.d2; n8 = ins?.d3; n9 = ins?.d4; 
                                        ppa = ins?.ppc; ppb = ins?.ppd; sumAB = ins?.sumCD; sumAB90 = ins?.sumCD90;
                                        exa1 = ins?.exa2;pry1= ins?.pry2; sumAB10 = ins?.sumCD10; proAB = ins?.proCD;
                                        letrasp1 = promCuantitativoLetrasDos(ppa);
                                        letrasp2 = promCuantitativoLetrasDos(ppb);
                                        letraspf = promCuantitativoLetrasDos(proAB);
                                        letras = promCuantitativoLetras(ins?.proCD);
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = result.notas
                                        n1 = ins?.e1; n2 = ins?.e2; n3 = ins?.e3; n4 = ins?.e4;
                                        n6 = ins?.f1; n7 = ins?.f2; n8 = ins?.f3; n9 = ins?.f4; 
                                        ppa = ins?.ppe; ppb = ins?.ppf; sumAB = ins?.sumEF; sumAB90 = ins?.sumEF90;
                                        exa1 = ins?.exa3;pry1= ins?.pry3; sumAB10 = ins?.sumEF10; proAB = ins?.proEF;
                                        letrasp1 = promCuantitativoLetrasDos(ppa);
                                        letrasp2 = promCuantitativoLetrasDos(ppb);
                                        letraspf = promCuantitativoLetrasDos(proAB);
                                        letras = promCuantitativoLetras(ins?.proEF);
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
                                letras,letrasp1, letrasp2, letraspf
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
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux, data2: aux2, pPPA,
                        pPPB, pgeneral,
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

    const promJuntas = (rowM, rowD, estudiantes, quim, paralelo) => {
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
                            let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, sumAB90, exa1, pry1, sumAB10, proAB = ''
                            let letras, letras2 = '';
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
                                        letras2 = promCuantitativoLetrasDos(ins?.proAB);
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
                                        letras2 = promCuantitativoLetrasDos(ins?.proCD);
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
                                        letras2 = promCuantitativoLetrasDos(ins?.proEF);
                                    }
                                }
                            }
                            proPPA.push(ppa)
                            proPPB.push(ppb)
                            promAB.push(proAB)
                            aux.push({
                                estudiante: res.estudiante?.fullname,
                                n1, n2, n3, n4, n6, n7, n8, n9,
                                ppa, ppb, sumAB, sumAB90, exa1, pry1,
                                sumAB10, proAB, letras,letras2
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
                        computo : materias.materia?.computo,
                        docente: materias.docente?.fullname,
                        curso: rowD?.curso.nombre,
                        paralelo, data: aux,
                        fechaA, medPPA, medPPB, medAB,
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
                                        p2 = ins.p1;
                                        letras = setPalabraComportamiento(ins.p1)
                                    }
                                    if (quim == 'SEGUNDO TRIMESTRE') {
                                        const ins = element.cualitativo
                                        p1 = ins.p2;
                                        p2 = ins.p2;
                                        letras = setPalabraComportamiento(ins.p2)
                                    }
                                    if (quim == 'TERCER TRIMESTRE') {
                                        const ins = element.cualitativo
                                        p1 = ins.p3;
                                        p2 = ins.p3;
                                        letras = setPalabraComportamiento(ins.p3)
                                    }
                                }
                            }
                            proPPA.push(p1)
                            proPPB.push(p2)
                            promAB.push(letras)
                            aux2.push({
                                estudiante: res.estudiante?.fullname,
                                letras,
                                p1, p2,
                            })
                        }
                    }
                    const medPPA = setMediaLetra(proPPA,materias.materia?.nombre)
                    const medPPB = setMediaLetra(proPPB,materias.materia?.nombre)
                    const medAB = setMediaLetra(promAB,materias.materia?.nombre)
                    help2.push({
                        materia: materias.materia?.nombre,
                        docente: materias.docente?.fullname,
                        curso: rowD?.curso.nombre,
                        paralelo,
                        data: aux2,
                        fechaA,
                        medPPA, medPPB, medAB,
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

    const promJuntasOnly = (rowM, rowD, estudiantes, quim, paralelo, keymateria) => {
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
                    const materias = distributivo[j]
                    if (materias.materia?.nombre != 'COMPORTAMIENTO') {
                        const proPPA = []; const proPPB = []; const promAB = []
                        for (let k = 0; k < matriculas.length; k++) {
                            const res = matriculas[k];
                            if (estudiantes.includes(res.fkestudiante)) {
                                const computo = matriculas[k].computo
                                let n1, n2, n3, n4, n6, n7, n8, n9, ppa, ppb, sumAB, sumAB90, exa1, pry1, sumAB10, proAB = ''
                                let letras = ''; let letras2=''
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
                                            letras2 = promCuantitativoLetrasDos(ins?.proAB);
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
                                            letras2 = promCuantitativoLetrasDos(ins?.proCD);
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
                                            letras2 = promCuantitativoLetrasDos(ins?.proEF);
                                        }
                                    }
                                }
                                proPPA.push(ppa)
                                proPPB.push(ppb)
                                promAB.push(proAB)
                                aux.push({
                                    estudiante: res.estudiante?.fullname,
                                    n1, n2, n3, n4, n6, n7, n8, n9,
                                    ppa, ppb, sumAB,sumAB90,
                                    exa1, pry1, sumAB10, proAB,letras,letras2
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
                        help.push({
                            materia: materias.materia?.nombre,
                            computo : materias.materia?.computo,
                            docente: materias.docente?.fullname,
                            curso: rowD?.curso.nombre,
                            paralelo, data: aux,fechaA,
                            medPPA, medPPB, medAB,
                            periodo: rowM?.periodo.nombre,
                            pPPA, pPPB, prAB, lettras
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

    const promInforme = (rowM, rowD, estudiantes) => {
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
                            let sumAB, sumAB90, exa1,pry1, sumAB10, proAB, sumCD, 
                            sumCD90, exa2,pry2, sumCD10, proCD, suple, final,pytf,examf,promGen,
                            sumEF, sumEF90, exa3, pry3, sumEF10, proEF, letras1, letras2, letras3, letrasf = ''
                            const computos = subelement.materia?.computo
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.notas
                                    const res = result.resultados
                                    sumAB = ins?.sumAB; sumAB90 = ins?.sumAB90;
                                    exa1 = ins?.exa1; pry1 = ins?.pry1; sumAB10 = ins?.sumAB10; proAB = ins?.proAB;
                                    letras1 = promCuantitativoLetrasDos(ins?.proAB);
    
                                    sumCD = ins?.sumCD; sumCD90 = ins?.sumCD90;
                                    exa2 = ins?.exa2; pry2 = ins?.pry2; sumCD10 = ins?.sumCD10; proCD = ins?.proCD;
                                    letras2 = promCuantitativoLetrasDos(ins?.proCD);

                                    sumEF = ins?.sumEF; sumEF90 = ins?.sumEF90;
                                    exa3 = ins?.exa3; pry3 = ins?.pry3; sumEF10 = ins?.sumEF10; proEF = ins?.proEF;
                                    letras3 = promCuantitativoLetrasDos(ins?.proEF);
    
                                    suple = res?.supletorio
                                    promGen = res?.promGen
                                    final = res?.notaFinal
                                    pytf = res?.pytf
                                    examf = res?.examf
                                    letrasf = promCuantitativoLetrasDos(res?.notaFinal);
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
                                sumAB, sumAB90, exa1, pry1, sumAB10, proAB,
                                sumCD, sumCD90, exa2, pry2, sumCD10, proCD,
                                final, suple, sumEF, sumEF90, exa3, pry3,promGen,
                                sumEF10, proEF, letras1, letras2, letras3, letrasf, pytf, examf
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
                    const pCD = calcProm(promCD)
                    const pgeneral2 = calcProm(general2)

                    const pEF = calcProm(promEF)
                    const pgeneral33 = calcProm(general33)

                    const pgeneral3 = calcProm(general3)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,data2: aux2, pgeneral3,
                        pAB, pgeneral,
                        pCD, pgeneral2,
                        fechaA, nmatricula: element.nmatricula,
                        pEF, pgeneral33
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

    const promFinal = (rowM, rowD, estudiantes) => {
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
                            let proAB, proCD,proEF, pytf, examf, suple, final, promGen, letras, letras2 = ''
                            let ll1, ll2,ll3,llp,lle, llf = ''
                            for (let m = 0; m < computo.length; m++) {
                                const result = computo[m];
                                if (subelement.fkmaterias == result.fkmateria) {
                                    const ins = result.notas
                                    const res = result.resultados
                                    proAB = ins?.proAB;
                                    proCD = ins?.proCD;
                                    proEF = ins?.proEF;
                                    pytf = res?.pytf
                                    examf = res?.examf
                                    suple = res?.supletorio
                                    final = res?.notaFinal
                                    promGen = res?.promGen
                                    ll1 = promCuantitativoLetrasDos(proAB);
                                    ll2 = promCuantitativoLetrasDos(proCD);
                                    ll3 = promCuantitativoLetrasDos(proEF);
                                    llp = promCuantitativoLetrasDos(pytf);
                                    lle = promCuantitativoLetrasDos(examf);
                                    llf = promCuantitativoLetrasDos(final);
                                }
                            }
                            letras = promCuantitativoPalabra(final)
                            letras2 = promCuantitativoPalabraDos(final)
                            if(computos==2)
                              general3.push(final)
                            aux.push({
                                materia: subelement.materia?.nombre,
                                computo: computos, letras,letras2,
                                proAB, proCD, proEF,pytf,examf,
                                final, suple, promGen,
                                ll1, ll2, ll3, llp, lle, llf
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
                    const letras = trasformnumberToText(pgeneral3)
                    help.push({
                        nombre: element.estudiante?.fullname,
                        curso: rowM.curso?.nombre,
                        periodo: rowM.periodo?.nombre,
                        paralelo: rowM.paralelo,
                        data: aux,data2: aux2, pgeneral3,
                        fechaA, nmatricula: element.nmatricula, letras
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
        juntasExamProyec, promParcial, promQuimestral, promAnual,promPromociones, promMatricula, promLibretas,
        promJuntas, promInforme, promFinal, promJuntasOnly
    }
};

