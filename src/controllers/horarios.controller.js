import Horarios from "../models/Horarios";

async function verificarCursoMatricula(idcurso) {
  const result = await Horarios.findOne({ fkcurso: idcurso});
  return result;
}

export default {
  create: async (req, res) => {
    try {
      const grupMatricula = await verificarCursoMatricula(req.body.fkcurso)
      if (grupMatricula) {
        await Horarios.findByIdAndUpdate(
          grupMatricula._id,
          { $set: { 'distri': req.body.distri } },
          {
            new: true,
          }
        );
      } else {
        console.log('nuevo')
        await Horarios.create(req.body)
      }
      return res.status(200).json({});
    } catch (error) {
      return res.status(500).json({ message: "Problem" });
    }
  },
  getListas: async (req, res) => {
    try {
      const result = await Horarios.find()
        .lean()
        .select();
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  deleteById: async (req, res) => {
    try {
      let cadenaId = req.params.id;
      const array = cadenaId.split(",");
      await Horarios.deleteMany({
        _id: {
          $in: array,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },
}