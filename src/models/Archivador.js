import { Schema, model } from "mongoose";

const resSchema = new Schema(
  {
    cliente : {},
    fkCliente: {
        type: Schema.Types.ObjectId,
        ref: "Cliente",
        unique: true,
    },
    documentos: [{
      servicio : {},
      kfservicio: String,
      estado: Number,
      descripcion: String,
      info: [{
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

export default model("Archivador", resSchema);