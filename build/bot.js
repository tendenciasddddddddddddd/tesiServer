"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singBot = void 0;

var _User = _interopRequireDefault(require("./models/User.js"));

var _Estudiante = _interopRequireDefault(require("./models/registros/Estudiante.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var {
  Telegraf
} = require("telegraf");

var bot = new Telegraf("6182689909:AAHPNHPYnWg9XbKFxCckcQP4NtPfbGD2pNU");

var singBot = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* () {
    try {
      bot.use( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* (ctx, next) {
          var inputs = ctx.message.text;

          if (inputs.length > 7) {
            if (verificarCedula(inputs)) {
              ctx.reply("NÚMERO DE CÉDULA CORRECTO");
              var userFound = yield _User.default.findOne({
                cedula: inputs
              });

              if (!userFound) {
                var userEstudiante = yield _Estudiante.default.findOne({
                  cedula: inputs
                });

                if (!userEstudiante) {
                  ctx.reply("EL USUARIO NO ESTA REGISTRADO EN EL SISTEMA");
                } else {
                  var newvalues = {
                    $set: {
                      telegram: ctx.from
                    }
                  };
                  yield _Estudiante.default.updateOne({
                    cedula: userEstudiante.cedula
                  }, newvalues);
                  ctx.reply("USUARIO ACTUALIZADO CON EXITO");
                  ctx.reply("HASTA PRONTO");
                }
              } else {
                var newvalues = {
                  $set: {
                    telegram: ctx.from
                  }
                };
                yield _User.default.updateOne({
                  cedula: userFound.cedula
                }, newvalues);
                ctx.reply("USUARIO ACTUALIZADO CON EXITO");
                ctx.reply("HASTA PRONTO");
              }
            } else ctx.reply("EL NÚMERO DE CÉDULA NO ES VALIDO");
          } else ctx.reply("Hola, ingrese su numero de CÉDULA");

          next(ctx);
        });

        return function (_x, _x2) {
          return _ref2.apply(this, arguments);
        };
      }());
      bot.launch();
    } catch (error) {}
  });

  return function singBot() {
    return _ref.apply(this, arguments);
  };
}();

exports.singBot = singBot;

var verificarCedula = cedula => {
  if (cedula.length > 8) {
    var digito_region = cedula.substring(0, 2);

    if (digito_region >= 1 && digito_region <= 24) {
      var ultimo_digito = cedula.substring(9, 10);
      var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));
      var numero1 = cedula.substring(0, 1);
      numero1 = numero1 * 2;

      if (numero1 > 9) {
        numero1 = numero1 - 9;
      }

      var numero3 = cedula.substring(2, 3);
      numero3 = numero3 * 2;

      if (numero3 > 9) {
        numero3 = numero3 - 9;
      }

      var numero5 = cedula.substring(4, 5);
      numero5 = numero5 * 2;

      if (numero5 > 9) {
        numero5 = numero5 - 9;
      }

      var numero7 = cedula.substring(6, 7);
      numero7 = numero7 * 2;

      if (numero7 > 9) {
        numero7 = numero7 - 9;
      }

      var numero9 = cedula.substring(8, 9);
      numero9 = numero9 * 2;

      if (numero9 > 9) {
        numero9 = numero9 - 9;
      }

      var impares = numero1 + numero3 + numero5 + numero7 + numero9;
      var suma_total = pares + impares;
      var primer_digito_suma = String(suma_total).substring(0, 1);
      var decena = (parseInt(primer_digito_suma) + 1) * 10;
      digito_validador = decena - suma_total;
      if (digito_validador == 10) var digito_validador = 0;

      if (digito_validador == ultimo_digito) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};