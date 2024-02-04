import { Schema, model } from "mongoose";

const resSchema = new Schema(
  {
    fkCliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
    },
    servicio: {},
    estado : Number,
    ofIndex :Number,
    total : Number,
    abona : Number,
    pagos : [{}],
    direccion : String,
    mts :  Number,
    archivos: [{
        link : String,
        tipo : String,
        size : String,
        name : String,
        formato : String,
        created_at : String,
    }],
    carpetas: [{
      nombreCarpeta: String,
      archivos: [{
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

export default model("Drive", resSchema);