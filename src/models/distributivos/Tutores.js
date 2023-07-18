import {
    Schema,
    model
} from "mongoose";

const cantonesSchema = new Schema({
    fkcurso: {
        type: Schema.Types.ObjectId,
        ref: "Cursos",
    },
    curso :{},
    fkdocente: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    docente:{},
    paralelo: String,
}, {
    timestamps: true,
    versionKey: false
});

export default model("Tutor", cantonesSchema);