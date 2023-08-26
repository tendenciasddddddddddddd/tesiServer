import {
    Schema,
    model
} from "mongoose";

const horarioSchema = new Schema({
    usuario: { },
    nombre: String,
    iP : String,
    navegador: String,
    fkcurso: {
        type: Schema.Types.ObjectId,
        ref: "Cursos",
    },
    detalle : {},
}, {
    timestamps: true,
    versionKey: false
});

export default model("LogsNotas", horarioSchema);