import Aulasvirtuales from "../../models/Aulasvirtuales";
const fs = require('fs');

async function removeFiles(ids, modelo) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: ids },
      {
        $pull: {
          "tareas.$[].archivo": { "_id": modelo.mod }
        }
      }
    )
  } catch (error) {
  }
}
async function revisarSinEntrega(item) {
  try {
    const modelo = {
      fkestudiante : item._id,
      nota : item.nota
    }
    await Aulasvirtuales.updateOne(
      { "tareas._id": item.idTarea },
      {
        $push: {
          "tareas.$.entrega": modelo,
        }
      },
      {
        new: true,
      }
    );
  } catch (error) {
    console.log(error)
  }
}
async function revisarConEntrega(id, item) {
  try {
      await Aulasvirtuales.updateOne(
        { _id: id },
        { $set: 
          { 
            "tareas.$[perf].entrega.$[est].nota": item.nota,
            "tareas.$[perf].entrega.$[est].observar": item.observar
          } 
        },
        {
          arrayFilters: [{
            "perf._id": {$eq : item.idTarea}},
            {"est._id": {$eq : item.idEntrega}}],
          new: true,
        }
      );
  } catch (e) {
    console.log(e);
  }
}
async function updateShowHiddens(id, idtarea, ctx) {
  try {
      await Aulasvirtuales.updateOne(
        { _id: id },
        {
          $set: {
            "tareas.$[perf].disponibilidad": ctx,
          }
        },
        {
          arrayFilters: [{
            "perf._id": { $eq: idtarea }
          }],
          new: true,
        }
      );
  } catch (e) {
    console.log(e)
  }
}
async function showHiddenLibros(id, idtarea, ctx) {
  try {
      await Aulasvirtuales.updateOne(
        { _id: id },
        {
          $set: {
            "libros.$[perf].disponibilidad": ctx,
          }
        },
        {
          arrayFilters: [{
            "perf._id": { $eq: idtarea }
          }],
          new: true,
        }
      );
  } catch (e) {
    console.log(e)
  }
}
async function showHiddenLecturas(id, idtarea, ctx) {
  try {
      await Aulasvirtuales.updateOne(
        { _id: id },
        {
          $set: {
            "lecturas.$[perf].disponibilidad": ctx,
          }
        },
        {
          arrayFilters: [{
            "perf._id": { $eq: idtarea }
          }],
          new: true,
        }
      );
  } catch (e) {
    console.log(e)
  }
}
async function showHiddenVideos(id, idtarea, ctx) {
  try {
      await Aulasvirtuales.updateOne(
        { _id: id },
        {
          $set: {
            "videos.$[perf].disponibilidad": ctx,
          }
        },
        {
          arrayFilters: [{
            "perf._id": { $eq: idtarea }
          }],
          new: true,
        }
      );
  } catch (e) {
    console.log(e)
  }
}
async function showHiddenYouTube(id, idtarea, ctx) {
  try {
      await Aulasvirtuales.updateOne(
        { _id: id },
        {
          $set: {
            "youtube.$[perf].disponibilidad": ctx,
          }
        },
        {
          arrayFilters: [{
            "perf._id": { $eq: idtarea }
          }],
          new: true,
        }
      );
  } catch (e) {
    console.log(e)
  }
}
async function showHiddenEvaluacion(id, idtarea, ctx) {
  try {
      await Aulasvirtuales.updateOne(
        { _id: id },
        {
          $set: {
            "evaluacion.$[perf].disponibilidad": ctx,
          }
        },
        {
          arrayFilters: [{
            "perf._id": { $eq: idtarea }
          }],
          new: true,
        }
      );
  } catch (e) {
    console.log(e)
  }
}
async function eliminarTarea(idCurso, idTarea) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: idCurso },
      { $pull: { tareas: { _id: idTarea } } },
      {
        new: true,
      }
    );
  } catch (e) {
  }
}
async function eliminarLibro(idCurso, id) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: idCurso },
      { $pull: { libros: { _id: id} } },
      {
        new: true,
      }
    );
  } catch (e) {
  }
}
async function eliminarLectura(idCurso, id) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: idCurso },
      { $pull: { lecturas: { _id: id} } },
      {
        new: true,
      }
    );
  } catch (e) {
  }
}
async function eliminarVideos(idCurso, id, nombre) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: idCurso },
      { $pull: { videos: { _id: id} } },
      {
        new: true,
      }
    );
    const deleteFile = './videos/'+nombre
    fs.unlink(deleteFile, (err) => {
      if (err) {
      }
    })
  } catch (e) {
  }
}
async function eliminarYouTube(idCurso, id) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: idCurso },
      { $pull: { youtube: { _id: id} } },
      {
        new: true,
      }
    );
  } catch (e) {
  }
}
async function eliminarEvaluacion(idCurso, id) {
  try {
    await Aulasvirtuales.updateOne(
      { _id: idCurso },
      { $pull: { evaluacion: { _id: id} } },
      {
        new: true,
      }
    );
  } catch (e) {
  }
}
export default {
  create: async (req, res) => {
    try {
      await Aulasvirtuales.findByIdAndUpdate(
        req.params.id,
        { $push: { tareas: req.body.tareas } },
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
      const { id, tipo, name} = req.body;
      if (tipo =='1')  eliminarTarea(req.params.paramId, id)
      if (tipo =='2')  eliminarLibro(req.params.paramId, id)
      if (tipo =='3')  eliminarLectura(req.params.paramId, id)
      if (tipo =='4')  eliminarVideos(req.params.paramId, id, name)
      if (tipo =='5')  eliminarYouTube(req.params.paramId, id)
      if (tipo =='6')  eliminarEvaluacion(req.params.paramId, id)
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
              "tareas.$[perf].title": req.body.tareas.title,
              "tareas.$[perf].descripcion": req.body.tareas.descripcion,
              "tareas.$[perf].archivo": req.body.tareas.archivo,
              "tareas.$[perf].start": req.body.tareas.start,
              "tareas.$[perf].disponibilidad": req.body.tareas.disponibilidad,
              "tareas.$[perf].fechad": req.body.tareas.fechad,
              "tareas.$[perf].parcial": req.body.tareas.parcial,
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
  calificar: async (req, res) => {
    try {
      const array = req.body
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.idEntrega==''||element.idEntrega==null) {
          revisarSinEntrega(element)
        } else {
          revisarConEntrega(req.params.paramId, element)
        }
    }
      res.status(200).json("ok");
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  },
  showHidens: async (req, res) => {
    try {
      let disp = req.body.disponibilidad == "1" ? '0' : '1';
      if (req.body.tipo =='1') updateShowHiddens(req.params.paramId, req.body.id, disp)
      if (req.body.tipo =='2') showHiddenLibros(req.params.paramId, req.body.id, disp)
      if (req.body.tipo =='3') showHiddenLecturas(req.params.paramId, req.body.id, disp)
      if (req.body.tipo =='4') showHiddenVideos(req.params.paramId, req.body.id, disp)
      if (req.body.tipo =='5') showHiddenYouTube(req.params.paramId, req.body.id, disp)
      if (req.body.tipo =='6') showHiddenEvaluacion(req.params.paramId, req.body.id, disp)
      res.status(200).json("ok");
    } catch (e) {
      console.log(e);
      res.status(500).json("error del servidor");
    }
  },
}
