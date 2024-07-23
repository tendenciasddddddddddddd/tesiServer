import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const productSchema = new Schema(
  {
    identificacion: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    tipoidentificacion : String,
    foto: String,
    estado: Boolean,
    telefono: String,
    nombres: String,
    direccion: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(4);
  return await bcrypt.hash(password, salt);
};

productSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

export default model("Cliente", productSchema);