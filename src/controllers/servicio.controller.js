import Servicios from "../models/Servicios.js";

export default {
  create: async (req, res) => {
    try {
      await Servicios.create(req.body);
      res.status(201).json({});
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  get: async (req, res) => {
    try {
      const limit = parseInt(req.query.take);
      const skip = parseInt(req.query.page);
      const total = await Servicios.countDocuments();
      const paginas = Math.ceil(total / limit);
      const reg = await Servicios.find()
        .skip(limit * skip - limit)
        .limit(limit)
        .lean();
      const coleccion = {
        reg: reg,
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
      const result = await Servicios.find()
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
      const result = await Servicios.findById(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      const result = await Servicios.findByIdAndUpdate(
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
      await Servicios.deleteMany({
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
        const reg = await Servicios.findByIdAndUpdate(
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
      const result = await Servicios.find({ nombre: { '$regex': querys, "$options": "i" }});
      res.status(200).json(result);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
    }
  },
};