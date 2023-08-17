import Tutores from "../../models/distributivos/Tutores";
import Matriculas from "../../models/Matriculas";
import Distributivo from "../../models/distributivos/Distributivo";

export default {
  create: async (req, res) => {
    const { fkcurso, paralelo,fkdocente, curso, docente } = req.body;
    try {
      const newData = new Tutores({
        fkcurso, paralelo,fkdocente, curso, docente
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
      const total = await Tutores.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await Tutores.find()
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
      const result = await Tutores.find()
        .lean()
        .select({ fkcurso: 1, paralelo: 1 , curso:1});
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Tutores.find({fkdocente:id});
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  //=======================GET LISTA DE MATRICULAS Y DISTRIBUTIVO =================
  getByIdReportes: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      const rowM = await Matriculas.findOne({fkcurso:array[0], paralelo: array[1]});
      const rowD = await Distributivo.findOne({fkcurso:array[0], paralelo: array[1]});
      res.status(200).json({
        matricula: rowM,
        distributivo : rowD
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      const result = await Tutores.findByIdAndUpdate(
        req.params.paramId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Tutores.deleteMany({
        _id: {
          $in: array,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },

   query : async (req, res) => {
    try {
      const querys = req.query.querys;
      const result = await Tutores.find({ 'curso.nombre': { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};