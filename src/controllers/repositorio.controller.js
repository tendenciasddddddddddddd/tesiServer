import Repositorio from "../models/Repositorio.js";
import User from "../models/User.js";

async function insetFiles(id, model) {
  try { 
    const docente = await User.findById(model.usuario)
    const modelo = {
      fkdocente: docente._id,
      docente: docente,
      repositorio : model.mod
    }
    await Repositorio.findByIdAndUpdate(
      id,
      { $push: { 'entregas': modelo } },
      { new: true }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

async function updateFiles(modelo) {
  console.log(modelo);
  try {
    await Repositorio.updateOne(
      { "entregas._id": modelo.keyEntrega },
      { $push: {
          "entregas.$.repositorio": modelo.mod
        }
      },
      { new : true}
    )
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function removeFiles(ids, modelo) {
  try {
    await Repositorio.updateOne(
     {_id: ids},
      { $pull: {
          "entregas.$[].repositorio": {"_id": modelo.mod}
        }
      }
    )
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

export default {
  create: async (req, res) => {
    const { nombre, inicio, fin } = req.body;
    try {
      const model = {
        nombre : nombre,
        inicio : inicio,
        fin : fin,
        fkperiodo: 'periodo._id',
        periodo: 'periodo',
      }
      const reg = await Repositorio.create(model)
      res.status(201).json(reg);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  getListas: async (req, res) => {
    try {
      const result = await Repositorio.find()
        .lean()
        .select({ nombre:1,inicio:1,fin:1});
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Repositorio.findById(id);
      res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateById: async (req, res) => {
    try {
      console.log(req.body)
      if(!req.body.confirma){
        await insetFiles(req.params.paramsId, req.body)
      } else {
       await updateFiles(req.body)
      }
      res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateRemoveById: async (req, res) => {
    try {
      await removeFiles(req.params.paramsId,req.body)
      res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  updateNormalById: async (req, res) => {
    try {
      const result = await Repositorio.findByIdAndUpdate(
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
      await Repositorio.deleteMany({
        _id: {
          $in: array,
        },
      });
      res.status(200).json();
    } catch (e) {
      return res.status(500).json();
    }
  },

};