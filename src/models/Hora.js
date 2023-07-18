import {
    Schema,
    model
} from "mongoose";

const horarioSchema = new Schema({
    num: {
        type: String,
        unique: true,
      },
    nombre: String,
}, {
    timestamps: true,
    versionKey: false
});

export default model("Hora", horarioSchema);