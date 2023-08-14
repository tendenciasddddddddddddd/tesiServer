import Aulasvirtuales from "../../models/Aulasvirtuales";

async function removeFiles(ids, modelo) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: ids },
      {
        $pull: {
          "videos.$[].archivo": { "_id": modelo.mod }
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
        { $push: { videos: req.body.videos } },
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
        { $pull: { videos: { _id: id } } },
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
              "videos.$[perf].title": req.body.videos.title,
              "videos.$[perf].archivo": req.body.videos.archivo,
              "videos.$[perf].disponibilidad": req.body.videos.disponibilidad,
              "videos.$[perf].fechad": req.body.videos.fechad,
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
      res.status(500).json("error");
    }
  },
  //======================EDITAR TAREA FOROS=================================
  updateForo: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $push: { "videos.$[perf].foro": req.body.foro}},
        {
          arrayFilters: [{
            "perf._id": { $eq: array[1] }
          }],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      res.status(500).json(e);
    }
  },
  updateSubForo: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $push: { "videos.$[perf].foro.$[est].subForo": req.body.subForo}},
        {
          arrayFilters: [
            { "perf._id": { $eq: array[1] }},
            {"est._id": {$eq : array[2]}}
          ],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  updateLike: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      const {key} = req.body;
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $push: { "videos.$[perf].foro.$[est].like": key}},
        {
          arrayFilters: [
            { "perf._id": { $eq: array[1] }},
            {"est._id": {$eq : array[2]}}
          ],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  updateNoLike: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      const {key} = req.body;
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $push: { "videos.$[perf].foro.$[est].nolike": key}},
        {
          arrayFilters: [
            { "perf._id": { $eq: array[1] }},
            {"est._id": {$eq : array[2]}}
          ],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  removeForo: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $pull: { "videos.$[perf].foro":{_id: array[2]}}},
        {
          arrayFilters: [
            { "perf._id": { $eq: array[1] }},
          ],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  removeLikeForo: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      const {key} = req.body;
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $pull: { "videos.$[perf].foro.$[est].like":key}},
        {
          arrayFilters: [
            { "perf._id": { $eq: array[1] }},
            {"est._id": {$eq : array[2]}}
          ],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  removeNoLikeForo: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      const {key} = req.body;
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $pull: { "videos.$[perf].foro.$[est].nolike":key}},
        {
          arrayFilters: [
            { "perf._id": { $eq: array[1] }},
            {"est._id": {$eq : array[2]}}
          ],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  },
  removeSubForo: async (req, res) => {
    try {
      let cadenaId = req.params.paramId;
      const array = cadenaId.split(",");
      await Aulasvirtuales.updateOne(
        { _id: array[0] },
        {  $pull: { "videos.$[perf].foro.$[est].subForo":{_id: array[3]}}},
        {
          arrayFilters: [
            { "perf._id": { $eq: array[1] }},
            {"est._id": {$eq : array[2]}}
          ],
          new: true,
        }
      );
      res.status(200).json("req.params.aulaId");
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
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
