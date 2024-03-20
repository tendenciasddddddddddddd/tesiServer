import { Schema, model } from "mongoose";

const cajasSchema = new Schema(
    {
      cajaInicial : String,
      ingresos: [{}],
      gastos: [{}],
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Cajas", cajasSchema);