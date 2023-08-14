import Aulasvirtuales from "../../models/Aulasvirtuales";

export default {
  create: async (req, res) => {
    try {
      await Aulasvirtuales.findByIdAndUpdate(
        req.params.id,
        { $push: { lecturas: req.body.lecturas } },
        {
          new: true,
        }
      );
      res.status(200).json(req.params.id);
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  },
  delete: async (req, res) => {
    try {
      let { id } = req.body;
      await Aulasvirtuales.updateOne(
        { _id: req.params.paramId },
        { $pull: { lecturas: { _id: id } } },
        {
          new: true,
        }
      );
      res.status(200).json({});
    } catch (e) {
      res.status(500).json({ message: "No mat found" });
    }
  },
  //======================EDITAR TAREA =================================
  update: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      if (array[0] != null && array[1] != null) {
        await Aulasvirtuales.updateOne(
          { _id: array[0] },
          {
            $set: {
              "lecturas.$[perf].title": req.body.lecturas.title,
              "lecturas.$[perf].content": req.body.lecturas.content,
              "lecturas.$[perf].disponibilidad": req.body.lecturas.disponibilidad,
              "lecturas.$[perf].fechad": req.body.lecturas.fechad,
            }
          },
          {
            arrayFilters: [{
              "perf._id": { $eq: array[1] }
            }],
            new: true,
          }
        );
        res.status(200).json("req.params.aulaId");
      } else {
        res.status(200).json("req.params.aulaId");
      }
    } catch (e) {
      console.log(e)
      res.status(500).json("error del servidor");
    }
  },
}
