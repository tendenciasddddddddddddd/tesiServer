import {
    Schema,
    model
} from "mongoose";

const horarioSchema = new Schema({
    fkcurso: String,
    curso: String,
    distri: [{
        fkdocente: String,
        docente: {},
        fkmateria: String,
        materia: {},
        color: String,
        posicion: String,
    }],
}, {
    timestamps: true,
    versionKey: false
});

export default model("Horario", horarioSchema);