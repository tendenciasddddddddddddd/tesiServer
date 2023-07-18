import User from "./models/User.js";
import Estudiante from "./models/registros/Estudiante.js";
const { Telegraf } = require("telegraf");

const bot = new Telegraf("6182689909:AAHPNHPYnWg9XbKFxCckcQP4NtPfbGD2pNU");

export const singBot = async () => {
    try {
        bot.use(async (ctx, next) => {
            const inputs = ctx.message.text;
            if (inputs.length > 7) {
                if (verificarCedula(inputs)) {
                    ctx.reply("NÚMERO DE CÉDULA CORRECTO");
                    const userFound = await User.findOne({ cedula: inputs });
                    if (!userFound) {
                        const userEstudiante = await Estudiante.findOne({ cedula: inputs });
                        if (!userEstudiante) {
                            ctx.reply("EL USUARIO NO ESTA REGISTRADO EN EL SISTEMA");
                        } else {
                            var newvalues = { $set: { telegram: ctx.from } };
                            await Estudiante.updateOne({ cedula: userEstudiante.cedula }, newvalues);
                            ctx.reply("USUARIO ACTUALIZADO CON EXITO");
                            ctx.reply("HASTA PRONTO");
                        }
                    } else {
                        var newvalues = { $set: { telegram: ctx.from } };
                        await User.updateOne({ cedula: userFound.cedula }, newvalues);
                        ctx.reply("USUARIO ACTUALIZADO CON EXITO");
                        ctx.reply("HASTA PRONTO");
                    }
                } else ctx.reply("EL NÚMERO DE CÉDULA NO ES VALIDO");
            } else ctx.reply("Hola, ingrese su numero de CÉDULA");
            next(ctx);
        });
        bot.launch();
    } catch (error) { }
};

const verificarCedula = (cedula) => {
    if (cedula.length > 8) {
        var digito_region = cedula.substring(0, 2);
        if (digito_region >= 1 && digito_region <= 24) {
            var ultimo_digito = cedula.substring(9, 10);
            var pares =
                parseInt(cedula.substring(1, 2)) +
                parseInt(cedula.substring(3, 4)) +
                parseInt(cedula.substring(5, 6)) +
                parseInt(cedula.substring(7, 8));
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
