import Matriculas from "../../models/Matriculas";  
import { promedioLetras } from "./helper/promedioLetras";

const { calcPrimerParcial} = promedioLetras()

async function primerIngresoNotas(idcurso, idmatricula, data) {
  try {
    const Dto = data.cualitativo 
    //PRIMER QUIMESTRE ENTRA A y B
    const sumaP1P2PY = calcPrimerParcial(Dto.p1, Dto.p2, Dto.py1)
    data.cualitativo['sumaP1P2PY'] = sumaP1P2PY

    //SEGUNDO QUIMESTRE ENTRA C y D
    const sumaP3P4PY = calcPrimerParcial(Dto.p3, Dto.p4, Dto.py2)
    data.cualitativo['sumaP3P4PY'] = sumaP3P4PY

    //TERCER TRIMESTRE ENTRA E y F
    
    const sumaP5P6PY = calcPrimerParcial(Dto.p5, Dto.p6, Dto.py3)
    data.cualitativo['sumaP5P6PY'] = sumaP5P6PY

    //RESUKTADOS FINALES DE NOTAS
    const promGen = calcPrimerParcial(sumaP1P2PY, sumaP3P4PY, sumaP5P6PY)
    data.resultados['promGen'] = promGen

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
async function updateNotas(idcurso, idmatricula, fkmateria, data) {
  try {
    const Dto = data.cualitativo 
    //PRIMER QUIMESTRE ENTRA A y B
    const sumaP1P2PY = calcPrimerParcial(Dto.p1, Dto.p2, Dto.py1)
    data.cualitativo['sumaP1P2PY'] = sumaP1P2PY

    //SEGUNDO QUIMESTRE ENTRA C y D
    const sumaP3P4PY = calcPrimerParcial(Dto.p3, Dto.p4, Dto.py2)
    data.cualitativo['sumaP3P4PY'] = sumaP3P4PY

    //TERCER TRIMESTRE ENTRA E y F
    
    const sumaP5P6PY = calcPrimerParcial(Dto.p5, Dto.p6, Dto.py3)
    data.cualitativo['sumaP5P6PY'] = sumaP5P6PY

    //RESUKTADOS FINALES DE NOTAS
    const promGen = calcPrimerParcial(sumaP1P2PY, sumaP3P4PY, sumaP5P6PY)
    data.resultados['promGen'] = promGen
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
  createCualitativo: async (req, res) => {
    try {
      const { id } = req.params;
      const array = req.body
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.isConfirm) {
          await updateNotas(id, element.idMatricula, element.fkmateria, element)
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
  ajustarPromedios: async (req, res) => {
    const { id } = req.params;
    const matriculas = await Matriculas.find({ fkcurso: id});
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
    //console.log(matriculas);
    res.status(200).json({});
  },
}
