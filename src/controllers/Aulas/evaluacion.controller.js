import Aulasvirtuales from "../../models/Aulasvirtuales";

export default {
  create: async (req, res) => {
    try {
      await Aulasvirtuales.findByIdAndUpdate(
        req.params.id,
        { $push: { evaluacion: req.body.evaluacion } },
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
  update: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      if (array[0] != null && array[1] != null) {
        await Aulasvirtuales.updateOne(
          { _id: array[0] },
          {
            $set: {
                "evaluacion.$[perf].title": req.body.evaluacion.title,
                "evaluacion.$[perf].descripcion": req.body.evaluacion.descripcion,
                "evaluacion.$[perf].archivo": req.body.evaluacion.archivo,
                "evaluacion.$[perf].start": req.body.evaluacion.start,
                "evaluacion.$[perf].end": req.body.evaluacion.end,
                "evaluacion.$[perf].disponibilidad": req.body.evaluacion.disponibilidad,
                "evaluacion.$[perf].fechad": req.body.evaluacion.fechad,
                "evaluacion.$[perf].parcial": req.body.evaluacion.parcial,
                "evaluacion.$[perf].publicar": req.body.evaluacion.publicar,
                "evaluacion.$[perf].security": req.body.evaluacion.security,
                "evaluacion.$[perf].revisar": req.body.evaluacion.revisar,
                "evaluacion.$[perf].intenAllowed": req.body.evaluacion.intenAllowed,
                "evaluacion.$[perf].tempo": req.body.evaluacion.tempo,
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
  createPreguntas: async (req, res) => {
    try {
      await Aulasvirtuales.updateOne(
        {'evaluacion._id': req.params.paramId},
        { $push: { 'evaluacion.$.surveys': req.body } },
        {
          new: true,
        }
      );
      res.status(200).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  },
  updatePreguntas: async (req, res) => {
    try {
      await Aulasvirtuales.updateOne(
        {'evaluacion._id': req.params.paramId},
        { $set: { 'evaluacion.$.surveys': req.body } },
        {
          new: true,
        }
      );
      res.status(200).json({});
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  },
}
