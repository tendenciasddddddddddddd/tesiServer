"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

var _promReporte = require("./helper/promReporte");

var _reporteSuper = require("./helper/repo/reporteSuper");

var _reporteElement = require("./helper/repo/reporteElement");

var _Configure = _interopRequireDefault(require("../../models/Configure"));

var _User = _interopRequireDefault(require("../../models/User"));

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
  formarNomina,
  formatJuntasIndividual,
  formatJuntasFinal
} = (0, _promReporte.promedioReportes)();
var {
  juntasOnly,
  juntasFinal: _juntasFinal
} = (0, _reporteElement.reporteElement)();
var {
  juntasExamProyec
} = (0, _reporteSuper.reporteSuper)();

function autoridad() {
  return _autoridad.apply(this, arguments);
}

function _autoridad() {
  _autoridad = _asyncToGenerator(function* () {
    try {
      var reply = yield _rediss.client.get("5000autoridades");
      if (reply) return JSON.parse(reply);
      var result = yield _Configure.default.find().lean();
      yield _rediss.client.set('5000autoridades', JSON.stringify(result), {
        EX: 36000
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  });
  return _autoridad.apply(this, arguments);
}

function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  var counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

var _default = {
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
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatPromociones(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/promocion.ejs", {
          result: result,
          auth: auth[0],
          nextCourse: nextCourse
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function promocion(_x, _x2) {
      return _promocion.apply(this, arguments);
    }

    return promocion;
  }(),
  promocionPdf: function () {
    var _promocionPdf = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var nextCourse = req.body.nextCourse;
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
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatPromociones(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad(); //const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result,auth: auth[0],nextCourse:nextCourse });

        var name = makeid(10);
        res.send(name); // pdf.create(tema, options).toFile('./document/'+name+'.pdf', function(err, data) {
        //     if (err) return res.send(err);
        //     res.send(name);
        // });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function promocionPdf(_x3, _x4) {
      return _promocionPdf.apply(this, arguments);
    }

    return promocionPdf;
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
          var rowM = yield _Matriculas.default.findById(idMatricula);
          result = formatMatricula(rowM, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/matricula.ejs", {
          result: result,
          auth: auth[0]
        });
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
  matriculaPdf: function () {
    var _matriculaPdf = _asyncToGenerator(function* (req, res) {
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
          var rowM = yield _Matriculas.default.findById(idMatricula);
          result = formatMatricula(rowM, estudiantes);
        }

        var auth = yield autoridad(); //const tema = await ejs.renderFile(__dirname + "/themes/promocion.ejs", { result: result,auth: auth[0],nextCourse:nextCourse });

        var name = makeid(10);
        res.send(name); // pdf.create(tema, options).toFile('./document/'+name+'.pdf', function(err, data) {
        //     if (err) return res.send(err);
        //     res.send(name);
        // });
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function matriculaPdf(_x7, _x8) {
      return _matriculaPdf.apply(this, arguments);
    }

    return matriculaPdf;
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
          var _element$curso3;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso3 = element.curso) === null || _element$curso3 === void 0 ? void 0 : _element$curso3._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatLibretas(rowM, rowD, estudiantes, ops.quimestre);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/libretas.ejs", {
          result: result,
          auth: auth[0],
          ops: ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function libretas(_x9, _x10) {
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
          var _element$curso4;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso4 = element.curso) === null || _element$curso4 === void 0 ? void 0 : _element$curso4._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatJuntas(rowM, rowD, estudiantes, ops.quimestre, paralelo);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/juntas.ejs", {
          result: result,
          auth: auth[0],
          ops: ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntas(_x11, _x12) {
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
        var cursoNum = '';

        for (var i = 0; i < arr.length; i++) {
          var _element$curso5, _element$curso6;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso5 = element.curso) === null || _element$curso5 === void 0 ? void 0 : _element$curso5._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
          keymateria = element.keymateria;
          cursoNum = (_element$curso6 = element.curso) === null || _element$curso6 === void 0 ? void 0 : _element$curso6.num;
        }

        var result = [];

        if (arr.length > 0) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) result = juntasOnly(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria);else result = formatJuntasIndividual(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria);
        }

        var auth = yield autoridad();
        var tema = ''; //TODO check SI ES DE 2DO 3RO DE BASICA

        if (cursoNum == 4 || cursoNum == 5) tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntas.ejs", {
          result,
          auth: auth[0],
          ops
        }); //TODO check SI ES DE 4TO DE BASICA
        else if (cursoNum == 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntasCuarto.ejs", {
            result,
            auth: auth[0],
            ops
          }); //TODO check SI ES DE RESTO DE CURSO
          else tema = yield ejs.renderFile(__dirname + "/themes/superior/juntas.ejs", {
              result,
              auth: auth[0],
              ops
            });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntasIndividual(_x13, _x14) {
      return _juntasIndividual.apply(this, arguments);
    }

    return juntasIndividual;
  }(),
  juntasFinal: function () {
    var _juntasFinal2 = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var ops = req.body.ops;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var keymateria = '';
        var cursoNum = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso7, _element$curso8;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso7 = element.curso) === null || _element$curso7 === void 0 ? void 0 : _element$curso7._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
          keymateria = element.keymateria;
          cursoNum = (_element$curso8 = element.curso) === null || _element$curso8 === void 0 ? void 0 : _element$curso8.num;
        }

        var result = [];

        if (arr.length > 0) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo
          });
          if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) result = _juntasFinal(rowM, rowD, estudiantes, paralelo, keymateria);else result = juntasExamProyec(rowM, rowD, estudiantes, paralelo, keymateria);
        }

        var auth = yield autoridad();
        var tema = ''; // console.log(ops)
        //TODO check GENERAR HTML DE JUNTAS DE CURSO FINAL DE 2DO 3RO 4TO

        if (cursoNum == 4 || cursoNum == 5) tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntasFinal.ejs", {
          result,
          auth: auth[0],
          ops
        });else if (cursoNum == 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntasFinExam.ejs", {
          result,
          auth: auth[0],
          ops
        }); //TODO check GENERAR HTML DE JUNTAS DE CURSO DE PROYECTOS
        else if (ops.tipo === 'PY') {
            if (ops.subnivel == 2) tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasExaProy.ejs", {
              result,
              auth: auth[0],
              ops
            });else tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasExam.ejs", {
              result,
              auth: auth[0],
              ops
            });
          } //TODO check GENERAR HTML DE SUPLETORIOS Y PROMEDIO FINAL
          else {
              if (ops.subnivel == 2) tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasFinEP.ejs", {
                result,
                auth: auth[0],
                ops
              });else tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasFinal.ejs", {
                result,
                auth: auth[0],
                ops
              });
            }
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntasFinal(_x15, _x16) {
      return _juntasFinal2.apply(this, arguments);
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
          var _element$curso9;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso9 = element.curso) === null || _element$curso9 === void 0 ? void 0 : _element$curso9._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatInforme(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/informe.ejs", {
          result: result,
          auth: auth[0]
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function informe(_x17, _x18) {
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
          var _element$curso10;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso10 = element.curso) === null || _element$curso10 === void 0 ? void 0 : _element$curso10._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatFinal(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/final.ejs", {
          result: result,
          auth: auth[0]
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function final(_x19, _x20) {
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
          var _element$curso11;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso11 = element.curso) === null || _element$curso11 === void 0 ? void 0 : _element$curso11._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatParcial(rowM, rowD, estudiantes, ops);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/parcial.ejs", {
          result: result,
          auth: auth[0],
          ops: ops,
          paralelo: paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function parcial(_x21, _x22) {
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
          var _element$curso12;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso12 = element.curso) === null || _element$curso12 === void 0 ? void 0 : _element$curso12._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatQuimestral(rowM, rowD, estudiantes, ops);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/quimestral.ejs", {
          result: result,
          auth: auth[0],
          ops: ops,
          paralelo: paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function quimestral(_x23, _x24) {
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
          var _element$curso13;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso13 = element.curso) === null || _element$curso13 === void 0 ? void 0 : _element$curso13._id;
          paralelo = element.paralelo;
          estudiantes.push(element._id);
        }

        var result = [];

        if (arr) {
          var rowM = yield _Matriculas.default.findById(idMatricula);
          var rowD = yield _Distributivo.default.findOne({
            fkcurso: idCurso,
            paralelo: paralelo
          });
          result = formatAnual(rowM, rowD, estudiantes);
        }

        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/anual.ejs", {
          result: result,
          auth: auth[0],
          paralelo: paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function anual(_x25, _x26) {
      return _anual.apply(this, arguments);
    }

    return anual;
  }(),
  getNomina: function () {
    var _getNomina = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _Matriculas.default.find().lean().select({
          curso: 1,
          periodo: 1,
          paralelo: 1,
          'matriculas.estudiante': 1,
          'matriculas.nmatricula': 1
        });
        var reg = formarNomina(result);
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/nomina.ejs", {
          result: reg,
          auth: auth[0]
        });
        return res.json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getNomina(_x27, _x28) {
      return _getNomina.apply(this, arguments);
    }

    return getNomina;
  }(),
  getNominaDocente: function () {
    var _getNominaDocente = _asyncToGenerator(function* (req, res) {
      try {
        var result = yield _User.default.find({
          typo: {
            $in: ["DOCS"]
          }
        }).lean().select({
          fullname: 1,
          cedula: 1
        });
        result.sort(function (a, b) {
          var nameA = a.fullname.toLowerCase(),
              nameB = b.fullname.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/nominaDocente.ejs", {
          result: result,
          auth: auth[0]
        });
        return res.json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getNominaDocente(_x29, _x30) {
      return _getNominaDocente.apply(this, arguments);
    }

    return getNominaDocente;
  }(),
  Ambitos: function () {
    var _Ambitos = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body;
        var fechaA = fechaActual();
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/ambitos.ejs", {
          result: arr,
          auth: auth[0],
          fechaA: fechaA
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function Ambitos(_x31, _x32) {
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
          auth: auth[0],
          fechaA: fechaA
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function Destrezas(_x33, _x34) {
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