import Aulasvirtuales from "../../models/Aulasvirtuales";

export default {
  create: async (req, res) => {
    try {
      await Aulasvirtuales.create(req.body)
      res.status(201).json({});
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================EDITAR CAMBIOS DE CURSO =================================
  getLista: async (req, res) => {
    try {
      const idDocente = req.query.id;
      const result = await Aulasvirtuales.find({
        fkdocente: idDocente,
      }).lean().select({ fkdocente: 1, nombre: 1, materia: 1, paralelo: 1, docente: 1 });
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================MUESTRA LISTA DE CURSOS PARA ESTUDIANTES =================================
  getAll: async (req, res) => {
    try {
      const result = await Aulasvirtuales.find().lean()
        .select({ fkdocente: 1, nombre: 1, materia: 1, paralelo: 1, docente: 1, estudiantes: 1, updatedAt: 1 });
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================GET PARA HOME DOCENTE =================================
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Aulasvirtuales.findById(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================GET PARA CONFIGURAR CURSO =================================
  getByConfigCourse: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Aulasvirtuales.findById(id)
        .select({ fkdocente: 1, nombre: 1, materia: 1, paralelo: 1, docente: 1, codigo: 1 });
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================GET PARA CONFIGURAR CURSO =================================
  getByListEstudiantes: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Aulasvirtuales.findById(id)
        .select({ estudiantes: 1, });
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  //======================GET PARA CALENDARIO =================================
  getByListCalendario: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Aulasvirtuales.findById(id)
        .select({
          'tareas.title': 1, 'tareas.start': 1, 'tareas.tipo': 1,
          'evaluacion.title': 1, 'evaluacion.start': 1, 'evaluacion.tipo': 1,
          'foros.title': 1, 'foros.start': 1, 'foros.tipo': 1
        });
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================GET PARA CALIFICACIONES AULAS =================================
  getByListNotas: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Aulasvirtuales.findById(id)
        .select({
          'tareas.title': 1, 'tareas.entrega': 1,
          'evaluacion.title': 1, 'evaluacion.answers': 1,
          'foros.title': 1, 'foros.start': 1, 'foros.tipo': 1, estudiantes: 1
        });
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //======================GET PARA HOME DOCENTE =================================
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUsuarios = await Aulasvirtuales.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(updatedUsuarios);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  insertEstudiantes: async (req, res) => {
    try {
      await Aulasvirtuales.findByIdAndUpdate(
        req.params.id,
        { $push: { estudiantes: req.body } },
        {
          new: true,
        }
      );
      res.status(200).json(req.params.id);
    } catch (e) {
      res.status(500).json("error del servidor");
    }
  },
  deleteEstudiante: async (req, res) => {
    try {
      const { id, foranea } = req.body;
      await clearDataStudiantes(req.params.paramId, foranea)
       await Aulasvirtuales.updateOne(
         { _id: req.params.paramId },
         { $pull: { estudiantes: { _id: id } } },
         {
           new: true,
         }
       );

      res.status(200).json({});
    } catch (e) {
      res.status(500).json({ message: "No mat found" });
    }
  },
  deleteById: async (req, res) => {
    try {
      await Aulasvirtuales.deleteMany({
        _id: {
          $in: req.params.id,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  updateSeccion: async (req, res) => {
    try {
      console.log(req.body)
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {
          $set: {
            "seccion.$[perf].nombre": req.body.nombre,
            "seccion.$[perf].estado": req.body.estado,
          }
        },
        {
          arrayFilters: [{
            "perf._id": { $eq: array[1] }
          }],
          new: true,
        }
      );
      res.status(200).json({});
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },
}

async function clearDataStudiantes(idKey, id) {
  try {
    const result = await Aulasvirtuales.findById(idKey);
    if (!result) return;
    result?.tareas?.forEach((res) => {
      res?.entrega?.forEach((ent, index) => {
        if (ent.fkestudiante == id) {
          res?.entrega?.splice(index, 1);
        }
      });
      const foros = []
      for (let i = 0; i < res?.foro?.length; i++) {
        const element = res.foro[i];
        if (element.fkestudiante != id) foros.push(element);
      }
      res.foro = foros;
    })
    result?.evaluacion?.forEach((res) => {
      const respuestas = []
      for (let i = 0; i < res?.answers?.length; i++) {
        const element = res.answers[i];
        if (element.fkestudiante != id) respuestas.push(element);
      }
      res.answers = respuestas
    })
    result?.foros?.forEach((res) => {
      const foro = []
      for (let i = 0; i < res?.foro?.length; i++) {
        const element = res.foro[i];
        if (element.fkestudiante != id){ 
          const subForo = element?.subForo?.filter(x => x.fkestudiante != id)
          if(subForo.length > 0) element.subForo = subForo
          foro.push(element);
        }
      }
      res.foro = foro
      const filter = res?.participacion?.filter(x => x.fkestudiante != id)
      if(filter.length > 0) res.participacion = filter
    })
    await Aulasvirtuales.findByIdAndUpdate(idKey, result);
  } catch (error) {
    console.log(error);
  }
}