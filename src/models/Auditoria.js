import {
    Schema,
    model
} from "mongoose";

const horarioSchema = new Schema({
    fkUser: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nombre: String,
    iP : String,
    tipo: String,
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

export default model("Auditoria", horarioSchema);