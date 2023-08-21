"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

var _Estudiante = _interopRequireDefault(require("../../models/registros/Estudiante"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var webpush = require("../../webpush");

var _default = {
  CrearSubcripcion: function () {
    var _CrearSubcripcion = _asyncToGenerator(function* (req, res) {
      try {
        yield _User.default.findByIdAndUpdate(req.params.usuario, req.body, {
          new: true
        });
        res.status(201).json({});
      } catch (error) {
        return res.status(500).json(err);
      }
    });

    function CrearSubcripcion(_x, _x2) {
      return _CrearSubcripcion.apply(this, arguments);
    }

    return CrearSubcripcion;
  }(),
  ///===============CREAR SUBCRIPCION DE ESTUDIANTES =============================
  crearSubcripcionEstudiantes: function () {
    var _crearSubcripcionEstudiantes = _asyncToGenerator(function* (req, res) {
      try {
        yield _Estudiante.default.findByIdAndUpdate(req.params.usuario, req.body, {
          new: true
        });
        res.status(201).json({});
      } catch (error) {
        return res.status(500).json(err);
      }
    });

    function crearSubcripcionEstudiantes(_x3, _x4) {
      return _crearSubcripcionEstudiantes.apply(this, arguments);
    }

    return crearSubcripcionEstudiantes;
  }(),
  sewMensaje: function () {
    var _sewMensaje = _asyncToGenerator(function* (req, res) {
      var usuarios = yield _User.default.find({
        status: '1'
      });
      var arr = [];

      try {
        for (var i = 0; i < usuarios.length; i++) {
          var element = usuarios[i];

          if (element.notifications) {
            arr.push(element.notifications);
          }
        }

        res.status(201).json({});
      } catch (error) {
        return res.status(500).json(error);
      }

      var {
        title,
        message
      } = req.body;
      var payload = JSON.stringify({
        title,
        message
      });

      for (var _i = 0; _i < arr.length; _i++) {
        var _element = arr[_i];

        try {
          yield webpush.sendNotification(_element, payload);
        } catch (Excepion) {
          continue;
        }
      }
    });

    function sewMensaje(_x5, _x6) {
      return _sewMensaje.apply(this, arguments);
    }

    return sewMensaje;
  }(),
  sewMensajeByIds: function () {
    var _sewMensajeByIds = _asyncToGenerator(function* (req, res) {
      var usuarios = yield _User.default.find({
        _id: req.body.idUser
      });
      var arr = [];

      try {
        for (var i = 0; i < usuarios.length; i++) {
          var element = usuarios[i];

          if (element.notifications) {
            arr.push(element.notifications);
          }
        }

        res.status(200).json();
      } catch (error) {
        return res.status(500).json(error);
      }

      var {
        title,
        message
      } = req.body;
      var payload = JSON.stringify({
        title,
        message
      });

      for (var _i2 = 0; _i2 < arr.length; _i2++) {
        var _element2 = arr[_i2];

        try {
          yield webpush.sendNotification(_element2, payload);
        } catch (Excepion) {
          continue;
        }
      }
    });

    function sewMensajeByIds(_x7, _x8) {
      return _sewMensajeByIds.apply(this, arguments);
    }

    return sewMensajeByIds;
  }()
};
exports.default = _default;