import Matriculas from "../../models/Matriculas";  //CAMBIAMOS TEMPORALMENTE

async function primerIngresoNotas(idcurso, idmatricula, data) {
    try {
          await Matriculas.updateOne(
            { _id: idcurso },
            { $push: 
              { "matriculas.$[perf].computo": data} 
            },
            {
              arrayFilters: [{
                "perf._id": {$eq : idmatricula}}],
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
          { $set: 
            { "matriculas.$[perf].destrezas": data} 
          },
          {
            arrayFilters: [{
              "perf._id": {$eq : idmatricula}}],
              new: true,
          }
        );
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
}

async function actualizarIngresoNotas(idcurso, idmatricula,fkmateria, data) {
    try {
          await Matriculas.updateOne(
            { _id: idcurso },
            { $set: 
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
                    "perf._id": {$eq : idmatricula}},
                    {"est.fkmateria": {$eq : fkmateria}}],
                new: true,
            }
          );
      } catch (e) {
        console.log(e)
        res.status(500).json("error del servidor");
      }
}
async function actualizarIngresoSupletorios(idcurso, idmatricula,fkmateria, data) {
  try {
        await Matriculas.updateOne(
          { _id: idcurso },
          { $set: 
              { 
                "matriculas.$[perf].computo.$[est].resultados": data.resultados,
              } 
          },
          {
              arrayFilters: [{
                  "perf._id": {$eq : idmatricula}},
                  {"est.fkmateria": {$eq : fkmateria}}],
              new: true,
          }
        );
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
}
async function actualizarIngresoNotasCualitativo(idcurso, idmatricula,fkmateria, data) {
  try {
        await Matriculas.updateOne(
          { _id: idcurso },
          { $set: 
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
                  "perf._id": {$eq : idmatricula}},
                  {"est.fkmateria": {$eq : fkmateria}}],
              new: true,
          }
        );
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
}
//

export default {
  create: async (req, res) => {
    try {
        const { id } = req.params;
        const array = req.body
        for (let i = 0; i < array.length; i++) {
            const element = array[i];
            if (element.isConfirm) {
               await actualizarIngresoNotas(id, element.idMatricula,element.fkmateria, element)
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
              await actualizarIngresoSupletorios(id, element.idMatricula,element.fkmateria, element)
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
               await actualizarIngresoNotasCualitativo(id, element.idMatricula,element.fkmateria, element)
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
