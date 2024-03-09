import Archivador from "../models/Archivador.js";

export default {
    getAll: async (req, res) => {
        try {
            const limit = parseInt(req.query.take);
            const skip = parseInt(req.query.page);
            const total = await Archivador.countDocuments();
            const paginas = Math.ceil(total / limit);
            const usuarios = await Archivador.find()
                .skip(limit * skip - limit)
                .limit(limit);
            const coleccion = {
                info: usuarios,
                pagina: skip,
                paginas: paginas,
                total: total,
            };
            return res.json(coleccion);
        } catch (error) {
            return res.status(500).json(err);
        }
    },
    create: async (req, res) => {
        try {
            await Archivador.create(req.body)
            res.status(201).json({});
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    createTramite: async (req, res) => {
        try {
            await Archivador.findByIdAndUpdate(
                req.params.id,
                { $push: { documentos: req.body } },
                {
                    new: true,
                }
            );
            res.status(200).json({});
        } catch (e) {
            console.log(e);
            res.status(500).json("error del servidor");
        }
    },

    deleteTramite: async (req, res) => {
        try {
            await Archivador.findByIdAndUpdate(
                req.params.id,
                {
                    $pull: {
                        "documentos": { "_id": req.body.key }
                    }
                }
            )
            res.status(200).json({});
        } catch (e) {
            console.log(e);
            res.status(500).json("error del servidor");
        }
    },

    updateTramite: async (req, res) => {
        try {
            const {_id, servicio, descripcion, info, kfservicio } = req.body
             await Archivador.findByIdAndUpdate(
                 req.params.id,
                 {
                     $set: { 
                        "documentos.$[perf].servicio": servicio,
                        "documentos.$[perf].kfservicio": kfservicio,
                        "documentos.$[perf].descripcion": descripcion,
                        "documentos.$[perf].info": info,
                    }
                 },
                 {
                     arrayFilters: [{
                         "perf._id": { $eq: _id }
                     }],
                     new: true,
                 }
             );
            res.status(200).json({});
        } catch (e) {
            console.log(e);
            res.status(500).json("error del servidor");
        }
    },

    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Archivador.findById(id);
            res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};