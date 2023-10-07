"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Respaldo = _interopRequireDefault(require("../../models/Respaldo"));

var _Dis = _interopRequireDefault(require("../../models/history/Dis2023"));

var _promReporte = require("./helper/promReporte");

var _Configure = _interopRequireDefault(require("../../models/Configure"));

var _rediss = require("../../middlewares/rediss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ejs = require("ejs");

var {
  formatPromociones,
  formatMatricula,
  formatLibretas,
  formatJuntas,
  formatInforme,
  formatFinal,
  formatParcial,
  formatQuimestral,
  formatAnual,
  formatJuntasIndividual,
  formatJuntasFinal
} = (0, _promReporte.promedioReportes)();

function autoridad() {
  return _autoridad.apply(this, arguments);
}

function _autoridad() {
  _autoridad = _asyncToGenerator(function* () {
    try {
      var reply = yield _rediss.client.get("".concat(_rediss.claveOnPort, "autoridades"));
      if (reply) return JSON.parse(reply);
      var result = yield _Configure.default.find().lean();
      yield _rediss.client.set("".concat(_rediss.claveOnPort, "autoridades"), JSON.stringify(result), {
        EX: 36000
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  });
  return _autoridad.apply(this, arguments);
}

var _default = {
  //======================LISTAR MATRICULAS PARA LOS REPORTES =================================
  getById: function () {
    var _getById = _asyncToGenerator(function* (req, res) {
      try {
        var {
          id
        } = req.params;
        var result = yield _Respaldo.default.find({
          fkcurso: {
            $in: [id]
          }
        }).lean().select({
          curso: 1,
          fkcurso: 1,
          fkperiodo: 1,
          paralelo: 1,
          "matriculas.estudiante": 1,
          "matriculas.fkestudiante": 1,
          'matriculas._id': 1
        });
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getById(_x, _x2) {
      return _getById.apply(this, arguments);
    }

    return getById;
  }(),
  promocion: function () {
    var _promocion = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var nextCourse = req.body.nextCourse;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso = element.curso) === null || _element$curso === void 0 ? void 0 : _element$curso._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatPromociones(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/promocion.ejs", {
          result: result,
          auth,
          nextCourse: nextCourse
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function promocion(_x3, _x4) {
      return _promocion.apply(this, arguments);
    }

    return promocion;
  }(),
  matricula: function () {
    var _matricula = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body;
        var idMatricula = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var element = arr[i];
          idMatricula = element.key;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          result = formatMatricula(rowM, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/matricula.ejs", {
          result: result,
          auth
        }); // console.log(tema)

        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function matricula(_x5, _x6) {
      return _matricula.apply(this, arguments);
    }

    return matricula;
  }(),
  libretas: function () {
    var _libretas = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso2;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso2 = element.curso) === null || _element$curso2 === void 0 ? void 0 : _element$curso2._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatLibretas(rowM, rowD, estudiantes, ops.quimestre);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/libretas.ejs", {
          result: result,
          auth,
          ops: ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function libretas(_x7, _x8) {
      return _libretas.apply(this, arguments);
    }

    return libretas;
  }(),
  juntas: function () {
    var _juntas = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso3;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso3 = element.curso) === null || _element$curso3 === void 0 ? void 0 : _element$curso3._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatJuntas(rowM, rowD, estudiantes, ops.quimestre, paralelo);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/juntas.ejs", {
          result: result,
          auth,
          ops: ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntas(_x9, _x10) {
      return _juntas.apply(this, arguments);
    }

    return juntas;
  }(),
  juntasIndividual: function () {
    var _juntasIndividual = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var keymateria = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso4;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso4 = element.curso) === null || _element$curso4 === void 0 ? void 0 : _element$curso4._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
          keymateria = element.keymateria;
        }

        var result = [];

        if (arr.length > 0) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatJuntasIndividual(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/juntas.ejs", {
          result: result,
          auth,
          ops: ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntasIndividual(_x11, _x12) {
      return _juntasIndividual.apply(this, arguments);
    }

    return juntasIndividual;
  }(),
  juntasFinal: function () {
    var _juntasFinal = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var keymateria = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso5;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso5 = element.curso) === null || _element$curso5 === void 0 ? void 0 : _element$curso5._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
          keymateria = element.keymateria;
        }

        var result = [];

        if (arr.length > 0) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatJuntasFinal(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/juntasAnual.ejs", {
          result: result,
          auth,
          ops: ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntasFinal(_x13, _x14) {
      return _juntasFinal.apply(this, arguments);
    }

    return juntasFinal;
  }(),
  informe: function () {
    var _informe = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso6;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso6 = element.curso) === null || _element$curso6 === void 0 ? void 0 : _element$curso6._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatInforme(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/informe.ejs", {
          result: result,
          auth
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function informe(_x15, _x16) {
      return _informe.apply(this, arguments);
    }

    return informe;
  }(),
  final: function () {
    var _final = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso7;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso7 = element.curso) === null || _element$curso7 === void 0 ? void 0 : _element$curso7._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatFinal(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/final.ejs", {
          result: result,
          auth
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function final(_x17, _x18) {
      return _final.apply(this, arguments);
    }

    return final;
  }(),
  parcial: function () {
    var _parcial = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso8;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso8 = element.curso) === null || _element$curso8 === void 0 ? void 0 : _element$curso8._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatParcial(rowM, rowD, estudiantes, ops);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/parcial.ejs", {
          result: result,
          auth,
          ops: ops,
          paralelo: paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function parcial(_x19, _x20) {
      return _parcial.apply(this, arguments);
    }

    return parcial;
  }(),
  quimestral: function () {
    var _quimestral = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso9;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso9 = element.curso) === null || _element$curso9 === void 0 ? void 0 : _element$curso9._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatQuimestral(rowM, rowD, estudiantes, ops);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/quimestral.ejs", {
          result: result,
          auth,
          ops: ops,
          paralelo: paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function quimestral(_x21, _x22) {
      return _quimestral.apply(this, arguments);
    }

    return quimestral;
  }(),
  anual: function () {
    var _anual = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso10;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso10 = element.curso) === null || _element$curso10 === void 0 ? void 0 : _element$curso10._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Respaldo.default.findById(idMatricula);
          var rowD = yield _Dis.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatAnual(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/anual.ejs", {
          result: result,
          auth,
          paralelo: paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function anual(_x23, _x24) {
      return _anual.apply(this, arguments);
    }

    return anual;
  }(),
  Ambitos: function () {
    var _Ambitos = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body;
        var fechaA = fechaActual();
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/ambitos.ejs", {
          result: arr,
          auth,
          fechaA: fechaA
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function Ambitos(_x25, _x26) {
      return _Ambitos.apply(this, arguments);
    }

    return Ambitos;
  }(),
  Destrezas: function () {
    var _Destrezas = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body;
        var fechaA = fechaActual();
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/destrezas.ejs", {
          result: arr,
          auth,
          fechaA: fechaA
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function Destrezas(_x27, _x28) {
      return _Destrezas.apply(this, arguments);
    }

    return Destrezas;
  }()
};
exports.default = _default;

var fechaActual = () => {
  var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var dateObj = new Date();
  var month = monthNames[dateObj.getMonth()];
  var day = String(dateObj.getDate()).padStart(2, '0');
  var year = dateObj.getFullYear();
  var output = day + " de " + month + '\n' + ' del ' + year;
  return output;
};