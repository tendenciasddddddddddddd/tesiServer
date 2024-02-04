import { Schema, model } from "mongoose";

const esquema = new Schema(
    {
      razonSocial: String,
      nombreComercial : String,
      ruc : String,
      codDoc : String,
      establecimiento : String,
      ptoEmicion : String,
      dirMatriz : String,
      dirEstablecimiento : String,
      obligadoContabilidad : String,
      logo : String,
      email: String,
      telefono : String,
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Agencia", esquema);