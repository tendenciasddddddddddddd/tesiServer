import Aulasvirtuales from "../../models/Aulasvirtuales";

//======================INSERTAMOS FOROS DE NIVEL 1 ============================
async function publishOneVideo(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "videos.$[perf].foro": data } },
            {
                arrayFilters: [{
                    "perf._id": { $eq: array[1] }
                }],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function publishOneTarea(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "tareas.$[perf].foro": data } },
            {
                arrayFilters: [{
                    "perf._id": { $eq: array[1] }
                }],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function publishOneYoutube(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "youtube.$[perf].foro": data } },
            {
                arrayFilters: [{
                    "perf._id": { $eq: array[1] }
                }],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function publishOneForos(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "foros.$[perf].foro": data } },
            {
                arrayFilters: [{
                    "perf._id": { $eq: array[1] }
                }],
                new: true,
            }
        );
    } catch (e) {
    }
}
//======================INSERTAMOS FOROS DE NIVEL 2 ============================
async function publishTwoVideo(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "videos.$[perf].foro.$[est].subForo": data } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function publishTwoTarea(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "tareas.$[perf].foro.$[est].subForo": data } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function publishTwoYoutube(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "youtube.$[perf].foro.$[est].subForo": data } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function publishTwoForos(array, data) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "foros.$[perf].foro.$[est].subForo": data } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
//======================INSERTAMOS LIKE EN FOROS DE NIVEL 1 ============================
async function likeOneVideo(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "videos.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function likeOneTarea(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "tareas.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function likeOneYoutube(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "youtube.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function likeOneForos(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "foros.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
//======================INSERTAMOS NO LIKE EN FOROS DE NIVEL 1 ============================
async function noLikeOneVideo(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "videos.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function noLikeOneTarea(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "tareas.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function noLikeOneYoutube(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "youtube.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function noLikeOneForos(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $push: { "Foros.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
//======================ELIMINAMOS LIKE EN FOROS DE NIVEL 1 ============================
async function removeLikeOneVideo(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "videos.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeLikeOneTarea(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "tareas.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeLikeOneYoutube(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "youtube.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeLikeOneForos(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "foros.$[perf].foro.$[est].like": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
//======================ELIMINAMOS LE NOOO LIKE EN FOROS DE NIVEL 1 ============================
async function removeNoLikeOneVideo(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "videos.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeNoLikeOneTarea(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "tareas.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeNoLikeOneYoutube(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "youtube.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeNoLikeOneForos(array, like) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "foros.$[perf].foro.$[est].nolike": like } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
//======================ELIMINAMOS FORO DE NIVEL  1============================
async function removeForoOneVideo(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "videos.$[perf].foro": { _id: array[2] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeForoOneTarea(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "tareas.$[perf].foro": { _id: array[2] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeForoOneYoutube(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "youtube.$[perf].foro": { _id: array[2] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeForoOneForos(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "Foros.$[perf].foro": { _id: array[2] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
//======================ELIMINAMOS FORO DE NIVEL  2============================
async function removeForoTwoVideo(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "videos.$[perf].foro.$[est].subForo": { _id: array[3] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeForoTwoTarea(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "tareas.$[perf].foro.$[est].subForo": { _id: array[3] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeForoTwoYoutube(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "youtube.$[perf].foro.$[est].subForo": { _id: array[3] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
async function removeForoTwoForos(array) {
    try {
        await Aulasvirtuales.updateOne(
            { _id: array[0] },
            { $pull: { "foros.$[perf].foro.$[est].subForo": { _id: array[3] } } },
            {
                arrayFilters: [
                    { "perf._id": { $eq: array[1] } },
                    { "est._id": { $eq: array[2] } }
                ],
                new: true,
            }
        );
    } catch (e) {
    }
}
export default {
    //======================CREA FOROS=================================
    publishOne: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const tipo = req.body.foro.tipo;
            if (tipo === '4') await publishOneVideo(array, req.body.foro)
            if (tipo === '1') await publishOneTarea(array, req.body.foro)
            if (tipo === '5') await publishOneYoutube(array, req.body.foro)
            if (tipo === '7') await publishOneForos(array, req.body.foro)
            res.status(200).json("ok");
        } catch (e) {
            res.status(500).json(e);
        }
    },
    publishTwo: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const tipo = req.body.subForo.tipo;
            if (tipo === '4') await publishTwoVideo(array, req.body.subForo)
            if (tipo === '1') await publishTwoTarea(array, req.body.subForo)
            if (tipo === '5') await publishTwoYoutube(array, req.body.subForo)
            if (tipo === '7') await publishTwoForos(array, req.body.subForo)
            res.status(200).json("ok");
        } catch (e) {
            res.status(500).json(e);
        }
    },
    clickLike: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const { key, tipo } = req.body;
            if (tipo === '4') await likeOneVideo(array, key)
            if (tipo === '1') await likeOneTarea(array, key)
            if (tipo === '5') await likeOneYoutube(array, key)
            if (tipo === '7') await likeOneForos(array, key)
            res.status(200).json("ok");
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    },
    clickNoLike: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const { key, tipo } = req.body;
            if (tipo === '4') await noLikeOneVideo(array, key)
            if (tipo === '1') await noLikeOneTarea(array, key)
            if (tipo === '5') await noLikeOneYoutube(array, key)
            if (tipo === '7') await noLikeOneForos(array, key)
            res.status(200).json("ok");
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    },
    removeLike: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const { key, tipo } = req.body;
            if (tipo === '4') await removeLikeOneVideo(array, key)
            if (tipo === '1') await removeLikeOneTarea(array, key)
            if (tipo === '5') await removeLikeOneYoutube(array, key)
            if (tipo === '7') await removeLikeOneForos(array, key)
            res.status(200).json("ok");
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    },
    removeNoLike: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const { key, tipo } = req.body;
            if (tipo === '4') await removeNoLikeOneVideo(array, key)
            if (tipo === '1') await removeNoLikeOneTarea(array, key)
            if (tipo === '5') await removeNoLikeOneYoutube(array, key)
            if (tipo === '7') await removeNoLikeOneForos(array, key)
            res.status(200).json("ok");
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    },
    removeForoOne: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const { tipo } = req.body;
            if (tipo === '4') await removeForoOneVideo(array)
            if (tipo === '1') await removeForoOneTarea(array)
            if (tipo === '5') await removeForoOneYoutube(array)
            if (tipo === '7') await removeForoOneForos(array)
            res.status(200).json("ok");
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    },
    removeForoTwo: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            const { tipo } = req.body;
            if (tipo === '4') await removeForoTwoVideo(array)
            if (tipo === '1') await removeForoTwoTarea(array)
            if (tipo === '5') await removeForoTwoYoutube(array)
            if (tipo === '7') await removeForoTwoForos(array)
            res.status(200).json("ok");
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    },



//====================================================================================================================

    //======================ENUNCIADO DEL FORO=================================
    create: async (req, res) => {
        try {
            await Aulasvirtuales.findByIdAndUpdate(
                req.params.id,
                { $push: { foros: req.body.foros } },
                {
                    new: true,
                }
            );
            res.status(200).json(req.params.id);
        } catch (e) {
            console.log(e);
            res.status(500).json("error del servidor");
        }
    },
    //======================EDITAR TAREA =================================
    update: async (req, res) => {
        try {
            let cadenaId = req.params.paramId;
            const array = cadenaId.split(",");
            if (array[0] != null && array[1] != null) {
                await Aulasvirtuales.updateOne(
                    { _id: array[0] },
                    {
                        $set: {
                            "foros.$[perf].title": req.body.foros.title,
                            "foros.$[perf].start": req.body.foros.start,
                            "foros.$[perf].fechad": req.body.foros.fechad,
                            "foros.$[perf].disponibilidad": req.body.foros.disponibilidad,
                            "foros.$[perf].descripcion": req.body.foros.descripcion,
                        }
                    },
                    {
                        arrayFilters: [{
                            "perf._id": { $eq: array[1] }
                        }],
                        new: true,
                    }
                );
                res.status(200).json("req.params.aulaId");
            } else {
                res.status(200).json("req.params.aulaId");
            }
        } catch (e) {
            console.log(e)
            res.status(500).json("error del servidor");
        }
    },
}
