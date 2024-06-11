import Archivador from "../../models/Archivador.js";

export default {
    create: async (req, res) => {
        try {
            await Archivador.create(req.body)
            res.status(201).json({});

        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    },
    getListas: async (req, res) => {
        try {
            const result = await Archivador.find().sort({ 'createdAt': -1 });
            const info = []
            for (let i = 0; i < result.length; i++) {
                let element = {}
                element = result[i];
                element['search1'] = result[i]?.cliente?.nombres
                element['search2'] = result[i]?.servicio?.nombre
                info.push(element)
            }
            return res.json(info);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getListasFinalizados: async (req, res) => {
        try {
            const result = await Archivador.find().sort({ 'createdAt': -1 });
            const info = []
            for (let i = 0; i < result.length; i++) {
                let element = {}
                element = result[i];
                element['search1'] = result[i]?.cliente?.nombres
                element['search2'] = result[i]?.servicio?.nombre
                if(result[i]?.estado === true){
                    info.push(element)
                }
            }
            return res.json(info);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await Archivador.findById({ _id: id })
            return res.json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    updateById: async (req, res) => {
        try {
            await Archivador.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                }
            );
            res.status(200).json({});
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    updateAbona: async (req, res, next) => {
        try {
            let { id } = req.params;
            await Archivador.updateOne(
                { _id: id },
                {
                    $push: {
                        "pagos": req.body,
                    }
                }
            )
            res.status(200).json({});
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    deleteAbonos: async (req, res) => {
        try {
            const { id } = req.params;
            const { keyPagos } = req.body
            await Archivador.updateOne(
                { _id: id },
                {
                    $pull: {
                        "pagos": { "_id": keyPagos }
                    }
                }
            )
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    remove: async (req, res) => {
        try {
            let cadenaId = req.params.id;
            const array = cadenaId.split(",");
            await Archivador.deleteMany({
                _id: {
                    $in: array,
                },
            });
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    removeRequerimiento: async (req, res) => {
        try {
            const { id } = req.params;
            const { keyReqm } = req.body
            await Archivador.updateOne(
                { _id: id },
                {
                    $pull: {
                        "arrRequisitos": { "_id": keyReqm }
                    }
                }
            )
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    createRequerimiento: async (req, res) => {
        try {
            await Archivador.findByIdAndUpdate(
                req.params.id,
                { $push: { arrRequisitos: req.body } },
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
    updateRequerimiento: async (req, res) => {
        try {
            const { data, keyReqm } = req.body
            await Archivador.updateOne(
                { _id: req.params.id },
                {
                    $set: {
                        "arrRequisitos.$[perf].departamento": data.departamento,
                        "arrRequisitos.$[perf].asunto": data.asunto,
                        "arrRequisitos.$[perf].archivos": data.archivos,
                        "arrRequisitos.$[perf].nombreDoc": data.nombreDoc,
                        "arrRequisitos.$[perf].estadoTramite": data.estadoTramite,
                        "arrRequisitos.$[perf].fecha": data.fecha,
                    }
                },
                {
                    arrayFilters: [{
                        "perf._id": { $eq: keyReqm }
                    }],
                    new: true
                }
            )
            res.status(200).json({});
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};