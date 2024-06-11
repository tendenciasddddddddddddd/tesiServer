import { Schema, model } from "mongoose";

const cajasSchema = new Schema(
    {
      cajaInicial : String,
      fecha : String,
      ingresos: [{}],
      gastos: [{}],
      detalles : {},
      archivo : String
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("HistorialCajas", cajasSchema);