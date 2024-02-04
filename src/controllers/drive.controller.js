import Drive from "../models/Drive.js";

async function insetFolder(id, data) {
    try {
        await Drive.findByIdAndUpdate(
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
        await Drive.findByIdAndUpdate(
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
            await Drive.create(req.body)
            res.status(201).json({});

        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    },
    createFile: async (req, res) => {
        try {
            const { fkdocente } = req.body
            const findUser = await Drive.findOne({ fkdocente })
            if (findUser) {
                await insetFile(findUser._id, req.body.archivos)
                return res.status(201).json({});
            }
            await Drive.create(req.body)
            res.status(201).json({});

        } catch (error) {
            console.log(error)
            return res.status(500).json(error);
        }
    },

    getList: async (req, res) => {
        try {
            const UsuariosId = req.params.id;
            const result = await Drive.find({fkCliente : UsuariosId}).lean();
            return res.json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    updateById: async (req, res) => {
        try {
            await Drive.findByIdAndUpdate(
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

    remove: async (req, res) => {
        try {
            let cadenaId = req.params.id;
            const array = cadenaId.split(",");
            await Drive.deleteMany({
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
            const { keyFolder } = req.body
            await Drive.updateOne(
                { _id: id },
                {
                    $pull: {
                        "carpetas": { "_id": keyFolder }
                    }
                }
            )
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    removeFile: async (req, res) => {
        try {
            const { id } = req.params;
            const { keyFile } = req.body
            
            await Drive.updateOne(
                { _id: id },
                {
                    $pull: {
                        "archivos": { "_id": keyFile }
                    }
                }
            )
            res.status(200).json();
        } catch (error) {
            return res.status(500).json(error);
        }
    },
};