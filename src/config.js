import { config } from "dotenv";
config();
//mongodb://127.0.0.1/gestor-archivos
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1/gestor-archivos",
  PORT: process.env.PORT || 3000,
  SECRET: 'system-gestor-archivos.'
};