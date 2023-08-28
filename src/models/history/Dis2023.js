import {
    Schema,
    model
} from "mongoose";

const distributivoSchema = new Schema({
    fkcurso: {
        type: Schema.Types.ObjectId,
        ref: "Cursos",
    },
    curso:{},
    paralelo: String,
    carga: [{
        fkdocentes : String,
        docente : {},
        fkmaterias : String,
        materia : {},
        porsentajes : String,
        horas : String,
        order : String,
    }],
}, {
    timestamps: true,
    versionKey: false
});

export default model("Dis2023", distributivoSchema);