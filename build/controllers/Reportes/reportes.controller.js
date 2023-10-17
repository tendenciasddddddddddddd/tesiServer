"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

var _superior = require("./services/superior.service");

var _elemental = require("./services/elemental.service");

var _general = require("./services/general.services");

var _Configure = _interopRequireDefault(require("../../models/Configure"));

var _User = _interopRequireDefault(require("../../models/User"));

var _rediss = require("../../middlewares/rediss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ejs = require("ejs");

var {
  formarNomina
} = (0, _general.general)();
var {
  juntasOnly,
  juntasFinal: _juntasFinal,
  juntasGeneral,
  promJuntaComportamiento,
  promLibretasElem,
  promFinalElem,
  promPromocionElem,
  promInformeElem
} = (0, _elemental.element)(); //TODO: check CALCULOS DE COMPUTO

var {
  juntasExamProyec,
  promParcial,
  promQuimestral,
  promAnual,
  promPromociones,
  promMatricula,
  promLibretas,
  promJuntas,
  promInforme,
  promFinal,
  promJuntasOnly
} = (0, _superior.superior)();

function autoridad() {
  return _autoridad.apply(this, arguments);
}

function _autoridad() {
  _autoridad = _asyncToGenerator(function* () {
    try {
      var reply = yield _rediss.client.get("".concat(_rediss.claveOnPort, "autoridades"));
      if (reply) return JSON.parse(reply);
      var result = yield _Configure.default.findOne();
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
  promocion: function () {
    var _promocion = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso, _data$0$curso2;

        var {
          nextCourse,
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso = data[0].curso) === null || _data$0$curso === void 0 ? void 0 : _data$0$curso._id;
        var paralelo = data[0].paralelo;
        var cursoNum = (_data$0$curso2 = data[0].curso) === null || _data$0$curso2 === void 0 ? void 0 : _data$0$curso2.num;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var tema = '';

        if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) {
          var _result = promPromocionElem(rowM, rowD, estudiantes);

          tema = yield ejs.renderFile(__dirname + "/themes/elemental/promocion.ejs", {
            result: _result,
            auth,
            nextCourse
          });
          return res.status(200).json(tema);
        }

        var result = promPromociones(rowM, rowD, estudiantes);
        tema = yield ejs.renderFile(__dirname + "/themes/superior/promocion.ejs", {
          result,
          auth,
          nextCourse
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
  matricula: function () {
    var _matricula = _asyncToGenerator(function* (req, res) {
      try {
        var data = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var auth = yield autoridad();
        var result = promMatricula(rowM, estudiantes);
        var tema = yield ejs.renderFile(__dirname + "/themes/matricula.ejs", {
          result,
          auth
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function matricula(_x3, _x4) {
      return _matricula.apply(this, arguments);
    }

    return matricula;
  }(),
  libretas: function () {
    var _libretas = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso3, _data$0$curso4;

        var {
          ops,
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso3 = data[0].curso) === null || _data$0$curso3 === void 0 ? void 0 : _data$0$curso3._id;
        var paralelo = data[0].paralelo;
        var cursoNum = (_data$0$curso4 = data[0].curso) === null || _data$0$curso4 === void 0 ? void 0 : _data$0$curso4.num;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var tema = '';

        if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) {
          var _result2 = promLibretasElem(rowM, rowD, estudiantes, ops.quimestre);

          if (cursoNum != 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/libretas.ejs", {
            result: _result2,
            auth,
            ops
          });else tema = yield ejs.renderFile(__dirname + "/themes/elemental/libretaCuarto.ejs", {
            result: _result2,
            auth,
            ops
          });
          return res.status(200).json(tema);
        }

        var result = promLibretas(rowM, rowD, estudiantes, ops.quimestre);
        tema = yield ejs.renderFile(__dirname + "/themes/superior/libretas.ejs", {
          result,
          auth,
          ops: ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function libretas(_x5, _x6) {
      return _libretas.apply(this, arguments);
    }

    return libretas;
  }(),
  juntas: function () {
    var _juntas = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso5, _data$0$curso6;

        var {
          ops,
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso5 = data[0].curso) === null || _data$0$curso5 === void 0 ? void 0 : _data$0$curso5._id;
        var paralelo = data[0].paralelo;
        var keymateria = data[0].keymateria;
        var cursoNum = (_data$0$curso6 = data[0].curso) === null || _data$0$curso6 === void 0 ? void 0 : _data$0$curso6.num;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var tema = ''; //TODO check SI ES DE 2DO 3RO DE BASICA 4TO

        if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) {
          var _result3 = juntasGeneral(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria);

          if (cursoNum != 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntas.ejs", {
            result: _result3,
            auth,
            ops
          });else tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntasCuarto.ejs", {
            result: _result3,
            auth,
            ops
          });
          return res.status(200).json(tema);
        } //TODO check TODOS LOS CURSOS CUALITATIVOS Y CUANTITATIVO


        var result = promJuntas(rowM, rowD, estudiantes, ops.quimestre, paralelo);
        tema = yield ejs.renderFile(__dirname + "/themes/superior/juntas.ejs", {
          result,
          auth,
          ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntas(_x7, _x8) {
      return _juntas.apply(this, arguments);
    }

    return juntas;
  }(),
  juntasIndividual: function () {
    var _juntasIndividual = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso7, _data$0$curso8;

        var {
          ops,
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso7 = data[0].curso) === null || _data$0$curso7 === void 0 ? void 0 : _data$0$curso7._id;
        var paralelo = data[0].paralelo;
        var keymateria = data[0].keymateria;
        var cursoNum = (_data$0$curso8 = data[0].curso) === null || _data$0$curso8 === void 0 ? void 0 : _data$0$curso8.num;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo: paralelo
        });
        var auth = yield autoridad();
        var tema = ''; //TODO check SI ES DE 2DO 3RO DE BASICA 4TO

        if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) {
          var _result4 = juntasOnly(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria);

          if (cursoNum != 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntas.ejs", {
            result: _result4,
            auth,
            ops
          });else tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntasCuarto.ejs", {
            result: _result4,
            auth,
            ops
          });
          return res.status(200).json(tema);
        }

        console.log('LLEGA'); //TODO check TODOS LOS CURSOS CUALITATIVOS Y CUANTITATIVO

        var result = promJuntasOnly(rowM, rowD, estudiantes, ops.quimestre, paralelo, keymateria);
        tema = yield ejs.renderFile(__dirname + "/themes/superior/juntas.ejs", {
          result,
          auth: auth,
          ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntasIndividual(_x9, _x10) {
      return _juntasIndividual.apply(this, arguments);
    }

    return juntasIndividual;
  }(),
  juntasFinal: function () {
    var _juntasFinal2 = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso9, _data$0$curso10;

        var {
          ops,
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso9 = data[0].curso) === null || _data$0$curso9 === void 0 ? void 0 : _data$0$curso9._id;
        var paralelo = data[0].paralelo;
        var keymateria = data[0].keymateria;
        var cursoNum = (_data$0$curso10 = data[0].curso) === null || _data$0$curso10 === void 0 ? void 0 : _data$0$curso10.num;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo: paralelo
        });
        var auth = yield autoridad();
        var tema = ''; //TODO check SI ES COMPORTAMIENTO DE TODOS 

        if (ops.tipo === 'COMP') {
          var _result5 = promJuntaComportamiento(rowM, rowD, estudiantes, paralelo, keymateria);

          tema = yield ejs.renderFile(__dirname + "/themes/comportamiento.ejs", {
            result: _result5,
            auth,
            ops
          });
          return res.status(200).json(tema);
        } //TODO check SI ES DE 2DO 3RO DE BASICA 4TO


        if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) {
          var _result6 = _juntasFinal(rowM, rowD, estudiantes, paralelo, keymateria);

          if (cursoNum != 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntasFinal.ejs", {
            result: _result6,
            auth,
            ops
          });else tema = yield ejs.renderFile(__dirname + "/themes/elemental/juntasFinExam.ejs", {
            result: _result6,
            auth,
            ops
          });
          return res.status(200).json(tema);
        } //TODO check PROMEDIO FINAL CON PROYECTOS SUPERIOS


        var result = juntasExamProyec(rowM, rowD, estudiantes, paralelo, keymateria);

        if (ops.tipo === 'PY') {
          if (ops.subnivel == 2) tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasExaProy.ejs", {
            result,
            auth,
            ops
          });else tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasExam.ejs", {
            result,
            auth,
            ops
          });
          return res.status(200).json(tema);
        } //TODO check GENERAR HTML DE SUPLETORIOS Y PROMEDIO FINAL


        if (ops.subnivel == 2) tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasFinEP.ejs", {
          result,
          auth,
          ops
        });else tema = yield ejs.renderFile(__dirname + "/themes/superior/juntasFinal.ejs", {
          result,
          auth,
          ops
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function juntasFinal(_x11, _x12) {
      return _juntasFinal2.apply(this, arguments);
    }

    return juntasFinal;
  }(),
  informe: function () {
    var _informe = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso11, _data$0$curso12, _data$0$curso13;

        var {
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso11 = data[0].curso) === null || _data$0$curso11 === void 0 ? void 0 : _data$0$curso11._id;
        var paralelo = data[0].paralelo;
        var cursoNum = (_data$0$curso12 = data[0].curso) === null || _data$0$curso12 === void 0 ? void 0 : _data$0$curso12.num;
        var subnivel = (_data$0$curso13 = data[0].curso) === null || _data$0$curso13 === void 0 ? void 0 : _data$0$curso13.subnivel;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var tema = '';

        if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) {
          var _result7 = promInformeElem(rowM, rowD, estudiantes);

          if (cursoNum != 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/informe.ejs", {
            result: _result7,
            auth
          });else tema = yield ejs.renderFile(__dirname + "/themes/elemental/informeCuarto.ejs", {
            result: _result7,
            auth
          });
          return res.status(200).json(tema);
        } //TODO RETORNE SI UN CURSO QUE NO ES SUBNIVEL


        if (subnivel != 2) {
          var _result8 = promInforme(rowM, rowD, estudiantes);

          tema = yield ejs.renderFile(__dirname + "/themes/superior/informe.ejs", {
            result: _result8,
            auth
          });
          return res.status(200).json(tema);
        }

        var result = promInforme(rowM, rowD, estudiantes);
        tema = yield ejs.renderFile(__dirname + "/themes/superior/informeSub.ejs", {
          result,
          auth
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function informe(_x13, _x14) {
      return _informe.apply(this, arguments);
    }

    return informe;
  }(),
  final: function () {
    var _final = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso14, _data$0$curso15;

        var {
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso14 = data[0].curso) === null || _data$0$curso14 === void 0 ? void 0 : _data$0$curso14._id;
        var paralelo = data[0].paralelo;
        var cursoNum = (_data$0$curso15 = data[0].curso) === null || _data$0$curso15 === void 0 ? void 0 : _data$0$curso15.num;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var tema = '';

        if (cursoNum == 4 || cursoNum == 5 || cursoNum == 6) {
          var _result9 = promFinalElem(rowM, rowD, estudiantes);

          if (cursoNum != 6) tema = yield ejs.renderFile(__dirname + "/themes/elemental/final.ejs", {
            result: _result9,
            auth
          });else tema = yield ejs.renderFile(__dirname + "/themes/elemental/finalCuarto.ejs", {
            result: _result9,
            auth
          });
          return res.status(200).json(tema);
        }

        var result = promFinal(rowM, rowD, estudiantes);
        tema = yield ejs.renderFile(__dirname + "/themes/superior/final.ejs", {
          result,
          auth
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function final(_x15, _x16) {
      return _final.apply(this, arguments);
    }

    return final;
  }(),
  parcial: function () {
    var _parcial = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso16;

        var {
          ops,
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso16 = data[0].curso) === null || _data$0$curso16 === void 0 ? void 0 : _data$0$curso16._id;
        var paralelo = data[0].paralelo;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var result = promParcial(rowM, rowD, estudiantes, ops);
        var tema = yield ejs.renderFile(__dirname + "/themes/parcial.ejs", {
          result,
          auth,
          ops,
          paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function parcial(_x17, _x18) {
      return _parcial.apply(this, arguments);
    }

    return parcial;
  }(),
  quimestral: function () {
    var _quimestral = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso17;

        var {
          ops,
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso17 = data[0].curso) === null || _data$0$curso17 === void 0 ? void 0 : _data$0$curso17._id;
        var paralelo = data[0].paralelo;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var result = promQuimestral(rowM, rowD, estudiantes, ops);
        var tema = yield ejs.renderFile(__dirname + "/themes/quimestral.ejs", {
          result,
          auth,
          ops,
          paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function quimestral(_x19, _x20) {
      return _quimestral.apply(this, arguments);
    }

    return quimestral;
  }(),
  anual: function () {
    var _anual = _asyncToGenerator(function* (req, res) {
      try {
        var _data$0$curso18;

        var {
          data
        } = req.body;
        if ((data === null || data === void 0 ? void 0 : data.length) == 0) return res.status(200).json('Sin calificaciones');
        var idMatricula = data[0].key;
        var idCurso = (_data$0$curso18 = data[0].curso) === null || _data$0$curso18 === void 0 ? void 0 : _data$0$curso18._id;
        var paralelo = data[0].paralelo;
        var estudiantes = [];

        for (var i = 0; i < data.length; i++) {
          estudiantes.push(data[i]._id);
        }

        var rowM = yield _Matriculas.default.findById(idMatricula);
        var rowD = yield _Distributivo.default.findOne({
          fkcurso: idCurso,
          paralelo
        });
        var auth = yield autoridad();
        var result = promAnual(rowM, rowD, estudiantes);
        var tema = yield ejs.renderFile(__dirname + "/themes/anual.ejs", {
          result: result,
          auth,
          paralelo
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function anual(_x21, _x22) {
      return _anual.apply(this, arguments);
    }

    return anual;
  }(),
  getNomina: function () {
    var _getNomina = _asyncToGenerator(function* (req, res) {
      try {
        var reg = yield _Matriculas.default.find().lean().select({
          curso: 1,
          periodo: 1,
          paralelo: 1,
          'matriculas.estudiante': 1,
          'matriculas.nmatricula': 1
        });
        var result = formarNomina(reg);
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/nomina/nomina.ejs", {
          result,
          auth
        });
        return res.json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getNomina(_x23, _x24) {
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
        var tema = yield ejs.renderFile(__dirname + "/themes/nomina/nominaDocente.ejs", {
          result,
          auth
        });
        return res.json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function getNominaDocente(_x25, _x26) {
      return _getNominaDocente.apply(this, arguments);
    }

    return getNominaDocente;
  }(),
  Ambitos: function () {
    var _Ambitos = _asyncToGenerator(function* (req, res) {
      try {
        var result = req.body;
        var fechaA = fechaActual();
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/inicial/ambitos.ejs", {
          result,
          auth,
          fechaA
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function Ambitos(_x27, _x28) {
      return _Ambitos.apply(this, arguments);
    }

    return Ambitos;
  }(),
  Destrezas: function () {
    var _Destrezas = _asyncToGenerator(function* (req, res) {
      try {
        var result = req.body;
        var fechaA = fechaActual();
        var auth = yield autoridad();
        var tema = yield ejs.renderFile(__dirname + "/themes/inicial/destrezas.ejs", {
          result,
          auth,
          fechaA
        });
        res.status(200).json(tema);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    });

    function Destrezas(_x29, _x30) {
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