import Matriculas from "../../models/Matriculas"; //CAMBIAMOS TEMPORALMENTE Respaldo
import Secuencia from "../../models/Secuencia";
import Respaldo from "../../models/Respaldo";

async function verificarCursoMatricula(idcurso, paralelo) {
  const result = await Matriculas.findOne({ fkcurso: idcurso, paralelo: paralelo });
  return result;
}

async function actualizarSecuencia(idsecuencia, numero) {
  const model = {
    numMatricula: numero
  }
  await Secuencia.findByIdAndUpdate(
    idsecuencia,
    model,
    {
      new: true,
    }
  );
}
async function eliminarMatricula(array) {
  try {
    await Matriculas.updateMany({}, { $pull: { matriculas: { _id: array } } },);
  } catch (error) {
  }
}

export default {
  create: async (req, res) => {
    try {
      const grupMatricula = await verificarCursoMatricula(req.body.fkcurso, req.body.paralelo)
      if (grupMatricula) {
        await Matriculas.findByIdAndUpdate(
          grupMatricula._id,
          { $push: { 'matriculas': req.body.matriculas } },
          {
            new: true,
          }
        );
      } else {
        await Matriculas.create(req.body)
      }
      await actualizarSecuencia(req.body.idsecuencia, req.body.aux)
      return res.status(200).json({});
    } catch (error) {
      return res.status(500).json({ message: "Problem" });
    }
  },
  //======================EDITAR CAMBIOS DE CURSO =================================
  cambiarParalelo: async (req, res) => {
    try {
      const matricula = req.body.matriculas
      if (matricula.length > 0) {
        const arrarMatriculas = []
        for (let i = 0; i < matricula.length; i++) {
          const element = matricula[i].idmatricula;
          arrarMatriculas.push(element)
        }
        await eliminarMatricula(arrarMatriculas)
        const grupMatricula = await verificarCursoMatricula(req.body.fkcurso, req.body.paralelo)
        if (grupMatricula) {
          await Matriculas.findByIdAndUpdate(
            grupMatricula._id,
            { $push: { 'matriculas': req.body.matriculas } },
            {
              new: true,
            }
          );
        } else {
          await Matriculas.create(req.body)
        }
      }
      res.status(200).json({});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================ELIMINAR MATRICULAS =================================
  deleteByIds: async (req, res) => {
    try {
      const matricula = req.body
      if (matricula.length > 0) {
        console.log(matricula)
        const arrarMatriculas = []
        for (let i = 0; i < matricula.length; i++) {
          const element = matricula[i];
          arrarMatriculas.push(element)
        }
        await eliminarMatricula(arrarMatriculas)
      }
      res.status(200).json({});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================PARA NO DUPLICAR MATRICULAS =================================
  getListaFilter: async (req, res) => {
    try {
      const result = await Matriculas.find()
        .lean()
        .select({ curso:1,paralelo:1, "matriculas.estudiante": 1,'matriculas._id': 1,});
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
    //======================PARA LISTA DE ESTUDIANTES DOCENTES =================================
    getListaCursoNotas: async (req, res) => {
      try {
        const curso = req.query.curso
        const paralelo = req.query.paralelo
        const result = await Matriculas.findOne({fkcurso: curso, paralelo: paralelo })
          .lean();
        return res.json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    },    
  //======================LISTAR SECUENCIA =================================
  getSecuencia: async (req, res) => {
    try {
      const result = await Secuencia.find()
        .lean().select({ numMatricula: 1, });
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================LISTAR PARA REPORTE DE NOMINAR =================================
  getNomina: async (req, res) => {
    try {
      const result = await Matriculas.find()
        .lean().select({curso: 1, periodo: 1, paralelo: 1,
        'matriculas.estudiante': 1,  'matriculas.nmatricula': 1});
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================LISTAR MATRICULAS POR ID PARA PERIODOS  =================================
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Matriculas.find({
        fkcurso: {
          $in: [id],
        },
      }).lean();
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
    //======================LISTAR MATRICULAS POR ID PARA PERIODOS fkperiodo  =================================
    getRespaldoById: async (req, res) => {
      try {
        const { id } = req.params;
        const result = await Respaldo.find({
          fkcurso: {
            $in: [id],
          },
        }).lean();
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    },

  //======================PARA LISTA PARA ESTUDIANTES VER NOTAS =================================
  getByIdCalificaciones: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Matriculas.findOne({'matriculas.fkestudiante' : id}).lean();
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

}