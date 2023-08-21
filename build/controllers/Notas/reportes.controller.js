"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Matriculas = _interopRequireDefault(require("../../models/Matriculas"));

var _Distributivo = _interopRequireDefault(require("../../models/distributivos/Distributivo"));

var _promReporte = require("./helper/promReporte");

var _Configure = _interopRequireDefault(require("../../models/Configure"));

var _rediss = require("../../middlewares/rediss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ejs = require("ejs"); //const pdf = require('html-pdf');


var fs = require('fs');

var options = {
  format: 'A4',
  border: '23px'
};
var {
  formatPromociones,
  formatMatricula,
  formatLibretas,
  formatJuntas,
  formatInforme
} = (0, _promReporte.promedioReportes)();

function autoridad() {
  return _autoridad.apply(this, arguments);
}

function _autoridad() {
  _autoridad = _asyncToGenerator(function* () {
    try {
      var reply = yield _rediss.client.get("3000autoridades");
      if (reply) return JSON.parse(reply);
      var result = yield _Configure.default.find().lean();
      yield _rediss.client.set('3000autoridades', JSON.stringify(result), {
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
  informe: function () {
    var _informe = _asyncToGenerator(function* (req, res) {
      try {
        var arr = req.body.data;
        var idMatricula = '';
        var idCurso = '';
        var paralelo = '';
        var estudiantes = [];

        for (var i = 0; i < arr.length; i++) {
          var _element$curso5;

          var element = arr[i];
          idMatricula = element.key;
          idCurso = (_element$curso5 = element.curso) === null || _element$curso5 === void 0 ? void 0 : _element$curso5._id;
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

    function informe(_x13, _x14) {
      return _informe.apply(this, arguments);
    }

    return informe;
  }()
};
exports.default = _default;