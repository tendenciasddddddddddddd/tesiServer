import Matriculas from "../../models/Matriculas";  //CAMBIAMOS TEMPORALMENTE
import { auditoria } from "./auditoria";
import { promElement } from "./helper/promElement";


const {saveProgreso} = auditoria()

const {convertirNum, calcularPromedioInsumos} = promElement()

async function primerIngresoNotas(idcurso, idmatricula, data) {
  try {
    const Dto = data.notas
    //PRIMER QUIMESTRE ENTRA A y B
    const pr1 = convertirNum(Dto.a1, Dto.a2, Dto.a3, Dto.a4)
    const ppa = calcularPromedioInsumos(pr1[0], pr1[1], pr1[2], pr1[3])
    const pr2 = convertirNum(Dto.b1, Dto.b2, Dto.b3, Dto.b4)
    const ppb = calcularPromedioInsumos(pr2[0], pr2[1], pr2[2], pr2[3])
    const pr3 = convertirNum(ppa, ppb, Dto.pry1, '0')
    const proAB = calcularPromedioInsumos(pr3[0], pr3[1], pr3[2], '')
    data.notas['ppa'] = ppa
    data.notas['ppb'] = ppb
    data.notas['proAB'] = proAB
   
    //SEGUNDO QUIMESTRE ENTRA C y D
    const pr4 = convertirNum(Dto.c1, Dto.c2, Dto.c3, Dto.c4)
    const ppc = calcularPromedioInsumos(pr4[0], pr4[1], pr4[2], pr4[3])
    const pr5 = convertirNum(Dto.d1, Dto.d2, Dto.d3, Dto.d4)
    const ppd = calcularPromedioInsumos(pr5[0], pr5[1], pr5[2], pr5[3])
    const pr6 = convertirNum(ppc, ppd, Dto.pry2, '0')
    const proCD = calcularPromedioInsumos(pr6[0], pr6[1], pr6[2], '')
    data.notas['ppc'] = ppc
    data.notas['ppd'] = ppd
    data.notas['proCD'] = proCD

    //TERCER QUIMESTRE ENTRA E y F
    const pr7 = convertirNum(Dto.e1, Dto.e2, Dto.e3, Dto.e4)
    const ppe = calcularPromedioInsumos(pr7[0], pr7[1], pr7[2], pr7[3])
    const pr8 = convertirNum(Dto.f1, Dto.f2, Dto.f3, Dto.f4)
    const ppf = calcularPromedioInsumos(pr8[0], pr8[1], pr8[2], pr8[3])
    const pr9 = convertirNum(ppe, ppf, Dto.pry2, '0')
    const proEF = calcularPromedioInsumos(pr9[0], pr9[1], pr9[2], '')
    data.notas['ppe'] = ppe
    data.notas['ppf'] = ppf
    data.notas['proEF'] = proEF

    const final = convertirNum(proAB, proCD, proEF, 'm')
    const final2 = calcularPromedioInsumos(final[0], final[1], final[2], '')

    data.resultados.notaFinal = final2

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

async function actualizarIngresoNotas(idcurso, idmatricula, fkmateria, data) {
  try {
    const Dto = data.notas
    //PRIMER QUIMESTRE ENTRA A y B
    const pr1 = convertirNum(Dto.a1, Dto.a2, Dto.a3, Dto.a4)
    const ppa = calcularPromedioInsumos(pr1[0], pr1[1], pr1[2], pr1[3])
    const pr2 = convertirNum(Dto.b1, Dto.b2, Dto.b3, Dto.b4)
    const ppb = calcularPromedioInsumos(pr2[0], pr2[1], pr2[2], pr2[3])
    const pr3 = convertirNum(ppa, ppb, Dto.pry1, '0')
    const proAB = calcularPromedioInsumos(pr3[0], pr3[1], pr3[2], '')
    data.notas['ppa'] = ppa
    data.notas['ppb'] = ppb
    data.notas['proAB'] = proAB
   
    //SEGUNDO QUIMESTRE ENTRA C y D
    const pr4 = convertirNum(Dto.c1, Dto.c2, Dto.c3, Dto.c4)
    const ppc = calcularPromedioInsumos(pr4[0], pr4[1], pr4[2], pr4[3])
    const pr5 = convertirNum(Dto.d1, Dto.d2, Dto.d3, Dto.d4)
    const ppd = calcularPromedioInsumos(pr5[0], pr5[1], pr5[2], pr5[3])
    const pr6 = convertirNum(ppc, ppd, Dto.pry2, '0')
    const proCD = calcularPromedioInsumos(pr6[0], pr6[1], pr6[2], '')
    data.notas['ppc'] = ppc
    data.notas['ppd'] = ppd
    data.notas['proCD'] = proCD

    //TERCER QUIMESTRE ENTRA E y F
    const pr7 = convertirNum(Dto.e1, Dto.e2, Dto.e3, Dto.e4)
    const ppe = calcularPromedioInsumos(pr7[0], pr7[1], pr7[2], pr7[3])
    const pr8 = convertirNum(Dto.f1, Dto.f2, Dto.f3, Dto.f4)
    const ppf = calcularPromedioInsumos(pr8[0], pr8[1], pr8[2], pr8[3])
    const pr9 = convertirNum(ppe, ppf, Dto.pry2, '0')
    const proEF = calcularPromedioInsumos(pr9[0], pr9[1], pr9[2], '')
    data.notas['ppe'] = ppe
    data.notas['ppf'] = ppf
    data.notas['proEF'] = proEF

    const final = convertirNum(proAB, proCD, proEF, 'm')
    const final2 = calcularPromedioInsumos(final[0], final[1], final[2], '')

    data.resultados.notaFinal = final2
   
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
      sendProgress(req.body, id)
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


const sendProgress = (data, idcurso) => {
    let total = 0
    let isA = 0
    let isB = 0
    let isPY1 = 0
    let isC = 0
    let isD = 0
    let isPY2 = 0
    let isE = 0
    let isF = 0
    let isPY3 = 0
    for (let i = 0; i < data.length; i++) {
      const element = data[i].notas;
      if (element?.a1 != '' || element?.a2 != '' || element?.a3 != '' || element?.a4 != '') {
        isA = 10
      }
      if (element?.b1 != '' || element?.b2 != '' || element?.b3 != '' || element?.b4 != '') {
        isB = 10
      }
      if (element?.pry1 != '') {
        isPY1 = 15
      }
  
      if (element?.c1 != '' || element?.c2 != '' || element?.c3 != '' || element?.c4 != '') {
        isC = 10
      }
      if (element?.d1 != '' || element?.d2 != '' || element?.d3 != '' || element?.d4 != '') {
        isD = 10
      }
      if (element?.pry2 != '') {
        isPY2 = 15
      }
  
      if (element?.e1 != '' || element?.e2 != '' || element?.e3 != '' || element?.e4 != '') {
        isE = 10
      }
      if (element?.f1 != '' || element?.f2 != '' || element?.f3 != '' || element?.f4 != '') {
        isF = 10
      }
      if (element?.pry3 != '') {
        isPY3 = 10
      }
    }
    const idDistributivo = data[0].idDistributivo
    const idCarga = data[0].idCarga
    const ip = data[0].ip
    const navegador = data[0].nav
    total = isA + isB + isPY1 + isC + isD + isPY2 + isE + isF + isPY3;
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