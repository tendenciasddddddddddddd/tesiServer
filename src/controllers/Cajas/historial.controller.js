import HistorialCaja from "../../models/Cajas/HistorialCaja.js";

export default {
    update: async (req, res, next) => {
        try {
            const reg = await HistorialCaja.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    query: async (req, res, next) => {
        try {
            const querys = req.query.querys;
            const reg = await HistorialCaja.find({ fecha: { '$regex': querys, "$options": "i" } });
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req, res, next) => {
        try {
            const limit = parseInt(req.query.take);
            const skip = parseInt(req.query.page);
            const total = await HistorialCaja.countDocuments();
            const paginas = Math.ceil(total / limit);
            const reg = await HistorialCaja.find().skip((limit * skip) - limit).limit(limit).sort({ createdAt: -1 });
            const coleccion = {
                reg: reg,
                pagina: skip,
                paginas: paginas,
                total: total
            }
            return res.json(coleccion);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
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
