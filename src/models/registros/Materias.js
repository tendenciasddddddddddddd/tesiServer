import { Schema, model } from "mongoose";

const resSchema = new Schema(
    {
      area: {
        type: String,
      },
      nombre: {
        type: String,
        unique: true,
      },
      estado: {
        type: String,
        default:1
      },
      computo : String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Materias", resSchema);