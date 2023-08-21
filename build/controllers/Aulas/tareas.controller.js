"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Aulasvirtuales = _interopRequireDefault(require("../../models/Aulasvirtuales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

function removeFiles(_x, _x2) {
  return _removeFiles.apply(this, arguments);
}

function _removeFiles() {
  _removeFiles = _asyncToGenerator(function* (ids, modelo) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: ids
      }, {
        $pull: {
          "tareas.$[].archivo": {
            "_id": modelo.mod
          }
        }
      });
    } catch (error) {}
  });
  return _removeFiles.apply(this, arguments);
}

function revisarSinEntrega(_x3) {
  return _revisarSinEntrega.apply(this, arguments);
}

function _revisarSinEntrega() {
  _revisarSinEntrega = _asyncToGenerator(function* (item) {
    try {
      var modelo = {
        fkestudiante: item._id,
        nota: item.nota
      };
      yield _Aulasvirtuales.default.updateOne({
        "tareas._id": item.idTarea
      }, {
        $push: {
          "tareas.$.entrega": modelo
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
    }
  });
  return _revisarSinEntrega.apply(this, arguments);
}

function revisarConEntrega(_x4, _x5) {
  return _revisarConEntrega.apply(this, arguments);
}

function _revisarConEntrega() {
  _revisarConEntrega = _asyncToGenerator(function* (id, item) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "tareas.$[perf].entrega.$[est].nota": item.nota,
          "tareas.$[perf].entrega.$[est].observar": item.observar
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: item.idTarea
          }
        }, {
          "est._id": {
            $eq: item.idEntrega
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _revisarConEntrega.apply(this, arguments);
}

function updateShowHiddens(_x6, _x7, _x8) {
  return _updateShowHiddens.apply(this, arguments);
}

function _updateShowHiddens() {
  _updateShowHiddens = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "tareas.$[perf].disponibilidad": ctx
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _updateShowHiddens.apply(this, arguments);
}

function showHiddenLibros(_x9, _x10, _x11) {
  return _showHiddenLibros.apply(this, arguments);
}

function _showHiddenLibros() {
  _showHiddenLibros = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "libros.$[perf].disponibilidad": ctx
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _showHiddenLibros.apply(this, arguments);
}

function showHiddenLecturas(_x12, _x13, _x14) {
  return _showHiddenLecturas.apply(this, arguments);
}

function _showHiddenLecturas() {
  _showHiddenLecturas = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "lecturas.$[perf].disponibilidad": ctx
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _showHiddenLecturas.apply(this, arguments);
}

function showHiddenVideos(_x15, _x16, _x17) {
  return _showHiddenVideos.apply(this, arguments);
}

function _showHiddenVideos() {
  _showHiddenVideos = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "videos.$[perf].disponibilidad": ctx
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _showHiddenVideos.apply(this, arguments);
}

function showHiddenYouTube(_x18, _x19, _x20) {
  return _showHiddenYouTube.apply(this, arguments);
}

function _showHiddenYouTube() {
  _showHiddenYouTube = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "youtube.$[perf].disponibilidad": ctx
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _showHiddenYouTube.apply(this, arguments);
}

function showHiddenEvaluacion(_x21, _x22, _x23) {
  return _showHiddenEvaluacion.apply(this, arguments);
}

function _showHiddenEvaluacion() {
  _showHiddenEvaluacion = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "evaluacion.$[perf].disponibilidad": ctx
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _showHiddenEvaluacion.apply(this, arguments);
}

function showHiddenForo(_x24, _x25, _x26) {
  return _showHiddenForo.apply(this, arguments);
} //=============================ORDENAME============================


function _showHiddenForo() {
  _showHiddenForo = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "foros.$[perf].disponibilidad": ctx
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _showHiddenForo.apply(this, arguments);
}

function ordenTareas(_x27, _x28, _x29) {
  return _ordenTareas.apply(this, arguments);
}

function _ordenTareas() {
  _ordenTareas = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "tareas.$[perf].ofIndex": ctx.ofIndex,
          "tareas.$[perf].parcial": ctx.parcial
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _ordenTareas.apply(this, arguments);
}

function ordenLibros(_x30, _x31, _x32) {
  return _ordenLibros.apply(this, arguments);
}

function _ordenLibros() {
  _ordenLibros = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "libros.$[perf].ofIndex": ctx.ofIndex,
          "libros.$[perf].parcial": ctx.parcial
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _ordenLibros.apply(this, arguments);
}

function ordenLecturas(_x33, _x34, _x35) {
  return _ordenLecturas.apply(this, arguments);
}

function _ordenLecturas() {
  _ordenLecturas = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "lecturas.$[perf].ofIndex": ctx.ofIndex,
          "lecturas.$[perf].parcial": ctx.parcial
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _ordenLecturas.apply(this, arguments);
}

function ordenVideos(_x36, _x37, _x38) {
  return _ordenVideos.apply(this, arguments);
}

function _ordenVideos() {
  _ordenVideos = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "videos.$[perf].ofIndex": ctx.ofIndex,
          "videos.$[perf].parcial": ctx.parcial
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _ordenVideos.apply(this, arguments);
}

function ordenYouTube(_x39, _x40, _x41) {
  return _ordenYouTube.apply(this, arguments);
}

function _ordenYouTube() {
  _ordenYouTube = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "youtube.$[perf].ofIndex": ctx.ofIndex,
          "youtube.$[perf].parcial": ctx.parcial
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _ordenYouTube.apply(this, arguments);
}

function ordenEvaluacion(_x42, _x43, _x44) {
  return _ordenEvaluacion.apply(this, arguments);
}

function _ordenEvaluacion() {
  _ordenEvaluacion = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "evaluacion.$[perf].ofIndex": ctx.ofIndex,
          "evaluacion.$[perf].parcial": ctx.parcial
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _ordenEvaluacion.apply(this, arguments);
}

function ordenForos(_x45, _x46, _x47) {
  return _ordenForos.apply(this, arguments);
}

function _ordenForos() {
  _ordenForos = _asyncToGenerator(function* (id, idtarea, ctx) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: id
      }, {
        $set: {
          "foros.$[perf].ofIndex": ctx.ofIndex,
          "foros.$[perf].parcial": ctx.parcial
        }
      }, {
        arrayFilters: [{
          "perf._id": {
            $eq: idtarea
          }
        }],
        new: true
      });
    } catch (e) {
      console.log(e);
    }
  });
  return _ordenForos.apply(this, arguments);
}

function eliminarTarea(_x48, _x49) {
  return _eliminarTarea.apply(this, arguments);
}

function _eliminarTarea() {
  _eliminarTarea = _asyncToGenerator(function* (idCurso, idTarea) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: idCurso
      }, {
        $pull: {
          tareas: {
            _id: idTarea
          }
        }
      }, {
        new: true
      });
    } catch (e) {}
  });
  return _eliminarTarea.apply(this, arguments);
}

function eliminarLibro(_x50, _x51) {
  return _eliminarLibro.apply(this, arguments);
}

function _eliminarLibro() {
  _eliminarLibro = _asyncToGenerator(function* (idCurso, id) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: idCurso
      }, {
        $pull: {
          libros: {
            _id: id
          }
        }
      }, {
        new: true
      });
    } catch (e) {}
  });
  return _eliminarLibro.apply(this, arguments);
}

function eliminarLectura(_x52, _x53) {
  return _eliminarLectura.apply(this, arguments);
}

function _eliminarLectura() {
  _eliminarLectura = _asyncToGenerator(function* (idCurso, id) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: idCurso
      }, {
        $pull: {
          lecturas: {
            _id: id
          }
        }
      }, {
        new: true
      });
    } catch (e) {}
  });
  return _eliminarLectura.apply(this, arguments);
}

function eliminarVideos(_x54, _x55, _x56) {
  return _eliminarVideos.apply(this, arguments);
}

function _eliminarVideos() {
  _eliminarVideos = _asyncToGenerator(function* (idCurso, id, nombre) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: idCurso
      }, {
        $pull: {
          videos: {
            _id: id
          }
        }
      }, {
        new: true
      });
      var deleteFile = './videos/' + nombre;
      fs.unlink(deleteFile, err => {
        if (err) {}
      });
    } catch (e) {}
  });
  return _eliminarVideos.apply(this, arguments);
}

function eliminarYouTube(_x57, _x58) {
  return _eliminarYouTube.apply(this, arguments);
}

function _eliminarYouTube() {
  _eliminarYouTube = _asyncToGenerator(function* (idCurso, id) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: idCurso
      }, {
        $pull: {
          youtube: {
            _id: id
          }
        }
      }, {
        new: true
      });
    } catch (e) {}
  });
  return _eliminarYouTube.apply(this, arguments);
}

function eliminarEvaluacion(_x59, _x60) {
  return _eliminarEvaluacion.apply(this, arguments);
}

function _eliminarEvaluacion() {
  _eliminarEvaluacion = _asyncToGenerator(function* (idCurso, id) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: idCurso
      }, {
        $pull: {
          evaluacion: {
            _id: id
          }
        }
      }, {
        new: true
      });
    } catch (e) {}
  });
  return _eliminarEvaluacion.apply(this, arguments);
}

function eliminarForos(_x61, _x62) {
  return _eliminarForos.apply(this, arguments);
}

function _eliminarForos() {
  _eliminarForos = _asyncToGenerator(function* (idCurso, id) {
    try {
      yield _Aulasvirtuales.default.updateOne({
        _id: idCurso
      }, {
        $pull: {
          foros: {
            _id: id
          }
        }
      }, {
        new: true
      });
    } catch (e) {}
  });
  return _eliminarForos.apply(this, arguments);
}

var _default = {
  create: function () {
    var _create = _asyncToGenerator(function* (req, res) {
      try {
        yield _Aulasvirtuales.default.findByIdAndUpdate(req.params.id, {
          $push: {
            tareas: req.body.tareas
          }
        }, {
          new: true
        });
        res.status(200).json(req.params.id);
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function create(_x63, _x64) {
      return _create.apply(this, arguments);
    }

    return create;
  }(),
  delete: function () {
    var _delete2 = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id,
          tipo,
          name
        } = req.body;
        if (tipo == '1') eliminarTarea(req.params.paramId, id);
        if (tipo == '2') eliminarLibro(req.params.paramId, id);
        if (tipo == '3') eliminarLectura(req.params.paramId, id);
        if (tipo == '4') eliminarVideos(req.params.paramId, id, name);
        if (tipo == '5') eliminarYouTube(req.params.paramId, id);
        if (tipo == '6') eliminarEvaluacion(req.params.paramId, id);
        if (tipo == '7') eliminarForos(req.params.paramId, id);
        res.status(200).json({});
      } catch (e) {
        res.status(500).json({
          message: "No mat found"
        });
      }
    });

    function _delete(_x65, _x66) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  //======================EDITAR TAREA =================================
  update: function () {
    var _update = _asyncToGenerator(function* (req, res) {
      try {
        var cadenaId = req.params.paramId;
        var array = cadenaId.split(",");

        if (array[0] != null && array[1] != null) {
          yield _Aulasvirtuales.default.updateOne({
            _id: array[0]
          }, {
            $set: {
              //ofIndex
              "tareas.$[perf].title": req.body.tareas.title,
              "tareas.$[perf].descripcion": req.body.tareas.descripcion,
              "tareas.$[perf].archivo": req.body.tareas.archivo,
              "tareas.$[perf].start": req.body.tareas.start,
              "tareas.$[perf].disponibilidad": req.body.tareas.disponibilidad,
              "tareas.$[perf].fechad": req.body.tareas.fechad
            }
          }, {
            arrayFilters: [{
              "perf._id": {
                $eq: array[1]
              }
            }],
            new: true
          });
          res.status(200).json("req.params.aulaId");
        } else {
          res.status(200).json("req.params.aulaId");
        }
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function update(_x67, _x68) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  updateRemoveFile: function () {
    var _updateRemoveFile = _asyncToGenerator(function* (req, res) {
      try {
        yield removeFiles(req.params.paramsId, req.body);
        res.status(200).json();
      } catch (error) {
        return res.status(500).json(error);
      }
    });

    function updateRemoveFile(_x69, _x70) {
      return _updateRemoveFile.apply(this, arguments);
    }

    return updateRemoveFile;
  }(),
  calificar: function () {
    var _calificar = _asyncToGenerator(function* (req, res) {
      try {
        var array = req.body;

        for (var i = 0; i < array.length; i++) {
          var element = array[i];

          if (element.idEntrega == '' || element.idEntrega == null) {
            revisarSinEntrega(element);
          } else {
            revisarConEntrega(req.params.paramId, element);
          }
        }

        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function calificar(_x71, _x72) {
      return _calificar.apply(this, arguments);
    }

    return calificar;
  }(),
  showHidens: function () {
    var _showHidens = _asyncToGenerator(function* (req, res) {
      try {
        var disp = req.body.disponibilidad == "1" ? '0' : '1';
        if (req.body.tipo == '1') updateShowHiddens(req.params.paramId, req.body.id, disp);
        if (req.body.tipo == '2') showHiddenLibros(req.params.paramId, req.body.id, disp);
        if (req.body.tipo == '3') showHiddenLecturas(req.params.paramId, req.body.id, disp);
        if (req.body.tipo == '4') showHiddenVideos(req.params.paramId, req.body.id, disp);
        if (req.body.tipo == '5') showHiddenYouTube(req.params.paramId, req.body.id, disp);
        if (req.body.tipo == '6') showHiddenEvaluacion(req.params.paramId, req.body.id, disp);
        if (req.body.tipo == '7') showHiddenForo(req.params.paramId, req.body.id, disp);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function showHidens(_x73, _x74) {
      return _showHidens.apply(this, arguments);
    }

    return showHidens;
  }(),
  orderActividad: function () {
    var _orderActividad = _asyncToGenerator(function* (req, res) {
      try {
        if (req.body.tipo == '1') ordenTareas(req.params.paramId, req.body.id, req.body);
        if (req.body.tipo == '2') ordenLibros(req.params.paramId, req.body.id, req.body);
        if (req.body.tipo == '3') ordenLecturas(req.params.paramId, req.body.id, req.body);
        if (req.body.tipo == '4') ordenVideos(req.params.paramId, req.body.id, req.body);
        if (req.body.tipo == '5') ordenYouTube(req.params.paramId, req.body.id, req.body);
        if (req.body.tipo == '6') ordenEvaluacion(req.params.paramId, req.body.id, req.body);
        if (req.body.tipo == '7') ordenForos(req.params.paramId, req.body.id, req.body);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.status(500).json("error del servidor");
      }
    });

    function orderActividad(_x75, _x76) {
      return _orderActividad.apply(this, arguments);
    }

    return orderActividad;
  }()
};
exports.default = _default;