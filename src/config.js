import { config } from "dotenv";
config();
//mongodb://127.0.0.1/sistema-integrado2
//mongodb+srv://steban:Medid100.@face-2.gkdmqm9.mongodb.net/sistema-uel?retryWrites=true&w=majority
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1/sistema-symtech",
  PORT: process.env.PORT || 3000,
  SECRET: 'system-integrado-unidad-edu-libertad'
};