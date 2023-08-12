import Matriculas from "../../models/Matriculas";  //CAMBIAMOS TEMPORALMENTE
import { promedio } from "./helper/promedios";

const { promedioInsumos, sumaParciales, sumaParciales80, examen20, totalPrimerQuim, finalAnual, finalSupletorios, ifDecimal } = promedio();

async function primerIngresoNotas(idcurso, idmatricula, data) {
  try {
    const Dto = data.notas
    const Rto = data.resultados
    //PRIMER QUIMESTRE ENTRA A y B
    const ppa = promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4, Dto.a5)
    const ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4, Dto.b5)
    const sumAB = sumaParciales(ppa, ppb)
    const sumAB80 = sumaParciales80(sumAB)
    const sumAB20 = examen20(Dto.exa1)
    const proAB = totalPrimerQuim(sumAB80, sumAB20)
    data.notas['ppa'] = ppa
    data.notas['ppb'] = ppb
    data.notas['sumAB'] = sumAB
    data.notas['sumAB80'] = sumAB80
    data.notas['sumAB20'] = sumAB20
    data.notas['proAB'] = proAB
    //SEGUNDO QUIMESTRE ENTRA C y D
    const ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4, Dto.c5)
    const ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4, Dto.d5)
    const sumCD = sumaParciales(ppc, ppd)
    const sumCD80 = sumaParciales80(sumCD)
    const sumCD20 = examen20(Dto.exa1)
    const proCD = totalPrimerQuim(sumCD80, sumCD20)
    data.notas['ppc'] = ppc
    data.notas['ppd'] = ppd
    data.notas['sumCD'] = sumCD
    data.notas['sumCD80'] = sumCD80
    data.notas['sumCD20'] = sumCD20
    data.notas['proCD'] = proCD
    //RESUKTADOS FINALES DE NOTAS
    const notaFinal = finalAnual(proAB, proCD)
    console.log(notaFinal)
    data.resultados.promedioFinal = notaFinal
    let notaAux = ''
    if (Rto.supletorio == '' && Rto.remedial == '' && Rto.gracia == '') {
      notaAux = notaFinal
    } else {
      notaAux = Rto.supletorio
      notaAux = Rto.remedial
      notaAux = Rto.gracia
    }
    data.resultados.notaFinal = notaAux
    console.log(data)
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
    const ppa = promedioInsumos(Dto.a1, Dto.a2, Dto.a3, Dto.a4, Dto.a5)
    const ppb = promedioInsumos(Dto.b1, Dto.b2, Dto.b3, Dto.b4, Dto.b5)
    const sumAB = sumaParciales(ppa, ppb)
    
    const sumAB80 = sumaParciales80(sumAB)
    const sumAB20 = examen20(Dto.exa1)
    const proAB = totalPrimerQuim(sumAB80, sumAB20)
    data.notas['ppa'] = ppa
    data.notas['ppb'] = ppb
    data.notas['sumAB'] = sumAB
    data.notas['sumAB80'] = sumAB80
    data.notas['sumAB20'] = sumAB20
    data.notas['proAB'] = proAB
    //SEGUNDO QUIMESTRE ENTRA C y D
    const ppc = promedioInsumos(Dto.c1, Dto.c2, Dto.c3, Dto.c4, Dto.c5)
    const ppd = promedioInsumos(Dto.d1, Dto.d2, Dto.d3, Dto.d4, Dto.d5)
    const sumCD = sumaParciales(ppc, ppd)
    
    const sumCD80 = sumaParciales80(sumCD)
    const sumCD20 = examen20(Dto.exa2)
    const proCD = totalPrimerQuim(sumCD80, sumCD20)
    data.notas['ppc'] = ppc
    data.notas['ppd'] = ppd
    data.notas['sumCD'] = sumCD
    data.notas['sumCD80'] = sumCD80
    data.notas['sumCD20'] = sumCD20
    data.notas['proCD'] = proCD
    //RESUKTADOS FINALES DE NOTAS
    const notaFinal = finalAnual(proAB, proCD)
    data.resultados.promedioFinal = notaFinal
    let notaAux = ''
    if (Rto.supletorio == '' && Rto.remedial == '' && Rto.gracia == '') {
      notaAux = notaFinal
    } else {
      notaAux = Rto.supletorio
      notaAux = Rto.remedial
      notaAux = Rto.gracia
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
    if (data.resultados.supletorio == '' && data.resultados.remedial == '' && data.resultados.gracia == '') {
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
}
