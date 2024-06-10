import { Schema, model } from "mongoose";

const resSchema = new Schema(
  {
    fkCliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
    },
    cliente : {},
    fkServicio: {
      type: Schema.Types.ObjectId,
      ref: "Servicios",
    },
    servicio: {},
    estado : Number,
    ofIndex :Number,
    total : Number,
    abona : Number,
    pagos : [{
      tipo : String,
      fecha : String,
      monto : Number,
      text : String
    }],
    provincia : String,
    canton : String,
    parroquia : String,
    sector : String,
    mts :  String,
    isNota : Boolean,
    nota : String,
    arrRequisitos : [{
      fecha: Date,
      departamento: String,
      asunto: String,
      responsable : {},
      archivos : [{
        link : String,
        tipo : String,
        size : String,
        name : String,
        formato : String,
      }],
      nombreDoc : String,
      estadoTramite : String
    }],
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Archivador", resSchema);