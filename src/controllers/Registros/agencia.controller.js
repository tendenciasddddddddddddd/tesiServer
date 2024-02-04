import Agencia from '../../models/Agencia.js';

export default {
    update: async (req,res,next) => {
        try {         
            const reg = await Agencia.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                  new: true,
                }
              );
              res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
    list: async (req,res,next) => {
        try {
            const reg=await Agencia.findOne();
            res.status(200).json(reg);
        } catch(e){
            res.status(500).send({
                message:'Ocurrió un error'
            });
            next(e);
        }
    },
}