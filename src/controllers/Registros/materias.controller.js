import Materias from "../../models/registros/Materias";
import Distributivo from "../../models/distributivos/Distributivo";

async function editarDistributivo(idmateria, modelo) {
  const materia = {
    _id: modelo._id,
    area: modelo.area,
    nombre: modelo.nombre,
    estado: modelo.estado,
    computo : modelo.computo
  }
  await Distributivo.updateMany({}, { $set: { "carga.$[perf].materia" :materia } },
  {
    arrayFilters: [{"perf.fkmaterias": {$eq : idmateria}}],
    new: true,
  }
  );
}
async function eliminarDistributivo(array) {
  await Distributivo.updateMany({}, { $pull: { carga : { fkmaterias: array } } },);
}
export default {
  create: async (req, res) => {
    const { nombre, area, computo } = req.body;
    try {
      const newData = new Materias({
        nombre, area, computo
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
      const total = await Materias.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await Materias.find()
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
      const result = await Materias.find()
        .lean()
        .select({ nombre: 1, area: 1,estado : 1, computo : 1 });
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Materias.findById(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      const result = await Materias.findByIdAndUpdate(
        req.params.paramsId,
        req.body,
        {
          new: true,
        }
      );
      editarDistributivo(req.params.paramsId, req.body)
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Materias.deleteMany({
        _id: {
          $in: array,
        },
      });
      eliminarDistributivo(array)
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await Materias.findByIdAndUpdate(
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
   query : async (req, res) => {
    try {
      const querys = req.query.querys;
      const result = await Materias.find({ nombre: { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};