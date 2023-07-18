import { Schema, model } from "mongoose";

const resSchema = new Schema(
    {
      nombre: {
        type: String,
        unique: true,
      },
      estado: {
        type: String,
        default:0
      },
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Periodo", resSchema);