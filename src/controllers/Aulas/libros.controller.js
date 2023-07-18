import Aulasvirtuales from "../../models/Aulasvirtuales";

async function removeFiles(ids, modelo) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: ids },
      {
        $pull: {
          "libros.$[].archivo": { "_id": modelo.mod }
        }
      }
    )
  } catch (error) {
  }
}
export default {
  create: async (req, res) => {
    try {
      await Aulasvirtuales.findByIdAndUpdate(
        req.params.id,
        { $push: { libros: req.body.libros } },
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
        { $pull: { libros: { _id: id } } },
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
              "libros.$[perf].title": req.body.libros.title,
              "libros.$[perf].archivo": req.body.libros.archivo,
              "libros.$[perf].disponibilidad": req.body.libros.disponibilidad,
              "libros.$[perf].fechad": req.body.libros.fechad,
              "libros.$[perf].parcial": req.body.libros.parcial,
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
  updateRemoveFile: async (req, res) => {
    try {
      await removeFiles(req.params.paramsId, req.body)
      res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  },
}
