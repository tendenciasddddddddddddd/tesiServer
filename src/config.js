import { config } from "dotenv";
config();
//mongodb://127.0.0.1/sistema-symtech
//mongodb+srv://steban:Medid100.@face-1.ubvfiwd.mongodb.net/sistema-mons-tulcan?retryWrites=true&w=majority
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://steban:Medid100.@face-1.ubvfiwd.mongodb.net/sistema-mons-tulcan?retryWrites=true&w=majority",
  PORT: process.env.PORT || 5000,
  SECRET: 'system-unidad-educativa-leonidas-proaño.'
};