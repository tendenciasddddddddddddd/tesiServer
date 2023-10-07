import Configure from "../../models/Configure";
import { client, claveOnPort } from "../../middlewares/rediss";

export default {

  getListas: async (req, res) => {
    try {
      const reply = await client.get(`${claveOnPort}autoridades`);
      if (reply) return res.json(JSON.parse(reply));
      const result = await Configure.findOne()
      await client.set(`${claveOnPort}autoridades`,JSON.stringify(result), { EX: 36000});
      return res.json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

  updateById: async (req, res) => {
    try {
      const result = await Configure.findByIdAndUpdate(
        req.params.paramId,
        req.body,
        {
          new: true,
        }
      );
      client.del(`${claveOnPort}autoridades`);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

};