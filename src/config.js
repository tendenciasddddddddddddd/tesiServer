import { config } from "dotenv";
config();
//mongodb://127.0.0.1/gestor-archivos
//mongodb+srv://steban:Medid100.@atukconstruction.zofomxt.mongodb.net/sistema?retryWrites=true&w=majority&appName=atukconstruction
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://steban:Medid100.@atukconstruction.zofomxt.mongodb.net/sistema?retryWrites=true&w=majority&appName=atukconstruction",
  PORT: process.env.PORT || 3000,
  SECRET: 'system-gestor-archivos.'
};