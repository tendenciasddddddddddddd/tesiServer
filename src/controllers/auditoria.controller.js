import Periodo from "../../models/registros/Periodo";

export default {

  getListas: async (req, res) => {
    try {
      const result = await Periodo.find()
        .lean();
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