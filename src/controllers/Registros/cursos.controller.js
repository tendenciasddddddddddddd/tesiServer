import Cursos from "../../models/registros/Cursos";
import Tutores from "../../models/distributivos/Tutores";
import Distributivo from "../../models/distributivos/Distributivo";
import Matriculas from "../../models/Matriculas";
import { client } from "../../middlewares/rediss";

async function editarTutores(iddocente, modelo) {
  const curso = {
    _id: modelo._id,
    nombre: modelo.nombre,
    num : modelo.num,
    subnivel : modelo.subnivel
  }
  await Tutores.updateMany({ fkcurso: iddocente }, { $set: { curso: curso} });
}
async function editarDistributivo(iddocente, modelo) {
  const curso = {
    _id: modelo._id,
    nombre: modelo.nombre,
    num : modelo.num,
    subnivel : modelo.subnivel
  }
  await Distributivo.updateMany({ fkcurso: iddocente }, { $set: { curso: curso} });
}
async function editarMatricula(iddocente, modelo) {
  const curso = {
    _id: modelo._id,
    nombre: modelo.nombre,
    num : modelo.num,
    subnivel : modelo.subnivel
  }
  await Matriculas.updateMany({ fkcurso: iddocente }, { $set: { curso: curso} });
}

async function eliminarTutores(array) {
  await Tutores.deleteMany({ fkcurso: { $in: array }});
}
async function eliminarDistributivo(array) {
  await Distributivo.deleteMany({ fkcurso: { $in: array }});
}
async function eliminarMatricula(array) {
  await Matriculas.deleteMany({ fkcurso: { $in: array }});
}

export default {
  create: async (req, res) => {
    const { nombre, num, subnivel } = req.body;
    try {
      const newData = new Cursos({
        nombre, num, subnivel
      });
      client.del('3000cursos');
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
      const total = await Cursos.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await Cursos.find()
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
      const reply = await client.get("3000cursos");
      if (reply) return res.json(JSON.parse(reply));
      const result = await Cursos.find().lean().select({ nombre: 1, num: 1,subnivel:1 });
      await client.set('3000cursos', JSON.stringify(result), { EX: 36000});
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Cursos.findById(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      const result = await Cursos.findByIdAndUpdate(
        req.params.paramsId,
        req.body,
        {
          new: true,
        }
      );
      editarTutores(req.params.paramsId, req.body)
      editarDistributivo(req.params.paramsId, req.body)
      editarMatricula(req.params.paramsId, req.body)
      client.del('3000cursos');
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Cursos.deleteMany({
        _id: {
          $in: array,
        },
      });
      eliminarTutores(array)
      eliminarDistributivo(array)
      eliminarMatricula(array)
      client.del('3000cursos');
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  activate: async (req, res, next) => {
    try {
      const reg = await Cursos.findByIdAndUpdate(
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
      const result = await Cursos.find({ nombre: { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};