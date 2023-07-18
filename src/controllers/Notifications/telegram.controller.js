import User from "../../models/User";
const { Telegraf } = require("telegraf");

const bot = new Telegraf("5824261593:AAGf_vfiN0XHdFfmeFEGopldSxhJQkkpRLs");
bot.catch((err) => {
  console.log('Ooops', err)
})
export default {

  ///===============SE ENVIA MENSAJES A TODOS LOS DOCENTES ACTIVOS FIND ALL======== 
  sewMensajeAll: async (req, res) => {
    const usuarios = await User.find({ status: '1' });
    const arr = []
    try {
      for (let i = 0; i < usuarios.length; i++) {
        const element = usuarios[i];
        if (element.telegram) {
          arr.push(element.telegram)
        }
      }
      res.status(201).json({});
    } catch (error) {
      return res.status(500).json(error);
    }
    const { message } = req.body;
    try {
      for (let i = 0; i < arr.length; i++) {
        bot.telegram.sendMessage(arr[i].id, message);
      }
    } catch (error) {
      console.log(error);
    }
  },
  sewMensajeByIds: async (req, res) => {
    const usuarios = await User.find({ _id: req.body.idUser });
    const arr = []
    try {
      for (let i = 0; i < usuarios.length; i++) {
        const element = usuarios[i];
        if (element.telegram) {
          arr.push(element.telegram)
        }
      }
      res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
 
    const { message } = req.body;
    try {
      for (let i = 0; i < arr.length; i++) {
        bot.telegram.sendMessage(arr[i].id, message);
      }
    } catch (error) {
      console.log(error);
    }
  },
};
