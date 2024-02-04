import { Schema, model } from "mongoose";

const resSchema = new Schema(
  {
    nombre : String,
    descripcion : String,
    estado : Boolean,
    responsable : {},
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Servicios", resSchema);