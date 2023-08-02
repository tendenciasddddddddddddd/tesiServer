import LogsLogin from "../models/LogsLogin";
import LogsNotas from "../models/LogsNotas";

export default {
  get: async (req, res) => {
    try {
      const limit = parseInt(req.query.take);
      const skip = parseInt(req.query.page);
      const total = await LogsLogin.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await LogsLogin.find()
        .skip(limit * skip - limit)
        .limit(limit)
        .sort({ createdAt: -1 });
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
  deleteLoginById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await LogsLogin.deleteMany({
        _id: {
          $in: array,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  queryLogin : async (req, res) => {
    try {
      const querys = req.query.querys;
      const result = await LogsLogin.find({ nombre: { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },

  //===============LOGS OF NOTAS =================================
  getNotas: async (req, res) => {
    try {
      const limit = parseInt(req.query.take);
      const skip = parseInt(req.query.page);
      const total = await LogsNotas.countDocuments();
      const paginas = Math.ceil(total / limit);
      const collections = await LogsNotas.find()
        .skip(limit * skip - limit)
        .limit(limit)
        .sort({ createdAt: -1 });
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
  deleteNotasById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await LogsNotas.deleteMany({
        _id: {
          $in: array,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
  queryNotas : async (req, res) => {
    try {
      const querys = req.query.querys;
      const result = await LogsNotas.find({ nombre: { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};