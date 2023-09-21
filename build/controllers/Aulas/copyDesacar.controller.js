"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Configure = _interopRequireDefault(require("../../models/Configure"));

var _rediss = require("../../middlewares/rediss");

var _Aulasvirtuales = _interopRequireDefault(require("../../models/Aulasvirtuales"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ejs = require("ejs");

function autoridad() {
  return _autoridad.apply(this, arguments);
}

function _autoridad() {
  _autoridad = _asyncToGenerator(function* () {
    try {
      var reply = yield _rediss.client.get("5000autoridades");
      if (reply) return JSON.parse(reply);
      var result = yield _Configure.default.findOne();
      yield _rediss.client.set("5000autoridades", JSON.stringify(result), {
        EX: 36000
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  });
  return _autoridad.apply(this, arguments);
}

function clonarTarea(_x, _x2) {
  return _clonarTarea.apply(this, arguments);
}

function _clonarTarea() {
  _clonarTarea = _asyncToGenerator(function* (id, data) {
    try {
      var model = {
        tipo: "1",
        title: data.title,
        descripcion: data.descripcion,
        archivo: data.archivo,
        start: data.start,
        fechOrden: data.fechOrden,
        disponibilidad: "1",
        fechad: data.fechad,
        parcial: data.parcial,
        ofIndex: data.ofIndex,
        entrega: [],
        foro: []
      };
      yield _Aulasvirtuales.default.findByIdAndUpdate(id, {
        $push: {
          tareas: model
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
    }
  });
  return _clonarTarea.apply(this, arguments);
}

function clonarEva(_x3, _x4) {
  return _clonarEva.apply(this, arguments);
}

function _clonarEva() {
  _clonarEva = _asyncToGenerator(function* (id, data) {
    try {
      var model = {
        tipo: '6',
        title: data.title,
        descripcion: data.descripcion,
        start: data.start,
        end: data.end,
        fechOrden: data.fechOrden,
        tempo: data.tempo,
        disponibilidad: '1',
        parcial: data.parcial,
        ofIndex: data.ofIndex,
        fechad: data.fechad,
        intenAllowed: data.intenAllowed,
        revisar: data.revisar,
        publicar: data.publicar,
        security: data.security,
        archivo: data.archivo,
        surveys: data.surveys,
        answers: []
      };
      yield _Aulasvirtuales.default.findByIdAndUpdate(id, {
        $push: {
          evaluacion: model
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
    }
  });
  return _clonarEva.apply(this, arguments);
}

function clonarForo(_x5, _x6) {
  return _clonarForo.apply(this, arguments);
}

function _clonarForo() {
  _clonarForo = _asyncToGenerator(function* (id, data) {
    try {
      var model = {
        tipo: '7',
        title: data.title,
        disponibilidad: '1',
        fechOrden: data.fechOrden,
        start: data.start,
        fechad: data.fechad,
        descripcion: data.descripcion,
        parcial: data.parcial,
        ofIndex: data.ofIndex,
        foro: []
      };
      yield _Aulasvirtuales.default.findByIdAndUpdate(id, {
        $push: {
          foros: model
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
    }
  });
  return _clonarForo.apply(this, arguments);
}

function clonarLectura(_x7, _x8) {
  return _clonarLectura.apply(this, arguments);
}

function _clonarLectura() {
  _clonarLectura = _asyncToGenerator(function* (id, data) {
    try {
      var model = {
        tipo: '3',
        title: data.title,
        content: data.content,
        disponibilidad: '1',
        fechOrden: data.fechOrden,
        parcial: data.parcial,
        ofIndex: data.ofIndex
      };
      yield _Aulasvirtuales.default.findByIdAndUpdate(id, {
        $push: {
          lecturas: model
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
    }
  });
  return _clonarLectura.apply(this, arguments);
}

function clonarLibro(_x9, _x10) {
  return _clonarLibro.apply(this, arguments);
}

function _clonarLibro() {
  _clonarLibro = _asyncToGenerator(function* (id, data) {
    try {
      var model = {
        tipo: '2',
        title: data.title,
        archivo: data.archivo,
        disponibilidad: '1',
        fechOrden: data.fechOrden,
        descripcion: data.descripcion,
        parcial: data.parcial,
        ofIndex: data.ofIndex
      };
      yield _Aulasvirtuales.default.findByIdAndUpdate(id, {
        $push: {
          libros: model
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
    }
  });
  return _clonarLibro.apply(this, arguments);
}

function clonarYoutube(_x11, _x12) {
  return _clonarYoutube.apply(this, arguments);
}

function _clonarYoutube() {
  _clonarYoutube = _asyncToGenerator(function* (id, data) {
    try {
      var model = {
        tipo: '5',
        title: data.title,
        link: data.link,
        disponibilidad: '1',
        fechOrden: data.fechOrden,
        parcial: data.parcial,
        ofIndex: data.ofIndex,
        foro: []
      };
      yield _Aulasvirtuales.default.findByIdAndUpdate(id, {
        $push: {
          youtube: model
        }
      }, {
        new: true
      });
    } catch (error) {
      console.log(error);
    }
  });
  return _clonarYoutube.apply(this, arguments);
}

var _default = {
  tareas: function () {
    var _tareas = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body;
        var result = arr;
        var fecha = fechaActual();
        var auth = yield autoridad();

        if (arr.tipo == 6) {
          var _tema = yield ejs.renderFile(__dirname + "/repo/evaluacion.ejs", {
            result,
            auth,
            fecha
          });

          return res.status(200).json(_tema);
        }

        var tema = yield ejs.renderFile(__dirname + "/repo/tareas.ejs", {
          result,
          auth,
          fecha
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function tareas(_x13, _x14) {
      return _tareas.apply(this, arguments);
    }

    return tareas;
  }(),
  //TODO handle COPIAMOS O CLONAMOS LAS ACTIVIDADES
  copyActividad: function () {
    var _copyActividad = _asyncToGenerator(function* (req, res) {
      try {
        var {
          data,
          curso
        } = req.body;
        curso.forEach( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(function* (value) {
            if ((data === null || data === void 0 ? void 0 : data.tipo) == 1) yield clonarTarea(value, data);
            if ((data === null || data === void 0 ? void 0 : data.tipo) == 6) yield clonarEva(value, data);
            if ((data === null || data === void 0 ? void 0 : data.tipo) == 7) yield clonarForo(value, data);
            if ((data === null || data === void 0 ? void 0 : data.tipo) == 3) yield clonarLectura(value, data);
            if ((data === null || data === void 0 ? void 0 : data.tipo) == 2) yield clonarLibro(value, data);
            if ((data === null || data === void 0 ? void 0 : data.tipo) == 5) yield clonarYoutube(value, data);
          });

          return function (_x17) {
            return _ref.apply(this, arguments);
          };
        }());
        console.log(data);
        res.status(200).json("tema");
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function copyActividad(_x15, _x16) {
      return _copyActividad.apply(this, arguments);
    }

    return copyActividad;
  }()
};
exports.default = _default;

var fechaActual = () => {
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var dateObj = new Date();
  var month = monthNames[dateObj.getMonth()];
  var day = String(dateObj.getDate()).padStart(2, "0");
  var year = dateObj.getFullYear();
  var output = day + " de " + month + "\n" + " del " + year;
  return output;
};