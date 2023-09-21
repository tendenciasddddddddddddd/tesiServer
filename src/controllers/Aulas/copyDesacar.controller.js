import Configure from "../../models/Configure";
import { client } from "../../middlewares/rediss";
import Aulasvirtuales from "../../models/Aulasvirtuales";

const ejs = require("ejs");

async function autoridad() {
    try {
        const reply = await client.get("5000autoridades");
        if (reply) return JSON.parse(reply);
        const result = await Configure.findOne();
        await client.set("5000autoridades", JSON.stringify(result), { EX: 36000 });
        return result;
    } catch (error) {
        console.log(error);
    }
}
async function clonarTarea(id, data) {
    try {
        const model = {
            tipo: "1",
            title: data.title,
            descripcion: data.descripcion,
            archivo: data.archivo,
            start: data.start,
            fechOrden: data.fechOrden,
            disponibilidad: "1",
            fechad: data.fechad,
            parcial: data.parcial,
            ofIndex: data.ofIndex,
            entrega: [],
            foro: [],
        };
        await Aulasvirtuales.findByIdAndUpdate(
            id,
            { $push: { tareas: model } },
            {
                new: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
}
async function clonarEva(id, data) {
    try {
        const model = {
            tipo: '6',
            title: data.title,
            descripcion: data.descripcion,
            start: data.start,
            end: data.end,
            fechOrden: data.fechOrden,
            tempo: data.tempo,
            disponibilidad: '1',
            parcial: data.parcial,
            ofIndex: data.ofIndex,
            fechad: data.fechad,
            intenAllowed: data.intenAllowed,
            revisar: data.revisar,
            publicar: data.publicar,
            security: data.security,
            archivo: data.archivo,
            surveys: data.surveys,
            answers: []
        };
        await Aulasvirtuales.findByIdAndUpdate(
            id,
            { $push: { evaluacion: model } },
            {
                new: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
}
async function clonarForo(id, data) {
    try {
        const model = {
            tipo: '7',
            title: data.title,
            disponibilidad: '1',
            fechOrden: data.fechOrden,
            start: data.start,
            fechad: data.fechad,
            descripcion: data.descripcion,
            parcial: data.parcial,
            ofIndex: data.ofIndex,
            foro: []
        };
        await Aulasvirtuales.findByIdAndUpdate(
            id,
            { $push: { foros: model } },
            {
                new: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
}
async function clonarLectura(id, data) {
    try {
        const model = {
            tipo: '3',
            title: data.title,
            content: data.content,
            disponibilidad: '1',
            fechOrden: data.fechOrden,
            parcial: data.parcial,
            ofIndex: data.ofIndex,
        };
        await Aulasvirtuales.findByIdAndUpdate(
            id,
            { $push: { lecturas: model } },
            {
                new: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
}
async function clonarLibro(id, data) {
    try {
        const model = {
            tipo: '2',
            title: data.title,
            archivo: data.archivo,
            disponibilidad: '1',
            fechOrden: data.fechOrden,
            descripcion: data.descripcion,
            parcial: data.parcial,
            ofIndex: data.ofIndex,
        };
        await Aulasvirtuales.findByIdAndUpdate(
            id,
            { $push: { libros: model } },
            {
                new: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
}
async function clonarYoutube(id, data) {
    try {
        const model = {
            tipo: '5',
            title: data.title,
            link: data.link,
            disponibilidad: '1',
            fechOrden: data.fechOrden,
            parcial: data.parcial,
            ofIndex: data.ofIndex,
            foro: []
        };
        await Aulasvirtuales.findByIdAndUpdate(
            id,
            { $push: { youtube: model } },
            {
                new: true,
            }
        );
    } catch (error) {
        console.log(error);
    }
}
export default {
    tareas: async (req, res) => {
        try {
            const arr = req.body;
            const result = arr;
            const fecha = fechaActual();
            const auth = await autoridad();
            if (arr.tipo == 6) {
                const tema = await ejs.renderFile(__dirname + "/repo/evaluacion.ejs", {
                    result,
                    auth,
                    fecha,
                });
                return res.status(200).json(tema);
            }
            const tema = await ejs.renderFile(__dirname + "/repo/tareas.ejs", {
                result,
                auth,
                fecha,
            });
            res.status(200).json(tema);
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },

    //TODO handle COPIAMOS O CLONAMOS LAS ACTIVIDADES
    copyActividad: async (req, res) => {
        try {
            const { data, curso } = req.body;
            curso.forEach(async (value) => {
                if (data?.tipo == 1) await clonarTarea(value, data);
                if (data?.tipo == 6) await clonarEva(value, data);
                if (data?.tipo == 7) await clonarForo(value, data);
                if (data?.tipo == 3) await clonarLectura(value, data);
                if (data?.tipo == 2) await clonarLibro(value, data);
                if (data?.tipo == 5) await clonarYoutube(value, data);
            });
            console.log(data)
            res.status(200).json("tema");
        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    },
};

const fechaActual = () => {
    const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    const output = day + " de " + month + "\n" + " del " + year;
    return output;
};
