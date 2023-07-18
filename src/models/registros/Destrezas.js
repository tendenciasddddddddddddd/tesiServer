import { Schema, model } from "mongoose";

const nivelSchema = new Schema(
  {
    fkcurso: {
      type: Schema.Types.ObjectId,
      ref: "Cursos",
    },
    curso: {},
    ambitos: [{
        amb : String,
        des : String,
    }],
    estado: {
      type: String,
      default: 1
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model("Destrezas", nivelSchema);