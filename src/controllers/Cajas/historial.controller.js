import HistorialCaja from "../../models/Cajas/HistorialCaja.js";

export default {
    list: async (req, res) => {
        try {
            const result = await HistorialCaja.find().sort({ 'createdAt': -1 });
            return res.json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            let cadenaId = req.params.id;
            const array = cadenaId.split(",");
            await HistorialCaja.deleteMany({
                _id: {
                    $in: array,
                },
            });
            res.status(200).json();
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    getById: async (req, res) => {
        try {
            const reg = await HistorialCaja.findById(req.params.id);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send(e);
        }
    },
       
}
