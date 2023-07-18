import { Schema, model } from "mongoose";

const resSchema = new Schema(
  {
    nombre: {
      type: String,
      unique: true,
    },
    fkperiodo: String,
    periodo: {},
    inicio : String,
    fin : String,
    entregas: [{
      fkdocente: String,
      docente: {},
      repositorio: [{
        link : String,
        tipo : String,
        size : String,
        name : String,
        formato : String,
        created_at : String,
      }]
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Repositorio", resSchema);