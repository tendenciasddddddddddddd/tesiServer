import { config } from "dotenv";
config();
//mongodb://127.0.0.1/sistema-integrado2
//mongodb+srv://steban:Medid100.@face-1.ubvfiwd.mongodb.net/sistema-mons-tulcan?retryWrites=true&w=majority
export default {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://127.0.0.1/sistema-integrado2",
  PORT: process.env.PORT || 5001,
  SECRET: 'system-integrado-mons-tulcan-v1'
};