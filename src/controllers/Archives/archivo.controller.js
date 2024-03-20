import Archivador from "../../models/Archivador.js";

async function insetFolder(id, data) {
    try {
        await Archivador.findByIdAndUpdate(
            id,
            { $push: { 'carpetas': data } },
            { new: true }
        )
    } catch (error) {
        return res.status(500).json(error);
    }
}
async function insetFile(id, data) {
    try {
        await Archivador.findByIdAndUpdate(
            id,
            { $push: { 'archivos': data } },
            { new: true }
        )
    } catch (error) {
        return res.status(500).json(error);
    }
}

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
    createFile: async (req, res) => {
        try {
            const { fkdocente } = req.body
            const findUser = await Archivador.findOne({ fkdocente })
            if (findUser) {
                await insetFile(findUser._id, req.body.archivos)
                return res.status(201).json({});
            }
            await Archivador.create(req.body)
            res.status(201).json({});

        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    },

    getAll: async (req, res) => {
        try {
            const limit = parseInt(req.query.take);
            const skip = parseInt(req.query.page);
            const total = await Archivador.countDocuments();
            const paginas = Math.ceil(total / limit);
            const info = await Archivador.find()
                .skip(limit * skip - limit)
                .limit(limit)
                .sort({ createdAt: -1 })
            info.forEach((item) => {
                item.abona = item?.pagos?.reduce((n, { monto }) => n + monto, 0)
            })
            const coleccion = {
                info: info,
                pagina: skip,
                paginas: paginas,
                total: total,
            };
            return res.json(coleccion);
        } catch (error) {
            return res.status(500).json(err);
        }
    },
    getAllFinalizado: async (req, res) => {
        try {
            const limit = parseInt(req.query.take);
            const skip = parseInt(req.query.page);
            const total = await Archivador.countDocuments({estado : 2});
            const paginas = Math.ceil(total / limit);
            const usuarios = await Archivador.find({estado : 2})
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
    getAllEntregado: async (req, res) => {
        try {
            const limit = parseInt(req.query.take);
            const skip = parseInt(req.query.page);
            const total = await Archivador.countDocuments({estado : 3});
            const paginas = Math.ceil(total / limit);
            const usuarios = await Archivador.find({estado : 3})
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
    getById: async (req, res) => {
        try {
            const {id} = req.params;
            const result = await Archivador.findById({_id : id})
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

    updateAbona: async (req,res,next) => {
        try {
            let {id} = req.params;         
           await Archivador.updateOne(
            { _id: id },
            {
                $push: {
                    "pagos": req.body,
                 }
            }
           ) 
            res.status(200).json({});
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },

    deleteAbonos: async (req, res) => {
        try {
            let cadenaId = req.params.id;
            const array = cadenaId.split(",");
            if(array[0]==='' || array[1]=== '') {
               return res.status(500).send({});
            }  
           await Archivador.updateOne(
             { _id: array[0] },
             { $pull: { pagos: { _id: array[1] } } },
             {
               new: true,
             }
           );
          res.status(200).json({});
        } catch (e) {
          res.status(500).json({ message: "No mat found" });
        }
    },

    query: async (req, res, next) => {
        try {
            const querys = req.query.querys;
           const reg = await Archivador.find({
            $or : [
               // {fecha: { '$regex': querys, "$options": "i" }},
                {'cliente.nombres': { '$regex': querys, "$options": "i" }}
            ]
           })
           reg.reverse()
           console.log(reg.length);
           res.status(200).json(reg);
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
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
    removeFolder: async (req, res) => {
        try {
            const { id } = req.params;
            await Archivador.updateOne(
                { "carpetas._id": id },
                {
                    $pull: {
                        "carpetas": { "_id": id }
                    }
                }
            )
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    removeArchivo: async (req, res) => {
        try {
            const { id } = req.params;
            await Archivador.updateOne(
                { "archivos._id": id },
                {
                    $pull: {
                        "archivos": { "_id": id }
                    }
                }
            )
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    removeSubArchivo: async (req, res) => {
        try {
            const { id } = req.params;
            const { keyArchivo } = req.body
            await Archivador.updateOne(
                { _id: id },
                {
                  $pull: {
                    "carpetas.$[].archivos": { "_id": keyArchivo }
                  }
                }
              )
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    createCarpeta: async (req, res) => {
        try {
            await Archivador.findByIdAndUpdate(
                req.params.id,
                { $push: { carpetas: req.body } },
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
    createArchivos: async (req, res) => {
        try {
            await Archivador.findByIdAndUpdate(
                req.params.id,
                { $push: { archivos: req.body } },
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
    createSubArchivos: async (req, res) => {
        try {
            const { data, keyFolder } = req.body
            await Archivador.updateOne(
                { "carpetas._id": keyFolder },
                {
                    $push: {
                        "carpetas.$.archivos": data
                    }
                },
                { new: true }
            )
            res.status(200).json({});
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};