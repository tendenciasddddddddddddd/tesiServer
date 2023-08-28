import Matriculas from "../../models/Matriculas";
import { promedio } from "./helper/promedios";
import { auditoria } from "./auditoria";

const { promedioInsumos, sumaParciales, sumaParciales80, examen20, totalPrimerQuim, finalAnual, finalSupletorios, ifDecimal, ponderado
  , ponderado90,  sumatoriaProm, calcDosPonderado} = promedio();
const {saveProgreso} = auditoria()

export default {

  create: async (req, res) => {
    try {
      const { id } = req.params;
      const array = req.body;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.isConfirm) {
          await updateNotas(id, element.idMatricula, element.fkmateria, element)
        } else {
          await saveNotas(id, element.idMatricula, element)
        }
      }
      sendProgress(req.body, id)
      res.status(200).json({});
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },

  supletorios: async (req, res) => {
    try {
      const { id } = req.params;
      const array = req.body
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.isConfirm) {
          await saveSupletorios(id, element.idMatricula, element.fkmateria, element)
        }
      }
      res.status(200).json({});
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },

  proyecto: async (req, res) => {
    try {
      const { id } = req.params;
      const array = req.body
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.isConfirm) {
          await saveProyecto(id, element.idMatricula, element.fkmateria, element)
        }
      }
      sendProgress(req.body, id)
      res.status(200).json({});
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },

  ajustarPromedios: async (req, res) => {
    const { id } = req.params;
    const matriculas = await Matriculas.find({ fkcurso: id });
    for (let i = 0; i < matriculas.length; i++) {
      const element = matriculas[i].matriculas;
      for (let j = 0; j < element.length; j++) {
        const subelement = element[j].computo;
        for (let k = 0; k < subelement.length; k++) {
          const finelement = subelement[k];
          await updateNotas(matriculas[i]._id, element[j]._id, subelement[k].fkmateria, finelement)
        }
      }
    }
    res.status(200).json({});
  },

}

async function saveNotas(idcurso, idmatricula, data) {
  try {
    const Dto = data.notas
    const Rto = data.resultados
    /*  PRIMER QUIMESTRE ENTRA A y B  */
    const ppa = await promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4)
    const ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4)
    const sumAB = sumaParciales(ppa, ppb)
    const sumAB90 = sumaParciales80(sumAB)
    const sumAB10 = examen20(Dto.exa1, Dto.pry1)
    const proAB = totalPrimerQuim(sumAB90, sumAB10)
    const pondAB = ponderado(proAB)
    data.notas['ppa'] = ppa
    data.notas['ppb'] = ppb
    data.notas['sumAB'] = sumAB
    data.notas['sumAB90'] = sumAB90
    data.notas['sumAB10'] = sumAB10
    data.notas['proAB'] = proAB
    data.notas['pondAB'] = pondAB

    /*  SEGUNDO QUIMESTRE ENTRA C y D  */
    const ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4)
    const ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4)
    const sumCD = sumaParciales(ppc, ppd)
    const sumCD90 = sumaParciales80(sumCD)
    const sumCD10 = examen20(Dto.exa2, Dto.pry2)
    const proCD = totalPrimerQuim(sumCD90, sumCD10)
    const pondCD = ponderado(proCD)
    data.notas['ppc'] = ppc
    data.notas['ppd'] = ppd
    data.notas['sumCD'] = sumCD
    data.notas['sumCD90'] = sumCD90
    data.notas['sumCD10'] = sumCD10
    data.notas['proCD'] = proCD
    data.notas['pondCD'] = pondCD

    /*  TERCER TRIMESTRE ENTRA E y F  */
    const ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4)
    const ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4)
    const sumEF = sumaParciales(ppe, ppf)
    const sumEF90 = sumaParciales80(sumEF)
    const sumEF10 = examen20(Dto.exa3, Dto.pry3)
    const proEF = totalPrimerQuim(sumEF90, sumEF10)
    const pondEF = ponderado(proEF)
    data.notas['ppe'] = ppe
    data.notas['ppf'] = ppf
    data.notas['sumEF'] = sumEF
    data.notas['sumEF90'] = sumEF90
    data.notas['sumEF10'] = sumEF10
    data.notas['proEF'] = proEF
    data.notas['pondEF'] = pondEF

    /*  RESUKTADOS FINALES DE NOTAS  */
    const notaFinal = finalAnual(proAB, proCD, proEF)
    const suma90 =  ponderado90(notaFinal)
    const suma10 = calcDosPonderado(data.resultados.examf, data.resultados.pytf)
    const promGen = sumatoriaProm(suma10, suma90)
    data.resultados['suma90'] = suma90
    data.resultados['suma10'] = suma10
    data.resultados['promGen'] = promGen
    data.resultados['suma1090'] = notaFinal
    const reg = finalSupletorios(data.resultados)
    let regAux = reg ? ifDecimal(reg) : ''
    let notaAux = ''
    if (Rto.supletorio == '') {
      notaAux = promGen
    } else {
      notaAux = regAux
    }
    data.resultados.notaFinal = notaAux

    await Matriculas.updateOne(
      { _id: idcurso },
      {
        $push:
          { "matriculas.$[perf].computo": data }
      },
      {
        arrayFilters: [{
          "perf._id": { $eq: idmatricula }
        }],
        new: true,
      }
    );
  } catch (e) {
    console.log(e)
    res.status(500).json("error del servidor");
  }
}

const sendProgress = (data, idcurso) => {
  let total = 0
  let isA = 0
  let isB = 0
  let isPY1 = 0
  let isEX1 = 0
  let isC = 0
  let isD = 0
  let isPY2 = 0
  let isEX2 = 0
  let isE = 0
  let isF = 0
  let isPY3 = 0
  let isEX3 = 0
  let isPROY = 0
  let isEXAF = 0
  for (let i = 0; i < data.length; i++) {
    const element = data[i].notas;
    const proy = data[i].resultados;
    if (element?.a1 != '' || element?.a2 != '' || element?.a3 != '' || element?.a4 != '') {
      isA = 10
    }
    if (element?.b1 != '' || element?.b2 != '' || element?.b3 != '' || element?.b4 != '') {
      isB = 10
    }
    if (element?.pry1 != '') {
      isPY1 = 5
    }
    if (element?.exa1 != '') {
      isEX1 = 5
    }

    if (element?.c1 != '' || element?.c2 != '' || element?.c3 != '' || element?.c4 != '') {
      isC = 10
    }
    if (element?.d1 != '' || element?.d2 != '' || element?.d3 != '' || element?.d4 != '') {
      isD = 10
    }
    if (element?.pry2 != '') {
      isPY2 = 5
    }
    if (element?.exa2 != '') {
      isEX2 = 5
    }

    if (element?.e1 != '' || element?.e2 != '' || element?.e3 != '' || element?.e4 != '') {
      isE = 10
    }
    if (element?.f1 != '' || element?.f2 != '' || element?.f3 != '' || element?.f4 != '') {
      isF = 10
    }
    if (element?.pry3 != '') {
      isPY3 = 5
    }
    if (element?.exa3 != '') {
      isEX3 = 5
    }

    if (proy?.pytf != '') {
      isPROY = 5
    }
    if (proy?.examf != '') {
        isEXAF = 5
      }
  }
  const idDistributivo = data[0].idDistributivo
  const idCarga = data[0].idCarga
  const ip = data[0].ip
  const navegador = data[0].nav
  total = isA + isB + isPY1 + isEX1 + isC + isD + isPY2 + isEX2 + isE + isF + isPY3 + isEX3 + isPROY + isEXAF;
  try {
    const model = {
      reg: total,
      materia: data[0].materia,
      fkcurso: idcurso,
      term: ip,
      navegador : navegador,
      usuario: data[0].usuario
    }
    saveProgreso(idDistributivo, model, idCarga)
  } catch (error) {
    console.log(error)
  }
}

async function updateNotas(idcurso, idmatricula, fkmateria, data) {
  try {

    const Dto = data.notas
    const Rto = data.resultados
    /*  PRIMER QUIMESTRE ENTRA A y B  */
    const ppa = await promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4)
    const ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4)
    const sumAB = sumaParciales(ppa, ppb)
    const sumAB90 = sumaParciales80(sumAB)
    const sumAB10 = examen20(Dto.exa1, Dto.pry1)
    const proAB = totalPrimerQuim(sumAB90, sumAB10)
    const pondAB = ponderado(proAB)
    data.notas['ppa'] = ppa
    data.notas['ppb'] = ppb
    data.notas['sumAB'] = sumAB
    data.notas['sumAB90'] = sumAB90
    data.notas['sumAB10'] = sumAB10
    data.notas['proAB'] = proAB
    data.notas['pondAB'] = pondAB

    /*  SEGUNDO QUIMESTRE ENTRA C y D  */
    const ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4)
    const ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4)
    const sumCD = sumaParciales(ppc, ppd)
    const sumCD90 = sumaParciales80(sumCD)
    const sumCD10 = examen20(Dto.exa2, Dto.pry2)
    const proCD = totalPrimerQuim(sumCD90, sumCD10)
    const pondCD = ponderado(proCD)
    data.notas['ppc'] = ppc
    data.notas['ppd'] = ppd
    data.notas['sumCD'] = sumCD
    data.notas['sumCD90'] = sumCD90
    data.notas['sumCD10'] = sumCD10
    data.notas['proCD'] = proCD
    data.notas['pondCD'] = pondCD

    /*  TERCER TRIMESTRE ENTRA E y F  */
    const ppe = promedioInsumos(Dto.e1, Dto.e2, Dto.e3, Dto.e4)
    const ppf = promedioInsumos(Dto.f1, Dto.f2, Dto.f3, Dto.f4)
    const sumEF = sumaParciales(ppe, ppf)
    const sumEF90 = sumaParciales80(sumEF)
    const sumEF10 = examen20(Dto.exa3, Dto.pry3)
    const proEF = totalPrimerQuim(sumEF90, sumEF10)
    const pondEF = ponderado(proEF)
    data.notas['ppe'] = ppe
    data.notas['ppf'] = ppf
    data.notas['sumEF'] = sumEF
    data.notas['sumEF90'] = sumEF90
    data.notas['sumEF10'] = sumEF10
    data.notas['proEF'] = proEF
    data.notas['pondEF'] = pondEF

    /*  RESUKTADOS FINALES DE NOTAS  */
    const notaFinal = finalAnual(proAB, proCD, proEF)
    const suma90 =  ponderado90(notaFinal)
    const suma10 = calcDosPonderado(data.resultados.examf, data.resultados.pytf)
    const promGen = sumatoriaProm(suma10, suma90)
    data.resultados['suma90'] = suma90
    data.resultados['suma10'] = suma10
    data.resultados['promGen'] = promGen
    data.resultados['suma1090'] = notaFinal
    const reg = finalSupletorios(data.resultados)
    let regAux = reg ? ifDecimal(reg) : ''
    let notaAux = ''
    if (Rto.supletorio == '') {
      notaAux = promGen
    } else {
      notaAux = regAux
    }
    data.resultados.notaFinal = notaAux

    await Matriculas.updateOne(
      { _id: idcurso },
      {
        $set:
        {
          "matriculas.$[perf].computo.$[est].notas": data.notas,
          "matriculas.$[perf].computo.$[est].resultados": data.resultados,
          "matriculas.$[perf].computo.$[est].fkdocente": data.fkdocente,
          "matriculas.$[perf].computo.$[est].docente": data.docente,
          "matriculas.$[perf].computo.$[est].orden": data.orden,
          "matriculas.$[perf].computo.$[est].cualitativo": {},
        }
      },
      {
        arrayFilters: [{
          "perf._id": { $eq: idmatricula }
        },
        { "est.fkmateria": { $eq: fkmateria } }],
        new: true,
      }
    );
  } catch (e) {
    console.log(e)
    res.status(500).json("error del servidor");
  }
}

async function saveSupletorios(idcurso, idmatricula, fkmateria, data) {
  try {
    const dto = data.resultados
    const suma10 = calcDosPonderado(dto.examf, dto.pytf)
    const promGen = sumatoriaProm(suma10, dto.suma90)
    dto['suma10'] = suma10
    dto['promGen'] = promGen
    const reg = finalSupletorios(dto)
    let regAux = reg ? ifDecimal(reg) : ''
    if (dto.supletorio == '') {
      regAux = promGen
    }
    dto.notaFinal = regAux
    await Matriculas.updateOne(
      { _id: idcurso },
      {
        $set:
        {
          "matriculas.$[perf].computo.$[est].resultados": dto,
        }
      },
      {
        arrayFilters: [{
          "perf._id": { $eq: idmatricula }
        },
        { "est.fkmateria": { $eq: fkmateria } }],
        new: true,
      }
    );
  } catch (e) {
    console.log(e)
    res.status(500).json("error del servidor");
  }
}

async function saveProyecto(idcurso, idmatricula, fkmateria, data) {
  try {
    const dto = data.resultados
    const suma10 = calcDosPonderado(dto.examf, dto.pytf)
    const promGen = sumatoriaProm(suma10, dto.suma90)
    dto['suma10'] = suma10
    dto['promGen'] = promGen
    let notaAux = ''
    if (dto.supletorio == '') {
      notaAux = promGen
    } else {
      notaAux = dto.supletorio
    }
    dto.notaFinal = notaAux

    await Matriculas.updateOne(
      { _id: idcurso },
      {
        $set:
        {
          "matriculas.$[perf].computo.$[est].resultados": dto,
        }
      },
      {
        arrayFilters: [{
          "perf._id": { $eq: idmatricula }
        },
        { "est.fkmateria": { $eq: fkmateria } }],
        new: true,
      }
    );
  } catch (e) {
    console.log(e)
    res.status(500).json("error del servidor");
  }
}
