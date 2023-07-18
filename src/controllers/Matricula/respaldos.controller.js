import Respaldo from "../../models/Respaldo";

export default {
    //======================LISTAR MATRICULAS POR ID PARA PERIODOS =================================
    getRespaldoById: async (req, res) => {
      try {
        let cadenaId = req.params.id;
       const array = cadenaId.split(",");
        const result = await Respaldo.find({fkcurso: array[0], fkperiodo : array[1]}).lean();
        res.status(200).json(result);
      } catch (error) {
        return res.status(500).json(error);
      }
    },
}