import User from "../models/User.js";
import Role from "../models/Role.js";

export default {
    update: async (req, res, next) => {
        try {
            const reg = await User.findByIdAndUpdate(
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
    add: async (req, res, next) => {
        try {
            const rolesFound = await Role.find({ name: 'Vendedor'});
            req.body['roles'] = rolesFound.map((role) => role._id)
            req.body.password = await User.encryptPassword(req.body.password);
            const reg = await User.insertMany(req.body);
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
            const reg = await User.find({ nombres: { '$regex': querys, "$options": "i" } });
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
            const total = await User.countDocuments({ visible: true });
            const paginas = Math.ceil(total / limit);
            const reg = await User.find({ visible: true }).skip((limit * skip) - limit).limit(limit).sort({ createdAt: -1 });
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
    listUser: async (req, res, next) => {
        try {
            const reg = await User.find().sort({ 'createdAt': -1 });
            res.status(200).json(reg);
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
            await User.deleteMany({
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
            const reg = await User.findById(req.params.id);
            res.status(200).json(reg);
        } catch (e) {
            res.status(500).send(e);
        }
    },
       
}