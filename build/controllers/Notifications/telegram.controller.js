"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  Telegraf
} = require("telegraf");

var bot = new Telegraf("5824261593:AAGf_vfiN0XHdFfmeFEGopldSxhJQkkpRLs");
bot.catch(err => {
  console.log('Ooops', err);
});
var _default = {
  ///===============SE ENVIA MENSAJES A TODOS LOS DOCENTES ACTIVOS FIND ALL======== 
  sewMensajeAll: function () {
    var _sewMensajeAll = _asyncToGenerator(function* (req, res) {
      var usuarios = yield _User.default.find({
        status: '1'
      });
      var arr = [];

      try {
        for (var i = 0; i < usuarios.length; i++) {
          var element = usuarios[i];

          if (element.telegram) {
            arr.push(element.telegram);
          }
        }

        res.status(201).json({});
      } catch (error) {
        return res.status(500).json(error);
      }

      var {
        message
      } = req.body;

      try {
        for (var _i = 0; _i < arr.length; _i++) {
          bot.telegram.sendMessage(arr[_i].id, message);
        }
      } catch (error) {
        console.log(error);
      }
    });

    function sewMensajeAll(_x, _x2) {
      return _sewMensajeAll.apply(this, arguments);
    }

    return sewMensajeAll;
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

          if (element.telegram) {
            arr.push(element.telegram);
          }
        }

        res.status(200).json();
      } catch (error) {
        return res.status(500).json(error);
      }

      var {
        message
      } = req.body;

      try {
        for (var _i2 = 0; _i2 < arr.length; _i2++) {
          bot.telegram.sendMessage(arr[_i2].id, message);
        }
      } catch (error) {
        console.log(error);
      }
    });

    function sewMensajeByIds(_x3, _x4) {
      return _sewMensajeByIds.apply(this, arguments);
    }

    return sewMensajeByIds;
  }()
};
exports.default = _default;