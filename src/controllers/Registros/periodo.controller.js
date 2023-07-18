import Periodo from "../../models/registros/Periodo";
import Matriculas from "../../models/Matriculas";
async function editarMatricula(idperiodo, modelo) {
  const periodo = {
    _id: modelo._id,
    nombre: modelo.nombre,
  }
  await Matriculas.updateMany({ fkperiodo: idperiodo }, { $set: { periodo: periodo} });
}

async function eliminarMatricula(array) {
  await Matriculas.deleteMany({ fkperiodo: { $in: array }});
}

export default {
  create: async (req, res) => {
    const { nombre } = req.body;
    try {
      const newData = new Periodo({
        nombre
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
      const total = await Periodo.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await Periodo.find()
        .skip(limit * skip - limit)
        .limit(limit)
        .lean();
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
      const result = await Periodo.find()
        .lean()
        .select({ nombre: 1 , estado: 1 });
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Periodo.findById(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      const result = await Periodo.findByIdAndUpdate(
        req.params.paramsId,
        req.body,
        {
          new: true,
        }
      );
      editarMatricula(req.params.paramsId, req.body)
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Periodo.deleteMany({
        _id: {
          $in: array,
        },
      });
      eliminarMatricula(array)
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  activate: async (req, res, next) => {
    try {
       // await Periodo.updateMany({}, { $set: { estado: 0 } })
        const reg = await Periodo.findByIdAndUpdate(
          { _id: req.params.id },
          { estado: req.body.estado }
        );
        res.status(200).json(reg);
      } catch (e) {
        return res.status(500).json();
      }
  },
   query : async (req, res) => {
    try {
      const querys = req.query.querys;
      const result = await Periodo.find({ nombre: { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};