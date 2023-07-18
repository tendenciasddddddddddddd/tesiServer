import { Schema, model } from "mongoose";

const esquema = new Schema(
    {
      numMatricula: String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Secuencia", esquema);