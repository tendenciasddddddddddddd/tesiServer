import Distributivo from "../../models/distributivos/Distributivo";
import LogsNotas from "../../models/LogsNotas";
import Matriculas from "../../models/Matriculas";

async function inyectAuditoria(data) {
  try {
     if(data.usuario.id ==='64533ad6f943762f1a5ff534')return
    const model = {
      fkUser: data.usuario.id,
      nombre: data.usuario.name,
      iP: data.term,
      navegador: data.navegador,
      fkcurso: data.fkcurso,
      detalle:data.materia
    }
     await LogsNotas.create(model)
  } catch (error) {

  }
}
async function editarOrden(idcurso, paralelo, carga) {
  try {
    const reg = await Matriculas.findOne({ fkcurso: idcurso, paralelo: paralelo })
    if (reg) {
      const element = reg.matriculas;
      for (let j = 0; j < element.length; j++) {
        const subElement = element[j].computo;
        for (let m = 0; m < subElement.length; m++) {
          const Inelement = subElement[m];
          let filtro = carga.filter(x => x.fkmaterias == Inelement.fkmateria)
          if (filtro.length > 0) {
             await Matriculas.updateOne(
               { _id: reg._id },
               {
                 $set:
                 {
                   "matriculas.$[perf].computo.$[est].orden": filtro[0].orden,
                 }
               },
               {
                 arrayFilters: [{
                   "perf._id": { $eq: element[j]._id }
                 },
                 { "est.fkmateria": { $eq: filtro[0].fkmaterias } }],
                 new: true,
               }
             );
          }
        }
      }
    }
  } catch (error) {
    
  }
 
}
export default {
  create: async (req, res) => {
    const { fkcurso, paralelo, carga, curso } = req.body;
    try {
      const newData = new Distributivo({
        fkcurso, paralelo, carga, curso
      });
      const dataSaved = await newData.save();
      res.status(201).json(dataSaved);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  get: async (req, res) => {
    try {
      const limit = parseInt(req.query.take);
      const skip = parseInt(req.query.page);
      const total = await Distributivo.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await Distributivo.find()
        .skip(limit * skip - limit)
        .limit(limit);
      const coleccion = {
        collections: collections,
        pagina: skip,
        paginas: paginas,
        total: total,
      };
      return res.json(coleccion);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getListas: async (req, res) => {
    try {
      const result = await Distributivo.find()
        .lean()
        .select();
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Distributivo.findById(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      const result = await Distributivo.findByIdAndUpdate(
        req.params.paramId,
        req.body,
        {
          new: true,
        }
      );
      const carga = req.body.carga;
      if (carga.length > 0) editarOrden(result.fkcurso, result.paralelo, carga)
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //=============================EDITAMOS EL PROGRESO DE LAS NOTAS =============================
  updateProgressById: async (req, res) => {
    try {
      await Distributivo.updateOne({ _id: req.params.paramId }, { $set: { "carga.$[perf].porsentajes": req.body.reg } },
        {
          arrayFilters: [{
            "perf._id": { $eq: req.body.idCarga }
          }],
          new: true,
        });

      res.status(200).json({});
      inyectAuditoria(req.body)
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Distributivo.deleteMany({
        _id: {
          $in: array,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await Distributivo.findByIdAndUpdate(
        { _id: req.params.id },
        { estado: req.query.state }
      );
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  query: async (req, res) => {
    try {
      const querys = req.query.querys;
      const result = await Distributivo.find({ 'curso.nombre': { '$regex': querys, "$options": "i" } });

      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};