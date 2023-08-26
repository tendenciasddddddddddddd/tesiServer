import Matriculas from "../../models/Matriculas";  //CAMBIAMOS TEMPORALMENTE
import { promedio } from "./helper/promedios";

const { promedioInsumos, sumaParciales, sumaParciales80, examen20, totalPrimerQuim, finalAnual, finalSupletorios, ifDecimal, ponderado } = promedio();

async function primerIngresoNotas(idcurso, idmatricula, data) {
  try {
    const Dto = data.notas
    const Rto = data.resultados
    //PRIMER QUIMESTRE ENTRA A y B
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

    //SEGUNDO QUIMESTRE ENTRA C y D
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

    //TERCER TRIMESTRE ENTRA E y F
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

    //RESUKTADOS FINALES DE NOTAS
    const notaFinal = finalAnual(proAB, proCD, proEF)
    data.resultados.promedioFinal = notaFinal
    let notaAux = ''
    if (Rto.supletorio == '') {
      notaAux = notaFinal
    } else {
      notaAux = Rto.supletorio
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
async function primerIngresoIniciales(idcurso, idmatricula, data) {
  try {
    await Matriculas.updateOne(
      { _id: idcurso },
      {
        $set:
          { "matriculas.$[perf].destrezas": data }
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

async function actualizarIngresoNotas(idcurso, idmatricula, fkmateria, data) {
  try {
    const Dto = data.notas
    const Rto = data.resultados
    //PRIMER QUIMESTRE ENTRA A y B
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

    //SEGUNDO QUIMESTRE ENTRA C y D
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

    //TERCER TRIMESTRE ENTRA E y F
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

    //RESUKTADOS FINALES DE NOTAS
    const notaFinal = finalAnual(proAB, proCD, proEF)
    data.resultados.promedioFinal = notaFinal
    let notaAux = ''
    if (Rto.supletorio == '') {
      notaAux = notaFinal
    } else {
      notaAux = Rto.supletorio
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
async function actualizarIngresoSupletorios(idcurso, idmatricula, fkmateria, data) {
  try {
    const reg = finalSupletorios(data.resultados)
    let regAux = reg ? ifDecimal(reg) : ''
    if (data.resultados.supletorio == '') {
      regAux = data.resultados.promedioFinal ? ifDecimal(data.resultados.promedioFinal) : ''
    }
    data.resultados.notaFinal = regAux
    await Matriculas.updateOne(
      { _id: idcurso },
      {
        $set:
        {
          "matriculas.$[perf].computo.$[est].resultados": data.resultados,
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
async function actualizarIngresoNotasCualitativo(idcurso, idmatricula, fkmateria, data) {
  try {
    await Matriculas.updateOne(
      { _id: idcurso },
      {
        $set:
        {
          "matriculas.$[perf].computo.$[est].cualitativo": data.cualitativo,
          "matriculas.$[perf].computo.$[est].resultados": data.resultados,
          "matriculas.$[perf].computo.$[est].fkdocente": data.fkdocente,
          "matriculas.$[perf].computo.$[est].docente": data.docente,
          "matriculas.$[perf].computo.$[est].orden": data.orden,
          "matriculas.$[perf].computo.$[est].notas": {},
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

export default {
  create: async (req, res) => {
    try {
      const { id } = req.params;
      const array = req.body;
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.isConfirm) {
          await actualizarIngresoNotas(id, element.idMatricula, element.fkmateria, element)
        } else {
          await primerIngresoNotas(id, element.idMatricula, element)
        }
      }
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
          await actualizarIngresoSupletorios(id, element.idMatricula, element.fkmateria, element)
        }
      }
      res.status(200).json({});
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },
  createCualitativo: async (req, res) => {
    try {
      const { id } = req.params;
      const array = req.body
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.isConfirm) {
          await actualizarIngresoNotasCualitativo(id, element.idMatricula, element.fkmateria, element)
        } else {
          await primerIngresoNotas(id, element.idMatricula, element)
        }
      }
      res.status(200).json({});
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },
  iniciales: async (req, res) => {
    try {
      const { id } = req.params;
      const array = req.body
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        await primerIngresoIniciales(id, element.idMatricula, element)
      }
      res.status(200).json({});
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },
  ajustarPromedios: async (req, res) => {
    const { id } = req.params;
    const matriculas = await Matriculas.find({ fkcurso: id});
    for (let i = 0; i < matriculas.length; i++) {
      const element = matriculas[i].matriculas;
      for (let j = 0; j < element.length; j++) {
        const subelement = element[j].computo;
        for (let k = 0; k < subelement.length; k++) {
          const finelement = subelement[k];
          await actualizarIngresoNotas(matriculas[i]._id, element[j]._id, subelement[k].fkmateria, finelement)
        }
      }
    }
    //console.log(matriculas);
    res.status(200).json({});
  },
}
