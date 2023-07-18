import Destrezas from "../../models/registros/Destrezas.js";

export default {
  create: async (req, res) => {
    const { curso, fkcurso, ambitos } = req.body;
    try {
      const newData = new Destrezas({
        curso, fkcurso, ambitos
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
      const total = await Destrezas.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await Destrezas.find()
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
      const result = await Destrezas.find()
        .lean();
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Destrezas.findOne({ fkcurso: id})
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      const result = await Destrezas.findByIdAndUpdate(
        req.params.paramsId,
        req.body,
        {
          new: true,
        }
      );
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Destrezas.deleteMany({
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
      const result = await Destrezas.find({ nombre: { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};