import Configure from "../../models/Configure";
import { client } from "../../middlewares/rediss";

export default {

  getListas: async (req, res) => {
    try {
      const reply = await client.get("5001autoridades");
      if (reply) return res.json(JSON.parse(reply));
      const result = await Configure.find().lean();
      await client.set('5001autoridades',JSON.stringify(result), { EX: 36000});
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
      client.del('5001autoridades');
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },

};