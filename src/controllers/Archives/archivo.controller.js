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
          return res.json(result);
        } catch (error) {
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
                {'cliente.identificacion': { '$regex': querys, "$options": "i" }},
                {'cliente.nombres': { '$regex': querys, "$options": "i" }}
            ]
           })
           reg.reverse()
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