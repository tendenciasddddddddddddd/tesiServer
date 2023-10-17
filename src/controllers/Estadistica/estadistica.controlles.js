import Matriculas from "../../models/Matriculas";
import {estadistica } from "./services/estadistica.service";

const { promByCurso } = estadistica()

export default {
    getByCurso: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Matriculas.find({
                fkcurso: {
                    $in: [id],
                },
            }).lean();
            const prom = promByCurso(result)
            res.status(200).json(prom);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
}