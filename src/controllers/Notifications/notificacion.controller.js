const webpush = require("../../webpush");
import User from "../../models/User";

export default {
  CrearSubcripcion: async (req, res) => {
    try {
      await User.findByIdAndUpdate(
        req.params.usuario,
        req.body,
        {
          new: true,
        }
      );
      res.status(201).json({});
    } catch (error) {
      return res.status(500).json(err);
    }
  },

  sewMensaje: async (req, res) => {
    const usuarios = await User.find({ status: '1' });
    const arr = []
    try {
      for (let i = 0; i < usuarios.length; i++) {
        const element = usuarios[i];
        if (element.notifications) {
          arr.push(element.notifications)
        }
      }
      res.status(201).json({});
    } catch (error) {
      return res.status(500).json(error);
    }
   
    const { title, message } = req.body;
    const payload = JSON.stringify({
      title,
      message,
    });
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      try {
        await webpush.sendNotification(element, payload);
      } catch (Excepion) {
        continue;
      }
    }
  },
  sewMensajeByIds: async (req, res) => {
    const usuarios = await User.find({ _id: req.body.idUser });
    const arr = []
    try {
      for (let i = 0; i < usuarios.length; i++) {
        const element = usuarios[i];
        if (element.notifications) {
          arr.push(element.notifications)
        }
      }
      res.status(200).json();
    } catch (error) {
      return res.status(500).json(error);
    }
 
    const { title, message } = req.body;
    const payload = JSON.stringify({
      title,
      message,
    });
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i];
      try {
        await webpush.sendNotification(element, payload);
      } catch (Excepion) {
        continue;
      }
    }
  },
};
