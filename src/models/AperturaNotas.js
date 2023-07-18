import { Schema, model } from "mongoose";


const roleSchema = new Schema(
  {
    inicio: String,
    fin: String,
    parcial1: String,
    parcial2: String,
    parcial3: String,
    parcial4: String,
    examen1: String,
    examen2: String,
    supletorios: String,
    remedial : String,
    gracia : String,
  },
  {
    versionKey: false,
  }
);

export default model("AperturaNotas", roleSchema);