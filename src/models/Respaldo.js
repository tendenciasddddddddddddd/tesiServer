import { Schema, model } from "mongoose";

const esquema = new Schema(
    {
      fkcurso: {
        type: Schema.Types.ObjectId,
        ref: "Cursos",
      },
      curso:{},
      fkperiodo: {
        type: Schema.Types.ObjectId,
        ref: "Periodo",
      },
      periodo:{},
      paralelo : String,
      matriculas : [{
        fecha : String,
        fkestudiante: String,
        estudiante : {},
        nmatricula : String,
        folio: String,
        computo: [{
          fkdocente : String,
          docente : {},
          fkmateria : String,
          materia : {},
          resultados : {},
          notas : {},
          cualitativo : {},
        }],
        destrezas : [{
          fkdocente : String,
          docente : {},
          fkmateria : String,
          materia : {},
          notas : [{}],
        }]
      }],
    },
    {
      timestamps: true,
      versionKey: false
    }
  );
  
  export default model("Respaldo", esquema);