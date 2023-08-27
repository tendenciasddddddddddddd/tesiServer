import { Schema, model } from "mongoose";


const roleSchema = new Schema(
  {
    inicio: String,
    fin: String,
    parcial1: String,
    parcial2: String,
    parcial3: String,
    parcial4: String,
    parcial5: String,
    parcial6: String,
    examen1: String,
    examen2: String,
    examen3: String,
    proyecto : String,
    supletorios: String,
  },
  {
    versionKey: false,
  }
);

export default model("AperturaNotas", roleSchema);