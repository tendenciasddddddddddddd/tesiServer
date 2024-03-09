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
    navegador: String,
}, {
    timestamps: true,
    versionKey: false
});

export default model("LogsLogin", horarioSchema);