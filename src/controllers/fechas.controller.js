import AperturaNotas from "../models/AperturaNotas.js";
import { client, claveOnPort } from "../middlewares/rediss";

export default {
  getListas: async (req, res) => {
    try {
      const reply = await client.get(`${claveOnPort}fechas`);
      if (reply) return res.json(JSON.parse(reply));
      const result = await AperturaNotas.findOne()
      await client.set(`${claveOnPort}fechas`, JSON.stringify(result), { EX: 36000});
      return res.json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  updateById: async (req, res) => {
    try {
        const result = await AperturaNotas.findByIdAndUpdate(
          req.params.paramsId,
          req.body,
          {
            new: true,
          }
        );
        client.del(`${claveOnPort}fechas`);
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
  },

};